import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface ManagementMoreScreenProps {
  managerName?: string;
  managerEmail?: string;
  onSwitchTab?: (tab: 'overview' | 'projects' | 'support' | 'leads' | 'more') => void;
  onProfile?: () => void;
  onNotificationSettings?: () => void;
  onSecurity?: () => void;
  onHelpSupport?: () => void;
  onSignOut?: () => void;
}

export const ManagementMoreScreen: React.FC<ManagementMoreScreenProps> = ({
  managerName = 'Manager Name',
  managerEmail = 'name@example.com',
  onSwitchTab,
  onProfile,
  onNotificationSettings,
  onSecurity,
  onHelpSupport,
  onSignOut,
}) => {
  const avatarLetter = (managerName || 'M').charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>More</Text>
          </View>

          {/* Manager Profile Card */}
          <TouchableOpacity
            style={styles.profileCard}
            activeOpacity={0.75}
            onPress={onProfile}
            accessibilityLabel="Edit profile"
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.avatarBadge}
            >
              <Text style={styles.avatarText}>{avatarLetter}</Text>
            </LinearGradient>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{managerName}</Text>
              <Text style={styles.profileEmail}>{managerEmail}</Text>
            </View>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>Management</Text>
            </View>
          </TouchableOpacity>

          {/* Menu Items Card */}
          <View style={styles.menuCard}>
            {/* Profile */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={onProfile}
            >
              <View style={styles.menuIconBox}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </Svg>
              </View>
              <View style={styles.menuItemTextCol}>
                <Text style={styles.menuItemTitle}>Profile</Text>
                <Text style={styles.menuItemSub}>Name, email and phone</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>

            {/* Notification settings */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={onNotificationSettings}
            >
              <View style={styles.menuIconBox}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </Svg>
              </View>
              <View style={styles.menuItemTextCol}>
                <Text style={styles.menuItemTitle}>Notification settings</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>

            {/* Security */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={onSecurity}
            >
              <View style={styles.menuIconBox}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </Svg>
              </View>
              <View style={styles.menuItemTextCol}>
                <Text style={styles.menuItemTitle}>Security</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>

            {/* Help and support */}
            <TouchableOpacity
              style={[styles.menuItem, styles.menuItemLast]}
              activeOpacity={0.7}
              onPress={onHelpSupport}
            >
              <View style={styles.menuIconBox}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </Svg>
              </View>
              <View style={styles.menuItemTextCol}>
                <Text style={styles.menuItemTitle}>Help and support</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            activeOpacity={0.75}
            onPress={onSignOut}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </Svg>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('overview')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </Svg>
            <Text style={styles.navText}>Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('projects')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </Svg>
            <Text style={styles.navText}>Projects</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('support')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
            </Svg>
            <Text style={styles.navText}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('leads')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
            </Svg>
            <Text style={styles.navText}>Leads</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('more')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </Svg>
            <Text style={[styles.navText, styles.navTextActive]}>More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fafbfd',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100, // Space for bottom nav
  },

  /* Header */
  header: {
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.56, // -0.02em
    lineHeight: 33.6,
    color: '#020617',
  },

  /* Profile Card */
  profileCard: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarBadge: {
    width: 52,
    height: 52,
    flexShrink: 0,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  profileEmail: {
    marginTop: 2,
    fontSize: 13,
    color: '#64748b',
  },
  roleBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },

  /* Menu Card */
  menuCard: {
    marginTop: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    minHeight: 60,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTextCol: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  menuItemSub: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },

  /* Sign Out Button */
  signOutButton: {
    marginTop: 14,
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#b91c1c',
  },

  /* Bottom Nav */
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    paddingTop: 8,
    paddingBottom: 22,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  navTextActive: {
    color: '#dc2626',
    fontWeight: '700',
  },
});
