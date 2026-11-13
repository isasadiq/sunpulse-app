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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
} from 'react-native-svg';

const SUNPULSE_LOGO = require('../../assets/sunpulse-logo-transparent.png');

interface LoginScreenProps {
  onBackToSplash?: () => void;
  onForgotPassword?: () => void;
  onLoginSuccess?: (email: string) => void;
  onCalculateROI?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBackToSplash,
  onForgotPassword,
  onLoginSuccess,
  onCalculateROI,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSignIn = () => {
    Keyboard.dismiss();
    if (onLoginSuccess) {
      onLoginSuccess(email);
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
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.logoGroup}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onBackToSplash}
                  style={styles.brandRow}
                >
                  <Image
                    source={SUNPULSE_LOGO}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.brandName}>
                    Sun<Text style={{ color: '#EA580C' }}>Pulse</Text>
                  </Text>
                </TouchableOpacity>
                <Text style={styles.tagline}>Power You Can See</Text>
              </View>

              <View style={styles.titleBlock}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>
                  Sign in to your solar management workspace
                </Text>
              </View>
            </View>

            {/* Main Form Section */}
            <View style={styles.main}>
              <View style={styles.formFields}>
                {/* Email Address Field */}
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

                {/* Password Field */}
                <View style={styles.fieldGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldLabel}>Password</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={onForgotPassword}>
                      <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.inputWrapper,
                      passwordFocused && styles.inputWrapperFocused,
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
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                    <TextInput
                      style={[styles.textInput, styles.passwordInput]}
                      placeholder="Enter your password"
                      placeholderTextColor="#64748b"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                      accessibilityLabel="Toggle password visibility"
                    >
                      <Svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#64748b"
                        strokeWidth={1.75}
                      >
                        {showPassword ? (
                          <Path
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ) : (
                          <>
                            <Path
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <Path
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </>
                        )}
                      </Svg>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Action Row: Sign In Button + Biometrics Button */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.signInButtonContainer}
                    onPress={handleSignIn}
                  >
                    <LinearGradient
                      colors={['#EA580C', '#D97706']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.signInGradient}
                    >
                      <Text style={styles.signInText}>Sign in</Text>
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

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.biometricButton}
                    accessibilityLabel="Sign in with Face ID or Touch ID"
                    onPress={() => onLoginSuccess?.('user@sunpulse.ng')}
                  >
                    <Svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#334155"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <Path d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M3 17v2a2 2 0 0 0 2 2h2" />
                      <Circle cx={9} cy={9} r={1} fill="#334155" />
                      <Circle cx={15} cy={9} r={1} fill="#334155" />
                      <Path d="M12 12v2" />
                      <Path d="M10 16c.8.7 1.9 1 3 0" />
                    </Svg>
                  </TouchableOpacity>
                </View>

                {/* Instant Evaluation Demo Access */}
                <View style={styles.demoRolesContainer}>
                  <Text style={styles.demoRolesLabel}>Quick evaluation access:</Text>
                  <TouchableOpacity
                    style={styles.demoLoginButton}
                    activeOpacity={0.85}
                    onPress={() => onLoginSuccess?.('demo@sunpulse.ng')}
                  >
                    <View style={styles.demoLoginBox}>
                      <Text style={styles.demoLoginText}>⚡ Launch Live Solar Telemetry (Demo)</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* "NO ACCOUNT?" Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <View style={styles.dividerBadge}>
                  <Text style={styles.dividerText}>No solar system yet?</Text>
                </View>
              </View>

              {/* Calculate Solar ROI Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.roiButton}
                onPress={onCalculateROI}
              >
                <View style={styles.roiIconBox}>
                  <Svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#EA580C"
                    strokeWidth={2}
                  >
                    <Rect x={4} y={2} width={16} height={20} rx={2} />
                    <Line x1={8} y1={6} x2={16} y2={6} />
                    <Line x1={16} y1={14} x2={16} y2={18} />
                    <Path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" />
                  </Svg>
                </View>
                <Text style={styles.roiText}>Calculate Solar Sizing & ROI</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
              <View style={styles.footerRow}>
                <View style={styles.infoIconBox}>
                  <Svg
                    width={16}
                    height={16}
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
                <Text style={styles.footerText}>
                  SunPulse Clean Energy Telemetry · Connect your inverter in seconds with zero downtime.
                </Text>
              </View>
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
    backgroundColor: '#fafbfd', // Exact background from Main.dc.html
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
    display: 'flex',
    flexDirection: 'column',
  },
  logoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.2, // 0.22em
    textTransform: 'uppercase',
    color: '#64748b',
  },
  titleBlock: {
    marginTop: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6, // -0.02em
    lineHeight: 36, // 1.2
    color: '#020617',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4, // 1.6
    color: '#64748b',
  },

  /* Main Form Area */
  main: {
    marginTop: 28,
    flex: 1,
    justifyContent: 'center',
  },
  formFields: {
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
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc2626',
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

  /* Actions */
  actionRow: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  signInButtonContainer: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  signInGradient: {
    flex: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signInText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4, // 0.025em
  },
  biometricButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  demoRolesContainer: {
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
    gap: 6,
  },
  demoRolesLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#94a3b8',
  },
  demoLoginButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  demoLoginBox: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoLoginText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },

  /* Divider */
  dividerContainer: {
    marginVertical: 28,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerBadge: {
    paddingHorizontal: 14,
    backgroundColor: '#fafbfd',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1, // 0.1em
    textTransform: 'uppercase',
    color: '#64748b',
  },

  /* Secondary ROI Button */
  roiButton: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  roiIconBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roiText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
  },

  /* Footer */
  footer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoIconBox: {
    marginTop: 2,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18, // 1.5
    color: '#64748b',
  },
  footerLink: {
    color: '#334155',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

