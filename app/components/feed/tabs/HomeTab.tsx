import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PostCard from '../PostCard';
import { Post } from '../../../types/feed';

interface HomeTabProps {
  posts: Post[];
  nowMs: number;
  showCreatePost: boolean;
  draftPost: string;
  searchQuery: string;
  searchResultsCount: number;
  onToggleComposer: () => void;
  onChangeDraftPost: (value: string) => void;
  onChangeSearchQuery: (value: string) => void;
  onSubmitPost: () => void;
}

export default function HomeTab({
  posts,
  nowMs,
  showCreatePost,
  draftPost,
  searchQuery,
  searchResultsCount,
  onToggleComposer,
  onChangeDraftPost,
  onChangeSearchQuery,
  onSubmitPost,
}: HomeTabProps) {
  return (
    <>
      <View style={styles.createPostCard}>
        <View style={styles.createPostRow}>
          <View style={styles.createPostAvatar}>
            <Text style={styles.createPostAvatarText}>YOU</Text>
          </View>
          <TouchableOpacity style={styles.createPostInput} onPress={onToggleComposer}>
            <Text style={styles.createPostPlaceholder}>
              {showCreatePost ? 'Write your public post...' : "What's happening?"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createPostButton} onPress={() => onChangeSearchQuery('')}>
            <Text style={styles.createPostButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={onChangeSearchQuery}
          placeholder="Search posts by author, location or content..."
          placeholderTextColor="#9CA3AF"
        />
        <Text style={styles.searchResultText}>{searchResultsCount} post(s) found</Text>

        {showCreatePost && (
          <View style={styles.createPostComposer}>
            <TextInput
              style={styles.input}
              value={draftPost}
              onChangeText={onChangeDraftPost}
              placeholder="Share a story with everyone..."
              placeholderTextColor="#9CA3AF"
              multiline
            />
            <Text style={styles.createPostHint}>
              Public feed: everyone can see every post. Posts auto-delete after 48 hours.
            </Text>
            <TouchableOpacity style={styles.publishButton} onPress={onSubmitPost}>
              <Text style={styles.publishButtonText}>Post to Public Feed</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {posts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No active posts</Text>
          <Text style={styles.emptySubtitle}>Be the first to post. Content expires in 48 hours.</Text>
        </View>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} nowMs={nowMs} />)
      )}
    </>
  );
}

const styles = StyleSheet.create({
  createPostCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  createPostRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createPostAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006B3F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  createPostAvatarText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  createPostInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  createPostPlaceholder: {
    fontSize: 14,
    color: '#6B7280',
  },
  createPostButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#006B3F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  createPostButtonText: {
    fontSize: 14,
    color: '#ffffff',
  },
  searchInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  searchResultText: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
  },
  createPostComposer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  createPostHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 10,
  },
  publishButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#006B3F',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  publishButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
});
