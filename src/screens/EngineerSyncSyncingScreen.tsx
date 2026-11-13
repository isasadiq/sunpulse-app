import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface EngineerSyncSyncingScreenProps {
  onBack?: () => void;
  onSyncFinished?: () => void;
}

export const EngineerSyncSyncingScreen: React.FC<EngineerSyncSyncingScreenProps> = ({
  onBack,
  onSyncFinished,
}) => {
  const [progressPercent, setProgressPercent] = useState(64);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onSyncFinished?.(), 500);
          return 100;
        }
        return prev + 6;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onSyncFinished]);

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
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={onBack}
              accessibilityLabel="Back to more"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sync status</Text>
          </View>

          {/* Syncing Now Card */}
          <View style={styles.syncCard}>
            <View style={styles.syncCardTopRow}>
              <View style={styles.syncIconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </Svg>
              </View>
              <View style={styles.syncCardTextGroup}>
                <Text style={styles.syncCardTitle}>Syncing now</Text>
                <Text style={styles.syncCardSubtitle}>Back online. Uploading your updates.</Text>
              </View>
              <Text style={styles.syncCardPercent}>{progressPercent}%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressTrack}>
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progressPercent}%` }]}
              />
            </View>
          </View>

          {/* Uploading Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>Uploading</Text>
            <Text style={styles.sectionHeaderSub}>
              {progressPercent >= 100 ? '3 of 3 done' : progressPercent >= 80 ? '2 of 3 done' : '1 of 3 done'}
            </Text>
          </View>

          <View style={styles.listCard}>
            {/* Item 1: Progress note */}
            <View style={[styles.listItem, styles.listItemBorder]}>
              <View style={[styles.itemIconBox, styles.greenIconBox]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </Svg>
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>Progress note</Text>
                <Text style={styles.itemSubtitle}>Main Residence · Installation</Text>
              </View>
              <Text style={styles.itemStatusDone}>Done</Text>
            </View>

            {/* Item 2: 3 photos */}
            <View style={[styles.listItem, styles.listItemBorder]}>
              <View style={[styles.itemIconBox, styles.redIconBox]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </Svg>
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>3 photos</Text>
                <Text style={styles.itemSubtitle}>Main Residence · Installation</Text>
              </View>
              <Text style={styles.itemStatusUploading}>
                {progressPercent >= 80 ? 'Done' : 'Uploading 2 of 3'}
              </Text>
            </View>

            {/* Item 3: Diagnostics readings */}
            <View style={styles.listItem}>
              <View style={[styles.itemIconBox, styles.amberIconBox]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </Svg>
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>Diagnostics readings</Text>
                <Text style={styles.itemSubtitle}>Main Residence</Text>
              </View>
              <Text style={styles.itemStatusWaiting}>
                {progressPercent >= 100 ? 'Done' : 'Waiting'}
              </Text>
            </View>
          </View>

          {/* Recently Synced Section */}
          <Text style={styles.recentlySyncedHeader}>RECENTLY SYNCED</Text>

          <View style={styles.listCard}>
            <View style={[styles.listItem, styles.listItemBorder]}>
              <View style={[styles.itemIconBox, styles.greenIconBox]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>Maintenance checklist</Text>
                <Text style={styles.itemSubtitle}>Northgate Factory</Text>
              </View>
              <Text style={styles.historyTimeText}>Yesterday</Text>
            </View>

            <View style={styles.listItem}>
              <View style={[styles.itemIconBox, styles.greenIconBox]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>Repair notes, ticket #1042</Text>
                <Text style={styles.itemSubtitle}>Kaduna Clinic</Text>
              </View>
              <Text style={styles.historyTimeText}>2 Oct</Text>
            </View>
          </View>

          {/* Footnote note */}
          <View style={styles.footnoteRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.footnoteText}>
              Updates stay safely on this phone until they finish uploading.
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
  },
  syncCard: {
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  syncCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  syncIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncCardTextGroup: {
    flex: 1,
  },
  syncCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  syncCardSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  syncCardPercent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  progressTrack: {
    marginTop: 12,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  sectionHeaderRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  sectionHeaderSub: {
    fontSize: 12,
    color: '#64748b',
  },
  listCard: {
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  listItem: {
    minHeight: 60,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  itemIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenIconBox: {
    backgroundColor: '#f0fdf4',
  },
  redIconBox: {
    backgroundColor: '#fef2f2',
  },
  amberIconBox: {
    backgroundColor: '#fffbeb',
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
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  itemStatusDone: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
  itemStatusUploading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
  itemStatusWaiting: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
  },
  recentlySyncedHeader: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  historyTimeText: {
    fontSize: 12,
    color: '#64748b',
  },
  footnoteRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  footnoteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
