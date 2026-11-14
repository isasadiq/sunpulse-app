import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
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

interface CheckEmailScreenProps {
  email?: string;
  onBackToSignIn: () => void;
  onBackToForgotPassword: () => void;
  onSimulateResetLinkReceived?: () => void;
  onResendLink?: () => void;
}

export const CheckEmailScreen: React.FC<CheckEmailScreenProps> = ({
  email = 'name@example.com',
  onBackToSignIn,
  onBackToForgotPassword,
  onSimulateResetLinkReceived,
  onResendLink,
}) => {
  const [resending, setResending] = useState(false);

  const handleOpenEmailApp = async () => {
    // If testing in simulator / browser, give option to open Set New Password directly
    if (onSimulateResetLinkReceived) {
      Alert.alert(
        'Simulate Email Link',
        'Open your email application or jump directly to the Set New Password screen to test the design?',
        [
          {
            text: 'Go to Set New Password',
            onPress: onSimulateResetLinkReceived,
          },
          {
            text: 'Launch Mail App',
            onPress: async () => {
              try {
                if (Platform.OS === 'ios') {
                  const canOpen = await Linking.canOpenURL('message:');
                  if (canOpen) {
                    await Linking.openURL('message:');
                    return;
                  }
                }
                await Linking.openURL('mailto:');
              } catch {
                // fallback
              }
            },
          },
        ]
      );
      return;
    }

    try {
      if (Platform.OS === 'ios') {
        const canOpen = await Linking.canOpenURL('message:');
        if (canOpen) {
          await Linking.openURL('message:');
          return;
        }
      }
      await Linking.openURL('mailto:');
    } catch {
      Alert.alert(
        'Email client',
        'Please open your email application to find the password reset instructions.'
      );
    }
  };

  const handleResend = () => {
    setResending(true);
    if (onResendLink) {
      onResendLink();
    }
    setTimeout(() => {
      setResending(false);
      Alert.alert('Link resent', `A fresh reset link has been dispatched to ${email}.`);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.contentWrapper}>
        {/* Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={onBackToForgotPassword}
            accessibilityLabel="Back to forgot password"
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

        {/* Center Main Stage */}
        <View style={styles.main}>
          {/* Dual Circle Hero Avatar */}
          <View style={styles.heroOuterCircle}>
            <View style={styles.heroInnerCircle}>
              <Svg
                width={38}
                height={38}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EA580C"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-7.74 5.372a2.25 2.25 0 01-2.52 0L2.25 6.75" />
              </Svg>
            </View>

            {/* Success Check Badge Pinned at Bottom-Right */}
            <View style={styles.checkBadge}>
              <Svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M4.5 12.75l6 6 9-13.5" />
              </Svg>
            </View>
          </View>

          {/* Heading & Target Email */}
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We sent a password reset link to</Text>
          <Text style={styles.emailText}>{email}</Text>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {/* Primary Open Email App Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.primaryButtonContainer}
              onPress={handleOpenEmailApp}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.primaryGradient}
              >
                <Svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-7.74 5.372a2.25 2.25 0 01-2.52 0L2.25 6.75" />
                </Svg>
                <Text style={styles.primaryButtonText}>Open email app</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary Back to sign in Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.secondaryButton}
              onPress={onBackToSignIn}
            >
              <Text style={styles.secondaryButtonText}>Back to sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Resend Link Prompt */}
          <Text style={styles.resendPrompt}>
            Did not get it? Check your spam folder, or{' '}
            <Text
              style={styles.resendLink}
              onPress={handleResend}
            >
              {resending ? 'resending...' : 'resend the link'}
            </Text>
            .
          </Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
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
            Wrong email address?{' '}
            <Text
              style={styles.footerLink}
              onPress={onBackToForgotPassword}
            >
              Go back and change it
            </Text>
            , or{' '}
            <Text style={styles.footerLink}>
              contact your project manager
            </Text>
            .
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfd', // Exact background from CheckEmail.dc.html
  },
  contentWrapper: {
    flex: 1,
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
    width: 36,
    height: 36,
    borderRadius: 8,
  },

  /* Center Main */
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  /* Hero Avatar */
  heroOuterCircle: {
    position: 'relative',
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroInnerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 6,
  },
  checkBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EA580C',
    borderWidth: 3,
    borderColor: '#fafbfd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Headings */
  title: {
    marginTop: 32,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6, // -0.02em
    lineHeight: 36, // 1.2
    color: '#020617',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4, // 1.6
    color: '#64748b',
    textAlign: 'center',
  },
  emailText: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },

  /* Actions */
  actionsContainer: {
    marginTop: 32,
    width: '100%',
    gap: 12,
  },
  primaryButtonContainer: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryGradient: {
    flex: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4, // 0.025em
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
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
  },

  /* Resend Prompt */
  resendPrompt: {
    marginTop: 28,
    fontSize: 13,
    lineHeight: 20.8, // 1.6
    color: '#64748b',
    textAlign: 'center',
  },
  resendLink: {
    color: '#EA580C',
    fontWeight: '600',
  },

  /* Footer */
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
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

