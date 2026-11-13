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
import { HomeSkeleton } from '../components/HomeSkeleton';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Defs,
  RadialGradient,
  LinearGradient as SvgLinearGradient,
  Stop,
  G,
  Text as SvgText,
} from 'react-native-svg';

interface ClientHomeScreenProps {
  onLogout?: () => void;
  onSwitchToPassport?: () => void;
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onOpenNotifications?: () => void;
  onOpenSiteSwitcher?: () => void;
  onOpenEnergySavings?: () => void;
  onConnectInverter?: () => void;
  connectedInverter?: { brand: string; serialNumber: string; siteName: string; capacityKva: string; batteryKwh: string } | null;
  siteName?: string;
  isLoading?: boolean;
}

export const ClientHomeScreen: React.FC<ClientHomeScreenProps> = ({
  onLogout,
  onSwitchToPassport,
  onSwitchTab,
  onOpenNotifications,
  onOpenSiteSwitcher,
  onOpenEnergySavings,
  onConnectInverter,
  connectedInverter,
  siteName = 'Main Residence',
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'project' | 'support' | 'documents' | 'more'>('home');
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
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
    setActiveTab(tab);
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
      'Switch Site / View',
      'Select a registered installation site or mode:',
      [
        { text: 'Sync Telemetry (Show Skeleton)', onPress: () => { setInternalLoading(true); setTimeout(() => setInternalLoading(false), 1500); } },
        { text: 'Switch to System Passport (No Live Data)', onPress: onSwitchToPassport },
        { text: 'Main Residence (Live Telemetry)', style: 'cancel' },
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
      'System Notifications',
      '• Battery bank reached 100% absorption at 1:15 PM.\n• Grid UPS transfer test passed (<4ms).\n• Estimated daily savings: ₦8,400.',
      [{ text: 'Dismiss' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Main Scrollable View */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#dc2626"
            colors={['#dc2626']}
          />
        }
      >
        {loading ? (
          <HomeSkeleton />
        ) : (
          <>
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

        {/* Connected Inverter Quick Bar */}
        <TouchableOpacity
          style={styles.inverterBar}
          activeOpacity={0.8}
          onPress={onConnectInverter}
        >
          <View style={styles.inverterBarLeft}>
            <View style={styles.inverterPulseDot} />
            <Text style={styles.inverterBarText}>
              {connectedInverter
                ? `${connectedInverter.brand} · ${connectedInverter.capacityKva} kVA (${connectedInverter.serialNumber})`
                : 'Connect Inverter Datalogger · Tap to Pair Hardware'}
            </Text>
          </View>
          <Text style={styles.inverterBarAction}>
            {connectedInverter ? 'Manage' : 'Connect ⚡'}
          </Text>
        </TouchableOpacity>

        {/* Hero Card: Solar Generation */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.9}
          onPress={onOpenEnergySavings}
          accessibilityLabel="View Energy and savings history"
        >
          {/* Subtle Crimson Radial Glow on Hero */}
          <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
            <Defs>
              <RadialGradient id="heroGlow" cx="100%" cy="0%" r="55%">
                <Stop offset="0%" stopColor="#dc2626" stopOpacity="0.35" />
                <Stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" rx={20} fill="url(#heroGlow)" />
          </Svg>

          <View style={styles.heroTopRow}>
            <Text style={styles.heroLabel}>Solar generation</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>

          <View style={styles.heroReadoutRow}>
            <Text style={styles.heroPrimaryVal}>3.2</Text>
            <Text style={styles.heroUnit}>kW</Text>
          </View>

          <View style={styles.heroBottomDivider}>
            {/* Load Column */}
            <View style={styles.heroMetricCol}>
              <Text style={styles.heroSubLabel}>Load</Text>
              <Text style={styles.heroMetricVal}>
                1.8 <Text style={styles.heroMetricUnit}>kW</Text>
              </Text>
            </View>

            {/* Battery Column */}
            <View style={styles.heroMetricCol}>
              <Text style={styles.heroSubLabel}>Battery</Text>
              <View style={styles.batteryRow}>
                <Text style={styles.heroMetricVal}>
                  78<Text style={styles.heroMetricUnit}>%</Text>
                </Text>
                <View style={styles.batteryTrack}>
                  <View style={[styles.batteryFill, { width: '78%' }]} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Power Flow Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Power flow</Text>
          <View style={styles.powerFlowContainer}>
            <Svg viewBox="0 0 318 100" width="100%" height={100} style={{ display: 'flex' }}>
              {/* Flow Line 1: Solar to Home */}
              <Line x1="68" y1="30" x2="132" y2="30" stroke="#dc2626" strokeWidth={2.5} strokeDasharray="5, 5" strokeLinecap="round" />
              <Path d="M126 24l7 6-7 6" fill="none" stroke="#dc2626" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

              {/* Flow Line 2: Home to Battery */}
              <Line x1="186" y1="30" x2="250" y2="30" stroke="#dc2626" strokeWidth={2.5} strokeDasharray="5, 5" strokeLinecap="round" />
              <Path d="M244 24l7 6-7 6" fill="none" stroke="#dc2626" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

              {/* Node 1: Solar */}
              <Circle cx="40" cy="30" r="26" fill="#fef2f2" stroke="#dc2626" strokeWidth={1.5} />
              <G fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Circle cx="40" cy="30" r="6" />
                <Path d="M40 17v3M40 40v3M27 30h3M50 30h3M30.8 20.8l2.1 2.1M47.1 37.1l2.1 2.1M49.2 20.8l-2.1 2.1M32.9 37.1l-2.1 2.1" />
              </G>

              {/* Node 2: Home */}
              <Circle cx="159" cy="30" r="26" fill="#ffffff" stroke="#334155" strokeWidth={1.5} />
              <G fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M148 31l11-10 11 10M151 29v11h5v-7h6v7h5V29" />
              </G>

              {/* Node 3: Battery */}
              <Circle cx="278" cy="30" r="26" fill="#ffffff" stroke="#334155" strokeWidth={1.5} />
              <G fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Rect x="266" y="23" width="22" height="14" rx={2} />
                <Path d="M291 28v4" />
              </G>
              <Rect x="268.5" y="25.5" width="12" height="9" rx={1} fill="#4ade80" />

              {/* Labels */}
              <G textAnchor="middle">
                <SvgText x="40" y="76" fontSize="11" fill="#64748b">Solar</SvgText>
                <SvgText x="40" y="92" fontSize="13" fontWeight="700" fill="#0f172a">3.2 kW</SvgText>

                <SvgText x="159" y="76" fontSize="11" fill="#64748b">Home</SvgText>
                <SvgText x="159" y="92" fontSize="13" fontWeight="700" fill="#0f172a">1.8 kW</SvgText>

                <SvgText x="278" y="76" fontSize="11" fill="#64748b">Battery</SvgText>
                <SvgText x="278" y="92" fontSize="13" fontWeight="700" fill="#0f172a">1.4 kW</SvgText>
              </G>
            </Svg>
          </View>
        </View>

        {/* Dual Cards Row: Today & Diesel Saved */}
        <View style={styles.metricsRow}>
          {/* Card 1: Today */}
          <View style={styles.metricCard}>
            <Text style={styles.cardHeader}>Today</Text>
            <Text style={styles.metricBigVal}>
              18.4 <Text style={styles.metricSubUnit}>kWh</Text>
            </Text>
            <Text style={styles.metricSubCaption}>Energy generated</Text>
          </View>

          {/* Card 2: Diesel Saved */}
          <TouchableOpacity
            style={styles.metricCard}
            activeOpacity={0.8}
            onPress={onOpenEnergySavings}
            accessibilityLabel="View diesel savings"
          >
            <Text style={styles.cardHeader}>Diesel saved</Text>
            <Text style={styles.metricBigVal}>₦85,000</Text>
            <Text style={styles.metricSubCaption}>This month</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Generation Chart Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={onOpenEnergySavings}
          accessibilityLabel="View energy history"
        >
          <View style={styles.chartHeaderRow}>
            <Text style={styles.cardHeader}>{"Today's generation"}</Text>
            <Text style={styles.chartUnitText}>kW</Text>
          </View>

          <Svg viewBox="0 0 318 70" width="100%" height={70} style={{ marginTop: 6 }}>
            <Defs>
              <SvgLinearGradient id="genfill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
                <Stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </SvgLinearGradient>
            </Defs>
            <Path
              d="M0 66 C40 66 60 52 100 28 C140 6 180 6 220 28 C260 52 280 66 318 66 L318 70 L0 70 Z"
              fill="url(#genfill)"
            />
            <Path
              d="M0 66 C40 66 60 52 100 28 C140 6 180 6 220 28 C260 52 280 66 318 66"
              fill="none"
              stroke="#dc2626"
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </Svg>

          <View style={styles.chartAxisRow}>
            <Text style={styles.axisLabel}>6am</Text>
            <Text style={styles.axisLabel}>9am</Text>
            <Text style={styles.axisLabel}>12pm</Text>
            <Text style={styles.axisLabel}>3pm</Text>
            <Text style={styles.axisLabel}>6pm</Text>
          </View>
        </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Fixed Bottom Tab Navigation Bar */}
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
    backgroundColor: '#fafbfd', // Exact background from ClientHome.dc.html
  },
  scrollContent: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 104, // Space for the fixed bottom tab bar
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inverterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 12,
  },
  inverterBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  inverterPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EA580C',
  },
  inverterBarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9A3412',
    flex: 1,
  },
  inverterBarAction: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C2410C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  siteButton: {
    height: 44,
    paddingHorizontal: 12,
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

  /* Hero Dark Card */
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4ade80',
  },
  liveText: {
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
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1.44, // -0.03em
    lineHeight: 52, // 1.1
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
  batteryRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  batteryTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#4ade80',
  },

  /* Standard White Card */
  card: {
    marginTop: 14,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  cardHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  powerFlowContainer: {
    marginTop: 8,
    alignItems: 'center',
  },

  /* Metrics Row (Today & Diesel Saved) */
  metricsRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
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
  metricBigVal: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48, // -0.02em
    color: '#020617',
  },
  metricSubUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  metricSubCaption: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },

  /* Today's Generation Chart */
  chartHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartUnitText: {
    fontSize: 12,
    color: '#64748b',
  },
  chartAxisRow: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  axisLabel: {
    fontSize: 11,
    color: '#64748b',
  },

  /* Fixed Bottom Tab Bar */
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

