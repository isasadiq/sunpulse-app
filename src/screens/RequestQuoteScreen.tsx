import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface QuoteSubmissionData {
  requestNumber: string;
  upgrade: string;
  siteName: string;
  contactMethod: string;
  visitTiming: string;
  status: string;
}

interface RequestQuoteScreenProps {
  upgradeSummary?: string;
  initialSite?: string;
  onBack?: () => void;
  onSubmitSuccess?: (data: QuoteSubmissionData) => void;
}

const REACH_METHODS = ['Phone call', 'WhatsApp', 'Email'];
const VISIT_TIMINGS = ['This week', 'Next week', 'Flexible'];

export const RequestQuoteScreen: React.FC<RequestQuoteScreenProps> = ({
  upgradeSummary = '+2.2 kWp solar · +5 kWh battery',
  initialSite = 'Main Residence',
  onBack,
  onSubmitSuccess,
}) => {
  const [selectedSite, setSelectedSite] = useState(initialSite);
  const [phone, setPhone] = useState('+234 803 456 7890');
  const [reachMethod, setReachMethod] = useState('Phone call');
  const [visitTiming, setVisitTiming] = useState('Next week');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSiteSelect = () => {
    Alert.alert(
      'Select Installation Site',
      'Choose the site for this expansion inspection and quote:',
      [
        { text: 'Main Residence', onPress: () => setSelectedSite('Main Residence') },
        { text: 'Victoria Island Penthouse', onPress: () => setSelectedSite('Victoria Island Penthouse') },
        { text: 'Abuja Factory Mini-grid', onPress: () => setSelectedSite('Abuja Factory Mini-grid') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSubmit = () => {
    if (!phone.trim()) {
      Alert.alert('Phone Required', 'Please enter a contact phone number so our engineer can reach you.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const quoteData: QuoteSubmissionData = {
        requestNumber: '#Q-0215',
        upgrade: upgradeSummary.replace('solar ·', '·').replace('battery', '').trim(),
        siteName: selectedSite,
        contactMethod: reachMethod,
        visitTiming: visitTiming,
        status: 'Received',
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
            <Text style={styles.headerTitle}>Request a quote</Text>
          </View>

          {/* Upgrade Summary Banner */}
          <View style={styles.upgradeCard}>
            <View style={styles.upgradeIconBadge}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </Svg>
            </View>
            <View style={styles.upgradeTextContainer}>
              <Text style={styles.upgradeLabel}>Your upgrade</Text>
              <Text style={styles.upgradeValue}>{upgradeSummary}</Text>
            </View>
          </View>

          {/* Form Fields Group */}
          <View style={styles.formGroup}>
            {/* 1. Site Picker */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Site</Text>
              <TouchableOpacity
                style={styles.sitePickerButton}
                activeOpacity={0.8}
                onPress={handleSiteSelect}
              >
                <View style={styles.sitePickerLeft}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </Svg>
                  <Text style={styles.sitePickerText}>{selectedSite}</Text>
                </View>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* 2. Phone Number */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Phone number</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.phoneIconBox}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+234 800 000 0000"
                  placeholderTextColor="#64748b"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* 3. How should we reach you? */}
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

            {/* 4. When can we visit? */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>When can we visit?</Text>
              <View style={styles.pillsRow}>
                {VISIT_TIMINGS.map((timing) => {
                  const isSelected = visitTiming === timing;
                  return (
                    <TouchableOpacity
                      key={timing}
                      style={[styles.pillButton, isSelected ? styles.pillSelected : styles.pillUnselected]}
                      activeOpacity={0.8}
                      onPress={() => setVisitTiming(timing)}
                    >
                      <Text style={[styles.pillText, isSelected ? styles.pillTextSelected : styles.pillTextUnselected]}>
                        {timing}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* 5. Notes (Optional) */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Notes <Text style={styles.optionalTag}>(optional)</Text>
              </Text>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="Anything we should know about the site or the upgrade?"
                placeholderTextColor="#64748b"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        {/* Action Button Footer */}
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
              style={styles.submitButtonGradient}
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
          <Text style={styles.footerNote}>
            A SUNPULSE team member will contact you.
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
  headerTitle: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48, // -0.02em
    lineHeight: 28.8,
    color: '#020617',
  },

  /* Upgrade Card */
  upgradeCard: {
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
  upgradeIconBadge: {
    width: 40,
    height: 40,
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
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  upgradeValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  /* Form Group */
  formGroup: {
    marginTop: 16,
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
  optionalTag: {
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: '500',
    color: '#64748b',
  },

  /* Site Picker */
  sitePickerButton: {
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sitePickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sitePickerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },

  /* Phone Input */
  phoneInputContainer: {
    position: 'relative',
    height: 48,
  },
  phoneIconBox: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  phoneInput: {
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

  /* Pills Row */
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillButton: {
    height: 36,
    paddingHorizontal: 14,
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

  /* Notes Input */
  notesInput: {
    height: 76,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 14,
    lineHeight: 21,
    color: '#0f172a',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  submitButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonGradient: {
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
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
