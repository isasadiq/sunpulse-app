import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface InverterConnectionData {
  brand: string;
  serialNumber: string;
  capacityKva: string;
  batteryKwh: string;
  siteName: string;
  isDemo?: boolean;
}

interface ConnectInverterScreenProps {
  onBack: () => void;
  onConnected: (data: InverterConnectionData) => void;
}

const INVERTER_BRANDS = [
  { id: 'deye', name: 'Deye Cloud', desc: 'Hybrid & Off-Grid (4G/Wi-Fi)' },
  { id: 'growatt', name: 'Growatt', desc: 'ShineWiFi / ShineGPRS' },
  { id: 'felicity', name: 'Felicity Solar', desc: 'Lithium & Hybrid Inverters' },
  { id: 'srne', name: 'SRNE / Must', desc: 'Off-grid MPPT Inverters' },
  { id: 'huawei', name: 'Huawei FusionSolar', desc: 'Commercial & Mini-Grid' },
];

export const ConnectInverterScreen: React.FC<ConnectInverterScreenProps> = ({
  onBack,
  onConnected,
}) => {
  const [selectedBrand, setSelectedBrand] = useState('deye');
  const [serialNumber, setSerialNumber] = useState('');
  const [siteName, setSiteName] = useState('');
  const [capacityKva, setCapacityKva] = useState('5.0');
  const [batteryKwh, setBatteryKwh] = useState('10.0');
  const [isPairing, setIsPairing] = useState(false);
  const [pairingStep, setPairingStep] = useState('');

  const handleSimulateScan = () => {
    const randomSerial = `DEYE-SN-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setSerialNumber(randomSerial);
    if (!siteName) setSiteName('Main Solar Installation');
  };

  const handleConnectDemo = () => {
    setSelectedBrand('deye');
    setSerialNumber('DEYE-DEMO-2026-LIVE');
    setSiteName('Primary Healthcare Clinic · Kura');
    setCapacityKva('5.0');
    setBatteryKwh('10.0');

    triggerPairing({
      brand: 'Deye Cloud',
      serialNumber: 'DEYE-DEMO-2026-LIVE',
      capacityKva: '5.0',
      batteryKwh: '10.0',
      siteName: 'Primary Healthcare Clinic · Kura',
      isDemo: true,
    });
  };

  const triggerPairing = (data: InverterConnectionData) => {
    setIsPairing(true);
    setPairingStep('Connecting to datalogger...');

    setTimeout(() => {
      setPairingStep('Verifying inverter telemetry registers...');
      setTimeout(() => {
        setPairingStep('Telemetry stream synchronized!');
        setTimeout(() => {
          setIsPairing(false);
          onConnected(data);
        }, 600);
      }, 700);
    }, 700);
  };

  const handleFormSubmit = () => {
    if (!serialNumber.trim()) {
      Alert.alert('Missing Serial Number', 'Please enter or scan your inverter datalogger serial number.');
      return;
    }
    const chosenBrandObj = INVERTER_BRANDS.find((b) => b.id === selectedBrand);
    triggerPairing({
      brand: chosenBrandObj ? chosenBrandObj.name : 'Solar Inverter',
      serialNumber: serialNumber.trim(),
      capacityKva: capacityKva || '5.0',
      batteryKwh: batteryKwh || '10.0',
      siteName: siteName.trim() || 'Solar Facility',
      isDemo: false,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth={2}>
            <Path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Connect Inverter</Text>
          <Text style={styles.headerSubtitle}>Pair your datalogger to live telemetry</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Instant Demo Banner */}
        <View style={styles.demoCard}>
          <View style={styles.demoBadgeRow}>
            <View style={styles.liveIndicator} />
            <Text style={styles.demoBadgeText}>HACKATHON / EVALUATION MODE</Text>
          </View>
          <Text style={styles.demoCardTitle}>Evaluating SunPulse without a physical inverter?</Text>
          <Text style={styles.demoCardDesc}>
            Tap below to immediately simulate a live 5kW Deye hybrid solar system with full battery telemetry, PV generation, and load curves.
          </Text>
          <TouchableOpacity
            style={styles.demoConnectButton}
            activeOpacity={0.85}
            onPress={handleConnectDemo}
            disabled={isPairing}
          >
            <LinearGradient
              colors={['#EA580C', '#D97706']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.demoButtonGradient}
            >
              <Svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </Svg>
              <Text style={styles.demoButtonText}>Instant Demo Connect (1-Tap)</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Section 1: Inverter Brand */}
        <Text style={styles.sectionHeading}>1. Select Inverter Hardware</Text>
        <View style={styles.brandsList}>
          {INVERTER_BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand.id;
            return (
              <TouchableOpacity
                key={brand.id}
                style={[styles.brandItem, isSelected && styles.brandItemSelected]}
                onPress={() => setSelectedBrand(brand.id)}
                activeOpacity={0.8}
              >
                <View style={styles.brandRadioWrap}>
                  <View style={[styles.brandRadio, isSelected && styles.brandRadioActive]}>
                    {isSelected && <View style={styles.brandRadioDot} />}
                  </View>
                </View>
                <View style={styles.brandTextWrap}>
                  <Text style={[styles.brandName, isSelected && styles.brandNameSelected]}>
                    {brand.name}
                  </Text>
                  <Text style={styles.brandDesc}>{brand.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section 2: Datalogger Details */}
        <Text style={styles.sectionHeading}>2. Inverter Telemetry Credentials</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Facility / Site Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Primary Health Clinic, Kura"
            placeholderTextColor="#94A3B8"
            value={siteName}
            onChangeText={setSiteName}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelWithAction}>
            <Text style={styles.inputLabel}>Datalogger Serial Number</Text>
            <TouchableOpacity onPress={handleSimulateScan} activeOpacity={0.7} style={styles.scanActionBtn}>
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 8h10M7 12h10M7 16h10" />
              </Svg>
              <Text style={styles.scanLinkText}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. DEYE-SN-9823471"
            placeholderTextColor="#94A3B8"
            value={serialNumber}
            onChangeText={setSerialNumber}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Inverter Rating (kVA)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="5.0"
              placeholderTextColor="#94A3B8"
              value={capacityKva}
              onChangeText={setCapacityKva}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Battery Storage (kWh)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="10.0"
              placeholderTextColor="#94A3B8"
              value={batteryKwh}
              onChangeText={setBatteryKwh}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Pairing Loading State */}
        {isPairing && (
          <View style={styles.pairingBox}>
            <ActivityIndicator size="small" color="#EA580C" />
            <Text style={styles.pairingStepText}>{pairingStep}</Text>
          </View>
        )}

        {/* Connect Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleFormSubmit}
          disabled={isPairing}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#0F172A', '#1E293B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitButtonText}>
              {isPairing ? 'Pairing System...' : 'Pair & Connect Inverter'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  demoCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  demoBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EA580C',
  },
  demoBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#B45309',
  },
  demoCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  demoCardDesc: {
    fontSize: 12.5,
    color: '#78350F',
    lineHeight: 18,
    marginBottom: 12,
  },
  demoConnectButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  demoButtonGradient: {
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  brandsList: {
    marginBottom: 24,
    gap: 8,
  },
  brandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  brandItemSelected: {
    borderColor: '#EA580C',
    backgroundColor: '#FFF7ED',
  },
  brandRadioWrap: {
    marginRight: 12,
  },
  brandRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRadioActive: {
    borderColor: '#EA580C',
  },
  brandRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EA580C',
  },
  brandTextWrap: {
    flex: 1,
  },
  brandName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  brandNameSelected: {
    color: '#9A3412',
    fontWeight: '700',
  },
  brandDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  scanActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scanLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EA580C',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  rowInputs: {
    flexDirection: 'row',
  },
  pairingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFF7ED',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDBA74',
    marginBottom: 16,
  },
  pairingStepText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C2410C',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
