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
import { SupportSkeleton } from '../components/SupportSkeleton';
import Svg, {
  Path,
  Circle,
  Rect,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';

interface ClientSupportScreenProps {
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onLogout?: () => void;
  onReportFault?: () => void;
  onOpenNotifications?: () => void;
  onOpenSiteSwitcher?: () => void;
  onOpenTicketTracking?: (ticketNumber?: string) => void;
  onOpenPastTickets?: () => void;
  onReviewSignOff?: () => void;
  isMaintenanceSignedOff?: boolean;
  siteName?: string;
  isLoading?: boolean;
}

export const ClientSupportScreen: React.FC<ClientSupportScreenProps> = ({
  onSwitchTab,
  onLogout,
  onReportFault,
  onOpenNotifications,
  onOpenSiteSwitcher,
  onOpenTicketTracking,
  onOpenPastTickets,
  onReviewSignOff,
  isMaintenanceSignedOff = false,
  siteName = 'Main Residence',
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'project' | 'support' | 'documents' | 'more'>('support');
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [loading, setLoading] = useState(isLoading ?? true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isLoading !== undefined) {
      setLoading(isLoading);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
      'Switch Site',
      'Select a registered installation site:',
      [
        { text: 'Sync Support Status (Show Skeleton)', onPress: () => { setLoading(true); setTimeout(() => setLoading(false), 1500); } },
        { text: 'Main Residence (Active)', style: 'cancel' },
        { text: 'Victoria Island Penthouse', onPress: () => {} },
        { text: 'Abuja Factory Mini-grid', onPress: () => {} },
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
      'Support Updates',
      '• Engineer David O. is 25 minutes away (Ticket #1042).\n• Maintenance sign-off pending for panel servicing.',
      [{ text: 'Dismiss' }]
    );
  };

  const handleReportFault = () => {
    if (onReportFault) {
      onReportFault();
      return;
    }
    Alert.alert(
      '24/7 Support Desk',
      'Choose the nature of the issue to report:',
      [
        { text: 'Inverter or Grid Error', onPress: () => Alert.alert('Ticket created', 'Support desk has logged your fault report.') },
        { text: 'Battery SoC / Voltage Anomaly', onPress: () => Alert.alert('Ticket created', 'Support desk has logged your fault report.') },
        { text: 'Physical / Solar Panel Issue', onPress: () => Alert.alert('Ticket created', 'Support desk has logged your fault report.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleReviewSignOff = () => {
    if (onReviewSignOff) {
      onReviewSignOff();
      return;
    }
    Alert.alert(
      'Sign Off Maintenance',
      'Confirm that the panel washing and routine servicing for Main Residence was completed satisfactorily?',
      [
        { text: 'Sign & Confirm', onPress: () => Alert.alert('Signed Off', 'Maintenance report has been logged and certified.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSeeAllTickets = () => {
    if (onOpenPastTickets) {
      onOpenPastTickets();
      return;
    }
    Alert.alert(
      'Past Tickets',
      '1. #1042: Inverter error on display (En route)\n2. #0987: Battery alarm (Resolved, 2 Oct)\n3. #0852: Grid surge check (Resolved, 14 Aug)',
      [{ text: 'Close' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
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
          <SupportSkeleton />
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

        {/* 24/7 Support Desk Crimson Hero Banner */}
        <LinearGradient
          colors={['#dc2626', '#b91c1c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroBannerLeft}>
            <Text style={styles.heroBannerTag}>24/7 support desk</Text>
            <Text style={styles.heroBannerTitle}>Something not working?</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.reportFaultBtn}
            onPress={handleReportFault}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M12 4.5v15m7.5-7.5h-15" />
            </Svg>
            <Text style={styles.reportFaultText}>Report fault</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Open Ticket Section */}
        <Text style={styles.sectionHeader}>Open ticket</Text>
        <TouchableOpacity
          style={styles.ticketCard}
          activeOpacity={0.8}
          onPress={() => onOpenTicketTracking && onOpenTicketTracking('#1042')}
        >
          <View style={styles.ticketTopRow}>
            <View>
              <Text style={styles.ticketTitle}>Inverter error on display</Text>
              <Text style={styles.ticketSub}>Ticket #1042 · Reported today, 9:12 am</Text>
            </View>
            <View style={styles.enRoutePill}>
              <Text style={styles.enRoutePillText}>En route</Text>
            </View>
          </View>

          {/* Horizontal Progress Stepper (4 steps) */}
          <View style={styles.stepperRow}>
            {/* Step 1: Reported */}
            <View style={styles.stepperCol}>
              <View style={styles.stepperTrack}>
                <View style={styles.lineTransparent} />
                <View style={styles.stepCompletedCircle}>
                  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M4.5 12.75l6 6 9-13.5" />
                  </Svg>
                </View>
                <View style={styles.lineRed} />
              </View>
              <Text style={styles.stepLabelDone}>Reported</Text>
            </View>

            {/* Step 2: Assigned */}
            <View style={styles.stepperCol}>
              <View style={styles.stepperTrack}>
                <View style={styles.lineRed} />
                <View style={styles.stepCompletedCircle}>
                  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M4.5 12.75l6 6 9-13.5" />
                  </Svg>
                </View>
                <View style={styles.lineRed} />
              </View>
              <Text style={styles.stepLabelDone}>Assigned</Text>
            </View>

            {/* Step 3: En route */}
            <View style={styles.stepperCol}>
              <View style={styles.stepperTrack}>
                <View style={styles.lineRed} />
                <View style={styles.stepActiveCircle}>
                  <View style={styles.stepActiveDot} />
                </View>
                <View style={styles.lineGray} />
              </View>
              <Text style={styles.stepLabelActive}>En route</Text>
            </View>

            {/* Step 4: Done */}
            <View style={styles.stepperCol}>
              <View style={styles.stepperTrack}>
                <View style={styles.lineGray} />
                <View style={styles.stepPendingCircle} />
                <View style={styles.lineTransparent} />
              </View>
              <Text style={styles.stepLabelPending}>Done</Text>
            </View>
          </View>

          {/* Engineer Dispatch Status Row */}
          <View style={styles.engineerRow}>
            <View style={styles.engineerAvatar}>
              <Text style={styles.engineerAvatarText}>E</Text>
            </View>
            <Text style={styles.engineerStatusText}>Your engineer is on the way</Text>
            <Text style={styles.engineerEta}>ETA 25 min</Text>
          </View>
        </TouchableOpacity>

        {/* Maintenance Visit Complete Card */}
        <View style={styles.maintenanceCard}>
          <View style={styles.maintenanceHeaderRow}>
            <View style={styles.checkIconBox}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.maintenanceTitle}>Maintenance visit complete</Text>
              <Text style={styles.maintenanceSub}>Panel washing and servicing</Text>
            </View>
          </View>

          {isMaintenanceSignedOff ? (
            <View style={styles.signedOffBadgeRow}>
              <View style={styles.signedOffIconCircle}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <Text style={styles.signedOffText}>Maintenance certified & signed off</Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.signOffButton}
              onPress={handleReviewSignOff}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </Svg>
              <Text style={styles.signOffButtonText}>Review and sign off</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Past Tickets Section */}
        <View style={styles.pastHeaderRow}>
          <Text style={styles.sectionHeaderInline}>Past tickets</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={handleSeeAllTickets}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.pastTicketCard}
          activeOpacity={0.7}
          onPress={handleSeeAllTickets}
        >
          <View>
            <Text style={styles.pastTicketTitle}>Battery alarm</Text>
            <Text style={styles.pastTicketSub}>Ticket #0987 · 2 Oct</Text>
          </View>
          <View style={styles.resolvedPill}>
            <Text style={styles.resolvedPillText}>Resolved</Text>
          </View>
        </TouchableOpacity>
          </>
        )}
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

        {/* Support (Active) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => handleTabPress('support')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'support' ? '#dc2626' : '#64748b'} strokeWidth={activeTab === 'support' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
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
    backgroundColor: '#fafbfd', // Exact background from ClientSupport.dc.html
  },
  scrollContent: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 104, // Space for fixed bottom tab bar
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

  /* Hero Banner */
  heroBanner: {
    marginTop: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  heroBannerLeft: {
    flex: 1,
  },
  heroBannerTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.32, // 0.12em
    textTransform: 'uppercase',
    color: '#fee2e2',
  },
  heroBannerTitle: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4, // -0.02em
    lineHeight: 24, // 1.2
    color: '#ffffff',
  },
  reportFaultBtn: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  reportFaultText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b91c1c',
  },

  /* Section Header */
  sectionHeader: {
    marginTop: 16,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  sectionHeaderInline: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },

  /* Open Ticket Card */
  ticketCard: {
    marginTop: 8,
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
  ticketTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  ticketSub: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },
  enRoutePill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fef2f2',
    flexShrink: 0,
  },
  enRoutePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },

  /* Stepper */
  stepperRow: {
    marginTop: 14,
    flexDirection: 'row',
  },
  stepperCol: {
    flex: 1,
    alignItems: 'center',
  },
  stepperTrack: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineTransparent: {
    flex: 1,
    height: 2,
    backgroundColor: 'transparent',
  },
  lineRed: {
    flex: 1,
    height: 2,
    backgroundColor: '#dc2626',
  },
  lineGray: {
    flex: 1,
    height: 2,
    backgroundColor: '#e2e8f0',
  },
  stepCompletedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActiveCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dc2626',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc2626',
  },
  stepPendingCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  stepLabelDone: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    color: '#0f172a',
    textAlign: 'center',
  },
  stepLabelActive: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  stepLabelPending: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
  },

  /* Engineer Dispatch */
  engineerRow: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  engineerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  engineerAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  engineerStatusText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
  },
  engineerEta: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },

  /* Maintenance Sign-off Card */
  maintenanceCard: {
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
  maintenanceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintenanceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  maintenanceSub: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  signOffButton: {
    marginTop: 12,
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#0f172a',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOffButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  signedOffBadgeRow: {
    marginTop: 12,
    width: '100%',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signedOffIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signedOffText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16a34a',
  },

  /* Past Tickets */
  pastHeaderRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },
  pastTicketCard: {
    marginTop: 8,
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
    justifyContent: 'space-between',
  },
  pastTicketTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  pastTicketSub: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  resolvedPill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  resolvedPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
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

