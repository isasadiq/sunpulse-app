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

export interface AvailableEngineerItem {
  id: string;
  name: string;
  role: string;
  distance: string;
  eta: string;
  todayJobs: string;
}

export interface ManagementDispatchScreenProps {
  ticketNumber?: string;
  siteName?: string;
  issue?: string;
  elapsedMinutes?: number;
  slaMinutes?: number;
  onBack?: () => void;
  onCancel?: () => void;
  onDispatchSuccess?: (engineer: AvailableEngineerItem) => void;
}

const AVAILABLE_ENGINEERS: AvailableEngineerItem[] = [
  {
    id: 'eng-1',
    name: 'Sani M.',
    role: 'Technician',
    distance: '3.2 km away',
    eta: 'ETA 12 min',
    todayJobs: '1 job today',
  },
  {
    id: 'eng-2',
    name: 'Aisha B.',
    role: 'Leader',
    distance: '5.8 km away',
    eta: 'ETA 20 min',
    todayJobs: '3 jobs today',
  },
  {
    id: 'eng-3',
    name: 'Yusuf K.',
    role: 'Technician',
    distance: '9.1 km away',
    eta: 'ETA 30 min',
    todayJobs: 'No jobs today',
  },
];

export const ManagementDispatchScreen: React.FC<ManagementDispatchScreenProps> = ({
  ticketNumber = 'Ticket #T-0148',
  siteName = 'Site 009 · Barnawa',
  issue = 'No power',
  elapsedMinutes = 18,
  slaMinutes = 60,
  onBack,
  onCancel,
  onDispatchSuccess,
}) => {
  const [selectedEngineerId, setSelectedEngineerId] = useState<string>('eng-1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedEngineer =
    AVAILABLE_ENGINEERS.find((e) => e.id === selectedEngineerId) || AVAILABLE_ENGINEERS[0];
  const engineerFirstName = selectedEngineer.name.split(' ')[0];

  const progressPercent = Math.min(100, Math.round((elapsedMinutes / slaMinutes) * 100));

  const handleDispatch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Engineer Dispatched',
        `${selectedEngineer.name} has been assigned to ${ticketNumber} (${siteName}). The client has been notified that help is on the way.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onDispatchSuccess) {
                onDispatchSuccess(selectedEngineer);
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
              accessibilityLabel="Back to ticket"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitle}>Dispatch engineer</Text>
              <Text style={styles.headerSubtitle}>{ticketNumber}</Text>
            </View>
          </View>

          {/* Ticket Information Card */}
          <View style={styles.ticketCard}>
            <View style={styles.ticketRow}>
              <Text style={styles.rowLabel}>Site</Text>
              <Text style={styles.rowValue}>{siteName}</Text>
            </View>
            <View style={styles.ticketRow}>
              <Text style={styles.rowLabel}>Issue</Text>
              <Text style={styles.rowValue}>{issue}</Text>
            </View>
            <View style={styles.ticketRow}>
              <Text style={styles.rowLabel}>Status</Text>
              <View style={styles.waitingBadge}>
                <Text style={styles.waitingBadgeText}>Waiting for engineer</Text>
              </View>
            </View>

            {/* SLA Response Time Bar */}
            <View style={styles.slaContainer}>
              <View style={styles.slaHeaderRow}>
                <Text style={styles.slaLabel}>Response time</Text>
                <Text style={styles.slaValueBold}>
                  {elapsedMinutes} <Text style={styles.slaValueTotal}>of {slaMinutes} min</Text>
                </Text>
              </View>
              <View style={styles.slaTrack}>
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.slaFill, { width: `${progressPercent}%` }]}
                />
              </View>
            </View>
          </View>

          {/* Available Engineers Section */}
          <View style={styles.engineersSection}>
            <Text style={styles.sectionLabel}>Available engineers</Text>

            {AVAILABLE_ENGINEERS.map((engineer) => {
              const isSelected = selectedEngineerId === engineer.id;

              return (
                <TouchableOpacity
                  key={engineer.id}
                  style={[
                    styles.engineerCard,
                    isSelected ? styles.cardSelected : styles.cardUnselected,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedEngineerId(engineer.id)}
                >
                  {/* Radio Indicator */}
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected ? styles.radioSelected : styles.radioUnselected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioDot} />}
                  </View>

                  {/* Engineer Info */}
                  <View style={styles.engineerInfoCol}>
                    <View style={styles.nameRoleRow}>
                      <Text style={styles.engineerName}>{engineer.name}</Text>
                      <View style={styles.roleBadge}>
                        <Text style={styles.roleBadgeText}>{engineer.role}</Text>
                      </View>
                    </View>
                    <Text style={styles.distanceEtaText}>
                      {engineer.distance} · {engineer.eta}
                    </Text>
                  </View>

                  {/* Workload */}
                  <Text style={styles.workloadText}>{engineer.todayJobs}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Explanatory Text */}
          <Text style={styles.explanationText}>
            The engineer gets a notification and the client is told help is on the way.
          </Text>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButtonWrapper}
            activeOpacity={0.85}
            onPress={handleDispatch}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.primaryGradient}
            >
              <Text style={styles.primaryButtonText}>
                {isSubmitting ? 'Dispatching...' : `Dispatch ${engineerFirstName}`}
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

  /* Ticket Card */
  ticketCard: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 14,
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
  ticketRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rowLabel: {
    fontSize: 13,
    color: '#475569',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  waitingBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fffbeb',
  },
  waitingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b45309',
  },
  slaContainer: {
    marginTop: 10,
  },
  slaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slaLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  slaValueBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  slaValueTotal: {
    fontWeight: '500',
    color: '#64748b',
  },
  slaTrack: {
    marginTop: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
  },
  slaFill: {
    height: 8,
    borderRadius: 4,
  },

  /* Engineers Section */
  engineersSection: {
    marginTop: 16,
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
  engineerCard: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardSelected: {
    borderWidth: 1.5,
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  radioCircle: {
    width: 22,
    height: 22,
    flexShrink: 0,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderWidth: 2,
    borderColor: '#dc2626',
  },
  radioUnselected: {
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#dc2626',
  },
  engineerInfoCol: {
    flex: 1,
  },
  nameRoleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  engineerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  roleBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  distanceEtaText: {
    marginTop: 3,
    fontSize: 12,
    color: '#64748b',
  },
  workloadText: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },

  /* Explanation Text */
  explanationText: {
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
