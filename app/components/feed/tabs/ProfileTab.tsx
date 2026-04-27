import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

interface ProfileTabProps {
  fullName: string;
  identity: string;
  location: string;
  dateOfBirth: string;
  profileImageUri?: string;
  onEditProfile: () => void;
  onLogout: () => void;
}

const getInitials = (fullName: string): string =>
  fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase() ?? '')
    .join('');

export default function ProfileTab({
  fullName,
  identity,
  location,
  dateOfBirth,
  profileImageUri,
  onEditProfile,
  onLogout,
}: ProfileTabProps) {
  return (
    <View style={styles.profileSection}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader} />
        <View style={styles.profileContent}>
          <View style={styles.profileAvatarContainer}>
            <View style={styles.profileAvatar}>
              {profileImageUri ? (
                <Image source={{ uri: profileImageUri }} style={styles.profileImage} contentFit="cover" />
              ) : (
                <Text style={styles.profileAvatarText}>{getInitials(fullName) || 'U'}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{fullName}</Text>
          <Text style={styles.profileHandle}>{identity} • {location}</Text>
          <Text style={styles.profileMeta}>DOB: {dateOfBirth}</Text>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Total Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>43</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.4K</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    paddingBottom: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  profileHeader: {
    height: 96,
    backgroundColor: '#006B3F',
  },
  profileContent: {
    padding: 16,
  },
  profileAvatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -48,
    marginBottom: 12,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#006B3F',
    borderWidth: 4,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 12,
    color: '#374151',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  profileHandle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  profileMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#BA0C2F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
