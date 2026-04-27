import { StyleSheet,
   Text, TouchableOpacity, View } from 'react-native';

interface TopNavigationProps {
  compact: boolean;
  darkMode: boolean;
  onOpenSettings: () => void;
}

export default function TopNavigation({ compact, darkMode, onOpenSettings }: TopNavigationProps) {
  return (
    <View
      style={[
        styles.topNav,
        compact && styles.topNavCompact,
        darkMode && styles.topNavDark,
      ]}
    >
      <View style={styles.navLeft}>
        <View style={styles.navLogo}>
          <Text style={styles.navLogoEmoji}>⏳</Text>
        </View>
        <Text style={[styles.navTitle, compact && styles.navTitleCompact, darkMode && styles.navTitleDark]}>
          FadeTima
        </Text>
      </View>
      <View style={styles.navRight}>
        <TouchableOpacity style={styles.navIcon} onPress={onOpenSettings}>
          <Text style={darkMode && styles.navIconDark}>Settings ⚙️</Text>
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
  topNavDark: {
    backgroundColor: '#1E293B',
    borderBottomColor: '#334155',
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
  navTitleDark: {
    color: '#F9FAFB',
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
  navIconDark: {
    color: '#131e19',
    fontSize: 18,
  },
});
