import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const SUNPULSE_WORDMARK = require('../../assets/sunpulse-logo.png');

export interface EngineerTicketResolvedScreenProps {
  ticketNumber?: string;
  problemTitle?: string;
  siteName?: string;
  resolvedTime?: string;
  repairNotesStatus?: string;
  onBackToTickets?: () => void;
  onBackToJobs?: () => void;
}

export const EngineerTicketResolvedScreen: React.FC<EngineerTicketResolvedScreenProps> = ({
  ticketNumber = '#1042',
  problemTitle = 'Inverter error',
  siteName = 'Kaduna Clinic',
  resolvedTime = 'Today, 11:05 am',
  repairNotesStatus = 'Saved',
  onBackToTickets,
  onBackToJobs,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with SUNPULSE Logo */}
          <View style={styles.header}>
            <Image
              source={SUNPULSE_WORDMARK}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Main Success Content */}
          <View style={styles.mainContent}>
            {/* Concentric Circle Icon */}
            <View style={styles.outerCircle}>
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.innerCircle}
              >
                <Svg width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.6}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </Svg>
              </LinearGradient>
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.title}>Ticket resolved</Text>
            <Text style={styles.subtitle}>
              The fault is marked as fixed. The client will be told that the ticket is resolved.
            </Text>

            {/* Summary Card */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Ticket</Text>
                <Text style={styles.rowValue}>{ticketNumber}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Problem</Text>
                <Text style={styles.rowValue}>{problemTitle}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Site</Text>
                <Text style={styles.rowValue}>{siteName}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Resolved</Text>
                <Text style={styles.rowValue}>{resolvedTime}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Repair notes</Text>
                <Text style={styles.rowValue}>{repairNotesStatus}</Text>
              </View>

              <View style={[styles.summaryRow, styles.summaryRowLast]}>
                <Text style={styles.rowLabel}>Status</Text>
                <View style={styles.resolvedBadge}>
                  <Text style={styles.resolvedBadgeText}>Resolved</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.primaryButtonWrapper}
                activeOpacity={0.85}
                onPress={onBackToTickets}
              >
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.primaryButtonGradient}
                >
                  <Text style={styles.primaryButtonText}>Back to tickets</Text>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </Svg>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.75}
                onPress={onBackToJobs}
              >
                <Text style={styles.secondaryButtonText}>Back to jobs</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Offline Notice */}
          <View style={styles.footer}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8}>
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </Svg>
            <Text style={styles.footerText}>
              Your repair notes are kept on this phone and synced when 4G returns.
            </Text>
          </View>
        </ScrollView>
      </View>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoImage: {
    width: 150,
    height: 40,
  },
  mainContent: {
    alignItems: 'center',
    marginVertical: 'auto',
  },
  outerCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 30,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 310,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    color: '#64748b',
    textAlign: 'center',
  },
  summaryCard: {
    marginTop: 26,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  summaryRowLast: {
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
  resolvedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  resolvedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
  actionsContainer: {
    marginTop: 24,
    width: '100%',
    gap: 12,
  },
  primaryButtonWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 24,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
