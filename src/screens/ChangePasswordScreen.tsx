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

export interface ChangePasswordScreenProps {
  onBack?: () => void;
  onPasswordUpdated?: () => void;
  onForgotPassword?: () => void;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  onBack,
  onPasswordUpdated,
  onForgotPassword,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Requirements checks
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isValid = hasMinLength && hasUppercase && hasNumber && currentPassword.length > 0;

  const handleUpdatePassword = () => {
    if (!currentPassword.trim()) {
      Alert.alert('Current Password Required', 'Please enter your current password.');
      return;
    }
    if (!hasMinLength || !hasUppercase || !hasNumber) {
      Alert.alert(
        'Password Requirements',
        'Please ensure your new password has at least 8 characters, one uppercase letter, and one number.'
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords Do Not Match', 'New password and confirmation must match exactly.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onPasswordUpdated) {
        onPasswordUpdated();
      } else {
        Alert.alert(
          'Password Changed',
          'Your password has been successfully updated.',
          [{ text: 'OK', onPress: onBack }]
        );
      }
    }, 600);
  };

  const renderEyeIcon = (isVisible: boolean) => {
    if (isVisible) {
      return (
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Path
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            stroke="#64748b"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    }
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          stroke="#64748b"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          stroke="#64748b"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

  const renderRequirementCheck = (met: boolean, text: string) => {
    return (
      <View style={styles.requirementRow}>
        {met ? (
          <View style={styles.requirementMetBadge}>
            <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
              <Path
                d="M4.5 12.75l6 6 9-13.5"
                stroke="#ffffff"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        ) : (
          <View style={styles.requirementUnmetCircle} />
        )}
        <Text style={[styles.requirementText, met && styles.requirementTextMet]}>
          {text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.7}
                onPress={onBack}
                accessibilityLabel="Back to security"
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
              <Text style={styles.title}>Change password</Text>
            </View>

            {/* Inputs Group */}
            <View style={styles.formGroup}>
              {/* Current Password */}
              <View style={styles.inputFieldWrapper}>
                <Text style={styles.inputLabel}>CURRENT PASSWORD</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.leftIconContainer}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        stroke="#64748b"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter current password"
                    placeholderTextColor="#64748b"
                    secureTextEntry={!showCurrent}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.rightIconButton}
                    activeOpacity={0.7}
                    onPress={() => setShowCurrent(!showCurrent)}
                    accessibilityLabel={showCurrent ? 'Hide password' : 'Show password'}
                  >
                    {renderEyeIcon(showCurrent)}
                  </TouchableOpacity>
                </View>
              </View>

              {/* New Password */}
              <View style={styles.inputFieldWrapper}>
                <Text style={styles.inputLabel}>NEW PASSWORD</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.leftIconContainer}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        stroke="#64748b"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter new password"
                    placeholderTextColor="#64748b"
                    secureTextEntry={!showNew}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.rightIconButton}
                    activeOpacity={0.7}
                    onPress={() => setShowNew(!showNew)}
                    accessibilityLabel={showNew ? 'Hide password' : 'Show password'}
                  >
                    {renderEyeIcon(showNew)}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm New Password */}
              <View style={styles.inputFieldWrapper}>
                <Text style={styles.inputLabel}>CONFIRM NEW PASSWORD</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.leftIconContainer}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        stroke="#64748b"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Re-enter new password"
                    placeholderTextColor="#64748b"
                    secureTextEntry={!showConfirm}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.rightIconButton}
                    activeOpacity={0.7}
                    onPress={() => setShowConfirm(!showConfirm)}
                    accessibilityLabel={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {renderEyeIcon(showConfirm)}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Requirements Box */}
              <View style={styles.requirementsBox}>
                <Text style={styles.requirementsTitle}>YOUR PASSWORD MUST HAVE</Text>
                {renderRequirementCheck(hasMinLength, 'At least 8 characters')}
                {renderRequirementCheck(hasUppercase, 'One uppercase letter')}
                {renderRequirementCheck(hasNumber, 'One number')}
              </View>
            </View>

            {/* Bottom Actions */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleUpdatePassword}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={['#EA580C', '#C2410C']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.updateButton}
                >
                  <Text style={styles.updateButtonText}>
                    {isSubmitting ? 'Updating...' : 'Update password'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forgotLinkButton}
                activeOpacity={0.7}
                onPress={onForgotPassword}
              >
                <Text style={styles.forgotLinkText}>
                  Forgot your current password?
                </Text>
              </TouchableOpacity>
            </View>
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
  keyboardAvoid: {
    flex: 1,
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
    justifyContent: 'space-between',
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
  title: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48,
    lineHeight: 29,
    color: '#020617',
  },
  formGroup: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  inputFieldWrapper: {
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
  inputContainer: {
    position: 'relative',
    height: 48,
    width: '100%',
  },
  leftIconContainer: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  textInput: {
    width: '100%',
    height: 48,
    paddingLeft: 44,
    paddingRight: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontFamily: 'System',
    fontSize: 14,
    color: '#0f172a',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  rightIconButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  requirementsBox: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  requirementRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  requirementMetBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requirementUnmetCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#94a3b8',
  },
  requirementText: {
    fontSize: 13,
    color: '#475569',
  },
  requirementTextMet: {
    color: '#0f172a',
    fontWeight: '500',
  },
  bottomSection: {
    marginTop: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  updateButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.4,
  },
  forgotLinkButton: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  forgotLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EA580C',
    textAlign: 'center',
  },
});
