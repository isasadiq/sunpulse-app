import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Path,
  Circle,
  Line,
} from 'react-native-svg';

export interface SecurityScreenProps {
  onBack?: () => void;
  onChangePassword?: () => void;
  onSignOut?: () => void;
  initialBiometricsEnabled?: boolean;
}

export const SecurityScreen: React.FC<SecurityScreenProps> = ({
  onBack,
  onChangePassword,
  onSignOut,
  initialBiometricsEnabled = true,
}) => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(initialBiometricsEnabled);

  const handleToggleBiometrics = () => {
    const nextVal = !biometricsEnabled;
    setBiometricsEnabled(nextVal);
    if (!nextVal) {
      Alert.alert(
        'Biometric Sign In Disabled',
        'You will be prompted to enter your password the next time you sign into SUNPULSE.'
      );
    } else {
      Alert.alert(
        'Biometric Sign In Enabled',
        'Fingerprint or Face ID has been enabled for faster and secure sign in.'
      );
    }
  };

  const handleSignOutOtherDevices = () => {
    Alert.alert(
      'Sign Out of Other Devices?',
      'This will revoke access on all other phones, tablets, and desktop browsers currently signed into your SUNPULSE account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out Others',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Sessions Revoked',
              'All other devices have been signed out. This device remains active.'
            );
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your SUNPULSE account? This will permanently delete your personal profile and mobile access credentials.\n\nInstallation passports, system warranties, and service records will remain safely registered with your commercial site.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Account Deletion Requested',
              'Your account deletion request has been submitted. You will be signed out immediately.',
              [{ text: 'OK', onPress: onSignOut }]
            );
          },
        },
      ]
    );
  };

  const handleChangePasswordPress = () => {
    if (onChangePassword) {
      onChangePassword();
    } else {
      Alert.alert(
        'Change Password',
        'A secure password reset link can be sent to your registered email.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Send Reset Link',
            onPress: () => {
              Alert.alert('Email Sent', 'Instructions to change your password have been sent to your email.');
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={onBack}
              accessibilityLabel="Back to more"
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
            <Text style={styles.title}>Security</Text>
          </View>

          {/* Section: SIGN IN */}
          <Text style={styles.sectionHeader}>SIGN IN</Text>
          <View style={styles.card}>
            {/* Change password */}
            <TouchableOpacity
              style={styles.cardRow}
              activeOpacity={0.7}
              onPress={handleChangePasswordPress}
            >
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Change password</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Fingerprint or Face ID */}
            <View style={[styles.cardRow, styles.cardRowLast, { height: 64 }]}>
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M3 17v2a2 2 0 0 0 2 2h2"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Circle cx="9" cy="9" r="1.2" fill="#334155" />
                  <Circle cx="15" cy="9" r="1.2" fill="#334155" />
                  <Path
                    d="M12 12v2"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                  <Path
                    d="M10 16c.8.7 1.9 1 3 0"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Fingerprint or Face ID</Text>
                <Text style={styles.rowSubtitle}>Sign in faster on this phone</Text>
              </View>
              {/* Custom switch */}
              <TouchableOpacity
                style={[
                  styles.switchTrack,
                  biometricsEnabled ? styles.switchTrackActive : styles.switchTrackInactive,
                ]}
                activeOpacity={0.8}
                onPress={handleToggleBiometrics}
                accessibilityRole="switch"
                accessibilityState={{ checked: biometricsEnabled }}
                accessibilityLabel="Fingerprint or Face ID sign in"
              >
                <View
                  style={[
                    styles.switchThumb,
                    biometricsEnabled ? styles.switchThumbActive : styles.switchThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Section: DEVICES */}
          <Text style={styles.sectionHeader}>DEVICES</Text>
          <View style={styles.card}>
            {/* This phone */}
            <View style={[styles.cardRow, { height: 64 }]}>
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>This phone</Text>
                <Text style={styles.rowSubtitle}>Signed in now</Text>
              </View>
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Current</Text>
              </View>
            </View>

            {/* Sign out of other devices */}
            <TouchableOpacity
              style={[styles.cardRow, styles.cardRowLast]}
              activeOpacity={0.7}
              onPress={handleSignOutOtherDevices}
            >
              <View style={styles.dangerIconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    stroke="#EA580C"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.dangerRowTitle}>Sign out of other devices</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Section: ACCOUNT DELETION (Apple Guideline 5.1.1(v)) */}
          <Text style={styles.sectionHeader}>ACCOUNT</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.cardRow, styles.cardRowLast]}
              activeOpacity={0.7}
              onPress={handleDeleteAccount}
            >
              <View style={styles.dangerIconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    stroke="#EA580C"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.dangerRowTitle}>Delete account</Text>
                <Text style={styles.rowSubtitle}>Permanently remove mobile access</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer Notice */}
          <View style={styles.footerNotice}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={styles.footerIcon}>
              <Circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth={1.8} />
              <Line x1="12" y1="16" x2="12" y2="12" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" />
              <Line x1="12" y1="8" x2="12.01" y2="8" stroke="#64748b" strokeWidth={2} strokeLinecap="round" />
            </Svg>
            <Text style={styles.footerText}>
              SUNPULSE will never ask for your password by phone or message.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfd',
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
  sectionHeader: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  card: {
    marginTop: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardRow: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cardRowLast: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  rowSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  dangerRowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C2410C',
  },
  switchTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 3,
    justifyContent: 'center',
  },
  switchTrackActive: {
    backgroundColor: '#EA580C',
  },
  switchTrackInactive: {
    backgroundColor: '#cbd5e1',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  currentBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  currentBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
  footerNotice: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  footerIcon: {
    flexShrink: 0,
    marginTop: 2,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
