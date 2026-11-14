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

export interface EngineerSignatureScreenProps {
  siteName?: string;
  initialClientName?: string;
  onBack?: () => void;
  onReviewChecks?: () => void;
  onSaveSignOff?: (clientName: string) => void;
}

export const EngineerSignatureScreen: React.FC<EngineerSignatureScreenProps> = ({
  siteName = 'Northgate Factory',
  initialClientName = '',
  onBack,
  onReviewChecks,
  onSaveSignOff,
}) => {
  const [clientName, setClientName] = useState(initialClientName);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    if (!clientName.trim()) {
      Alert.alert('Client Name Required', 'Please enter the client’s full name before saving the sign-off.');
      return;
    }

    if (!isConfirmed) {
      Alert.alert(
        'Confirmation Required',
        'Please tick the confirmation checkbox to certify that the maintenance visit was completed.'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSaveSignOff) {
        onSaveSignOff(clientName.trim());
      }
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
              activeOpacity={0.7}
              onPress={onBack}
              accessibilityLabel="Back to checklist"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Client sign-off</Text>
              <Text style={styles.headerSubtitle}>{siteName}</Text>
            </View>
          </View>

          {/* Banner Callout: Hand phone to client */}
          <View style={styles.bannerCallout}>
            <View style={styles.bannerIconBox}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15" />
              </Svg>
            </View>
            <Text style={styles.bannerText}>
              Hand the phone to the client to review and confirm.
            </Text>
          </View>

          {/* Routine maintenance summary card */}
          <View style={styles.summaryCard}>
            <View style={styles.greenCheckBadge}>
              <Svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M4.5 12.75l6 6 9-13.5" />
              </Svg>
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryTitle}>Routine maintenance</Text>
              <Text style={styles.summarySubtitle}>All 5 checks done</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onReviewChecks}
              accessibilityLabel="Review checks"
              style={styles.reviewButton}
            >
              <Text style={styles.reviewText}>Review</Text>
            </TouchableOpacity>
          </View>

          {/* Client Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CLIENT NAME</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Full name"
              placeholderTextColor="#64748b"
              value={clientName}
              onChangeText={setClientName}
              autoCapitalize="words"
              autoCorrect={false}
              accessibilityLabel="Client full name input"
            />
          </View>

          {/* Confirmation Checkbox */}
          <TouchableOpacity
            style={styles.confirmRow}
            activeOpacity={0.8}
            onPress={() => setIsConfirmed(!isConfirmed)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isConfirmed }}
          >
            <View
              style={[
                styles.checkboxSquare,
                isConfirmed ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
              {isConfirmed && (
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              )}
            </View>
            <Text style={styles.confirmText}>
              I confirm the maintenance visit was completed.
            </Text>
          </TouchableOpacity>

          {/* Spacer pushing footer down when screen is tall */}
          <View style={styles.spacer} />

          {/* Bottom Save Action */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              disabled={isSubmitting}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>
                  {isSubmitting ? 'Saving sign-off...' : 'Save sign-off'}
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
    display: 'flex',
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
  headerTextContainer: {
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
  bannerCallout: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19.6,
    color: '#0f172a',
  },
  summaryCard: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  greenCheckBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  summarySubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  reviewButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  reviewText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EA580C',
  },
  inputGroup: {
    marginTop: 14,
    display: 'flex',
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
  textInput: {
    height: 48,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 15,
    color: '#0f172a',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  confirmRow: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxUnchecked: {
    borderWidth: 2,
    borderColor: '#94a3b8',
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#EA580C',
    borderWidth: 2,
    borderColor: '#EA580C',
  },
  confirmText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19.5,
    color: '#475569',
  },
  spacer: {
    flex: 1,
    minHeight: 32,
  },
  bottomSection: {
    marginTop: 'auto',
    display: 'flex',
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
