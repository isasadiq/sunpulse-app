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

export interface ManagementActivateClientScreenProps {
  projectName?: string;
  initialClientName?: string;
  initialClientEmail?: string;
  onBack?: () => void;
  onCancel?: () => void;
  onActivateSuccess?: (data: {
    clientName: string;
    clientEmail: string;
    mode: 'create' | 'link';
    accessType: 'smart_telemetry' | 'static_passport';
  }) => void;
}

export const ManagementActivateClientScreen: React.FC<ManagementActivateClientScreenProps> = ({
  projectName = 'Residence, Barnawa',
  initialClientName = 'Hauwa S.',
  initialClientEmail = 'hauwa@example.com',
  onBack,
  onCancel,
  onActivateSuccess,
}) => {
  const [mode, setMode] = useState<'create' | 'link'>('create');
  const [clientName, setClientName] = useState(initialClientName);
  const [clientEmail, setClientEmail] = useState(initialClientEmail);
  const [accessType, setAccessType] = useState<'smart_telemetry' | 'static_passport'>('smart_telemetry');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleActivate = () => {
    if (!clientName.trim()) {
      Alert.alert('Client Name Required', 'Please provide the client full name.');
      return;
    }
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      Alert.alert('Valid Email Required', 'Please enter a valid email address for client login activation.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Activation Sent',
        `An activation email has been dispatched to ${clientEmail}. The client can now create their password and access their solar workspace.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onActivateSuccess) {
                onActivateSuccess({
                  clientName: clientName.trim(),
                  clientEmail: clientEmail.trim(),
                  mode,
                  accessType,
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
              <Text style={styles.headerTitle}>Activate for mobile</Text>
              <Text style={styles.headerSubtitle}>{projectName}</Text>
            </View>
          </View>

          {/* Mode Switcher Tabs */}
          <View style={styles.modeTabsRow}>
            <TouchableOpacity
              style={[styles.modeTab, mode === 'link' ? styles.modeTabActive : styles.modeTabInactive]}
              activeOpacity={0.8}
              onPress={() => setMode('link')}
            >
              <Text style={[styles.modeTabText, mode === 'link' ? styles.modeTabTextActive : styles.modeTabTextInactive]}>
                Link existing login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeTab, mode === 'create' ? styles.modeTabActive : styles.modeTabInactive]}
              activeOpacity={0.8}
              onPress={() => setMode('create')}
            >
              <Text style={[styles.modeTabText, mode === 'create' ? styles.modeTabTextActive : styles.modeTabTextInactive]}>
                Create new login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Client Name */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Client name</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBox}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={clientName}
                  onChangeText={setClientName}
                  placeholder="Client full name"
                  placeholderTextColor="#64748b"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Client Email */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Client email</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBox}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={clientEmail}
                  onChangeText={setClientEmail}
                  placeholder="name@example.com"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          {/* What does the client see? */}
          <View style={styles.accessSection}>
            <Text style={styles.accessSectionTitle}>What does the client see?</Text>

            {/* Smart Telemetry Radio Option */}
            <TouchableOpacity
              style={[
                styles.radioOptionCard,
                accessType === 'smart_telemetry' ? styles.radioSelectedCard : styles.radioUnselectedCard,
              ]}
              activeOpacity={0.8}
              onPress={() => setAccessType('smart_telemetry')}
            >
              <View
                style={[
                  styles.radioOuterCircle,
                  accessType === 'smart_telemetry' ? styles.radioOuterSelected : styles.radioOuterUnselected,
                ]}
              >
                {accessType === 'smart_telemetry' && <View style={styles.radioInnerDot} />}
              </View>
              <View style={styles.radioTextCol}>
                <Text style={styles.radioOptionTitle}>Smart Telemetry</Text>
                <Text style={styles.radioOptionDescription}>
                  Live power, battery and daily energy from the smart inverter.
                </Text>
              </View>
            </TouchableOpacity>

            {/* Static Passport Radio Option */}
            <TouchableOpacity
              style={[
                styles.radioOptionCard,
                accessType === 'static_passport' ? styles.radioSelectedCard : styles.radioUnselectedCard,
              ]}
              activeOpacity={0.8}
              onPress={() => setAccessType('static_passport')}
            >
              <View
                style={[
                  styles.radioOuterCircle,
                  accessType === 'static_passport' ? styles.radioOuterSelected : styles.radioOuterUnselected,
                ]}
              >
                {accessType === 'static_passport' && <View style={styles.radioInnerDot} />}
              </View>
              <View style={styles.radioTextCol}>
                <Text style={styles.radioOptionTitle}>Static Passport</Text>
                <Text style={styles.radioOptionDescription}>
                  System details and project history, with no live data.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Explanation Text */}
          <Text style={styles.explanationText}>
            The client gets an email to set a password and sign in to the SUNPULSE app.
          </Text>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButtonWrapper}
            activeOpacity={0.85}
            onPress={handleActivate}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.primaryGradient}
            >
              <Text style={styles.primaryButtonText}>
                {isSubmitting ? 'Activating...' : 'Activate client'}
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

  /* Mode Tabs */
  modeTabsRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  modeTab: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeTabActive: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  modeTabInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modeTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modeTabTextActive: {
    color: '#ffffff',
  },
  modeTabTextInactive: {
    color: '#334155',
  },

  /* Form Container */
  formContainer: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 14,
  },
  fieldBlock: {
    flexDirection: 'column',
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  inputWrapper: {
    position: 'relative',
    height: 48,
  },
  inputIconBox: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  textInput: {
    width: '100%',
    height: 48,
    paddingLeft: 44,
    paddingRight: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 14,
    color: '#0f172a',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  /* Access Selection Section */
  accessSection: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 8,
  },
  accessSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  radioOptionCard: {
    width: '100%',
    padding: 14,
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
  radioSelectedCard: {
    borderWidth: 1.5,
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  radioUnselectedCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    flexShrink: 0,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderWidth: 2,
    borderColor: '#dc2626',
  },
  radioOuterUnselected: {
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#dc2626',
  },
  radioTextCol: {
    flex: 1,
  },
  radioOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  radioOptionDescription: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },

  /* Explanatory text */
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
