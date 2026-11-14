import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
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

interface PasswordUpdatedScreenProps {
  onContinueToSignIn: () => void;
}

export const PasswordUpdatedScreen: React.FC<PasswordUpdatedScreenProps> = ({
  onContinueToSignIn,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.contentWrapper}>
        {/* Header with SUNPULSE Logo */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} onPress={onContinueToSignIn}>
            <Image
              source={SUNPULSE_LOGO}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Center Main Content */}
        <View style={styles.main}>
          {/* Dual Circle Hero Visual with Radiant Crimson Gradient Checkmark */}
          <View style={styles.heroOuterCircle}>
            <LinearGradient
              colors={['#EA580C', '#C2410C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.heroInnerCircle}
            >
              <Svg
                width={44}
                height={44}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M4.5 12.75l6 6 9-13.5" />
              </Svg>
            </LinearGradient>
          </View>

          {/* Heading & Subtitle */}
          <Text style={styles.title}>Password updated</Text>
          <Text style={styles.subtitle}>
            Your password has been changed. You can now sign in with your new password.
          </Text>

          {/* Continue to sign in Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.submitButton}
              onPress={onContinueToSignIn}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Continue to sign in</Text>
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
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.shieldIconBox}>
            <Svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </Svg>
          </View>
          <Text style={styles.footerText}>
            Did not make this change?{' '}
            <Text style={styles.footerLink}>Contact your project manager</Text> right away.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfd', // Exact background from PasswordUpdated.dc.html
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
  },
  logoImage: {
    width: 150,
    height: 30,
  },

  /* Center Stage */
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  heroOuterCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroInnerCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },

  /* Headings */
  title: {
    marginTop: 36,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6, // -0.02em
    lineHeight: 36, // 1.2
    color: '#020617',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 300,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4, // 1.6
    color: '#64748b',
    textAlign: 'center',
  },

  /* Button */
  buttonContainer: {
    marginTop: 36,
    width: '100%',
  },
  submitButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonGradient: {
    flex: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4, // 0.025em
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
  shieldIconBox: {
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

