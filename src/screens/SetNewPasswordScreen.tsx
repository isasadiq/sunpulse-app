import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Path,
  Defs,
  RadialGradient,
  Stop,
  Rect,
} from 'react-native-svg';

const SUNPULSE_LOGO = require('../../assets/sunpulse-logo-transparent.png');

interface SetNewPasswordScreenProps {
  onBackToSignIn: () => void;
  onPasswordUpdated?: () => void;
}

export const SetNewPasswordScreen: React.FC<SetNewPasswordScreenProps> = ({
  onBackToSignIn,
  onPasswordUpdated,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassFocused, setNewPassFocused] = useState(false);
  const [confirmPassFocused, setConfirmPassFocused] = useState(false);

  // Live password criteria validation matching HTML spec
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const handleUpdatePassword = () => {
    Keyboard.dismiss();
    if (!hasMinLength || !hasUppercase || !hasNumber) {
      Alert.alert(
        'Weak password',
        'Please ensure your password satisfies all 3 security requirements.'
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Passwords mismatch',
        'Your passwords do not match. Please re-enter them carefully.'
      );
      return;
    }

    if (onPasswordUpdated) {
      onPasswordUpdated();
    } else {
      onBackToSignIn();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header: SUNPULSE Logo at 150px */}
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.8} onPress={onBackToSignIn}>
                <Image
                  source={SUNPULSE_LOGO}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Title Block with Shield Check Icon */}
            <View style={styles.titleBlock}>
              <View style={styles.shieldBadge}>
                <Svg
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </Svg>
              </View>

              <Text style={styles.title}>Set new password</Text>
              <Text style={styles.subtitle}>
                Choose a strong password that you have not used before.
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formSection}>
              {/* New Password Field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>New password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    newPassFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <View style={styles.inputLeftIcon}>
                    <Svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <Path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </Svg>
                  </View>
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Enter new password"
                    placeholderTextColor="#64748b"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                    onFocus={() => setNewPassFocused(true)}
                    onBlur={() => setNewPassFocused(false)}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.eyeButton}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    accessibilityLabel="Toggle password visibility"
                  >
                    <Svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {showNewPassword ? (
                        <Path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      ) : (
                        <>
                          <Path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <Path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </>
                      )}
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Confirm password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    confirmPassFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <View style={styles.inputLeftIcon}>
                    <Svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <Path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </Svg>
                  </View>
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Re-enter new password"
                    placeholderTextColor="#64748b"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    onFocus={() => setConfirmPassFocused(true)}
                    onBlur={() => setConfirmPassFocused(false)}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    accessibilityLabel="Toggle password visibility"
                  >
                    <Svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {showConfirmPassword ? (
                        <Path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      ) : (
                        <>
                          <Path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <Path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </>
                      )}
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Password Requirement Card */}
              <View style={styles.criteriaCard}>
                <Text style={styles.criteriaHeader}>Your password must have</Text>

                {/* Criterion 1: At least 8 characters */}
                <View style={styles.criterionRow}>
                  {hasMinLength ? (
                    <View style={styles.checkedCircle}>
                      <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M4.5 12.75l6 6 9-13.5" />
                      </Svg>
                    </View>
                  ) : (
                    <View style={styles.uncheckedCircle} />
                  )}
                  <Text style={[styles.criterionText, hasMinLength && styles.criterionTextActive]}>
                    At least 8 characters
                  </Text>
                </View>

                {/* Criterion 2: One uppercase letter */}
                <View style={styles.criterionRow}>
                  {hasUppercase ? (
                    <View style={styles.checkedCircle}>
                      <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M4.5 12.75l6 6 9-13.5" />
                      </Svg>
                    </View>
                  ) : (
                    <View style={styles.uncheckedCircle} />
                  )}
                  <Text style={[styles.criterionText, hasUppercase && styles.criterionTextActive]}>
                    One uppercase letter
                  </Text>
                </View>

                {/* Criterion 3: One number */}
                <View style={styles.criterionRow}>
                  {hasNumber ? (
                    <View style={styles.checkedCircle}>
                      <Svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M4.5 12.75l6 6 9-13.5" />
                      </Svg>
                    </View>
                  ) : (
                    <View style={styles.uncheckedCircle} />
                  )}
                  <Text style={[styles.criterionText, hasNumber && styles.criterionTextActive]}>
                    One number
                  </Text>
                </View>
              </View>

              {/* Submit Update Password Button */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.submitButtonContainer}
                onPress={handleUpdatePassword}
              >
                <LinearGradient
                  colors={['#EA580C', '#C2410C']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.submitGradient}
                >
                  <Text style={styles.submitText}>Update password</Text>
                  <Svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </Svg>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Changed your mind?{' '}
                <Text style={styles.backLink} onPress={onBackToSignIn}>
                  Back to sign in
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfd', // Exact background from SetNewPassword.dc.html
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 44,
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 30,
  },

  /* Title Block */
  titleBlock: {
    marginTop: 40,
  },
  shieldBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 24,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6, // -0.02em
    lineHeight: 36, // 1.2
    color: '#020617',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4, // 1.6
    color: '#64748b',
  },

  /* Form Section */
  formSection: {
    marginTop: 28,
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  inputWrapper: {
    position: 'relative',
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
  },
  inputWrapperFocused: {
    borderColor: '#EA580C',
  },
  inputLeftIcon: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  textInput: {
    width: '100%',
    height: 48,
    paddingLeft: 44,
    paddingRight: 16,
    fontSize: 14,
    color: '#0f172a',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  /* Criteria Card */
  criteriaCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    gap: 10,
  },
  criteriaHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  criterionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkedCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#94a3b8',
  },
  criterionText: {
    fontSize: 13,
    color: '#475569',
  },
  criterionTextActive: {
    color: '#0f172a',
    fontWeight: '500',
  },

  /* Button */
  submitButtonContainer: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  submitGradient: {
    flex: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4, // 0.025em
  },

  /* Footer */
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
  },
  backLink: {
    color: '#EA580C',
    fontWeight: '600',
  },
});

