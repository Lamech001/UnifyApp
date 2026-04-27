import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image
 } from 'expo-image';
import { VideoView,
   useVideoPlayer } from 'expo-video';
import { Post } from '../../types/feed';

interface PostCardProps {
  post: Post;
  nowMs: number;
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, comment: string) => void;
}

function VideoAttachment({ uri }: { uri: string }) {
  const player = useVideoPlayer({ uri }, (playerInstance) => {
    playerInstance.loop = true;
  });

  return <VideoView style={styles.postVideo} player={player} contentFit="contain" nativeControls allowsFullscreen />;
}

const getProgressColor = (hoursLeft: number): string => {
  if (hoursLeft > 36) return '#006B3F';
  if (hoursLeft > 24) return '#f59e0b';
  if (hoursLeft > 12) return '#f97316';
  return '#BA0C2F';
};

const EXPIRY_MS = 48 * 60 * 60 * 1000;

const formatPostedAgo = (createdAt: string, nowMs: number): string => {
  const diffMs = Math.max(0, nowMs - new Date(createdAt).getTime());
  const minutes = Math.floor(diffMs / (60 * 1000));
  const hours = Math.floor(diffMs / (60 * 60 * 1000));

  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};

const getAuthorInitials = (author: string): string => {
  const trimmedAuthor = author.trim();
  if (!trimmedAuthor) return 'U';

  const initials = trimmedAuthor
    .split(' ')
    .map((namePart) => namePart[0])
    .filter(Boolean)
    .join('');

  return initials || 'U';
};

function PostCard({ post, nowMs, onToggleLike, onAddComment }: PostCardProps) {
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const ageMs = nowMs - new Date(post.createdAt).getTime();
  const remainingMs = Math.max(0, EXPIRY_MS - ageMs);
  const hoursLeft = remainingMs / (60 * 60 * 1000);
  const progressPercentage = Math.max(0, Math.min(100, (hoursLeft / 48) * 100));
  const progressColor = getProgressColor(hoursLeft);
  const timeLabel = formatPostedAgo(post.createdAt, nowMs);
  const commentEntries = post.commentEntries ?? [];

  const handleAddComment = () => {
    const newComment = commentInput.trim();
    if (!newComment) return;

    setCommentInput('');
    onAddComment(post.id, newComment);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${post.author} from ${post.location}: ${post.content}`,
      });
    } catch {
      Alert.alert('Share unavailable', 'Unable to open share options right now.');
    }
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getAuthorInitials(post.author)}
            </Text>
          </View>
          <View style={styles.authorDetails}>
            <View style={styles.authorRow}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.timestamp}>{timeLabel}</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>🏙️</Text>
              <Text style={styles.location}>{post.location}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.moreButton}>⋯</Text>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>
      {post.mediaUri && post.mediaType === 'image' && (
        <TouchableOpacity activeOpacity={0.9} onPress={() => setShowImageViewer(true)}>
          <Image source={{ uri: post.mediaUri }} style={styles.postImage} contentFit="contain" />
        </TouchableOpacity>
      )}
      {post.mediaUri && post.mediaType === 'video' && (
        <VideoAttachment uri={post.mediaUri} />
      )}

      <View style={styles.fadeTimer}>
        <View style={styles.fadeTimerHeader}>
          <View style={styles.fadeTimerInfo}>
            <Text style={[styles.clockIcon, { color: progressColor }]}>⏰</Text>
            <Text style={styles.fadeTimerText}>Fading in {hoursLeft.toFixed(1)}h</Text>
          </View>
          <Text style={styles.fadePercentage}>{progressPercentage.toFixed(0)}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: progressColor,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onToggleLike(post.id)}>
          <Text style={styles.actionEmoji}>👍</Text>
          <Text style={[styles.actionText, post.likedByCurrentUser && styles.actionTextActive]}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setShowComments((current) => !current)}>
          <Text style={styles.actionEmoji}>💬</Text>
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Text style={styles.actionEmoji}>↗️</Text>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {showComments && (
        <View style={styles.commentsContainer}>
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              value={commentInput}
              onChangeText={setCommentInput}
              placeholder="Write a comment..."
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
              <Text style={styles.commentButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
          {commentEntries.length === 0 ? (
            <Text style={styles.noCommentText}>No comments yet.</Text>
          ) : (
            commentEntries.map((comment, index) => (
              <Text key={`${post.id}-comment-${index}`} style={styles.commentText}>
                {comment}
              </Text>
            ))
          )}
        </View>
      )}

      {post.mediaUri && post.mediaType === 'image' && (
        <Modal
          visible={showImageViewer}
          transparent
          animationType="fade"
          onRequestClose={() => setShowImageViewer(false)}
        >
          <View style={styles.viewerOverlay}>
            <ScrollView
              style={styles.viewerScroll}
              contentContainerStyle={styles.viewerContent}
              maximumZoomScale={4}
              minimumZoomScale={1}
              centerContent
            >
              <Image source={{ uri: post.mediaUri }} style={styles.viewerImage} contentFit="contain" />
            </ScrollView>
            <TouchableOpacity style={styles.viewerCloseButton} onPress={() => setShowImageViewer(false)}>
              <Text style={styles.viewerCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );

}

export default React.memo(PostCard);

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#cfebd1',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    marginRight: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006B3F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  authorDetails: {
    flex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginRight: 6,
  },
  dot: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 10,
    marginRight: 2,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
  },
  moreButton: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  postContent: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#E5E7EB',
  },
  postVideo: {
    width: '100%',
    height: 280,
      borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#000000',
  },
  fadeTimer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  fadeTimerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fadeTimerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  fadeTimerText: {
    fontSize: 12,
    color: '#374151',
  },
  fadePercentage: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
  },
  actionTextActive: {
    color: '#006B3F',
    fontWeight: '700',
  },
  commentsContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#111827',
    marginRight: 8,
  },
  commentButton: {
    backgroundColor: '#006B3F',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  noCommentText: {
    fontSize: 12,
    color: '#6B7280',
  },
  commentText: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
  },
  viewerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
  },
  viewerScroll: {
    flex: 1,
  },
  viewerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  viewerImage: {
    width: '100%',
    height: '100%',
  },
  viewerCloseButton: {
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: '#006B3F',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  viewerCloseText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
