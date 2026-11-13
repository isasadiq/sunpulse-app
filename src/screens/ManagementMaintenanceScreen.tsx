import React, { useState, useMemo } from 'react';
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

export interface ManagementMaintenanceScreenProps {
  projectName?: string;
  initialTechnician?: string;
  onBack?: () => void;
  onCancel?: () => void;
  onEnrolSuccess?: (data: {
    frequency: '3 months' | '6 months' | '12 months';
    technician: string;
    plannedVisits: string[];
  }) => void;
}

const FREQUENCIES: ('3 months' | '6 months' | '12 months')[] = [
  '3 months',
  '6 months',
  '12 months',
];

const TECHNICIANS = ['Sani M.', 'Aisha B.', 'Yusuf K.', 'Ibrahim A.'];

export const ManagementMaintenanceScreen: React.FC<ManagementMaintenanceScreenProps> = ({
  projectName = 'Residence, Barnawa',
  initialTechnician = 'Sani M.',
  onBack,
  onCancel,
  onEnrolSuccess,
}) => {
  const [frequency, setFrequency] = useState<'3 months' | '6 months' | '12 months'>('6 months');
  const [technician, setTechnician] = useState(initialTechnician);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute planned visits dynamically based on frequency
  const plannedVisits = useMemo(() => {
    if (frequency === '3 months') {
      return [
        { label: 'Visit 1', date: '7 Feb 2027' },
        { label: 'Visit 2', date: '7 May 2027' },
        { label: 'Visit 3', date: '7 Aug 2027' },
      ];
    }
    if (frequency === '6 months') {
      return [
        { label: 'Visit 1', date: '7 May 2027' },
        { label: 'Visit 2', date: '7 Nov 2027' },
        { label: 'Visit 3', date: '7 May 2028' },
      ];
    }
    return [
      { label: 'Visit 1', date: '7 Nov 2027' },
      { label: 'Visit 2', date: '7 Nov 2028' },
      { label: 'Visit 3', date: '7 Nov 2029' },
    ];
  }, [frequency]);

  const handleSelectTechnician = () => {
    const buttons: { text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }[] = [
      ...TECHNICIANS.map((tech) => ({
        text: tech,
        onPress: () => setTechnician(tech),
      })),
      { text: 'Cancel', style: 'cancel' as const },
    ];
    Alert.alert(
      'Assign Lead Technician',
      'Select technician for preventive maintenance visits:',
      buttons
    );
  };

  const handleEnrol = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Project Enrolled',
        `${projectName} has been enrolled in preventive maintenance (${frequency} cycle). ${technician} and the client will be notified prior to each visit.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onEnrolSuccess) {
                onEnrolSuccess({
                  frequency,
                  technician,
                  plannedVisits: plannedVisits.map((v) => v.date),
                });
              } else if (onBack) {
                onBack();
              }
            },
          },
        ]
      );
    }, 600);
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
              activeOpacity={0.75}
              onPress={onBack}
              accessibilityLabel="Back to project"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitle}>Preventive maintenance</Text>
              <Text style={styles.headerSubtitle}>{projectName}</Text>
            </View>
          </View>

          {/* Visit Frequency Selector */}
          <View style={styles.frequencySection}>
            <Text style={styles.sectionLabel}>Visit every</Text>
            <View style={styles.frequencyButtonsRow}>
              {FREQUENCIES.map((freq) => {
                const isSelected = frequency === freq;
                return (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyButton,
                      isSelected ? styles.freqSelected : styles.freqUnselected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setFrequency(freq)}
                  >
                    <Text
                      style={[
                        styles.frequencyButtonText,
                        isSelected ? styles.freqTextSelected : styles.freqTextUnselected,
                      ]}
                    >
                      {freq}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Technician Picker */}
          <View style={styles.techSection}>
            <Text style={styles.sectionLabel}>Technician</Text>
            <TouchableOpacity
              style={styles.techPickerButton}
              activeOpacity={0.8}
              onPress={handleSelectTechnician}
            >
              <View style={styles.techLeft}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </Svg>
                <Text style={styles.techName}>{technician}</Text>
              </View>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Planned Visits Card */}
          <View style={styles.visitsCard}>
            <View style={styles.visitsHeader}>
              <Text style={styles.sectionLabel}>Planned visits</Text>
              <Text style={styles.visitsCountText}>First 3 of 6</Text>
            </View>

            {plannedVisits.map((visit, idx) => {
              const isLast = idx === plannedVisits.length - 1;
              return (
                <View
                  key={visit.label}
                  style={[styles.visitRow, isLast && styles.visitRowLast]}
                >
                  <View style={styles.visitLeft}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </Svg>
                    <Text style={styles.visitLabel}>{visit.label}</Text>
                  </View>
                  <Text style={styles.visitDate}>{visit.date}</Text>
                </View>
              );
            })}
          </View>

          {/* Description */}
          <Text style={styles.descriptionText}>
            Each visit uses the 5-point maintenance checklist. The technician and the client are notified before every visit.
          </Text>
        </ScrollView>

        {/* Action Buttons Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButtonWrapper}
            activeOpacity={0.85}
            onPress={handleEnrol}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.primaryGradient}
            >
              <Text style={styles.primaryButtonText}>
                {isSubmitting ? 'Enrolling...' : 'Enrol project'}
              </Text>
              {!isSubmitting && (
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </Svg>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.75}
            onPress={onCancel || onBack}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
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
    paddingTop: 8,
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
    flexShrink: 0,
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
  headerTextCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.44, // -0.02em
    lineHeight: 26.4,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },

  /* Frequency Selector */
  frequencySection: {
    marginTop: 18,
    flexDirection: 'column',
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  frequencyButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freqSelected: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  freqUnselected: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  freqTextSelected: {
    color: '#ffffff',
  },
  freqTextUnselected: {
    color: '#334155',
  },

  /* Technician Section */
  techSection: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 6,
  },
  techPickerButton: {
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  techLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  techName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },

  /* Planned Visits Card */
  visitsCard: {
    marginTop: 16,
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
  visitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  visitsCountText: {
    fontSize: 12,
    color: '#64748b',
  },
  visitRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  visitRowLast: {
    borderBottomWidth: 0,
  },
  visitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  visitDate: {
    fontSize: 13,
    color: '#475569',
  },

  /* Description text */
  descriptionText: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#fafbfd',
    flexDirection: 'column',
    gap: 10,
  },
  primaryButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 4,
  },
  primaryGradient: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
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
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
});
