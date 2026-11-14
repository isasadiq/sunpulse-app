import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface EngineerInverterTestScreenProps {
  siteName?: string;
  initialSerial?: string;
  initialBrand?: string;
  onBack?: () => void;
  onLinkSerialToJob?: (serial: string, brand: string) => void;
  onTestFailed?: () => void;
}

const INVERTER_BRANDS = ['Deye', 'Growatt', 'Sungrow', 'Felicity', 'Victron', 'Other'];

export const EngineerInverterTestScreen: React.FC<EngineerInverterTestScreenProps> = ({
  siteName = 'Main Residence',
  initialSerial = '3428625515',
  initialBrand = 'Deye',
  onBack,
  onLinkSerialToJob,
  onTestFailed,
}) => {
  const [serial, setSerial] = useState(initialSerial);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [isTesting, setIsTesting] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [telemetryData, setTelemetryData] = useState({
    solarKW: '3.2',
    loadKW: '1.8',
    batteryPct: '78',
    lastSync: 'Just now',
  });

  const handleScanBarcode = () => {
    Alert.alert(
      'Barcode / QR Scanner',
      'Point camera at datalogger QR code sticker on the inverter chassis.',
      [
        {
          text: 'Simulate Scan',
          onPress: () => {
            const scanned = `SN-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
            setSerial(scanned);
            handleTestAgain();
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleTestAgain = () => {
    Alert.alert(
      'Test Connection',
      'Test live data stream from datalogger to SUNPULSE cloud.',
      [
        {
          text: 'Successful Connection',
          onPress: () => {
            setIsTesting(true);
            setTimeout(() => {
              setIsTesting(false);
              setIsConnected(true);
              setTelemetryData({
                solarKW: (2.8 + Math.random() * 1.2).toFixed(1),
                loadKW: (1.5 + Math.random() * 0.8).toFixed(1),
                batteryPct: Math.floor(70 + Math.random() * 25).toString(),
                lastSync: 'Just now',
              });
              Alert.alert('Connection Verified', 'Telemetry stream refreshed and verified with central SUNPULSE telemetry server.');
            }, 1000);
          },
        },
        {
          text: 'Simulate Connection Failure',
          style: 'destructive',
          onPress: () => {
            setIsTesting(true);
            setTimeout(() => {
              setIsTesting(false);
              if (onTestFailed) {
                onTestFailed();
              }
            }, 1000);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleLinkSerial = () => {
    if (!serial.trim()) {
      Alert.alert('Required', 'Please enter or scan a valid datalogger serial number.');
      return;
    }

    Alert.alert(
      'Serial Linked',
      `Datalogger ${serial.trim()} (${selectedBrand}) successfully associated with ${siteName}. Real-time telemetry is now live.`,
      [
        {
          text: 'OK',
          onPress: () => {
            if (onLinkSerialToJob) {
              onLinkSerialToJob(serial.trim(), selectedBrand);
            } else if (onBack) {
              onBack();
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
              accessibilityLabel="Back to job"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Test inverter</Text>
              <Text style={styles.headerSubtitle}>{siteName}</Text>
            </View>
          </View>

          {/* Lead Description */}
          <Text style={styles.leadText}>
            Select the installed inverter hardware and enter the datalogger serial number to verify live cloud telemetry.
          </Text>

          {/* Inverter Brand Selection */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>INVERTER MANUFACTURER</Text>
            <View style={styles.brandPillRow}>
              {INVERTER_BRANDS.map((brand) => {
                const isSelected = selectedBrand === brand;
                return (
                  <TouchableOpacity
                    key={brand}
                    style={[styles.brandPill, isSelected && styles.brandPillActive]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedBrand(brand)}
                  >
                    <Text style={[styles.brandPillText, isSelected && styles.brandPillTextActive]}>
                      {brand}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Datalogger Serial Number Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>DATALOGGER SERIAL NUMBER</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={serial}
                onChangeText={setSerial}
                placeholder="e.g. 3428625515"
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
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <Path d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          {/* Connection Status Banner */}
          {isTesting ? (
            <View style={styles.testingBanner}>
              <ActivityIndicator color="#EA580C" />
              <Text style={styles.testingText}>Pinging datalogger modem & cloud server...</Text>
            </View>
          ) : isConnected ? (
            <View style={styles.connectedBanner}>
              <View style={styles.connectedIconBadge}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.connectedTitle}>Connected</Text>
                <Text style={styles.connectedSubtitle}>Live data is reaching the cloud.</Text>
              </View>
            </View>
          ) : (
            <View style={styles.disconnectedBanner}>
              <Text style={styles.disconnectedText}>Datalogger offline. Re-check 4G antenna.</Text>
            </View>
          )}

          {/* Checklist Details Card */}
          <View style={styles.checklistCard}>
            {/* Row 1 */}
            <View style={[styles.checklistRow, styles.checklistRowBorder]}>
              <View style={styles.checkCircle}>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.checkRowTitle}>Datalogger found</Text>
              </View>
              <Text style={styles.checkRowStatus}>Online</Text>
            </View>

            {/* Row 2 */}
            <View style={[styles.checklistRow, styles.checklistRowBorder]}>
              <View style={styles.checkCircle}>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.checkRowTitle}>Cloud connection</Text>
              </View>
              <Text style={styles.checkRowStatus}>Connected</Text>
            </View>

            {/* Row 3 */}
            <View style={styles.checklistRow}>
              <View style={styles.checkCircle}>
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.checkRowTitle}>Receiving live data</Text>
              </View>
              <Text style={styles.checkRowStatus}>{telemetryData.lastSync}</Text>
            </View>
          </View>

          {/* Latest Reading Card */}
          <View style={styles.readingCard}>
            <Text style={styles.readingLabel}>LATEST READING</Text>

            <View style={styles.readingValuesRow}>
              <View style={styles.readingCol}>
                <Text style={styles.readingColLabel}>Solar</Text>
                <Text style={styles.readingColValue}>
                  {telemetryData.solarKW} <Text style={styles.readingColUnit}>kW</Text>
                </Text>
              </View>

              <View style={styles.readingCol}>
                <Text style={styles.readingColLabel}>Load</Text>
                <Text style={styles.readingColValue}>
                  {telemetryData.loadKW} <Text style={styles.readingColUnit}>kW</Text>
                </Text>
              </View>

              <View style={styles.readingCol}>
                <Text style={styles.readingColLabel}>Battery</Text>
                <Text style={styles.readingColValue}>
                  {telemetryData.batteryPct} <Text style={styles.readingColUnit}>%</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Connection requirement info */}
          <View style={styles.infoRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} style={{ marginTop: 2 }}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.infoText}>
              This test needs a 4G or Wi-Fi connection.
            </Text>
          </View>

          {/* Spacer */}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleLinkSerial}
          >
            <LinearGradient
              colors={['#EA580C', '#C2410C']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Link serial number to job</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.75}
            onPress={handleTestAgain}
            disabled={isTesting}
          >
            <Text style={styles.secondaryButtonText}>Test again</Text>
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
  leadText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: '#64748b',
  },
  inputSection: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  brandPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  brandPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  brandPillActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#EA580C',
  },
  brandPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  brandPillTextActive: {
    color: '#EA580C',
    fontWeight: '700',
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  scanButton: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testingBanner: {
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 16,
    backgroundColor: '#fff7ed',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#c2410c',
  },
  connectedBanner: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  connectedIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#14532d',
  },
  connectedSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#166534',
  },
  disconnectedBanner: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
  },
  disconnectedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C2410C',
  },
  checklistCard: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
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
    backgroundColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkRowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  checkRowStatus: {
    fontSize: 12,
    color: '#64748b',
  },
  readingCard: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  readingLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  readingValuesRow: {
    marginTop: 8,
    flexDirection: 'row',
  },
  readingCol: {
    flex: 1,
  },
  readingColLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  readingColValue: {
    marginTop: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  readingColUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  infoRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
  bottomBar: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#fafbfd',
    flexDirection: 'column',
    gap: 10,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
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
