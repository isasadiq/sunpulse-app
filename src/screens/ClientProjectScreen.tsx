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
import { ProjectSkeleton } from '../components/ProjectSkeleton';
import Svg, {
  Path,
  Circle,
  Rect,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';

interface ClientProjectScreenProps {
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onLogout?: () => void;
  onOpenNotifications?: () => void;
  onOpenSiteSwitcher?: () => void;
  onOpenSitePhotos?: () => void;
  siteName?: string;
  isLoading?: boolean;
}

export const ClientProjectScreen: React.FC<ClientProjectScreenProps> = ({
  onSwitchTab,
  onLogout,
  onOpenNotifications,
  onOpenSiteSwitcher,
  onOpenSitePhotos,
  siteName = 'Main Residence',
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'project' | 'support' | 'documents' | 'more'>('project');
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
        { text: 'Sync Project Telemetry (Show Skeleton)', onPress: () => { setLoading(true); setTimeout(() => setLoading(false), 1500); } },
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
      'Project Milestones',
      '• Installation stage is 60% complete.\n• Inverter room cabling finalized.\n• Commissioning scheduled for next week.',
      [{ text: 'Dismiss' }]
    );
  };

  const handleSeeAllPhotos = () => {
    if (onOpenSitePhotos) {
      onOpenSitePhotos();
      return;
    }
    Alert.alert(
      'Site Photos',
      'Viewing all 14 site progress and engineering photos for ' + siteName,
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
            tintColor="#EA580C"
            colors={['#EA580C']}
          />
        }
      >
        {loading ? (
          <ProjectSkeleton />
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
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
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

        {/* Installation Progress Dark Hero Card */}
        <View style={styles.heroCard}>
          <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
            <Defs>
              <RadialGradient id="projHeroGlow" cx="100%" cy="0%" r="55%">
                <Stop offset="0%" stopColor="#EA580C" stopOpacity="0.35" />
                <Stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" rx={20} fill="url(#projHeroGlow)" />
          </Svg>

          <View style={styles.heroTopRow}>
            <Text style={styles.heroLabel}>Installation progress</Text>
            <Text style={styles.heroPercentage}>60%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>

          <Text style={styles.heroStageSubtitle}>Stage 3 of 5: Installation</Text>
        </View>

        {/* Project Stages Stepper Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Project stages</Text>

          <View style={styles.stepperContainer}>
            {/* Stage 1: Survey (Completed) */}
            <View style={styles.stageItem}>
              <View style={styles.completedBadge}>
                <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={styles.activeConnector} />
              <View style={styles.stageInfo}>
                <View>
                  <Text style={styles.stageTitle}>Survey</Text>
                  <Text style={styles.stageDate}>Completed 3 Feb</Text>
                </View>
              </View>
            </View>

            {/* Stage 2: Procurement (Completed) */}
            <View style={styles.stageItem}>
              <View style={styles.completedBadge}>
                <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={styles.activeConnector} />
              <View style={styles.stageInfo}>
                <View>
                  <Text style={styles.stageTitle}>Procurement</Text>
                  <Text style={styles.stageDate}>Completed 20 Feb</Text>
                </View>
              </View>
            </View>

            {/* Stage 3: Installation (In progress) */}
            <View style={styles.stageItem}>
              <View style={styles.inProgressBadge}>
                <View style={styles.inProgressDot} />
              </View>
              <View style={styles.inactiveConnector} />
              <View style={styles.stageInfo}>
                <View>
                  <Text style={styles.stageTitle}>Installation</Text>
                  <Text style={styles.stageDate}>Started 4 Mar</Text>
                </View>
                <View style={styles.inProgressPill}>
                  <Text style={styles.inProgressPillText}>In progress</Text>
                </View>
              </View>
            </View>

            {/* Stage 4: Commissioning (Pending) */}
            <View style={styles.stageItem}>
              <View style={styles.pendingBadge} />
              <View style={styles.inactiveConnector} />
              <View style={styles.stageInfo}>
                <View>
                  <Text style={styles.pendingStageTitle}>Commissioning</Text>
                  <Text style={styles.stageDate}>Pending</Text>
                </View>
              </View>
            </View>

            {/* Stage 5: Handover (Pending) */}
            <View style={[styles.stageItem, { height: 40 }]}>
              <View style={styles.pendingBadge} />
              <View style={styles.stageInfo}>
                <View>
                  <Text style={styles.pendingStageTitle}>Handover</Text>
                  <Text style={styles.stageDate}>Pending</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Site Photos Section */}
        <View style={styles.photosSection}>
          <View style={styles.photosHeaderRow}>
            <Text style={styles.cardHeader}>Site photos</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={handleSeeAllPhotos}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.photosRow}>
            {/* Photo 1: Roof mounting */}
            <TouchableOpacity
              style={styles.photoItem}
              activeOpacity={0.8}
              onPress={handleSeeAllPhotos}
            >
              <LinearGradient
                colors={['#e2e8f0', '#f1f5f9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.photoBox}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </Svg>
              </LinearGradient>
              <Text style={styles.photoCaption}>Roof mounting</Text>
            </TouchableOpacity>

            {/* Photo 2: Panel layout */}
            <TouchableOpacity
              style={styles.photoItem}
              activeOpacity={0.8}
              onPress={handleSeeAllPhotos}
            >
              <LinearGradient
                colors={['#f1f5f9', '#e2e8f0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.photoBox}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </Svg>
              </LinearGradient>
              <Text style={styles.photoCaption}>Panel layout</Text>
            </TouchableOpacity>

            {/* Photo 3: Inverter room */}
            <TouchableOpacity
              style={styles.photoItem}
              activeOpacity={0.8}
              onPress={handleSeeAllPhotos}
            >
              <LinearGradient
                colors={['#e2e8f0', '#f8fafc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.photoBox}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </Svg>
              </LinearGradient>
              <Text style={styles.photoCaption}>Inverter room</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'home' ? '#EA580C' : '#64748b'} strokeWidth={activeTab === 'home' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>

        {/* Project (Active) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabItem}
          onPress={() => handleTabPress('project')}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'project' ? '#EA580C' : '#64748b'} strokeWidth={activeTab === 'project' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
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
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'support' ? '#EA580C' : '#64748b'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
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
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'documents' ? '#EA580C' : '#64748b'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
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
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'more' ? '#EA580C' : '#64748b'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
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
    backgroundColor: '#fafbfd', // Exact background from ClientProject.dc.html
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
    backgroundColor: '#EA580C',
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  /* Hero Card */
  heroCard: {
    marginTop: 18,
    position: 'relative',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
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
  heroPercentage: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48, // -0.02em
    color: '#ffffff',
  },
  progressTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#EA580C',
  },
  heroStageSubtitle: {
    marginTop: 8,
    fontSize: 13,
    color: '#cbd5e1',
  },

  /* Card */
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

  /* Stepper */
  stepperContainer: {
    marginTop: 14,
  },
  stageItem: {
    position: 'relative',
    height: 52,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inProgressBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EA580C',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inProgressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EA580C',
  },
  pendingBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  activeConnector: {
    position: 'absolute',
    left: 11,
    top: 26,
    width: 2,
    height: 26,
    backgroundColor: '#EA580C',
  },
  inactiveConnector: {
    position: 'absolute',
    left: 11,
    top: 26,
    width: 2,
    height: 26,
    backgroundColor: '#e2e8f0',
  },
  stageInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  pendingStageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  stageDate: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  inProgressPill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#FFF7ED',
  },
  inProgressPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C2410C',
  },

  /* Photos Section */
  photosSection: {
    marginTop: 14,
  },
  photosHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EA580C',
  },
  photosRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
  photoItem: {
    flex: 1,
  },
  photoBox: {
    height: 84,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCaption: {
    marginTop: 4,
    fontSize: 11,
    color: '#64748b',
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
    color: '#EA580C',
    fontWeight: '700',
  },
});

