import { StyleSheet,
   Text, TouchableOpacity, View } from 'react-native';
import { FeedTab } from '../../types/feed';

interface BottomNavigationProps {
  activeTab: FeedTab;
  compact: boolean;
  bottomInset: number;
  darkMode?: boolean;
  onTabChange: (tab: FeedTab) => void;
  onCreatePress: () => void;
}

export default function BottomNavigation({
  activeTab,
  compact,
  bottomInset,
  darkMode = false,
  onTabChange,
  onCreatePress,
}: BottomNavigationProps) {
  return (
    <View
      style={[
        styles.bottomNav,
        compact && styles.bottomNavCompact,
        darkMode && styles.bottomNavDark,
        { paddingBottom: Math.max(bottomInset, 8) },
      ]}
    >
      <TouchableOpacity style={styles.navItem} onPress={() => onTabChange('home')}>
        <Text style={[styles.navItemIcon, darkMode && styles.navItemIconDark, activeTab === 'home' && styles.navItemActive]}>🏠</Text>
        <Text style={[styles.navItemText, darkMode && styles.navItemTextDark, activeTab === 'home' && styles.navItemActiveText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => onTabChange('explore')}>
        <Text style={[styles.navItemIcon, darkMode && styles.navItemIconDark, activeTab === 'explore' && styles.navItemActive]}>🧭</Text>
        <Text style={[styles.navItemText, darkMode && styles.navItemTextDark, activeTab === 'explore' && styles.navItemActiveText]}>
          Explore
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.centerButton, compact && styles.centerButtonCompact]} onPress={onCreatePress}>
        <Text style={styles.centerButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => onTabChange('notifications')}>
        <Text style={[styles.navItemIcon, darkMode && styles.navItemIconDark, activeTab === 'notifications' && styles.navItemActive]}>🔔</Text>
        <Text style={[styles.navItemText, darkMode && styles.navItemTextDark, activeTab === 'notifications' && styles.navItemActiveText]}>
          Alerts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => onTabChange('profile')}>
        <Text style={[styles.navItemIcon, darkMode && styles.navItemIconDark, activeTab === 'profile' && styles.navItemActive]}>👤</Text>
        <Text style={[styles.navItemText, darkMode && styles.navItemTextDark, activeTab === 'profile' && styles.navItemActiveText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 6,
    minHeight: 60,
  },
  bottomNavCompact: {
    minHeight: 56,
  },
  bottomNavDark: {
    backgroundColor: '#1E293B',
    borderTopColor: '#334155',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  navItemIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  navItemIconDark: {
    color: '#E2E8F0',
  },
  navItemText: {
    fontSize: 10,
    color: '#6B7280',
  },
  navItemTextDark: {
    color: '#CBD5E1',
  },
  navItemActive: {
    color: '#006B3F',
  },
  navItemActiveText: {
    color: '#006B3F',
    fontWeight: '600',
    fontSize: 14,
  },
  centerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#006B3F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
  },
  centerButtonCompact: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: -18,
  },
  centerButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
});
