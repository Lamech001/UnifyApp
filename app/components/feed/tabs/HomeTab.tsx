import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import PostCard from '../PostCard';
import { Post } from '../../../types/feed';

interface HomeTabProps {
  posts: Post[];
  nowMs: number;
  searchQuery: string;
  searchResultsCount: number;
  onChangeSearchQuery: (value: string) => void;
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, comment: string) => void;
}

import { useState, useCallback } from 'react';

export default function HomeTab({
  posts,
  nowMs,
  searchQuery,
  searchResultsCount,
  onChangeSearchQuery,
  onToggleLike,
  onAddComment,
}: HomeTabProps) {
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleLoadMore = useCallback(() => {
    if (visibleCount < posts.length) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, posts.length));
    }
  }, [visibleCount, posts.length]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <PostCard
        key={item.id}
        post={item}
        nowMs={nowMs}
        onToggleLike={onToggleLike}
        onAddComment={onAddComment}
      />
    ),
    [nowMs, onToggleLike, onAddComment]
  );

  return (
    <>
      <View style={styles.createPostCard}>
        <View style={styles.createPostRow}>
          <View style={styles.createPostAvatar}>
            <Text style={styles.createPostAvatarText}>YOU</Text>
          </View>
          <View style={styles.createPostInput}>
            <TextInput
              style={styles.inlineSearchInput}
              value={searchQuery}
              onChangeText={onChangeSearchQuery}
              placeholder="Search posts by author, location or content..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.createPostButton} onPress={() => onChangeSearchQuery('')}>
            <Text style={styles.createPostButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.searchResultText}>{searchResultsCount} post(s) found</Text>
      </View>

      {posts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No active posts</Text>
          <Text style={styles.emptySubtitle}>Be the first to post. Content expires in 48 hours.</Text>
        </View>
      ) : (
        <FlatList
          data={posts.slice(0, visibleCount)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={visibleCount < posts.length ? <Text style={{textAlign:'center',margin:16}}>Loading more...</Text> : null}
        />
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
  inlineSearchInput: {
    fontSize: 14,
    color: '#111827',
    padding: 0,
    backgroundColor: '#ffffff',
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
    fontWeight: '600',
  },
  searchResultText: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
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
