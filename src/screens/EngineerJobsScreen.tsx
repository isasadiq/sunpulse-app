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
import Svg, { Path, Circle } from 'react-native-svg';

export interface EngineerJob {
  id: string;
  category: 'Installation' | 'Fault ticket' | 'Maintenance';
  roleTag: 'Leader' | 'Urgent' | 'Technician';
  title: string;
  subtitle: string;
  progressPercent?: number;
  notice?: {
    type: 'urgent' | 'normal';
    text: string;
  };
}

const JOBS_DATA: EngineerJob[] = [
  {
    id: 'job-1',
    category: 'Installation',
    roleTag: 'Leader',
    title: 'Main Residence',
    subtitle: 'Stage 3 of 5: Installation',
    progressPercent: 60,
  },
  {
    id: 'job-2',
    category: 'Fault ticket',
    roleTag: 'Urgent',
    title: 'Inverter error on display',
    subtitle: 'Kaduna Clinic · Ticket #1042',
    notice: {
      type: 'urgent',
      text: 'Respond by 11:30 am',
    },
  },
  {
    id: 'job-3',
    category: 'Maintenance',
    roleTag: 'Technician',
    title: 'Routine maintenance',
    subtitle: 'Northgate Factory · 5-point checklist',
    notice: {
      type: 'normal',
      text: 'Today, 2:00 pm',
    },
  },
];

const FILTERS = ['Today', 'This week', 'All'] as const;

export interface EngineerJobsScreenProps {
  jobs?: EngineerJob[];
  onOpenNotifications?: () => void;
  onSelectJob?: (job: EngineerJob) => void;
  onSwitchTab?: (tab: 'jobs' | 'tickets' | 'visits' | 'more') => void;
  onSwitchToClientMode?: () => void;
  onRefresh?: () => void;
}

export const EngineerJobsScreen: React.FC<EngineerJobsScreenProps> = ({
  jobs,
  onOpenNotifications,
  onSelectJob,
  onSwitchTab,
  onSwitchToClientMode,
  onRefresh,
}) => {
  const [activeFilter, setActiveFilter] = useState<'Today' | 'This week' | 'All'>('Today');
  const [activeTab, setActiveTab] = useState<'jobs' | 'tickets' | 'visits' | 'more'>('jobs');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const rawJobs = jobs ?? JOBS_DATA;
  const displayJobs = rawJobs;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
      Alert.alert('Synced', 'All 3 pending offline updates were successfully uploaded to the central SUNPULSE server.');
    }, 1200);
  };

  const handleTabPress = (tab: 'jobs' | 'tickets' | 'visits' | 'more') => {
    setActiveTab(tab);
    if (onSwitchTab) {
      onSwitchTab(tab);
    } else if (tab === 'more' && onSwitchToClientMode) {
      Alert.alert(
        'Engineer Menu',
        'Logged in as Field Engineer · Abubakar S.',
        [
          { text: 'Switch to Client View', onPress: onSwitchToClientMode },
          { text: 'Close', style: 'cancel' },
        ]
      );
    }
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
            <Text style={styles.headerTitle}>My jobs</Text>

            <TouchableOpacity
              style={styles.notificationButton}
              activeOpacity={0.75}
              onPress={onOpenNotifications}
              accessibilityLabel="Notifications"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </Svg>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Working Offline Banner */}
          {!isSynced ? (
            <View style={styles.offlineBanner}>
              <View style={styles.offlineIconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 3l18 18M8.288 8.288A6.75 6.75 0 006.75 18h10.5c.95 0 1.85-.2 2.66-.56M17.7 13.1A4.5 4.5 0 0012.3 7.5M2.25 15a4.5 4.5 0 013.1-4.28" />
                </Svg>
              </View>

              <View style={styles.offlineTextContainer}>
                <Text style={styles.offlineTitle}>Working offline</Text>
                <Text style={styles.offlineSubtitle}>3 updates will sync when 4G returns</Text>
              </View>

              <TouchableOpacity
                style={styles.syncButton}
                activeOpacity={0.8}
                onPress={handleSync}
                disabled={isSyncing}
              >
                <Text style={styles.syncButtonText}>
                  {isSyncing ? 'Syncing...' : 'Sync now'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.syncedBanner}>
              <View style={styles.syncedIconBox}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <Text style={styles.syncedText}>All changes synced with cloud</Text>
            </View>
          )}

          {/* Filter Pills */}
          <View style={styles.filtersRow}>
            {FILTERS.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  activeOpacity={0.8}
                  style={[
                    styles.filterPill,
                    isSelected ? styles.filterPillActive : styles.filterPillInactive,
                  ]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isSelected ? styles.filterTextActive : styles.filterTextInactive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Jobs List or Empty State */}
          {displayJobs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </Svg>
              </View>
              <Text style={styles.emptyTitle}>
                {activeFilter === 'Today' ? 'No jobs today' : activeFilter === 'This week' ? 'No jobs this week' : 'No jobs assigned'}
              </Text>
              <Text style={styles.emptySubtitle}>
                You have no jobs assigned. New jobs show up here as soon as management assigns them.
              </Text>
              <TouchableOpacity
                style={styles.emptyRefreshButton}
                activeOpacity={0.7}
                onPress={() => {
                  if (onRefresh) {
                    onRefresh();
                  } else {
                    Alert.alert('Refreshed', 'Checking for newly assigned jobs from management...');
                  }
                }}
              >
                <Text style={styles.emptyRefreshText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.jobsList}>
              {displayJobs.map((job) => (
              <TouchableOpacity
                key={job.id}
                style={styles.jobCard}
                activeOpacity={0.8}
                onPress={() => onSelectJob && onSelectJob(job)}
              >
                {/* Badges Row */}
                <View style={styles.badgesRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{job.category}</Text>
                  </View>

                  <View
                    style={[
                      styles.roleBadge,
                      job.roleTag === 'Urgent' || job.roleTag === 'Leader'
                        ? styles.roleBadgeRed
                        : styles.roleBadgeGray,
                    ]}
                  >
                    <Text
                      style={[
                        styles.roleBadgeText,
                        job.roleTag === 'Urgent' || job.roleTag === 'Leader'
                          ? styles.roleBadgeTextRed
                          : styles.roleBadgeTextGray,
                      ]}
                    >
                      {job.roleTag}
                    </Text>
                  </View>
                </View>

                {/* Job Title & Chevron */}
                <View style={styles.jobInfoRow}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobSubtitle}>{job.subtitle}</Text>
                  </View>

                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </Svg>
                </View>

                {/* Progress bar if present */}
                {job.progressPercent !== undefined && (
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${job.progressPercent}%` },
                      ]}
                    />
                  </View>
                )}

                {/* Notice row if present */}
                {job.notice && (
                  <View style={styles.noticeRow}>
                    <Svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={job.notice.type === 'urgent' ? '#b91c1c' : '#475569'}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <Circle cx={12} cy={12} r={9} />
                      <Path d="M12 7v5l3 2" />
                    </Svg>
                    <Text
                      style={[
                        styles.noticeText,
                        job.notice.type === 'urgent' ? styles.noticeUrgent : styles.noticeNormal,
                      ]}
                    >
                      {job.notice.text}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          {/* Jobs (Active) */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={() => handleTabPress('jobs')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'jobs' ? '#dc2626' : '#64748b'} strokeWidth={activeTab === 'jobs' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </Svg>
            <Text style={[styles.tabLabel, activeTab === 'jobs' && styles.tabLabelActive]}>Jobs</Text>
          </TouchableOpacity>

          {/* Tickets */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={() => handleTabPress('tickets')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'tickets' ? '#dc2626' : '#64748b'} strokeWidth={activeTab === 'tickets' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </Svg>
            <Text style={[styles.tabLabel, activeTab === 'tickets' && styles.tabLabelActive]}>Tickets</Text>
          </TouchableOpacity>

          {/* Visits */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={() => handleTabPress('visits')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'visits' ? '#dc2626' : '#64748b'} strokeWidth={activeTab === 'visits' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </Svg>
            <Text style={[styles.tabLabel, activeTab === 'visits' && styles.tabLabelActive]}>Visits</Text>
          </TouchableOpacity>

          {/* More */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={() => handleTabPress('more')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'more' ? '#dc2626' : '#64748b'} strokeWidth={activeTab === 'more' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </Svg>
            <Text style={[styles.tabLabel, activeTab === 'more' && styles.tabLabelActive]}>More</Text>
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
    paddingBottom: 96,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    borderRadius: 5,
    backgroundColor: '#dc2626',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  offlineBanner: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 16,
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
  syncButton: {
    height: 36,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400e',
  },
  syncedBanner: {
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  syncedIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#15803d',
  },
  filtersRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPillActive: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  filterPillInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  filterTextInactive: {
    color: '#334155',
  },
  jobsList: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 10,
  },
  jobCard: {
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
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  roleBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  roleBadgeRed: {
    backgroundColor: '#fef2f2',
  },
  roleBadgeGray: {
    backgroundColor: '#f1f5f9',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  roleBadgeTextRed: {
    color: '#b91c1c',
  },
  roleBadgeTextGray: {
    color: '#334155',
  },
  jobInfoRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  jobSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  progressBarBg: {
    marginTop: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#dc2626',
  },
  noticeRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noticeUrgent: {
    color: '#b91c1c',
  },
  noticeNormal: {
    color: '#475569',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 60,
    textAlign: 'center',
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    marginTop: 20,
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: '#020617',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    maxWidth: 290,
    fontSize: 14,
    lineHeight: 21,
    color: '#64748b',
    textAlign: 'center',
  },
  emptyRefreshButton: {
    marginTop: 20,
    height: 48,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  emptyRefreshText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    paddingTop: 8,
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
