import React, { useEffect, 
  useMemo, useState } from 'react';
import { Modal, ScrollView, 
  StyleSheet, Switch, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
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
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [draftPost, setDraftPost] = useState('');
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
    if (!content) return;

    const newPost: Post = {
      id: Date.now(),
      author: user.fullName,
      location: user.location,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setDraftPost('');
    setShowCreatePost(false);
    setActiveTab('home');
  };

  return (
    <View style={styles.container}>
      <TopNavigation compact={compact} onOpenSettings={() => setShowSettings(true)} />

      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={[
          styles.mainContentContainer,
          compact && styles.mainContentContainerCompact,
          { paddingBottom: 88 + insets.bottom },
        ]}
      >
        {activeTab === 'home' && (
          <HomeTab
            posts={filteredPosts}
            nowMs={nowMs}
            showCreatePost={showCreatePost}
            draftPost={draftPost}
            searchQuery={searchQuery}
            searchResultsCount={filteredPosts.length}
            onToggleComposer={() => setShowCreatePost((currentValue) => !currentValue)}
            onChangeDraftPost={setDraftPost}
            onChangeSearchQuery={setSearchQuery}
            onSubmitPost={handleCreatePost}
          />
        )}
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
            onLogout={onLogout}
          />
        )}
      </ScrollView>

      <BottomNavigation
        activeTab={activeTab}
        compact={compact}
        bottomInset={insets.bottom}
        onTabChange={setActiveTab}
        onCreatePress={() => {
          setActiveTab('home');
          setShowCreatePost((currentValue) => !currentValue);
        }}
      />

      <Modal visible={showSettings} transparent animationType="slide" onRequestClose={() => setShowSettings(false)}>
        <View style={styles.settingsBackdrop}>
          <View style={styles.settingsSheet}>
            <Text style={styles.settingsTitle}>Settings</Text>

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

            <TouchableOpacity style={styles.settingsCloseButton} onPress={() => setShowSettings(false)}>
              <Text style={styles.settingsCloseButtonText}>Close</Text>
            </TouchableOpacity>
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
  settingsBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  settingsSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 24,
  },
  settingsTitle: {
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
  settingsCloseButton: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#006B3F',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingsCloseButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
