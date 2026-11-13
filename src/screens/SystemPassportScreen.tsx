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
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';

interface SystemPassportScreenProps {
  onSwitchToLive?: () => void;
  onLogout?: () => void;
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onOpenNotifications?: () => void;
  onRequestDatalogger?: () => void;
  siteName?: string;
  inverterModel?: string;
}

export const SystemPassportScreen: React.FC<SystemPassportScreenProps> = ({
  onSwitchToLive,
  onLogout,
  onSwitchTab,
  onOpenNotifications,
  onRequestDatalogger,
  siteName = 'Main Residence',
  inverterModel = 'Deye SUN-6K (6 kW Hybrid)',
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'project' | 'support' | 'documents' | 'more'>('home');
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const handleTabPress = (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => {
    setActiveTab(tab);
    if (tab === 'home' && onSwitchToLive) {
      onSwitchToLive();
      return;
    }
    if (onSwitchTab) {
      onSwitchTab(tab);
    }
  };

  const handleSiteSwitch = () => {
    Alert.alert(
      'Switch View / Site',
      'Select view mode or site:',
      [
        { text: 'Switch to Live Telemetry View', onPress: onSwitchToLive },
        { text: 'Main Residence (System Passport)', style: 'cancel' },
        { text: 'Victoria Island Penthouse', onPress: () => {} },
      ]
    );
  };

  const handleNotificationPress = () => {
    setHasUnreadNotification(false);
    if (onOpenNotifications) {
      onOpenNotifications();
      return;
    }
    Alert.alert(
      'System Passport Notice',
      '• Routine maintenance visit scheduled for November 2026.\n• Warranty active with 3 years 4 months remaining.',
      [{ text: 'Dismiss' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Site Switcher + Notifications */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.siteButton}
            onPress={handleSiteSwitch}
            accessibilityLabel="Switch site"
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </Svg>
            <Text style={styles.siteButtonText}>{siteName}</Text>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.notificationButton}
            onPress={handleNotificationPress}
            accessibilityLabel="Notifications"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </Svg>
            {hasUnreadNotification && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        </View>

        {/* Hero Card: Estimated Generation Today (Offline/Passport Mode) */}
        <View style={styles.heroCard}>
          <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
            <Defs>
              <RadialGradient id="passportHeroGlow" cx="100%" cy="0%" r="55%">
                <Stop offset="0%" stopColor="#dc2626" stopOpacity="0.35" />
                <Stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" rx={20} fill="url(#passportHeroGlow)" />
          </Svg>

          <View style={styles.heroTopRow}>
            <Text style={styles.heroLabel}>Estimated generation today</Text>
            <View style={styles.estimateBadge}>
              <Text style={styles.estimateText}>Estimate</Text>
            </View>
          </View>

          <View style={styles.heroReadoutRow}>
            <Text style={styles.heroPrimaryVal}>16.5</Text>
            <Text style={styles.heroUnit}>kWh</Text>
          </View>

          <View style={styles.heroBottomDivider}>
            {/* This month */}
            <View style={styles.heroMetricCol}>
              <Text style={styles.heroSubLabel}>This month</Text>
              <Text style={styles.heroMetricVal}>
                495 <Text style={styles.heroMetricUnit}>kWh</Text>
              </Text>
            </View>

            {/* System size */}
            <View style={styles.heroMetricCol}>
              <Text style={styles.heroSubLabel}>System size</Text>
              <Text style={styles.heroMetricVal}>
                5.5 <Text style={styles.heroMetricUnit}>kWp</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Warranty Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeader}>Warranty</Text>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>Active</Text>
            </View>
          </View>
          <Text style={styles.warrantyBigVal}>
            3 yr 4 mo <Text style={styles.warrantySubUnit}>left</Text>
          </Text>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '67%' }]} />
          </View>
          <Text style={styles.cardFooterSub}>Ends February 2030</Text>
        </View>

        {/* Installed Hardware Card */}
        <View style={styles.hardwareCard}>
          <Text style={styles.cardHeader}>Installed hardware</Text>
          <View style={styles.hardwareList}>
            <View style={styles.hardwareRow}>
              <Text style={styles.hardwareLabel}>Solar panels</Text>
              <Text style={styles.hardwareVal}>10 × 550 W</Text>
            </View>
            <View style={styles.hardwareRow}>
              <Text style={styles.hardwareLabel}>Inverter</Text>
              <Text style={styles.hardwareVal}>{inverterModel}</Text>
            </View>
            <View style={styles.hardwareRow}>
              <Text style={styles.hardwareLabel}>Battery</Text>
              <Text style={styles.hardwareVal}>10 kWh lithium</Text>
            </View>
            <View style={[styles.hardwareRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.hardwareLabel}>Installed</Text>
              <Text style={styles.hardwareVal}>March 2025</Text>
            </View>
          </View>
        </View>

        {/* Last Engineer Check-in Card */}
        <View style={styles.checkinCard}>
          <View style={styles.wrenchIconBox}>
            <Svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437" />
            </Svg>
          </View>
          <View style={styles.checkinCenter}>
            <Text style={styles.cardHeader}>Last engineer check-in</Text>
            <Text style={styles.checkinDate}>12 October 2026</Text>
          </View>
          <Text style={styles.checkinTag}>Routine visit</Text>
        </View>

        {/* Notice Box */}
        <View style={styles.noticeBox}>
          <Svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth={1.8}
            style={{ marginTop: 2, flexShrink: 0 }}
          >
            <Circle cx={12} cy={12} r={10} />
            <Line x1={12} y1={16} x2={12} y2={12} />
            <Line x1={12} y1={8} x2={12.01} y2={8} />
          </Svg>
          <Text style={styles.noticeText}>
            This system has no live monitoring. Figures are estimates based on the installed capacity.
          </Text>
        </View>

        {/* Upgrade to Live Monitoring Card */}
        <TouchableOpacity
          style={styles.upgradeCard}
          activeOpacity={0.85}
          onPress={onRequestDatalogger || onSwitchToLive}
        >
          <View style={styles.upgradeIconBox}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </Svg>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.upgradeTitle}>Add SUNPULSE 4G Smart Dongle</Text>
            <Text style={styles.upgradeSubtitle}>
              Compatible with Sungrow, Deye, Growatt, Felicity & Victron. Get real-time solar, load & battery telemetry.
            </Text>
          </View>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2.2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </Svg>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {/* Home */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => handleTabPress('home')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'home' ? '#dc2626' : '#64748b'} strokeWidth={activeTab === 'home' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>

        {/* Project */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => handleTabPress('project')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'project' ? '#dc2626' : '#64748b'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'project' && styles.tabLabelActive]}>Project</Text>
        </TouchableOpacity>

        {/* Support */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => handleTabPress('support')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'support' ? '#dc2626' : '#64748b'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'support' && styles.tabLabelActive]}>Support</Text>
        </TouchableOpacity>

        {/* Documents */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => handleTabPress('documents')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'documents' ? '#dc2626' : '#64748b'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'documents' && styles.tabLabelActive]}>Documents</Text>
        </TouchableOpacity>

        {/* More */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => handleTabPress('more')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'more' ? '#dc2626' : '#64748b'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'more' && styles.tabLabelActive]}>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfd', // Exact background from SystemPassport.dc.html
  },
  scrollContent: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 104, // Space above bottom tab bar
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  siteButton: {
    height: 44,
    paddingLeft: 12,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  siteButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 4.5,
    backgroundColor: '#dc2626',
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  /* Hero Card */
  heroCard: {
    marginTop: 18,
    position: 'relative',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#0f172a',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 6,
    overflow: 'hidden',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.96, // 0.08em
    textTransform: 'uppercase',
    color: '#cbd5e1',
  },
  estimateBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  estimateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  heroReadoutRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  heroPrimaryVal: {
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: -1.32, // -0.03em
    lineHeight: 48, // 1.1
    color: '#ffffff',
  },
  heroUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  heroBottomDivider: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.14)',
    flexDirection: 'row',
  },
  heroMetricCol: {
    flex: 1,
  },
  heroSubLabel: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  heroMetricVal: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  heroMetricUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
  },

  /* Standard Card */
  card: {
    marginTop: 14,
    paddingVertical: 14,
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  activePill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  activePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
  warrantyBigVal: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.44, // -0.02em
    color: '#020617',
  },
  warrantySubUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  progressBarTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#dc2626',
  },
  cardFooterSub: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748b',
  },

  /* Installed Hardware */
  hardwareCard: {
    marginTop: 14,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 4,
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
  hardwareList: {
    marginTop: 4,
  },
  hardwareRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  hardwareLabel: {
    fontSize: 14,
    color: '#475569',
  },
  hardwareVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  /* Last Engineer Check-in */
  checkinCard: {
    marginTop: 14,
    paddingVertical: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wrenchIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkinCenter: {
    flex: 1,
  },
  checkinDate: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  checkinTag: {
    fontSize: 12,
    color: '#64748b',
  },

  /* Notice Callout */
  noticeBox: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18, // 1.5
    color: '#64748b',
  },

  /* Upgrade to Live Monitoring Card */
  upgradeCard: {
    marginTop: 14,
    marginBottom: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  upgradeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#ffe4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9f1239',
  },
  upgradeSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 15,
    color: '#be123c',
    marginTop: 2,
  },

  /* Bottom Tab Bar */
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 22,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  tabLabelActive: {
    color: '#dc2626',
    fontWeight: '700',
  },
});

