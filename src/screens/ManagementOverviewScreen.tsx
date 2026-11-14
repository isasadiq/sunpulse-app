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

export interface ManagementOverviewScreenProps {
  onSwitchTab?: (tab: 'overview' | 'projects' | 'support' | 'leads' | 'more') => void;
  onOpenNotifications?: () => void;
  onViewAllAlerts?: () => void;
  onSelectAlert?: (alertType: string) => void;
}

export const ManagementOverviewScreen: React.FC<ManagementOverviewScreenProps> = ({
  onSwitchTab,
  onOpenNotifications,
  onViewAllAlerts,
  onSelectAlert,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTextGroup}>
              <Text style={styles.headerTitle}>Overview</Text>
              <Text style={styles.headerSubtitle}>Fleet of 24 sites · updated 2 min ago</Text>
            </View>
            <TouchableOpacity
              style={styles.notifButton}
              activeOpacity={0.75}
              onPress={onOpenNotifications}
              accessibilityLabel="Notifications"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </Svg>
              <View style={styles.unreadBadgeDot} />
            </TouchableOpacity>
          </View>

          {/* Fleet Generation Card */}
          <View style={styles.heroCard}>
            <LinearGradient
              colors={['rgba(234, 88, 12, 0.45)', 'transparent']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.3, y: 0.7 }}
              style={styles.heroGlowOverlay}
            />
            <View style={styles.heroTopRow}>
              <Text style={styles.heroLabel}>Fleet generation</Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>Live</Text>
              </View>
            </View>

            <View style={styles.heroMetricRow}>
              <Text style={styles.heroMetricNumber}>62.4</Text>
              <Text style={styles.heroMetricUnit}>kW</Text>
            </View>

            <View style={styles.heroSubStatsRow}>
              <View style={styles.subStatCol}>
                <Text style={styles.subStatLabel}>Live sites</Text>
                <Text style={styles.subStatValWhite}>18</Text>
              </View>
              <View style={styles.subStatCol}>
                <Text style={styles.subStatLabel}>Offline</Text>
                <Text style={styles.subStatValAmber}>2</Text>
              </View>
              <View style={styles.subStatCol}>
                <Text style={styles.subStatLabel}>Static passport</Text>
                <Text style={styles.subStatValWhite}>4</Text>
              </View>
            </View>
          </View>

          {/* Metric Cards Row */}
          <View style={styles.metricsRow}>
            {/* Open Tickets */}
            <View style={styles.metricCard}>
              <Text style={styles.metricCardLabel}>Open tickets</Text>
              <View style={styles.metricCardValueRow}>
                <Text style={styles.metricCardValue}>7</Text>
              </View>
              <Text style={styles.metricCardSub}>3 unassigned</Text>
            </View>

            {/* Avg Response */}
            <View style={styles.metricCard}>
              <Text style={styles.metricCardLabel}>Avg response</Text>
              <View style={styles.metricCardValueRow}>
                <Text style={styles.metricCardValue}>42</Text>
                <Text style={styles.metricCardUnit}>min</Text>
              </View>
              <Text style={styles.metricCardSub}>Last 7 days</Text>
            </View>
          </View>

          {/* Live Alerts Section */}
          <View style={styles.alertsCard}>
            <View style={styles.alertsHeader}>
              <Text style={styles.alertsTitle}>Live alerts</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onViewAllAlerts}
                style={styles.viewAllButton}
              >
                <Text style={styles.viewAllText}>View all</Text>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Alert 1 */}
            <TouchableOpacity
              style={styles.alertItem}
              activeOpacity={0.7}
              onPress={() => onSelectAlert?.('inverter_offline')}
            >
              <View style={[styles.alertIconBadge, styles.amberBadge]}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 3l18 18M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </Svg>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertItemTitle}>Inverter offline</Text>
                <Text style={styles.alertItemSub} numberOfLines={1}>Site 014 · Barnawa · no data for 25 min</Text>
              </View>
              <Text style={styles.alertTime}>12 min</Text>
            </TouchableOpacity>

            {/* Alert 2 */}
            <TouchableOpacity
              style={styles.alertItem}
              activeOpacity={0.7}
              onPress={() => onSelectAlert?.('ticket_not_assigned')}
            >
              <View style={[styles.alertIconBadge, styles.redBadge]}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </Svg>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertItemTitle}>Ticket not assigned</Text>
                <Text style={styles.alertItemSub} numberOfLines={1}>Site 009 · No power · waiting 18 min</Text>
              </View>
              <Text style={styles.alertTime}>18 min</Text>
            </TouchableOpacity>

            {/* Alert 3 */}
            <TouchableOpacity
              style={[styles.alertItem, styles.alertItemLast]}
              activeOpacity={0.7}
              onPress={() => onSelectAlert?.('battery_low')}
            >
              <View style={[styles.alertIconBadge, styles.redBadge]}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </Svg>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertItemTitle}>Battery below 20%</Text>
                <Text style={styles.alertItemSub} numberOfLines={1}>Site 003 · Ungwan Rimi · 14% charge</Text>
              </View>
              <Text style={styles.alertTime}>31 min</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('overview')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </Svg>
            <Text style={[styles.navText, styles.navTextActive]}>Overview</Text>
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
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </Svg>
            <Text style={styles.navText}>More</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.52, // -0.02em
    lineHeight: 31.2,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  notifButton: {
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
  unreadBadgeDot: {
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

  /* Fleet Generation Hero Card */
  heroCard: {
    marginTop: 16,
    position: 'relative',
    borderRadius: 20,
    padding: 18,
    paddingHorizontal: 20,
    backgroundColor: '#0f172a',
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 6,
  },
  heroGlowOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '60%',
    height: '100%',
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
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4ade80',
  },
  liveBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  heroMetricRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  heroMetricNumber: {
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: -1.3,
    lineHeight: 48,
    color: '#ffffff',
  },
  heroMetricUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  heroSubStatsRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
  },
  subStatCol: {
    flex: 1,
  },
  subStatLabel: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  subStatValWhite: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  subStatValAmber: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '700',
    color: '#fbbf24',
  },

  /* Metrics Row */
  metricsRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 14,
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
  metricCardLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  metricCardValueRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  metricCardValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48,
    color: '#020617',
  },
  metricCardUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  metricCardSub: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },

  /* Live Alerts Section */
  alertsCard: {
    marginTop: 12,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 6,
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
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  alertsTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  viewAllButton: {
    height: 36,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EA580C',
  },
  alertItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  alertItemLast: {
    borderBottomWidth: 0,
  },
  alertIconBadge: {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amberBadge: {
    backgroundColor: '#fffbeb',
  },
  redBadge: {
    backgroundColor: '#FFF7ED',
  },
  alertContent: {
    flex: 1,
    minWidth: 0,
  },
  alertItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  alertItemSub: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  alertTime: {
    flexShrink: 0,
    fontSize: 12,
    color: '#64748b',
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
    color: '#EA580C',
    fontWeight: '700',
  },
});
