import { StyleSheet,
   Text, TouchableOpacity, View } from 'react-native';
import { Post } from '../../types/feed';

interface PostCardProps {
  post: Post;
  nowMs: number;
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

export default function PostCard({ post, nowMs }: PostCardProps) {
  const ageMs = nowMs - new Date(post.createdAt).getTime();
  const remainingMs = Math.max(0, EXPIRY_MS - ageMs);
  const hoursLeft = remainingMs / (60 * 60 * 1000);
  const progressPercentage = Math.max(0, Math.min(100, (hoursLeft / 48) * 100));
  const progressColor = getProgressColor(hoursLeft);
  const timeLabel = formatPostedAgo(post.createdAt, nowMs);

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {post.author
                .split(' ')
                .map((namePart) => namePart[0])
                .join('')}
            </Text>
          </View>
          <View style={styles.authorDetails}>
            <View style={styles.authorRow}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.timestamp}>{timeLabel}</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>{post.location}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.moreButton}>⋯</Text>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

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
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionEmoji}>❤️</Text>
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionEmoji}>💬</Text>
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionEmoji}>🔄</Text>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#ffffff',
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
    color: '#6B7280',
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
});
