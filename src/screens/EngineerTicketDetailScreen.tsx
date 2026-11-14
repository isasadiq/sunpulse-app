import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface EngineerTicketDetailScreenProps {
  ticketNumber?: string;
  siteName?: string;
  issueTitle?: string;
  slaText?: string;
  priority?: 'Urgent' | 'Normal';
  currentStage?: 'Reported' | 'Assigned' | 'En route' | 'Resolved';
  reportedText?: string;
  onBack?: () => void;
  onOpenDiagram?: () => void;
  onMarkAsResolved?: (notes: string) => void;
}

export const EngineerTicketDetailScreen: React.FC<EngineerTicketDetailScreenProps> = ({
  ticketNumber = '#1042',
  siteName = 'Kaduna Clinic',
  issueTitle = 'Inverter error on display',
  slaText = 'Respond by 11:30 am',
  priority = 'Urgent',
  currentStage = 'En route',
  reportedText = 'The inverter shows an error message and the system has stopped supplying power.',
  onBack,
  onOpenDiagram,
  onMarkAsResolved,
}) => {
  const [repairNotes, setRepairNotes] = useState('');
  const isUrgent = priority === 'Urgent';

  const stages = ['Reported', 'Assigned', 'En route', 'Resolved'] as const;
  const currentStageIndex = stages.indexOf(currentStage);

  const handleResolve = () => {
    if (!repairNotes.trim()) {
      Alert.alert(
        'Repair Notes Recommended',
        'Would you like to complete resolution without adding repair notes?',
        [
          { text: 'Add Notes', style: 'cancel' },
          {
            text: 'Resolve Anyway',
            onPress: () => {
              if (onMarkAsResolved) {
                onMarkAsResolved(repairNotes);
              }
            },
          },
        ]
      );
      return;
    }

    if (onMarkAsResolved) {
      onMarkAsResolved(repairNotes);
    }
  };

  const handleOpenDiagram = () => {
    if (onOpenDiagram) {
      onOpenDiagram();
    } else {
      Alert.alert(
        'Single Line Diagram',
        `Opening engineering schematic PDF for site: ${siteName}.\nDoc Ref: SLD-${siteName.replace(/\s+/g, '-').toUpperCase()}-REV4.pdf`
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={onBack}
              accessibilityLabel="Back to tickets"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Ticket {ticketNumber}</Text>
              <Text style={styles.headerSubtitle}>{siteName}</Text>
            </View>

            <View
              style={[
                styles.priorityBadge,
                isUrgent ? styles.priorityBadgeUrgent : styles.priorityBadgeNormal,
              ]}
            >
              <Text
                style={[
                  styles.priorityBadgeText,
                  isUrgent ? styles.priorityBadgeTextUrgent : styles.priorityBadgeTextNormal,
                ]}
              >
                {priority}
              </Text>
            </View>
          </View>

          {/* Issue & Progress Stepper Card */}
          <View style={styles.card}>
            <Text style={styles.issueTitle}>{issueTitle}</Text>
            <Text style={styles.slaText}>{slaText}</Text>

            {/* Stepper */}
            <View style={styles.stepperContainer}>
              {stages.map((stage, idx) => {
                const isPassedOrCurrent = idx <= currentStageIndex;
                const isResolvedStage = stage === 'Resolved';
                const showLeftLine = idx > 0;
                const showRightLine = idx < stages.length - 1;
                const leftLineActive = idx <= currentStageIndex;
                const rightLineActive = idx < currentStageIndex;

                return (
                  <View key={stage} style={styles.stepperStep}>
                    <View style={styles.stepperNodeRow}>
                      {/* Left connecting line */}
                      <View
                        style={[
                          styles.stepperLine,
                          showLeftLine && leftLineActive
                            ? styles.stepperLineActive
                            : styles.stepperLineInactive,
                        ]}
                      />

                      {/* Circle indicator */}
                      {isPassedOrCurrent && !isResolvedStage ? (
                        <View style={styles.stepperCircleCompleted}>
                          <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5}>
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </Svg>
                        </View>
                      ) : isPassedOrCurrent && isResolvedStage ? (
                        <View style={styles.stepperCircleCompleted}>
                          <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5}>
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </Svg>
                        </View>
                      ) : (
                        <View style={styles.stepperCirclePending} />
                      )}

                      {/* Right connecting line */}
                      <View
                        style={[
                          styles.stepperLine,
                          showRightLine && rightLineActive
                            ? styles.stepperLineActive
                            : styles.stepperLineInactive,
                        ]}
                      />
                    </View>

                    <Text
                      style={[
                        styles.stepperLabel,
                        isPassedOrCurrent ? styles.stepperLabelActive : styles.stepperLabelInactive,
                      ]}
                    >
                      {stage}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Client Description Card */}
          <View style={styles.card}>
            <Text style={styles.sectionHeading}>REPORTED BY THE CLIENT</Text>
            <Text style={styles.reportedBodyText}>{reportedText}</Text>

            {/* Photo thumbnails */}
            <View style={styles.photosRow}>
              <View style={styles.photoThumb}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.6}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                  />
                </Svg>
              </View>
              <View style={styles.photoThumb}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.6}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                  />
                </Svg>
              </View>
            </View>
          </View>

          {/* Diagram Document Card */}
          <View style={styles.docCard}>
            <View style={styles.docIconContainer}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.7}>
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </Svg>
            </View>
            <View style={styles.docTextContainer}>
              <Text style={styles.docTitle}>Single Line Diagram</Text>
              <Text style={styles.docSubtitle}>PDF for this site</Text>
            </View>
            <TouchableOpacity
              style={styles.docOpenButton}
              activeOpacity={0.75}
              onPress={handleOpenDiagram}
            >
              <Text style={styles.docOpenButtonText}>Open</Text>
            </TouchableOpacity>
          </View>

          {/* Repair Notes Form Field */}
          <View style={styles.notesSection}>
            <Text style={styles.sectionHeading}>REPAIR NOTES</Text>
            <TextInput
              style={styles.notesInput}
              multiline
              numberOfLines={3}
              placeholder="What was the fault and what did you do to fix it?"
              placeholderTextColor="#64748b"
              value={repairNotes}
              onChangeText={setRepairNotes}
              textAlignVertical="top"
            />
          </View>

          {/* Bottom Action Button */}
          <View style={styles.bottomCtaContainer}>
            <TouchableOpacity
              style={styles.resolveButtonWrapper}
              activeOpacity={0.85}
              onPress={handleResolve}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.resolveButtonGradient}
              >
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.4}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
                <Text style={styles.resolveButtonText}>Mark as resolved</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  priorityBadgeUrgent: {
    backgroundColor: '#FFF7ED',
  },
  priorityBadgeNormal: {
    backgroundColor: '#f1f5f9',
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  priorityBadgeTextUrgent: {
    color: '#C2410C',
  },
  priorityBadgeTextNormal: {
    color: '#334155',
  },
  card: {
    marginTop: 14,
    paddingVertical: 14,
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
  issueTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  slaText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: '#C2410C',
  },
  stepperContainer: {
    marginTop: 14,
    flexDirection: 'row',
  },
  stepperStep: {
    flex: 1,
    alignItems: 'center',
  },
  stepperNodeRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperLine: {
    flex: 1,
    height: 2,
  },
  stepperLineActive: {
    backgroundColor: '#EA580C',
  },
  stepperLineInactive: {
    backgroundColor: '#cbd5e1',
  },
  stepperCircleCompleted: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperCirclePending: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  stepperLabel: {
    marginTop: 6,
    fontSize: 11,
    textAlign: 'center',
  },
  stepperLabelActive: {
    color: '#0f172a',
    fontWeight: '600',
  },
  stepperLabelInactive: {
    color: '#64748b',
    fontWeight: '500',
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  reportedBodyText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: '#0f172a',
  },
  photosRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  photoThumb: {
    width: 64,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docCard: {
    marginTop: 12,
    paddingVertical: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  docIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTextContainer: {
    flex: 1,
  },
  docTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  docSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  docOpenButton: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0f172a',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docOpenButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  notesSection: {
    marginTop: 14,
    gap: 6,
  },
  notesInput: {
    height: 84,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    color: '#0f172a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bottomCtaContainer: {
    marginTop: 24,
  },
  resolveButtonWrapper: {
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 3,
  },
  resolveButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resolveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
