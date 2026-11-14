import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Rect, G, Text as SvgText } from 'react-native-svg';

export interface ClientHomeOfflineScreenProps {
  siteName?: string;
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onOpenNotifications?: () => void;
  onOpenSiteSwitcher?: () => void;
  onOpenSavings?: () => void;
  onReconnect?: () => void;
}

export const ClientHomeOfflineScreen: React.FC<ClientHomeOfflineScreenProps> = ({
  siteName = 'Main Residence',
  onSwitchTab,
  onOpenNotifications,
  onOpenSiteSwitcher,
  onOpenSavings,
  onReconnect,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      Alert.alert(
        'System Reconnected',
        'Telemetry feed re-established. Real-time solar power generation is now live.',
        [
          {
            text: 'View Live Data',
            onPress: () => {
              if (onReconnect) {
                onReconnect();
              } else if (onSwitchTab) {
                onSwitchTab('home');
              }
            },
          },
        ]
      );
    }, 1200);
  };

  const handleNotificationPress = () => {
    setHasUnreadNotification(false);
    if (onOpenNotifications) {
      onOpenNotifications();
    } else {
      Alert.alert(
        'System Offline Alert',
        'Main Residence datalogger stopped sending telemetry at 9:42 am today. The inverter is still operating locally on solar and battery storage.',
        [{ text: 'Dismiss' }]
      );
    }
  };

  const handleSiteSwitch = () => {
    if (onOpenSiteSwitcher) {
      onOpenSiteSwitcher();
    } else {
      Alert.alert('Switch Site', 'Select another registered site to view telemetry.');
    }
  };

  const handleTabPress = (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => {
    if (onSwitchTab) {
      onSwitchTab(tab);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.siteSelector}
              activeOpacity={0.75}
              onPress={handleSiteSwitch}
              accessibilityLabel="Switch site"
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </Svg>
              <Text style={styles.siteSelectorText}>{siteName}</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationButton}
              activeOpacity={0.75}
              onPress={handleNotificationPress}
              accessibilityLabel="Notifications"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </Svg>
              {hasUnreadNotification && <View style={styles.notificationDot} />}
            </TouchableOpacity>
          </View>

          {/* Offline Banner */}
          <View style={styles.offlineBanner}>
            <View style={styles.wifiOffIconBox}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M3 3l18 18M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </Svg>
            </View>
            <View style={styles.offlineBannerTextGroup}>
              <Text style={styles.offlineBannerTitle}>Your system is offline</Text>
              <Text style={styles.offlineBannerSubtitle}>
                Showing the last known values. Last data 2 h ago.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.retryButton}
              activeOpacity={0.75}
              onPress={handleRetry}
              disabled={isRetrying}
            >
              {isRetrying ? (
                <ActivityIndicator size="small" color="#b45309" />
              ) : (
                <Text style={styles.retryButtonText}>Retry</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Dark Hero Card */}
          <TouchableOpacity
            style={styles.heroCard}
            activeOpacity={0.9}
            onPress={onOpenSavings}
          >
            <LinearGradient
              colors={['#0f172a', '#1e293b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroHeader}>
                <Text style={styles.heroLabel}>SOLAR GENERATION</Text>
                <View style={styles.offlinePill}>
                  <View style={styles.offlineDot} />
                  <Text style={styles.offlinePillText}>Offline</Text>
                </View>
              </View>

              <View style={styles.heroValueGroup}>
                <Text style={styles.heroValue}>--</Text>
                <Text style={styles.heroUnit}>kW</Text>
              </View>

              <View style={styles.heroFooter}>
                <View style={styles.heroFooterColumn}>
                  <Text style={styles.heroFooterLabel}>Load</Text>
                  <Text style={styles.heroFooterValue}>
                    -- <Text style={styles.heroFooterUnit}>kW</Text>
                  </Text>
                </View>

                <View style={styles.heroFooterColumn}>
                  <Text style={styles.heroFooterLabel}>Battery</Text>
                  <View style={styles.batteryRow}>
                    <Text style={styles.heroFooterValue}>
                      --<Text style={styles.heroFooterUnit}>%</Text>
                    </Text>
                    <View style={styles.batteryTrack} />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Power Flow Card */}
          <View style={styles.powerFlowCard}>
            <Text style={styles.sectionHeading}>POWER FLOW</Text>

            <Svg viewBox="0 0 318 100" width="100%" height={100} style={styles.powerFlowSvg}>
              {/* Dashed Connector 1 (Solar to Home) */}
              <Line x1="68" y1="30" x2="132" y2="30" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
              <Path d="M126 24l7 6-7 6" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Dashed Connector 2 (Home to Battery) */}
              <Line x1="186" y1="30" x2="250" y2="30" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
              <Path d="M244 24l7 6-7 6" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Node 1: Solar */}
              <Circle cx="40" cy="30" r="26" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
              <G fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <Circle cx="40" cy="30" r="6" />
                <Path d="M40 17v3M40 40v3M27 30h3M50 30h3M30.8 20.8l2.1 2.1M47.1 37.1l2.1 2.1M49.2 20.8l-2.1 2.1M32.9 37.1l-2.1 2.1" />
              </G>

              {/* Node 2: Home */}
              <Circle cx="159" cy="30" r="26" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <G fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M148 31l11-10 11 10M151 29v11h5v-7h6v7h5V29" />
              </G>

              {/* Node 3: Battery */}
              <Circle cx="278" cy="30" r="26" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <G fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <Rect x="266" y="23" width="22" height="14" rx="2" />
                <Path d="M291 28v4" />
              </G>
              <Rect x="268.5" y="25.5" width="12" height="9" rx="1" fill="#cbd5e1" />

              {/* Node Labels */}
              <G textAnchor="middle">
                <SvgText x="40" y="76" fontSize="11" fill="#64748b" fontFamily="Inter-Medium">Solar</SvgText>
                <SvgText x="40" y="92" fontSize="13" fontWeight="700" fill="#0f172a" fontFamily="Inter-Bold">-- kW</SvgText>

                <SvgText x="159" y="76" fontSize="11" fill="#64748b" fontFamily="Inter-Medium">Home</SvgText>
                <SvgText x="159" y="92" fontSize="13" fontWeight="700" fill="#0f172a" fontFamily="Inter-Bold">-- kW</SvgText>

                <SvgText x="278" y="76" fontSize="11" fill="#64748b" fontFamily="Inter-Medium">Battery</SvgText>
                <SvgText x="278" y="92" fontSize="13" fontWeight="700" fill="#0f172a" fontFamily="Inter-Bold">-- kW</SvgText>
              </G>
            </Svg>
          </View>

          {/* Metrics Row: Today & Diesel Saved */}
          <View style={styles.metricsRow}>
            {/* Today */}
            <TouchableOpacity
              style={styles.metricCard}
              activeOpacity={0.8}
              onPress={onOpenSavings}
            >
              <Text style={styles.metricCardLabel}>TODAY</Text>
              <Text style={styles.metricCardValue}>
                18.4 <Text style={styles.metricCardUnit}>kWh</Text>
              </Text>
              <Text style={styles.metricCardSub}>Until 9:42 am</Text>
            </TouchableOpacity>

            {/* Diesel Saved */}
            <TouchableOpacity
              style={styles.metricCard}
              activeOpacity={0.8}
              onPress={onOpenSavings}
            >
              <Text style={styles.metricCardLabel}>DIESEL SAVED</Text>
              <Text style={styles.metricCardValue}>₦85,000</Text>
              <Text style={styles.metricCardSub}>This month</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Tab Bar Navigation */}
        <View style={styles.bottomNav}>
          {/* Home Tab (Active) */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('home')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </Svg>
            <Text style={styles.navLabelActive}>Home</Text>
          </TouchableOpacity>

          {/* Project Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('project')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </Svg>
            <Text style={styles.navLabelInactive}>Project</Text>
          </TouchableOpacity>

          {/* Support Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('support')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
            </Svg>
            <Text style={styles.navLabelInactive}>Support</Text>
          </TouchableOpacity>

          {/* Documents Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('documents')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </Svg>
            <Text style={styles.navLabelInactive}>Documents</Text>
          </TouchableOpacity>

          {/* More Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('more')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </Svg>
            <Text style={styles.navLabelInactive}>More</Text>
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
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  siteSelector: {
    height: 44,
    paddingHorizontal: 12,
    paddingRight: 14,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  siteSelectorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
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
  offlineBanner: {
    padding: 12,
    paddingLeft: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    backgroundColor: '#fffbeb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  wifiOffIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  offlineBannerTextGroup: {
    flex: 1,
  },
  offlineBannerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#b45309',
  },
  offlineBannerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#475569',
    marginTop: 1,
  },
  retryButton: {
    height: 40,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#fcd34d',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  retryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: '#b45309',
  },
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 14,
  },
  heroGradient: {
    padding: 20,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#cbd5e1',
  },
  offlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(251, 191, 36, 0.18)',
  },
  offlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#fbbf24',
  },
  offlinePillText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: '#fbbf24',
  },
  heroValueGroup: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  heroValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1.5,
    lineHeight: 52,
    color: '#ffffff',
  },
  heroUnit: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  heroFooter: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.14)',
    flexDirection: 'row',
  },
  heroFooterColumn: {
    flex: 1,
  },
  heroFooterLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#cbd5e1',
  },
  heroFooterValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 2,
  },
  heroFooterUnit: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  batteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  batteryTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  powerFlowCard: {
    padding: 16,
    paddingBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 14,
  },
  sectionHeading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  powerFlowSvg: {
    marginTop: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricCardLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  metricCardValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
    marginTop: 6,
  },
  metricCardUnit: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  metricCardSub: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  bottomNav: {
    height: 84,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 22,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabelInactive: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  navLabelActive: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    fontWeight: '700',
    color: '#EA580C',
  },
});
