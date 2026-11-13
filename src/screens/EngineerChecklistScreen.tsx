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
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface ChecklistItem {
  id: string;
  title: string;
  checked: boolean;
}

const DEFAULT_CHECKS: ChecklistItem[] = [
  { id: 'check-1', title: 'Solar panels washed', checked: true },
  { id: 'check-2', title: 'Breaker torque checked', checked: true },
  { id: 'check-3', title: 'Battery (BMS) health checked', checked: false },
  { id: 'check-4', title: 'Inverter cleaned', checked: false },
  { id: 'check-5', title: 'Wiring and connections inspected', checked: false },
];

export interface EngineerChecklistScreenProps {
  siteName?: string;
  planName?: string;
  onBack?: () => void;
  onCompleteVisit?: () => void;
  onAddNoteOrPhoto?: () => void;
}

export const EngineerChecklistScreen: React.FC<EngineerChecklistScreenProps> = ({
  siteName = 'Northgate Factory',
  planName = '6-month plan',
  onBack,
  onCompleteVisit,
  onAddNoteOrPhoto,
}) => {
  const [checks, setChecks] = useState<ChecklistItem[]>(DEFAULT_CHECKS);

  const toggleCheck = (id: string) => {
    setChecks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const completedCount = checks.filter((c) => c.checked).length;
  const totalCount = checks.length;
  const isAllCompleted = completedCount === totalCount;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAddNoteOrPhoto = () => {
    if (onAddNoteOrPhoto) {
      onAddNoteOrPhoto();
    } else {
      Alert.alert(
        'Add Attachment',
        'Attach inspection photo or note for this visit checklist.',
        [
          { text: 'Take Photo', onPress: () => Alert.alert('Camera', 'Photo captured and attached to checklist.') },
          { text: 'Add Text Note', onPress: () => Alert.alert('Note', 'Inspection note recorded.') },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
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
              accessibilityLabel="Back to visits"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Maintenance checklist</Text>
              <Text style={styles.headerSubtitle}>
                {siteName} · {planName}
              </Text>
            </View>
          </View>

          {/* Progress Card */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeaderRow}>
              <Text style={styles.progressLabel}>CHECKS DONE</Text>
              <Text style={styles.progressFraction}>
                {completedCount} of {totalCount}
              </Text>
            </View>

            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
          </View>

          {/* Checklist Card */}
          <View style={styles.checklistCard}>
            {checks.map((item, index) => {
              const isLast = index === checks.length - 1;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.checklistItemRow,
                    isLast && styles.checklistItemRowLast,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => toggleCheck(item.id)}
                >
                  {item.checked ? (
                    <View style={styles.checkedBox}>
                      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.2}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </Svg>
                    </View>
                  ) : (
                    <View style={styles.uncheckedBox} />
                  )}

                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>
                      {item.checked ? 'Done' : 'Tap to confirm'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Add a note or photo button */}
          <TouchableOpacity
            style={styles.dashedButton}
            activeOpacity={0.75}
            onPress={handleAddNoteOrPhoto}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2.2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </Svg>
            <Text style={styles.dashedButtonText}>Add a note or photo</Text>
          </TouchableOpacity>

          {/* Bottom Action Area */}
          <View style={styles.bottomArea}>
            {isAllCompleted ? (
              <TouchableOpacity
                style={styles.completedButtonWrapper}
                activeOpacity={0.85}
                onPress={onCompleteVisit}
              >
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.completedButtonGradient}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.4}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </Svg>
                  <Text style={styles.completedButtonText}>Complete visit</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.disabledButton}>
                <Text style={styles.disabledButtonText}>
                  Finish all {totalCount} checks to complete the visit
                </Text>
              </View>
            )}

            <Text style={styles.bottomDisclaimer}>
              The visit is saved when you finish.
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
    paddingBottom: 32,
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
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  progressCard: {
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 4,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#cbd5e1',
  },
  progressFraction: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.4,
  },
  progressBarTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#dc2626',
  },
  checklistCard: {
    marginTop: 14,
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
  checklistItemRow: {
    minHeight: 64,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checklistItemRowLast: {
    borderBottomWidth: 0,
  },
  checkedBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#94a3b8',
    backgroundColor: 'transparent',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  itemSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  dashedButton: {
    marginTop: 12,
    height: 44,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#94a3b8',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dashedButtonText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomArea: {
    marginTop: 28,
    gap: 10,
  },
  disabledButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonText: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600',
  },
  completedButtonWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 3,
  },
  completedButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  completedButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  bottomDisclaimer: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
