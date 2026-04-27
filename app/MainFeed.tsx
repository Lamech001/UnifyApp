import React, { useEffect,
   useMemo, useState } from 'react';
import { Modal, 
  ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Image 
} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets
 } from 'react-native-safe-area-context';
import BottomNavigation from './components/feed/BottomNavigation';
import TopNavigation from './components/feed/TopNavigation';
import ExploreTab from './components/feed/tabs/ExploreTab';
import HomeTab from './components/feed/tabs/HomeTab';
import NotificationsTab from './components/feed/tabs/NotificationsTab';
import ProfileTab from './components/feed/tabs/ProfileTab';
import { cityHighlights, mockPosts } from './data/mockPosts';
import { RegisteredUser } from './types/auth';
import { FeedTab, Post } from './types/feed';

interface MainFeedProps {
  user: RegisteredUser;
  onLogout: () => void;
}

const EXPIRY_MS = 48 * 60 * 60 * 1000;

export default function MainFeed({ user, onLogout }: MainFeedProps) {
  const [activeTab, setActiveTab] = useState<FeedTab>('home');
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [draftPost, setDraftPost] = useState('');
  const [draftMediaUri, setDraftMediaUri] = useState<string | undefined>(undefined);
  const [draftMediaType, setDraftMediaType] = useState<'image' | 'video' | undefined>(undefined);
  const [profileImageUri, setProfileImageUri] = useState<string | undefined>(user.profileImageUri);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [nowMs, setNowMs] = useState(Date.now());
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [saveDataMode, setSaveDataMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const compact = width < 380;

  const cityCardWidth = useMemo(() => {
    const horizontalPadding = compact ? 20 : 26;
    const gutters = 10;
    return (width - horizontalPadding - gutters) / 2;
  }, [compact, width]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowMs(Date.now());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => nowMs - new Date(post.createdAt).getTime() < EXPIRY_MS)
    );
  }, [nowMs]);

  const visiblePosts = useMemo(
    () => posts.filter((post) => nowMs - new Date(post.createdAt).getTime() < EXPIRY_MS),
    [nowMs, posts]
  );

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return visiblePosts;

    return visiblePosts.filter((post) =>
      `${post.author} ${post.location} ${post.content}`.toLowerCase().includes(query)
    );
  }, [searchQuery, visiblePosts]);

  const handleCreatePost = () => {
    const content = draftPost.trim();
    if (!content && !draftMediaUri) return;

    const newPost: Post = {
      id: Date.now(),
      author: user.fullName,
      location: user.location,
      content: content || 'Shared media',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      commentEntries: [],
      mediaUri: draftMediaUri,
      mediaType: draftMediaType,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setDraftPost('');
    setDraftMediaUri(undefined);
    setDraftMediaType(undefined);
    setShowCreatePostModal(false);
    setActiveTab('home');
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      quality: 0.9,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setDraftMediaUri(asset.uri);
      setDraftMediaType(asset.type === 'video' ? 'video' : 'image');
    }
  };

  const captureWithCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      quality: 0.9,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setDraftMediaUri(asset.uri);
      setDraftMediaType(asset.type === 'video' ? 'video' : 'image');
    }
  };

  const handleEditProfile = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigation 
        compact={compact} 
        darkMode={darkMode} // Added missing prop
        onOpenSettings={() => setShowSettings(true)} 
      />

      {activeTab === 'home' ? (
        <HomeTab
          posts={filteredPosts}
          nowMs={nowMs}
          searchQuery={searchQuery}
          searchResultsCount={filteredPosts.length}
          onChangeSearchQuery={setSearchQuery}
          onToggleLike={(postId) => {
            setPosts((prevPosts) =>
              prevPosts.map((post) => {
                if (post.id !== postId) return post;
                const isLiked = post.likedByCurrentUser ?? false;
                return {
                  ...post,
                  likes: isLiked ? post.likes - 1 : post.likes + 1,
                  likedByCurrentUser: !isLiked,
                };
              })
            );
          }}
          onAddComment={(postId, comment) => {
            setPosts((prevPosts) =>
              prevPosts.map((post) =>
                post.id === postId
                  ? { ...post, commentEntries: [...post.commentEntries, comment] }
                  : post
              )
            );
          }}
        />
      ) : (
        <View
          style={[
            styles.mainContent,
            styles.mainContentContainer,
            compact && styles.mainContentContainerCompact,
            { paddingBottom: 88 + insets.bottom },
          ]}
        >
          {activeTab === 'explore' && (
            <ExploreTab cityHighlights={cityHighlights} cityCardWidth={cityCardWidth} />
          )}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'profile' && (
            <ProfileTab
              fullName={user.fullName}
              identity={user.identity}
              location={user.location}
              dateOfBirth={user.dateOfBirth}
              profileImageUri={profileImageUri}
              onEditProfile={handleEditProfile}
              onLogout={onLogout}
            />
          )}
        </View>
      )}

      <BottomNavigation
        activeTab={activeTab}
        compact={compact}
        bottomInset={insets.bottom}
        onTabChange={setActiveTab}
        onCreatePress={() => {
          setActiveTab('home');
          setShowCreatePostModal(true);
        }}
      />

      <Modal visible={showSettings} transparent animationType="slide" onRequestClose={() => setShowSettings(false)}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Settings</Text>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable notifications</Text>
              <Switch value={enableNotifications} onValueChange={setEnableNotifications} />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Save data mode</Text>
              <Switch value={saveDataMode} onValueChange={setSaveDataMode} />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dark mode (preview)</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setShowSettings(false)}>
              <Text style={styles.primaryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCreatePostModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreatePostModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Create Post</Text>
            <TextInput
              style={styles.postInput}
              value={draftPost}
              onChangeText={setDraftPost}
              placeholder="Write a caption (optional if media selected)"
              placeholderTextColor="#9CA3AF"
              multiline
            />

            <View style={styles.postActionsRow}>
              <TouchableOpacity style={styles.secondaryButton} onPress={pickFromGallery}>
                <Text style={styles.secondaryButtonText}>Upload from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={captureWithCamera}>
                <Text style={styles.secondaryButtonText}>Use Camera</Text>
              </TouchableOpacity>
            </View>

            {draftMediaUri && draftMediaType === 'image' && (
              <Image source={{ uri: draftMediaUri }} style={styles.previewImage} contentFit="cover" />
            )}
            {draftMediaUri && draftMediaType === 'video' && (
              <View style={styles.videoPreview}>
                <Text style={styles.videoPreviewText}>🎬 Video selected and ready to post</Text>
              </View>
            )}

            <Text style={styles.helperText}>
              Tap Publish to share publicly. Posts auto-delete after 48 hours.
            </Text>

            <View style={styles.footerActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                  setShowCreatePostModal(false);
                  setDraftPost('');
                  setDraftMediaUri(undefined);
                  setDraftMediaType(undefined);
                }}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={handleCreatePost}>
                <Text style={styles.primaryButtonText}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mainContentContainerCompact: {
    paddingHorizontal: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 24,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    fontSize: 14,
    color: '#111827',
  },
  postInput: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
    color: '#111827',
    marginBottom: 12,
  },
  postActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#E5E7EB',
  },
  videoPreview: {
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 8,
  },
  videoPreviewText: {
    color: '#3730A3',
    fontSize: 12,
    fontWeight: '600',
  },
  helperText: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 10,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  primaryButton: {
    borderRadius: 8,
    backgroundColor: '#006B3F',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
