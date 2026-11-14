import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface MPPTReading {
  id: number;
  voltage: string;
  current: string;
}

export interface EngineerDiagnosticsScreenProps {
  siteName?: string;
  onBack?: () => void;
  onSaveReadings?: (diagnostics: {
    mppts: MPPTReading[];
    soh: string;
    cellDelta: string;
    avgDailyLoad: string;
    peakLoad: string;
  }) => void;
}

export const EngineerDiagnosticsScreen: React.FC<EngineerDiagnosticsScreenProps> = ({
  siteName = 'Main Residence',
  onBack,
  onSaveReadings,
}) => {
  const [mppts, setMppts] = useState<MPPTReading[]>([
    { id: 1, voltage: '312', current: '8.4' },
    { id: 2, voltage: '', current: '' },
  ]);
  const [soh, setSoh] = useState('96');
  const [cellDelta, setCellDelta] = useState('18');
  const [avgLoad, setAvgLoad] = useState('14.2');
  const [peakLoad, setPeakLoad] = useState('3.6');
  const [isSaving, setIsSaving] = useState(false);

  const updateMppt = (id: number, field: 'voltage' | 'current', value: string) => {
    setMppts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddMppt = () => {
    const nextId = mppts.length + 1;
    setMppts((prev) => [...prev, { id: nextId, voltage: '', current: '' }]);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        'Readings Saved',
        `Diagnostic data for ${siteName} recorded successfully. Offline sync queue updated.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onSaveReadings) {
                onSaveReadings({
                  mppts,
                  soh,
                  cellDelta,
                  avgDailyLoad: avgLoad,
                  peakLoad,
                });
              } else if (onBack) {
                onBack();
              }
            },
          },
        ]
      );
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
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
              accessibilityLabel="Back to job"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Diagnostics</Text>
              <Text style={styles.headerSubtitle}>{siteName}</Text>
            </View>
          </View>

          {/* Card 1: Solar input (MPPT) */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>SOLAR INPUT (MPPT)</Text>

            <View style={styles.cardBody}>
              {mppts.map((mppt) => (
                <View key={mppt.id} style={styles.inputsRow}>
                  {/* Voltage */}
                  <View style={styles.inputCol}>
                    <Text style={styles.inputLabel}>MPPT {mppt.id} voltage</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.textInput}
                        value={mppt.voltage}
                        onChangeText={(v) => updateMppt(mppt.id, 'voltage', v)}
                        placeholder="0"
                        placeholderTextColor="#64748b"
                        keyboardType="decimal-pad"
                      />
                      <Text style={styles.unitText}>V</Text>
                    </View>
                  </View>

                  {/* Current */}
                  <View style={styles.inputCol}>
                    <Text style={styles.inputLabel}>MPPT {mppt.id} current</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.textInput}
                        value={mppt.current}
                        onChangeText={(a) => updateMppt(mppt.id, 'current', a)}
                        placeholder="0"
                        placeholderTextColor="#64748b"
                        keyboardType="decimal-pad"
                      />
                      <Text style={styles.unitText}>A</Text>
                    </View>
                  </View>
                </View>
              ))}

              {/* Add another MPPT */}
              <TouchableOpacity
                style={styles.addMpptLink}
                activeOpacity={0.75}
                onPress={handleAddMppt}
              >
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.6} strokeLinecap="round">
                  <Path d="M12 5v14M5 12h14" />
                </Svg>
                <Text style={styles.addMpptText}>Add another MPPT</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2: Battery health */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>BATTERY HEALTH</Text>

            <View style={styles.cardBody}>
              <View style={styles.inputsRow}>
                {/* State of health */}
                <View style={styles.inputCol}>
                  <Text style={styles.inputLabel}>State of health (SoH)</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={soh}
                      onChangeText={setSoh}
                      placeholder="100"
                      placeholderTextColor="#64748b"
                      keyboardType="decimal-pad"
                    />
                    <Text style={styles.unitText}>%</Text>
                  </View>
                </View>

                {/* Cell delta */}
                <View style={styles.inputCol}>
                  <Text style={styles.inputLabel}>Cell delta</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={cellDelta}
                      onChangeText={setCellDelta}
                      placeholder="0"
                      placeholderTextColor="#64748b"
                      keyboardType="decimal-pad"
                    />
                    <Text style={styles.unitText}>mV</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Card 3: 7-day load audit */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>7-DAY LOAD AUDIT</Text>

            <View style={styles.cardBody}>
              <View style={styles.inputsRow}>
                {/* Average daily load */}
                <View style={styles.inputCol}>
                  <Text style={styles.inputLabel}>Average daily load</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={avgLoad}
                      onChangeText={setAvgLoad}
                      placeholder="0.0"
                      placeholderTextColor="#64748b"
                      keyboardType="decimal-pad"
                    />
                    <Text style={styles.unitText}>kWh</Text>
                  </View>
                </View>

                {/* Peak load */}
                <View style={styles.inputCol}>
                  <Text style={styles.inputLabel}>Peak load</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={peakLoad}
                      onChangeText={setPeakLoad}
                      placeholder="0.0"
                      placeholderTextColor="#64748b"
                      keyboardType="decimal-pad"
                    />
                    <Text style={styles.unitText}>kW</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Spacer */}
          <View style={{ flex: 1, minHeight: 28 }} />

          {/* Bottom Action Section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              disabled={isSaving}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>
                  {isSaving ? 'Saving readings...' : 'Save readings'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              Kept on this phone and synced when 4G returns.
            </Text>
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
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  card: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
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
  cardBody: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 10,
  },
  inputsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputCol: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'column',
    gap: 5,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  inputWrapper: {
    position: 'relative',
    height: 48,
  },
  textInput: {
    width: '100%',
    height: 48,
    paddingLeft: 14,
    paddingRight: 44,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unitText: {
    position: 'absolute',
    right: 14,
    top: 14,
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  addMpptLink: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addMpptText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EA580C',
  },
  bottomSection: {
    marginTop: 'auto',
    flexDirection: 'column',
    gap: 10,
  },
  saveButton: {
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
  saveButtonText: {
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
