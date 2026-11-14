import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MoreSkeleton } from '../components/MoreSkeleton';
import Svg, {
  Path,
  Rect,
  Line,
} from 'react-native-svg';

interface ClientMoreScreenProps {
  siteName?: string;
  clientName?: string;
  clientEmail?: string;
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onLogout?: () => void;
  onOpenCalculator?: () => void;
  onOpenSecurity?: () => void;
  onOpenHelp?: () => void;
  onOpenNotifications?: () => void;
  onOpenNotificationSettings?: () => void;
  onOpenSiteSwitcher?: () => void;
  onOpenEngineerPortal?: () => void;
  onOpenConnectInverter?: () => void;
  onEditProfile?: () => void;
  isLoading?: boolean;
}

export const ClientMoreScreen: React.FC<ClientMoreScreenProps> = ({
  siteName = 'Main Residence',
  clientName = 'Client Name',
  clientEmail = 'name@example.com',
  onSwitchTab,
  onLogout,
  onOpenCalculator,
  onOpenSecurity,
  onOpenHelp,
  onOpenNotifications,
  onOpenNotificationSettings,
  onOpenSiteSwitcher,
  onOpenEngineerPortal,
  onOpenConnectInverter,
  onEditProfile,
  isLoading,
}) => {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [selectedSite, setSelectedSite] = useState(siteName);
  const [internalLoading, setInternalLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loading = isLoading !== undefined ? isLoading : internalLoading;

  useEffect(() => {
    if (isLoading === undefined) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleRefresh = () => {
    setRefreshing(true);
    setInternalLoading(true);
    setTimeout(() => {
      setInternalLoading(false);
      setRefreshing(false);
    }, 1200);
  };

  const handleTabPress = (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => {
    if (onSwitchTab) {
      onSwitchTab(tab);
    }
  };

  const handleSiteSwitch = () => {
    if (onOpenSiteSwitcher) {
      onOpenSiteSwitcher();
      return;
    }
    Alert.alert(
      'Switch Installation Site',
      'Select a registered site to manage settings:',
      [
        {
          text: 'Sync Settings (Show Skeleton)',
          onPress: () => {
            setInternalLoading(true);
            setTimeout(() => setInternalLoading(false), 1500);
          },
        },
        {
          text: 'Main Residence (Active)',
          onPress: () => setSelectedSite('Main Residence'),
        },
        {
          text: 'Victoria Island Penthouse',
          onPress: () => setSelectedSite('Victoria Island Penthouse'),
        },
        {
          text: 'Abuja Factory Mini-grid',
          onPress: () => setSelectedSite('Abuja Factory Mini-grid'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleNotificationPress = () => {
    setHasUnreadNotification(false);
    if (onOpenNotifications) {
      onOpenNotifications();
    } else {
      Alert.alert(
        'System Notifications',
        '• Your solar array generated 28.4 kWh yesterday.\n• Next quarterly preventative maintenance scheduled for Dec 15.',
        [{ text: 'Dismiss' }]
      );
    }
  };

  const handleNotificationSettingsPress = () => {
    if (onOpenNotificationSettings) {
      onOpenNotificationSettings();
    } else if (onOpenNotifications) {
      onOpenNotifications();
    }
  };

  const handleCalculatorPress = () => {
    if (onOpenCalculator) {
      onOpenCalculator();
    } else {
      Alert.alert(
        'Expansion & ROI Calculator',
        'Model the addition of extra solar panels, lithium storage, or high-load appliances (ACs, pumps). Request an instant engineering proposal from SUNPULSE.',
        [{ text: 'Close' }]
      );
    }
  };

  const handleSecurityPress = () => {
    if (onOpenSecurity) {
      onOpenSecurity();
    } else {
      Alert.alert(
        'Security & Access',
        '• Biometric Face ID / Fingerprint enabled\n• Two-factor verification active\n• Password last updated 14 days ago',
        [{ text: 'Manage' }, { text: 'Done', style: 'cancel' }]
      );
    }
  };

  const handleHelpPress = () => {
    if (onOpenHelp) {
      onOpenHelp();
    } else if (onSwitchTab) {
      onSwitchTab('support');
    } else {
      Alert.alert(
        'Help and Support',
        'SUNPULSE Engineering Desk: 24/7 Hotline: +234 800 SUNPULSE\nEmail: support@sunpulse.ng',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSignOutPress = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your SUNPULSE solar telemetry account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: onLogout,
        },
      ]
    );
  };

  const clientInitial = clientName ? clientName.charAt(0).toUpperCase() : 'C';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#EA580C"
              colors={['#EA580C']}
            />
          }
        >
          {loading ? (
            <MoreSkeleton />
          ) : (
            <>
              {/* Header: Site Switcher + Notifications */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.siteSelector}
              activeOpacity={0.75}
              onPress={handleSiteSwitch}
              accessibilityLabel="Switch site"
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  stroke="#EA580C"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.siteSelectorText}>{selectedSite}</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationButton}
              activeOpacity={0.75}
              onPress={handleNotificationPress}
              accessibilityLabel="Notifications"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  stroke="#334155"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              {hasUnreadNotification && <View style={styles.notificationDot} />}
            </TouchableOpacity>
          </View>

          {/* User Profile Card */}
          <TouchableOpacity
            style={styles.profileCard}
            activeOpacity={0.75}
            onPress={onEditProfile}
            accessibilityLabel="Edit profile"
          >
            <LinearGradient
              colors={['#EA580C', '#C2410C']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.avatarBadge}
            >
              <Text style={styles.avatarInitial}>{clientInitial}</Text>
            </LinearGradient>
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>{clientName}</Text>
              <Text style={styles.profileEmail}>{clientEmail}</Text>
            </View>
          </TouchableOpacity>

          {/* Expansion & ROI Calculator Promo Card */}
          <TouchableOpacity
            style={styles.calculatorCard}
            activeOpacity={0.8}
            onPress={handleCalculatorPress}
          >
            <View style={styles.calculatorIconBadge}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Rect x={4} y={2} width={16} height={20} rx={2} stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                <Line x1={8} y1={6} x2={16} y2={6} stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                <Line x1={16} y1={14} x2={16} y2={18} stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
            <View style={styles.calculatorTextContainer}>
              <Text style={styles.calculatorTitle}>Expansion and ROI calculator</Text>
              <Text style={styles.calculatorSub}>
                Add appliances or batteries and request an upgrade quote.
              </Text>
            </View>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                stroke="#64748b"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Settings Options Group */}
          <View style={styles.settingsGroup}>
            {/* Notifications */}
            <TouchableOpacity
              style={styles.settingsRow}
              activeOpacity={0.7}
              onPress={handleNotificationSettingsPress}
            >
              <View style={styles.settingsIconBadge}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.settingsLabel}>Notifications</Text>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Security */}
            <TouchableOpacity
              style={styles.settingsRow}
              activeOpacity={0.7}
              onPress={handleSecurityPress}
            >
              <View style={styles.settingsIconBadge}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.settingsLabel}>Security</Text>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Help and support */}
            <TouchableOpacity
              style={styles.settingsRow}
              activeOpacity={0.7}
              onPress={handleHelpPress}
            >
              <View style={styles.settingsIconBadge}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.settingsLabel}>Help and support</Text>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Connect / Manage Inverter */}
            {onOpenConnectInverter && (
              <TouchableOpacity
                style={styles.settingsRow}
                activeOpacity={0.7}
                onPress={onOpenConnectInverter}
              >
                <View style={[styles.settingsIconBadge, { backgroundColor: '#fff7ed' }]}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      stroke="#ea580c"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <Text style={[styles.settingsLabel, { color: '#0f172a', fontWeight: '600' }]}>
                  Connect / Pair Solar Inverter
                </Text>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    stroke="#ea580c"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            )}

            {/* Field Engineer Portal */}
            {onOpenEngineerPortal && (
              <TouchableOpacity
                style={[styles.settingsRow, styles.settingsRowLast]}
                activeOpacity={0.7}
                onPress={onOpenEngineerPortal}
              >
                <View style={[styles.settingsIconBadge, { backgroundColor: '#FFF7ED' }]}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                      stroke="#EA580C"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <Text style={[styles.settingsLabel, { color: '#EA580C', fontWeight: '600' }]}>
                  Engineer Portal (Field Jobs)
                </Text>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    stroke="#EA580C"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            )}
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            activeOpacity={0.8}
            onPress={handleSignOutPress}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                stroke="#C2410C"
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.signOutButtonText}>Sign out</Text>
          </TouchableOpacity>
            </>
          )}
        </ScrollView>

        {/* Bottom Tab Bar Navigation */}
        <View style={styles.bottomNav}>
          {/* Home Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('home')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelInactive}>Home</Text>
          </TouchableOpacity>

          {/* Project Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('project')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelInactive}>Project</Text>
          </TouchableOpacity>

          {/* Support Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('support')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelInactive}>Support</Text>
          </TouchableOpacity>

          {/* Documents Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('documents')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelInactive}>Documents</Text>
          </TouchableOpacity>

          {/* More Tab (Active) */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('more')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                stroke="#EA580C"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelActive}>More</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 104, // Space for fixed bottom nav
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  siteSelector: {
    height: 44,
    paddingLeft: 12,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  siteSelectorText: {
    fontFamily: 'System',
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#EA580C',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileCard: {
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    display: 'flex',
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
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarInitial: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileTextContainer: {
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
  calculatorCard: {
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  calculatorIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  calculatorTextContainer: {
    flex: 1,
  },
  calculatorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  calculatorSub: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16.8, // 1.4
    color: '#475569',
  },
  settingsGroup: {
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
  settingsRow: {
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingsRowLast: {
    borderBottomWidth: 0,
  },
  settingsIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  signOutButton: {
    marginTop: 14,
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOutButtonText: {
    fontFamily: 'System',
    fontSize: 15,
    fontWeight: '700',
    color: '#C2410C',
  },
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
    display: 'flex',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabelInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EA580C',
  },
});

