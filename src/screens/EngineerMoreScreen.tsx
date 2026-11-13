import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface EngineerMoreScreenProps {
  engineerName?: string;
  engineerEmail?: string;
  pendingSyncCount?: number;
  onOpenSyncStatus?: () => void;
  onOpenNotifications?: () => void;
  onOpenSecurity?: () => void;
  onOpenHelp?: () => void;
  onSignOut?: () => void;
  onSwitchToClientMode?: () => void;
  onSwitchTab?: (tab: 'jobs' | 'tickets' | 'visits' | 'more') => void;
}

export const EngineerMoreScreen: React.FC<EngineerMoreScreenProps> = ({
  engineerName = 'Abubakar S.',
  engineerEmail = 'abubakar@sunpulse.ng',
  pendingSyncCount = 3,
  onOpenSyncStatus,
  onOpenNotifications,
  onOpenSecurity,
  onOpenHelp,
  onSignOut,
  onSwitchToClientMode,
  onSwitchTab,
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'tickets' | 'visits' | 'more'>('more');
  const [syncCount, setSyncCount] = useState(pendingSyncCount);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncCount(0);
      Alert.alert(
        'Offline Data Synced',
        'All pending telemetry readings, repair notes, and visit signoffs were successfully sent to SUNPULSE servers.'
      );
    }, 1200);
  };

  const handleTabPress = (tab: 'jobs' | 'tickets' | 'visits' | 'more') => {
    setActiveTab(tab);
    if (onSwitchTab) {
      onSwitchTab(tab);
    }
  };

  const handleSignOutPress = () => {
    Alert.alert(
      'Sign Out',
      'Choose an action:',
      [
        {
          text: 'Switch to Client View',
          onPress: () => {
            if (onSwitchToClientMode) {
              onSwitchToClientMode();
            }
          },
        },
        {
          text: 'Sign Out to Login',
          style: 'destructive',
          onPress: () => {
            if (onSignOut) {
              onSignOut();
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>More</Text>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>
                {engineerName.charAt(0).toUpperCase()}
              </Text>
            </LinearGradient>

            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{engineerName}</Text>
              <Text style={styles.profileEmail}>{engineerEmail}</Text>
            </View>

            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>Field engineer</Text>
            </View>
          </View>

          {/* Offline Banner */}
          {syncCount > 0 ? (
            <View style={styles.offlineBanner}>
              <View style={styles.offlineIconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M8.288 8.288A6.75 6.75 0 006.75 18h10.5c.95 0 1.85-.2 2.66-.56M17.7 13.1A4.5 4.5 0 0012.3 7.5M2.25 15a4.5 4.5 0 013.1-4.28"
                  />
                </Svg>
              </View>

              <View style={styles.offlineTextContainer}>
                <Text style={styles.offlineTitle}>Working offline</Text>
                <Text style={styles.offlineSubtitle}>
                  {syncCount} updates waiting to sync
                </Text>
              </View>

              <TouchableOpacity
                style={styles.syncNowButton}
                activeOpacity={0.75}
                onPress={handleSyncNow}
                disabled={isSyncing}
              >
                <Text style={styles.syncNowText}>
                  {isSyncing ? 'Syncing...' : 'Sync now'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.syncedBanner}>
              <View style={styles.syncedIconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={styles.offlineTextContainer}>
                <Text style={styles.syncedTitle}>All updates synced</Text>
                <Text style={styles.syncedSubtitle}>Up to date with SUNPULSE central servers</Text>
              </View>
            </View>
          )}

          {/* Navigation List Card */}
          <View style={styles.menuCard}>
            {/* Sync status */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={onOpenSyncStatus}
            >
              <View style={[styles.menuIconContainer, styles.menuIconSync]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </Svg>
              </View>

              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemTitle}>Sync status</Text>
                <Text style={styles.menuItemSubtitle}>See what is waiting to upload</Text>
              </View>

              {syncCount > 0 && (
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{syncCount}</Text>
                </View>
              )}

              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>

            {/* Notifications */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={onOpenNotifications}
            >
              <View style={[styles.menuIconContainer, styles.menuIconDefault]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </Svg>
              </View>

              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemTitle}>Notifications</Text>
              </View>

              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>

            {/* Security */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={onOpenSecurity}
            >
              <View style={[styles.menuIconContainer, styles.menuIconDefault]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </Svg>
              </View>

              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemTitle}>Security</Text>
              </View>

              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>

            {/* Help and support */}
            <TouchableOpacity
              style={[styles.menuItem, styles.menuItemLast]}
              activeOpacity={0.7}
              onPress={onOpenHelp}
            >
              <View style={[styles.menuIconContainer, styles.menuIconDefault]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </Svg>
              </View>

              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemTitle}>Help and support</Text>
              </View>

              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            activeOpacity={0.75}
            onPress={handleSignOutPress}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth={1.9}>
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </Svg>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.bottomNav}>
          {/* Jobs */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('jobs')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'jobs' ? '#dc2626' : '#64748b'}
              strokeWidth={activeTab === 'jobs' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'jobs' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              Jobs
            </Text>
          </TouchableOpacity>

          {/* Tickets */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('tickets')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'tickets' ? '#dc2626' : '#64748b'}
              strokeWidth={activeTab === 'tickets' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'tickets' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              Tickets
            </Text>
          </TouchableOpacity>

          {/* Visits */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('visits')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'visits' ? '#dc2626' : '#64748b'}
              strokeWidth={activeTab === 'visits' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'visits' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              Visits
            </Text>
          </TouchableOpacity>

          {/* More */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('more')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'more' ? '#dc2626' : '#64748b'}
              strokeWidth={activeTab === 'more' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'more' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              More
            </Text>
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
    backgroundColor: '#fafbfd',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.5,
  },
  profileCard: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarGradient: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileDetails: {
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
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  offlineBanner: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    backgroundColor: '#fffbeb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  offlineIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineTextContainer: {
    flex: 1,
  },
  offlineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#78350f',
  },
  offlineSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#92400e',
  },
  syncNowButton: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncNowText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400e',
  },
  syncedBanner: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    backgroundColor: '#f0fdf4',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  syncedIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#166534',
  },
  syncedSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#15803d',
  },
  menuCard: {
    marginTop: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    minHeight: 60,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconSync: {
    backgroundColor: '#fffbeb',
  },
  menuIconDefault: {
    backgroundColor: '#f1f5f9',
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  menuItemSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  countBadge: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 7,
    borderRadius: 11,
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: '#fde68a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
  },
  signOutButton: {
    marginTop: 14,
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fecaca',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOutText: {
    color: '#b91c1c',
    fontSize: 15,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 11,
  },
  navLabelActive: {
    color: '#dc2626',
    fontWeight: '700',
  },
  navLabelInactive: {
    color: '#64748b',
    fontWeight: '600',
  },
});
