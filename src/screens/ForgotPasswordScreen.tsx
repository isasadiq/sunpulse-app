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
  Circle,
  Line,
  Defs,
  RadialGradient,
  Stop,
  Rect,
} from 'react-native-svg';

const SUNPULSE_LOGO = require('../../assets/sunpulse-logo-transparent.png');

interface ForgotPasswordScreenProps {
  onBackToSignIn: () => void;
  onSendResetLink?: (email: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackToSignIn,
  onSendResetLink,
}) => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!email.trim()) {
      Alert.alert('Email required', 'Please enter your email address to receive a reset link.');
      return;
    }
    setIsSent(true);
    if (onSendResetLink) {
      onSendResetLink(email);
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
            {/* Top Navigation Bar */}
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backButton}
                onPress={onBackToSignIn}
                accessibilityLabel="Back to sign in"
              >
                <Svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#334155"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </Svg>
              </TouchableOpacity>

              <Image
                source={SUNPULSE_LOGO}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Content Section */}
            <View style={styles.contentBlock}>
              {/* Key Badge in Crimson Tone */}
              <View style={styles.keyBadge}>
                <Svg
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </Svg>
              </View>

              <Text style={styles.title}>Forgot password?</Text>
              <Text style={styles.subtitle}>
                No problem. Enter the email linked to your account and we will send you a link to reset your password.
              </Text>
            </View>

            {/* Form Fields & Submit */}
            <View style={styles.formSection}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Email address</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    emailFocused && styles.inputWrapperFocused,
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
                    >
                      <Path
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-7.74 5.372a2.25 2.25 0 01-2.52 0L2.25 6.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="name@example.com"
                    placeholderTextColor="#64748b"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.submitButtonContainer}
                onPress={handleSubmit}
              >
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.submitGradient}
                >
                  <Text style={styles.submitText}>Send reset link</Text>
                  <Svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2.2}
                  >
                    <Path
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Support Callout Box */}
            <View style={styles.supportBox}>
              <View style={styles.infoIconBox}>
                <Svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth={1.8}
                >
                  <Circle cx={12} cy={12} r={10} />
                  <Line x1={12} y1={16} x2={12} y2={12} />
                  <Line x1={12} y1={8} x2={12.01} y2={8} />
                </Svg>
              </View>
              <Text style={styles.supportText}>
                {"Can't reach your email? "}
                <Text style={styles.supportLink}>Contact your project manager</Text> and they can help you get back in.
              </Text>
            </View>

            {/* Bottom Footer: Back to Sign In */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Remembered it?{' '}
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
    backgroundColor: '#fafbfd', // Exact background from ForgotPassword.dc.html
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
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoImage: {
    width: 130,
    height: 26,
  },

  /* Content */
  contentBlock: {
    marginTop: 56,
  },
  keyBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#fef2f2',
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

  /* Form */
  formSection: {
    marginTop: 32,
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
    borderColor: '#dc2626',
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
  submitButtonContainer: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    shadowColor: '#dc2626',
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

  /* Support Callout */
  supportBox: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoIconBox: {
    marginTop: 1,
  },
  supportText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19.5, // 1.5
    color: '#475569',
  },
  supportLink: {
    color: '#334155',
    fontWeight: '600',
    textDecorationLine: 'underline',
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
    color: '#dc2626',
    fontWeight: '600',
  },
});

