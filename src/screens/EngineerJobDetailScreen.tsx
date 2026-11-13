import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

export interface EngineerJobDetailScreenProps {
  jobTitle?: string;
  siteName?: string;
  stageName?: string;
  stageNumber?: number;
  totalStages?: number;
  progressPercent?: number;
  roleTag?: string;
  onBack?: () => void;
  onOpenPhotos?: () => void;
  onOpenProgressNote?: () => void;
  onOpenTestInverter?: () => void;
  onOpenDiagnostics?: () => void;
  onJobCompleted?: () => void;
}

export const EngineerJobDetailScreen: React.FC<EngineerJobDetailScreenProps> = ({
  jobTitle = 'Installation job',
  siteName = 'Main Residence',
  stageName = 'Installation',
  stageNumber = 3,
  totalStages = 5,
  progressPercent = 60,
  roleTag = 'Leader',
  onBack,
  onOpenPhotos,
  onOpenProgressNote,
  onOpenTestInverter,
  onOpenDiagnostics,
  onJobCompleted,
}) => {
  const [currentProgress, setCurrentProgress] = useState(progressPercent);
  const [isDone, setIsDone] = useState(false);
  const [inverterSerial, setInverterSerial] = useState<string | null>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [serialInput, setSerialInput] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [queuedSyncCount, setQueuedSyncCount] = useState({ photos: 3, notes: 1 });

  const handleLinkSerial = () => {
    if (!serialInput.trim()) {
      Alert.alert('Required', 'Please enter an inverter serial number or barcode.');
      return;
    }
    setInverterSerial(serialInput.trim().toUpperCase());
    setIsLinkModalOpen(false);
    setSerialInput('');
    Alert.alert('Inverter Linked', `Inverter ${serialInput.trim().toUpperCase()} successfully paired to telemetry feed.`);
  };

  const handleSaveNote = () => {
    if (!noteInput.trim()) {
      setIsNoteModalOpen(false);
      return;
    }
    setQueuedSyncCount((prev) => ({ ...prev, notes: prev.notes + 1 }));
    setIsNoteModalOpen(false);
    setNoteInput('');
    Alert.alert('Note Saved', 'Progress update logged and queued to sync with central dispatch.');
  };

  const handleTestInverter = () => {
    Alert.alert(
      'Inverter Telemetry Ping',
      'Connecting to inverter cloud modem...\n\nSignal: -72 dBm (Strong 4G)\nGrid Voltage: 228.4 V\nModbus link: Healthy\nStatus: Online & Transmitting',
      [{ text: 'OK' }]
    );
  };

  const handleDiagnostics = () => {
    Alert.alert(
      'System Diagnostics',
      'String 1 VOC: 384 V (Normal)\nString 2 VOC: 380 V (Normal)\nInsulation Resistance: >10 MΩ\nEarth Loop Impedance: 0.18 Ω\nBMS Communication: OK',
      [{ text: 'Log to Job Record', onPress: () => Alert.alert('Logged', 'Diagnostic readings recorded.') }, { text: 'Close', style: 'cancel' }]
    );
  };

  const handleMarkAsDone = () => {
    Alert.alert(
      'Complete Stage',
      `Mark ${stageName} as 100% complete for ${siteName} and notify Project Manager for Stage ${stageNumber + 1} sign-off?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mark Complete',
          style: 'default',
          onPress: () => {
            setCurrentProgress(100);
            setIsDone(true);
            if (onJobCompleted) {
              onJobCompleted();
            }
          },
        },
      ]
    );
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
              accessibilityLabel="Back to jobs"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{siteName}</Text>
              <Text style={styles.headerSubtitle}>{jobTitle}</Text>
            </View>

            <View style={styles.leaderBadge}>
              <Text style={styles.leaderBadgeText}>{roleTag}</Text>
            </View>
          </View>

          {/* Dark Hero Stage Card */}
          <View style={styles.heroCard}>
            <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
              <Defs>
                <RadialGradient id="heroGlow" cx="100%" cy="0%" r="60%">
                  <Stop offset="0%" stopColor="#dc2626" stopOpacity="0.38" />
                  <Stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" rx={20} fill="url(#heroGlow)" />
            </Svg>

            <View style={styles.heroTopRow}>
              <Text style={styles.heroLabel}>CURRENT STAGE</Text>
              <Text style={styles.heroStageFraction}>
                {stageNumber} of {totalStages}
              </Text>
            </View>

            <Text style={styles.heroStageName}>{stageName}</Text>

            <View style={styles.heroProgressBarBg}>
              <View
                style={[
                  styles.heroProgressBarFill,
                  { width: `${currentProgress}%` },
                ]}
              />
            </View>

            <Text style={styles.heroNextStage}>
              {currentProgress >= 100
                ? 'Ready for: Stage 4 Commissioning'
                : 'Next: Commissioning'}
            </Text>
          </View>

          {/* 4 Quick Actions (2x2 Grid) */}
          <View style={styles.gridRow}>
            {/* Action 1: Photos & Video */}
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.8}
              onPress={onOpenPhotos}
            >
              <View style={styles.actionIconBadge}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <Path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </Svg>
              </View>
              <View>
                <Text style={styles.actionCardTitle}>Photos and video</Text>
                <Text style={styles.actionCardSub}>Add to this job</Text>
              </View>
            </TouchableOpacity>

            {/* Action 2: Progress Note */}
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.8}
              onPress={() => {
                if (onOpenProgressNote) {
                  onOpenProgressNote();
                } else {
                  setIsNoteModalOpen(true);
                }
              }}
            >
              <View style={styles.actionIconBadge}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </Svg>
              </View>
              <View>
                <Text style={styles.actionCardTitle}>Progress note</Text>
                <Text style={styles.actionCardSub}>Write an update</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            {/* Action 3: Test Inverter */}
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.8}
              onPress={() => {
                if (onOpenTestInverter) {
                  onOpenTestInverter();
                } else {
                  handleTestInverter();
                }
              }}
            >
              <View style={styles.actionIconBadge}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788M12 12h.008v.008H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </Svg>
              </View>
              <View>
                <Text style={styles.actionCardTitle}>Test inverter</Text>
                <Text style={styles.actionCardSub}>Check cloud link</Text>
              </View>
            </TouchableOpacity>

            {/* Action 4: Diagnostics */}
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.8}
              onPress={() => {
                if (onOpenDiagnostics) {
                  onOpenDiagnostics();
                } else {
                  handleDiagnostics();
                }
              }}
            >
              <View style={styles.actionIconBadge}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </Svg>
              </View>
              <View>
                <Text style={styles.actionCardTitle}>Diagnostics</Text>
                <Text style={styles.actionCardSub}>Log readings</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Inverter Serial Card */}
          <View style={styles.serialCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.serialLabel}>INVERTER SERIAL NUMBER</Text>
              <Text
                style={[
                  styles.serialValue,
                  inverterSerial ? styles.serialValueActive : styles.serialValuePlaceholder,
                ]}
              >
                {inverterSerial || 'Not linked yet'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.linkButton}
              activeOpacity={0.8}
              onPress={() => setIsLinkModalOpen(true)}
            >
              <Text style={styles.linkButtonText}>
                {inverterSerial ? 'Change' : 'Link'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sync Queue Banner */}
          <View style={styles.syncBanner}>
            <View style={styles.syncIconBadge}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.syncTitle}>
                {queuedSyncCount.photos} photos and {queuedSyncCount.notes} note
              </Text>
              <Text style={styles.syncSubtitle}>Waiting to sync</Text>
            </View>
          </View>

          {/* Spacer */}
          <View style={{ height: 24 }} />
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleMarkAsDone}
            disabled={isDone}
          >
            <LinearGradient
              colors={isDone ? ['#16a34a', '#15803d'] : ['#dc2626', '#b91c1c']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.ctaButton}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M4.5 12.75l6 6 9-13.5" />
              </Svg>
              <Text style={styles.ctaButtonText}>
                {isDone ? `${stageName} Completed` : `Mark ${stageName} as done`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Link Serial Number Modal */}
        <Modal
          visible={isLinkModalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsLinkModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Link Inverter Serial</Text>
              <Text style={styles.modalSubtitle}>
                Scan or type the serial number printed on the inverter chassis or barcode.
              </Text>

              <TextInput
                style={styles.modalInput}
                placeholder="e.g. SP-DYE-8K-2024"
                placeholderTextColor="#94a3b8"
                value={serialInput}
                onChangeText={setSerialInput}
                autoCapitalize="characters"
                autoFocus
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setIsLinkModalOpen(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={handleLinkSerial}
                >
                  <Text style={styles.modalConfirmText}>Save & Pair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Progress Note Modal */}
        <Modal
          visible={isNoteModalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsNoteModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Add Progress Note</Text>
              <Text style={styles.modalSubtitle}>
                Log field conditions, completed checklist items, or site remarks.
              </Text>

              <TextInput
                style={[styles.modalInput, styles.modalTextArea]}
                placeholder="Write your technician update here..."
                placeholderTextColor="#94a3b8"
                value={noteInput}
                onChangeText={setNoteInput}
                multiline
                numberOfLines={4}
                autoFocus
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setIsNoteModalOpen(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={handleSaveNote}
                >
                  <Text style={styles.modalConfirmText}>Save Note</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 24,
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
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 28,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  leaderBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fef2f2',
  },
  leaderBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
  heroCard: {
    marginTop: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 8,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#cbd5e1',
  },
  heroStageFraction: {
    fontSize: 13,
    color: '#cbd5e1',
  },
  heroStageName: {
    marginTop: 4,
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#ffffff',
  },
  heroProgressBarBg: {
    marginTop: 10,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
  },
  heroProgressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#dc2626',
  },
  heroNextStage: {
    marginTop: 8,
    fontSize: 13,
    color: '#cbd5e1',
  },
  gridRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  actionCardSub: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  serialCard: {
    marginTop: 14,
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
  serialLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  serialValue: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '700',
  },
  serialValuePlaceholder: {
    color: '#64748b',
  },
  serialValueActive: {
    color: '#0f172a',
  },
  linkButton: {
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#0f172a',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  syncBanner: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 16,
    backgroundColor: '#fffbeb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  syncIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#78350f',
  },
  syncSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#92400e',
  },
  bottomBar: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#fafbfd',
  },
  ctaButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  modalSubtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748b',
  },
  modalInput: {
    marginTop: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#fafbfd',
  },
  modalTextArea: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  modalButtonsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  modalCancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  modalConfirmButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
  },
  modalConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
});
