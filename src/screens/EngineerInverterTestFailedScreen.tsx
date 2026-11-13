import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface EngineerInverterTestFailedScreenProps {
  siteName?: string;
  initialSerial?: string;
  onBack?: () => void;
  onTestAgain?: () => void;
  onSaveLater?: () => void;
}

export const EngineerInverterTestFailedScreen: React.FC<EngineerInverterTestFailedScreenProps> = ({
  siteName = 'Main Residence',
  initialSerial = 'SN-4821907356',
  onBack,
  onTestAgain,
  onSaveLater,
}) => {
  const [serial, setSerial] = useState(initialSerial);

  const handleScanBarcode = () => {
    Alert.alert(
      'Scan Serial Label',
      'Point camera at the QR or barcode label on the datalogger.',
      [
        {
          text: 'Scan New Serial',
          onPress: () => {
            setSerial(`SN-${Math.floor(1000000000 + Math.random() * 9000000000)}`);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSaveAndTestLater = () => {
    if (onSaveLater) {
      onSaveLater();
    } else {
      Alert.alert(
        'Saved for Later',
        `Serial ${serial} saved to this job. You can test telemetry again before commissioning sign-off.`,
        [{ text: 'OK', onPress: onBack }]
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
              accessibilityLabel="Back to job"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <View style={styles.headerTitleGroup}>
              <Text style={styles.headerTitle}>Test inverter</Text>
              <Text style={styles.headerSubtitle}>{siteName}</Text>
            </View>
          </View>

          {/* Lead Instruction */}
          <Text style={styles.leadText}>
            Enter the datalogger serial number to check that live data reaches the cloud before you leave the site.
          </Text>

          {/* Datalogger Serial Number Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>DATALOGGER SERIAL NUMBER</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={serial}
                onChangeText={setSerial}
                placeholder="e.g. SN-4821907356"
                placeholderTextColor="#64748b"
                autoCapitalize="characters"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.scanButton}
                activeOpacity={0.8}
                onPress={handleScanBarcode}
                accessibilityLabel="Scan the serial number label"
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <Path d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          {/* Not Connected Warning Banner */}
          <View style={styles.notConnectedBanner}>
            <View style={styles.notConnectedIconBox}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M6 18L18 6M6 6l12 12" />
              </Svg>
            </View>
            <View style={styles.notConnectedTextGroup}>
              <Text style={styles.notConnectedTitle}>Not connected</Text>
              <Text style={styles.notConnectedSubtitle}>Live data is not reaching the cloud.</Text>
            </View>
          </View>

          {/* Test Steps Checklist Card */}
          <View style={styles.checklistCard}>
            {/* Step 1: Datalogger found */}
            <View style={[styles.checklistRow, styles.checklistRowBorder]}>
              <View style={[styles.checkCircle, styles.checkCircleGreen]}>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <Text style={styles.checkTitle}>Datalogger found</Text>
              <Text style={styles.checkStatusOnline}>Online</Text>
            </View>

            {/* Step 2: Cloud connection */}
            <View style={[styles.checklistRow, styles.checklistRowBorder]}>
              <View style={[styles.checkCircle, styles.checkCircleRed]}>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </View>
              <Text style={styles.checkTitle}>Cloud connection</Text>
              <Text style={styles.checkStatusNoResponse}>No response</Text>
            </View>

            {/* Step 3: Receiving live data */}
            <View style={styles.checklistRow}>
              <View style={[styles.checkCircle, styles.checkCircleWaiting]} />
              <Text style={styles.checkTitle}>Receiving live data</Text>
              <Text style={styles.checkStatusWaiting}>Waiting</Text>
            </View>
          </View>

          {/* What to Check Card */}
          <View style={styles.whatToCheckCard}>
            <Text style={styles.whatToCheckHeader}>WHAT TO CHECK</Text>

            <View style={styles.checkItemRow}>
              <View style={styles.checkNumberBox}>
                <Text style={styles.checkNumberText}>1</Text>
              </View>
              <Text style={styles.checkItemText}>The datalogger has power and a steady light.</Text>
            </View>

            <View style={styles.checkItemRow}>
              <View style={styles.checkNumberBox}>
                <Text style={styles.checkNumberText}>2</Text>
              </View>
              <Text style={styles.checkItemText}>The site Wi-Fi or SIM has data and signal.</Text>
            </View>

            <View style={[styles.checkItemRow, { marginBottom: 0 }]}>
              <View style={styles.checkNumberBox}>
                <Text style={styles.checkNumberText}>3</Text>
              </View>
              <Text style={styles.checkItemText}>The serial number matches the label.</Text>
            </View>
          </View>

          {/* Connectivity Requirement Footnote */}
          <View style={styles.footnoteRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.footnoteText}>This test needs a 4G or Wi-Fi connection.</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.testAgainButton}
              activeOpacity={0.85}
              onPress={onTestAgain}
            >
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.testAgainGradient}
              >
                <Text style={styles.testAgainText}>Test again</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveLaterButton}
              activeOpacity={0.7}
              onPress={handleSaveAndTestLater}
            >
              <Text style={styles.saveLaterText}>Save and test later</Text>
            </TouchableOpacity>
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
  headerTitleGroup: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
    lineHeight: 26,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  leadText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    color: '#64748b',
  },
  inputSection: {
    marginTop: 14,
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  inputWrapper: {
    position: 'relative',
    height: 52,
  },
  textInput: {
    width: '100%',
    height: 52,
    paddingLeft: 16,
    paddingRight: 60,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#0f172a',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  scanButton: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notConnectedBanner: {
    marginTop: 14,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notConnectedIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notConnectedTextGroup: {
    flex: 1,
  },
  notConnectedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#991b1b',
  },
  notConnectedSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#b91c1c',
    marginTop: 1,
  },
  checklistCard: {
    marginTop: 14,
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
  checklistRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checklistRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleGreen: {
    backgroundColor: '#15803d',
  },
  checkCircleRed: {
    backgroundColor: '#dc2626',
  },
  checkCircleWaiting: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  checkTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  checkStatusOnline: {
    fontSize: 12,
    color: '#64748b',
  },
  checkStatusNoResponse: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
  checkStatusWaiting: {
    fontSize: 12,
    color: '#64748b',
  },
  whatToCheckCard: {
    marginTop: 12,
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
  whatToCheckHeader: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  checkItemRow: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkNumberBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkNumberText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  checkItemText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#334155',
  },
  footnoteRow: {
    marginTop: 12,
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
  actionButtons: {
    marginTop: 24,
    gap: 10,
  },
  testAgainButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  testAgainGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testAgainText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  saveLaterButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  saveLaterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
});
