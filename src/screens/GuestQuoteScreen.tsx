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

export interface GuestQuoteData {
  fullName: string;
  phone: string;
  location: string;
  reachMethod: 'Phone call' | 'WhatsApp' | 'SMS';
  systemSummary: string;
}

export interface GuestQuoteScreenProps {
  systemSummary?: string;
  onBack?: () => void;
  onSubmitSuccess?: (data: GuestQuoteData) => void;
}

const REACH_METHODS: ('Phone call' | 'WhatsApp' | 'SMS')[] = [
  'Phone call',
  'WhatsApp',
  'SMS',
];

export const GuestQuoteScreen: React.FC<GuestQuoteScreenProps> = ({
  systemSummary = '1.5 kWp solar · 5 kWh battery',
  onBack,
  onSubmitSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [reachMethod, setReachMethod] = useState<'Phone call' | 'WhatsApp' | 'SMS'>('Phone call');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!fullName.trim()) {
      Alert.alert('Name Required', 'Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Phone Required', 'Please enter your phone number so our team can reach you.');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Location Required', 'Please provide your general area or town (e.g. Barnawa, Kaduna).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const quoteData: GuestQuoteData = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        location: location.trim(),
        reachMethod,
        systemSummary,
      };

      if (onSubmitSuccess) {
        onSubmitSuccess(quoteData);
      } else if (onBack) {
        onBack();
      }
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
              accessibilityLabel="Back to estimate"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Request a quote</Text>
              <Text style={styles.headerSubtitle}>No account needed</Text>
            </View>
            <Text style={styles.stepBadge}>Step 3 of 3</Text>
          </View>

          {/* System Summary Card */}
          <View style={styles.systemCard}>
            <View style={styles.systemIconBadge}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </Svg>
            </View>
            <View style={styles.systemTextCol}>
              <Text style={styles.systemLabel}>Your system</Text>
              <Text style={styles.systemValue}>{systemSummary}</Text>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Full name</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBox}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Your full name"
                  placeholderTextColor="#64748b"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Phone Number */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Phone number</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBox}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+234 800 000 0000"
                  placeholderTextColor="#64748b"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Location */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Location</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBox}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <Path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Area or town, for example Barnawa, Kaduna"
                  placeholderTextColor="#64748b"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* How should we reach you? */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>How should we reach you?</Text>
              <View style={styles.pillsRow}>
                {REACH_METHODS.map((method) => {
                  const isSelected = reachMethod === method;
                  return (
                    <TouchableOpacity
                      key={method}
                      style={[styles.pillButton, isSelected ? styles.pillSelected : styles.pillUnselected]}
                      activeOpacity={0.8}
                      onPress={() => setReachMethod(method)}
                    >
                      <Text style={[styles.pillText, isSelected ? styles.pillTextSelected : styles.pillTextUnselected]}>
                        {method}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButtonWrapper}
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Sending request...' : 'Send quote request'}
              </Text>
              {!isSubmitting && (
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </Svg>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerDisclaimer}>
            A SUNPULSE team member will contact you. We only use your details to prepare your quote.
          </Text>
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
    paddingTop: 12,
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
  headerTitleContainer: {
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
  stepBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },

  /* System Banner */
  systemCard: {
    marginTop: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: '#fef2f2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  systemIconBadge: {
    width: 40,
    height: 40,
    flexShrink: 0,
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
  systemTextCol: {
    flex: 1,
  },
  systemLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  systemValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  /* Form Container */
  formContainer: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 16,
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

  /* Reach Pills */
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  pillUnselected: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#ffffff',
  },
  pillTextUnselected: {
    color: '#334155',
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: '#fafbfd',
    flexDirection: 'column',
    gap: 10,
  },
  submitButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 4,
  },
  submitGradient: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
  footerDisclaimer: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
