import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TopNavigationProps {
  compact: boolean;
  onOpenSettings: () => void;
}

export default function TopNavigation({ compact, onOpenSettings }: TopNavigationProps) {
  return (
    <View style={[styles.topNav, compact && styles.topNavCompact]}>
      <View style={styles.navLeft}>
        <View style={styles.navLogo}>
          <Text style={styles.navLogoEmoji}>⏳</Text>
        </View>
        <Text style={[styles.navTitle, compact && styles.navTitleCompact]}>FadeTima</Text>
      </View>
      <View style={styles.navRight}>
        <TouchableOpacity style={styles.navIcon} onPress={onOpenSettings}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  topNavCompact: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#006B3F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  navLogoEmoji: {
    fontSize: 14,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  navTitleCompact: {
    fontSize: 16,
  },
  navRight: {
    flexDirection: 'row',
  },
  navIcon: {
    position: 'relative',
    padding: 4,
    marginLeft: 8,
  },
});
