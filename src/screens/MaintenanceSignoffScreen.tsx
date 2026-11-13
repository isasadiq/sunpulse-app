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

interface MaintenanceSignoffScreenProps {
  siteName?: string;
  visitDate?: string;
  onBack?: () => void;
  onConfirmSignOff?: () => void;
}

const CHECKLIST_ITEMS = [
  'Solar panels washed',
  'Breaker torque checked',
  'Battery (BMS) health checked',
  'Inverter cleaned',
  'Wiring and connections inspected',
];

export const MaintenanceSignoffScreen: React.FC<MaintenanceSignoffScreenProps> = ({
  siteName = 'Main Residence',
  visitDate = '28 Sep',
  onBack,
  onConfirmSignOff,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    if (!isConfirmed) {
      Alert.alert(
        'Confirmation Required',
        'Please tick the confirmation checkbox to certify that the maintenance visit was completed.'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onConfirmSignOff) {
        onConfirmSignOff();
      } else if (onBack) {
        onBack();
      }
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header: Back Button + Title */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={onBack}
              accessibilityLabel="Back to support"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Maintenance sign-off</Text>
          </View>

          {/* Routine Maintenance Visit Overview Card */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewBadge}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437" />
              </Svg>
            </View>
            <View style={styles.overviewTextContainer}>
              <Text style={styles.overviewTitle}>Routine maintenance</Text>
              <Text style={styles.overviewSub}>{siteName} · Visit on {visitDate}</Text>
            </View>
          </View>

          {/* "WHAT WAS DONE" Checklist Card */}
          <View style={styles.checklistCard}>
            <Text style={styles.checklistHeader}>What was done</Text>

            <View style={styles.checklistGroup}>
              {CHECKLIST_ITEMS.map((item, index) => {
                const isLast = index === CHECKLIST_ITEMS.length - 1;
                return (
                  <View
                    key={item}
                    style={[
                      styles.checklistItemRow,
                      !isLast && styles.checklistItemBorder,
                    ]}
                  >
                    <View style={styles.itemCheckCircle}>
                      <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M4.5 12.75l6 6 9-13.5" />
                      </Svg>
                    </View>
                    <Text style={styles.itemCheckText}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Interactive Confirmation Checkbox */}
          <TouchableOpacity
            style={styles.confirmRow}
            activeOpacity={0.8}
            onPress={() => setIsConfirmed(!isConfirmed)}
          >
            <View style={[styles.checkboxSquare, isConfirmed ? styles.checkboxSquareChecked : styles.checkboxSquareUnchecked]}>
              {isConfirmed && (
                <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              )}
            </View>
            <Text style={styles.confirmText}>
              I confirm the maintenance visit was completed.
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Action Button & Sign-off Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleConfirm}
            disabled={isSubmitting}
            style={[styles.confirmButtonWrapper, !isConfirmed && styles.confirmButtonDisabled]}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.confirmButtonGradient}
            >
              <Text style={styles.confirmButtonText}>
                {isSubmitting ? 'Confirming sign-off...' : 'Confirm sign-off'}
              </Text>
              {!isSubmitting && (
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </Svg>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerNote}>
            Your signature is saved with the visit record.
          </Text>
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

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48, // -0.02em
    lineHeight: 28.8, // 1.2
    color: '#020617',
  },

  /* Overview Card */
  overviewCard: {
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  overviewBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  overviewTextContainer: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  overviewSub: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },

  /* Checklist Card */
  checklistCard: {
    marginTop: 14,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 4,
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
  checklistHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  checklistGroup: {
    marginTop: 4,
  },
  checklistItemRow: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checklistItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  itemCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemCheckText: {
    fontSize: 14,
    color: '#0f172a',
  },

  /* Confirmation Row */
  confirmRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxSquareChecked: {
    backgroundColor: '#dc2626',
  },
  checkboxSquareUnchecked: {
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  confirmText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19.5, // 1.5
    color: '#475569',
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#fafbfd',
    flexDirection: 'column',
    gap: 10,
  },
  confirmButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonGradient: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
