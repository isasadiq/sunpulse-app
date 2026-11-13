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
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface EngineerSyncAllSyncedScreenProps {
  onBack?: () => void;
  onCheckAgain?: () => void;
}

interface RecentSyncedItem {
  id: string;
  type: 'photos' | 'note' | 'diagnostics' | 'checklist' | 'ticket';
  title: string;
  subtitle: string;
  time: string;
}

const RECENTLY_SYNCED: RecentSyncedItem[] = [
  {
    id: 's-1',
    type: 'photos',
    title: '3 photos',
    subtitle: 'Main Residence · Installation',
    time: 'Just now',
  },
  {
    id: 's-2',
    type: 'note',
    title: 'Progress note',
    subtitle: 'Main Residence · Installation',
    time: 'Just now',
  },
  {
    id: 's-3',
    type: 'diagnostics',
    title: 'Diagnostics readings',
    subtitle: 'Main Residence',
    time: 'Just now',
  },
  {
    id: 's-4',
    type: 'checklist',
    title: 'Maintenance checklist',
    subtitle: 'Northgate Factory',
    time: 'Yesterday',
  },
  {
    id: 's-5',
    type: 'ticket',
    title: 'Repair notes, ticket #1042',
    subtitle: 'Kaduna Clinic',
    time: '2 Oct',
  },
];

export const EngineerSyncAllSyncedScreen: React.FC<EngineerSyncAllSyncedScreenProps> = ({
  onBack,
  onCheckAgain,
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [lastSyncedText, setLastSyncedText] = useState('Connected. Last synced just now.');

  const handleCheckAgain = () => {
    if (onCheckAgain) {
      onCheckAgain();
      return;
    }
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setLastSyncedText('Connected. Last synced just now.');
      Alert.alert(
        'Up to Date',
        'All offline records, signatures, and media are safely synchronized with SUNPULSE cloud.',
        [{ text: 'OK' }]
      );
    }, 900);
  };

  const renderItemIcon = (type: RecentSyncedItem['type']) => {
    switch (type) {
      case 'photos':
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
          </Svg>
        );
      case 'note':
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </Svg>
        );
      case 'diagnostics':
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </Svg>
        );
      default:
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4.5 12.75l6 6 9-13.5" />
          </Svg>
        );
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

          {/* Success Banner Card */}
          <View style={styles.successCard}>
            <View style={styles.successTopRow}>
              <View style={styles.successBadge}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={styles.successTextGroup}>
                <Text style={styles.successTitle}>All synced</Text>
                <Text style={styles.successSubtitle}>{lastSyncedText}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkAgainButton}
              activeOpacity={0.75}
              onPress={handleCheckAgain}
              disabled={isChecking}
            >
              {isChecking ? (
                <ActivityIndicator size="small" color="#166534" />
              ) : (
                <Text style={styles.checkAgainText}>Check again</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Waiting to Upload Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>Waiting to upload</Text>
            <Text style={styles.sectionHeaderSub}>Nothing waiting</Text>
          </View>

          <View style={styles.dashedCard}>
            <Text style={styles.dashedCardText}>
              All your updates have been uploaded.
            </Text>
          </View>

          {/* Recently Synced Section */}
          <View style={styles.sectionHeaderRowSolo}>
            <Text style={styles.sectionHeaderTitle}>Recently synced</Text>
          </View>

          <View style={styles.listCard}>
            {RECENTLY_SYNCED.map((item, index) => {
              const isLast = index === RECENTLY_SYNCED.length - 1;
              return (
                <View
                  key={item.id}
                  style={[styles.listItem, !isLast && styles.listItemBorder]}
                >
                  <View style={styles.itemIconBadge}>
                    {renderItemIcon(item.type)}
                  </View>
                  <View style={styles.itemTextGroup}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Text style={styles.itemTime}>{item.time}</Text>
                </View>
              );
            })}
          </View>

          {/* Footer Info Notice */}
          <View style={styles.footerNote}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} style={styles.footerIcon}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.footerText}>
              Updates upload on their own whenever 4G or Wi-Fi is available.
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 28,
    color: '#020617',
  },
  successCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    backgroundColor: '#f0fdf4',
  },
  successTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  successBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTextGroup: {
    flex: 1,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: '#14532d',
  },
  successSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#166534',
    marginTop: 1,
  },
  checkAgainButton: {
    marginTop: 12,
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#86efac',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  checkAgainText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#166534',
  },
  sectionHeaderRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionHeaderRowSolo: {
    marginTop: 18,
    marginBottom: 6,
  },
  sectionHeaderTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  sectionHeaderSub: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
  },
  dashedCard: {
    padding: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedCardText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
  listCard: {
    paddingHorizontal: 16,
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
  itemIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextGroup: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  itemSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  itemTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
  },
  footerNote: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  footerIcon: {
    flexShrink: 0,
    marginTop: 2,
  },
  footerText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
