import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface ClientTicketScreenProps {
  ticketNumber?: string;
  issueTitle?: string;
  statusBadge?: string;
  engineerEta?: string;
  reportDescription?: string;
  onBack?: () => void;
  onCallSupport?: () => void;
}

export const ClientTicketScreen: React.FC<ClientTicketScreenProps> = ({
  ticketNumber = '#1042',
  issueTitle = 'Inverter error on display',
  statusBadge = 'En route',
  engineerEta = 'About 25 minutes away',
  reportDescription = 'The inverter shows an error message and the system has stopped supplying power.',
  onBack,
  onCallSupport,
}) => {
  const handleCallSupport = () => {
    if (onCallSupport) {
      onCallSupport();
      return;
    }
    const telUrl = 'tel:+23480078277526';
    Linking.canOpenURL(telUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(telUrl);
        } else {
          Alert.alert(
            'SUNPULSE Support Desk',
            'Hotline: +234 800 SUNPULSE (+234 800 7827 7526)\nRef Ticket: ' + ticketNumber
          );
        }
      })
      .catch(() => {
        Alert.alert(
          'SUNPULSE Support Desk',
          'Hotline: +234 800 SUNPULSE (+234 800 7827 7526)'
        );
      });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={onBack}
              accessibilityLabel="Back to support"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  stroke="#334155"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Ticket {ticketNumber}</Text>
              <Text style={styles.headerSubtitle}>{issueTitle}</Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{statusBadge}</Text>
            </View>
          </View>

          {/* Progress Timeline Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>PROGRESS</Text>

            <View style={styles.timelineList}>
              {/* Step 1: Fault reported */}
              <View style={styles.timelineStep}>
                <View style={styles.completedIconContainer}>
                  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M4.5 12.75l6 6 9-13.5"
                      stroke="#ffffff"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.completedLine} />
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Fault reported</Text>
                  <Text style={styles.stepTime}>Today, 9:12 am</Text>
                </View>
              </View>

              {/* Step 2: Engineer assigned */}
              <View style={styles.timelineStep}>
                <View style={styles.completedIconContainer}>
                  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M4.5 12.75l6 6 9-13.5"
                      stroke="#ffffff"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.completedLine} />
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Engineer assigned</Text>
                  <Text style={styles.stepTime}>Today, 9:30 am</Text>
                </View>
              </View>

              {/* Step 3: Engineer on the way (Current) */}
              <View style={styles.timelineStep}>
                <View style={styles.currentOuterCircle}>
                  <View style={styles.currentInnerDot} />
                </View>
                <View style={styles.pendingLine} />
                <View style={styles.stepContentWithBadge}>
                  <View style={styles.stepTextWrapper}>
                    <Text style={styles.stepTitle}>Engineer on the way</Text>
                    <Text style={styles.stepTime}>{engineerEta}</Text>
                  </View>
                  <View style={styles.nowBadge}>
                    <Text style={styles.nowBadgeText}>Now</Text>
                  </View>
                </View>
              </View>

              {/* Step 4: Fault fixed (Pending) */}
              <View style={[styles.timelineStep, { height: 44 }]}>
                <View style={styles.pendingOuterCircle} />
                <View style={styles.stepContent}>
                  <Text style={styles.pendingStepTitle}>Fault fixed</Text>
                  <Text style={styles.stepTime}>Pending</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Engineer Card */}
          <View style={styles.engineerCard}>
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.engineerAvatar}
            >
              <Text style={styles.engineerAvatarText}>E</Text>
            </LinearGradient>
            <View style={styles.engineerInfo}>
              <Text style={styles.engineerTitle}>Your engineer</Text>
              <Text style={styles.engineerSubtitle}>
                Arriving in about 25 minutes
              </Text>
            </View>
          </View>

          {/* Your Report Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>YOUR REPORT</Text>
            <Text style={styles.reportText}>{reportDescription}</Text>
            <View style={styles.photoThumbnailsRow}>
              <View style={styles.photoThumbnail}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                    stroke="#64748b"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.photoThumbnail}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                    stroke="#64748b"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </View>
          </View>

          {/* Bottom Action: Call Support Desk */}
          <View style={styles.bottomActionContainer}>
            <TouchableOpacity
              style={styles.callSupportButton}
              activeOpacity={0.75}
              onPress={handleCallSupport}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  stroke="#dc2626"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.callSupportButtonText}>Call the support desk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: '#fafbfd',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
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
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.44,
    lineHeight: 26,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fef2f2',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
  card: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
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
  cardHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  timelineList: {
    marginTop: 14,
  },
  timelineStep: {
    position: 'relative',
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  completedIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedLine: {
    position: 'absolute',
    left: 11,
    top: 26,
    width: 2,
    height: 26,
    backgroundColor: '#dc2626',
  },
  pendingLine: {
    position: 'absolute',
    left: 11,
    top: 26,
    width: 2,
    height: 26,
    backgroundColor: '#e2e8f0',
  },
  currentOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dc2626',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#dc2626',
  },
  pendingOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  stepContent: {
    flex: 1,
  },
  stepContentWithBadge: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stepTextWrapper: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  pendingStepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  stepTime: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  nowBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fef2f2',
  },
  nowBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
  engineerCard: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  engineerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  engineerAvatarText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  engineerInfo: {
    flex: 1,
  },
  engineerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  engineerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  reportText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: '#0f172a',
  },
  photoThumbnailsRow: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  photoThumbnail: {
    width: 64,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomActionContainer: {
    marginTop: 24,
  },
  callSupportButton: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  callSupportButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
});
