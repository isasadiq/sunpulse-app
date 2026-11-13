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
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface PendingSyncItem {
  id: string;
  type: 'photos' | 'note' | 'diagnostics';
  title: string;
  subtitle: string;
  status: 'Waiting' | 'Synced';
}

const INITIAL_PENDING_ITEMS: PendingSyncItem[] = [
  {
    id: 'p-1',
    type: 'photos',
    title: '3 photos',
    subtitle: 'Main Residence · Installation',
    status: 'Waiting',
  },
  {
    id: 'p-2',
    type: 'note',
    title: 'Progress note',
    subtitle: 'Main Residence · Installation',
    status: 'Waiting',
  },
  {
    id: 'p-3',
    type: 'diagnostics',
    title: 'Diagnostics readings',
    subtitle: 'Main Residence',
    status: 'Waiting',
  },
];

export interface EngineerSyncStatusScreenProps {
  onBack?: () => void;
  onSyncComplete?: () => void;
  onStartSyncing?: () => void;
}

export const EngineerSyncStatusScreen: React.FC<EngineerSyncStatusScreenProps> = ({
  onBack,
  onSyncComplete,
  onStartSyncing,
}) => {
  const [pendingItems, setPendingItems] = useState<PendingSyncItem[]>(INITIAL_PENDING_ITEMS);
  const [syncedHistory, setSyncedHistory] = useState([
    {
      id: 'h-1',
      title: 'Maintenance checklist',
      subtitle: 'Northgate Factory',
      time: 'Yesterday',
    },
    {
      id: 'h-2',
      title: 'Repair notes, ticket #1042',
      subtitle: 'Kaduna Clinic',
      time: '2 Oct',
    },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOffline, setIsOffline] = useState(true);

  const handleTrySync = () => {
    if (onStartSyncing) {
      onStartSyncing();
      return;
    }
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsOffline(false);
      // Move pending items to synced history
      setSyncedHistory((prev) => [
        {
          id: 'h-now',
          title: '3 offline updates (photos, note, readings)',
          subtitle: 'Main Residence',
          time: 'Just now',
        },
        ...prev,
      ]);
      setPendingItems([]);
      Alert.alert(
        'Sync Successful',
        'Connection re-established. All 3 pending updates have been securely transferred to the SUNPULSE database.'
      );
      if (onSyncComplete) {
        onSyncComplete();
      }
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={onBack}
              accessibilityLabel="Back to more"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Sync status</Text>
          </View>

          {/* Connection Status Banner */}
          {isOffline ? (
            <View style={styles.offlineCard}>
              <View style={styles.offlineHeaderRow}>
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
                  <Text style={styles.offlineSubtitle}>No 4G or Wi-Fi connection</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.trySyncButton}
                activeOpacity={0.75}
                onPress={handleTrySync}
                disabled={isSyncing}
              >
                <Text style={styles.trySyncButtonText}>
                  {isSyncing ? 'Connecting to network...' : 'Try to sync now'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.onlineCard}>
              <View style={styles.onlineHeaderRow}>
                <View style={styles.onlineIconBox}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </Svg>
                </View>
                <View style={styles.offlineTextContainer}>
                  <Text style={styles.onlineTitle}>Connected & Synced</Text>
                  <Text style={styles.onlineSubtitle}>4G connection active · Central database updated</Text>
                </View>
              </View>
            </View>
          )}

          {/* Waiting to upload section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>WAITING TO UPLOAD</Text>
            <Text style={styles.sectionCountText}>
              {pendingItems.length} {pendingItems.length === 1 ? 'update' : 'updates'}
            </Text>
          </View>

          <View style={styles.listCard}>
            {pendingItems.map((item, index) => {
              const isLast = index === pendingItems.length - 1;
              return (
                <View
                  key={item.id}
                  style={[styles.itemRow, isLast && styles.itemRowLast]}
                >
                  <View style={styles.itemIconBox}>
                    {item.type === 'photos' ? (
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8}>
                        <Path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <Circle cx={12} cy={12.75} r={3.5} strokeLinecap="round" strokeLinejoin="round" />
                      </Svg>
                    ) : item.type === 'note' ? (
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8}>
                        <Path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </Svg>
                    ) : (
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8}>
                        <Path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                        />
                      </Svg>
                    )}
                  </View>

                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  </View>

                  <Text style={styles.waitingTag}>Waiting</Text>
                </View>
              );
            })}

            {pendingItems.length === 0 && (
              <View style={styles.emptyItemsContainer}>
                <Text style={styles.emptyItemsTitle}>No pending uploads</Text>
                <Text style={styles.emptyItemsSubtitle}>All offline changes are saved centrally.</Text>
              </View>
            )}
          </View>

          {/* Recently Synced Section */}
          <Text style={[styles.sectionHeading, styles.recentlySyncedHeading]}>
            RECENTLY SYNCED
          </Text>

          <View style={styles.listCard}>
            {syncedHistory.map((item, index) => {
              const isLast = index === syncedHistory.length - 1;
              return (
                <View
                  key={item.id}
                  style={[styles.itemRow, isLast && styles.itemRowLast]}
                >
                  <View style={styles.syncedIconBox}>
                    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </Svg>
                  </View>

                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  </View>

                  <Text style={styles.syncedTimeText}>{item.time}</Text>
                </View>
              );
            })}
          </View>

          {/* Footer Offline Info */}
          <View style={styles.footer}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.footerText}>
              Updates stay safely on this phone and upload on their own when 4G returns.
            </Text>
          </View>
        </ScrollView>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.4,
  },
  offlineCard: {
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    backgroundColor: '#fffbeb',
  },
  offlineHeaderRow: {
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
    fontSize: 15,
    fontWeight: '700',
    color: '#78350f',
  },
  offlineSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#92400e',
  },
  trySyncButton: {
    marginTop: 12,
    width: '100%',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trySyncButtonText: {
    color: '#92400e',
    fontSize: 14,
    fontWeight: '700',
  },
  onlineCard: {
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    backgroundColor: '#f0fdf4',
  },
  onlineHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  onlineIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#166534',
  },
  onlineSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#15803d',
  },
  sectionHeaderRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  sectionCountText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  listCard: {
    marginTop: 6,
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
  itemRow: {
    minHeight: 60,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemRowLast: {
    borderBottomWidth: 0,
  },
  itemIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fffbeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  itemSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  waitingTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
  },
  emptyItemsContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyItemsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  emptyItemsSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: '#94a3b8',
  },
  recentlySyncedHeading: {
    marginTop: 18,
  },
  syncedIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncedTimeText: {
    fontSize: 12,
    color: '#64748b',
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
