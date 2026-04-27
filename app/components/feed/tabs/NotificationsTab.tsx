import { StyleSheet, Text, View } from 'react-native';

const notifications = [
  { type: 'like', user: 'Wanjiku M.', action: 'liked your post', time: '5m ago' },
  { type: 'comment', user: 'Kamau J.', action: 'commented', time: '1h ago' },
];

export default function NotificationsTab() {
  return (
    <View style={styles.notificationsSection}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      {notifications.map((notif, idx) => (
        <View key={`${notif.user}-${idx}`} style={styles.notificationCard}>
          <Text style={styles.notificationEmoji}>{notif.type === 'like' ? '❤️' : '💬'}</Text>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.notificationUser}>{notif.user}</Text> {notif.action}
            </Text>
            <Text style={styles.notificationTime}>{notif.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  notificationCard: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationEmoji: {
    fontSize: 14,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#1F2937',
  },
  notificationUser: {
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});
