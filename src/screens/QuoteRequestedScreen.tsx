import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface QuoteRequestedScreenProps {
  requestNumber?: string;
  upgrade?: string;
  siteName?: string;
  contactMethod?: string;
  visitTiming?: string;
  status?: string;
  onBackToHome?: () => void;
  onBackToMore?: () => void;
}

export const QuoteRequestedScreen: React.FC<QuoteRequestedScreenProps> = ({
  requestNumber = '#Q-0215',
  upgrade = '+2.2 kWp · +5 kWh',
  siteName = 'Main Residence',
  contactMethod = 'Phone call',
  visitTiming = 'Next week',
  status = 'Received',
  onBackToHome,
  onBackToMore,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.contentWrapper}>
          {/* Header: SUNPULSE Logo */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/sunpulse-logo-transparent.png')}
              style={styles.logoImage}
              resizeMode="contain"
              accessibilityLabel="SUNPULSE Logo"
            />
          </View>

          {/* Main Success Content */}
          <View style={styles.mainContent}>
            {/* Hero Success Badge */}
            <View style={styles.heroOuterCircle}>
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.heroInnerCircle}
              >
                <Svg width={38} height={38} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M4.5 12.75l6 6 9-13.5"
                    stroke="#ffffff"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </LinearGradient>
            </View>

            {/* Heading & Subtext */}
            <Text style={styles.title}>Quote requested</Text>
            <Text style={styles.subtitle}>
              Thank you. A SUNPULSE team member will contact you to arrange a site visit and confirm your quote.
            </Text>

            {/* Quote Request Information Card */}
            <View style={styles.detailsCard}>
              <View style={styles.cardRow}>
                <Text style={styles.rowLabel}>Request</Text>
                <Text style={styles.rowValue}>{requestNumber}</Text>
              </View>

              <View style={styles.cardRow}>
                <Text style={styles.rowLabel}>Upgrade</Text>
                <Text style={styles.rowValue}>{upgrade}</Text>
              </View>

              <View style={styles.cardRow}>
                <Text style={styles.rowLabel}>Site</Text>
                <Text style={styles.rowValue}>{siteName}</Text>
              </View>

              <View style={styles.cardRow}>
                <Text style={styles.rowLabel}>Contact</Text>
                <Text style={styles.rowValue}>{contactMethod}</Text>
              </View>

              <View style={styles.cardRow}>
                <Text style={styles.rowLabel}>Visit</Text>
                <Text style={styles.rowValue}>{visitTiming}</Text>
              </View>

              <View style={[styles.cardRow, styles.cardRowLast]}>
                <Text style={styles.rowLabel}>Status</Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>{status}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionGroup}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onBackToHome}
              >
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>Back to home</Text>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      stroke="#ffffff"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.75}
                onPress={onBackToMore}
              >
                <Text style={styles.secondaryButtonText}>Back to more</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Notice */}
          <View style={styles.footer}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={styles.footerIcon}>
              <Path
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.footerText}>
              You will get a notification here when your quote is ready.
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
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-start',
    paddingTop: 8,
    marginBottom: 8,
  },
  logoImage: {
    width: 140,
    height: 38,
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 12,
  },
  heroOuterCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#fef2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroInnerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    marginTop: 28,
    fontFamily: 'System',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 36,
    color: '#020617',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 310,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: '#64748b',
    textAlign: 'center',
  },
  detailsCard: {
    marginTop: 26,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 6,
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
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cardRowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    fontSize: 13,
    color: '#475569',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  statusPill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fef2f2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
  actionGroup: {
    marginTop: 24,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.4,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
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
