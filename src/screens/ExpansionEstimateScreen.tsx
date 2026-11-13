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
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Path,
  Rect,
  Circle,
  Line,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';

export interface SelectedApplianceItem {
  name: string;
  count: number;
  watts: number;
}

interface ExpansionEstimateScreenProps {
  selectedItems?: SelectedApplianceItem[];
  totalWatts?: number;
  onBack?: () => void;
  onRequestQuote?: () => void;
  onRequestQuoteSuccess?: () => void;
}

export const ExpansionEstimateScreen: React.FC<ExpansionEstimateScreenProps> = ({
  selectedItems = [
    { name: 'Air conditioner', count: 1, watts: 1100 },
    { name: 'Deep freezer', count: 1, watts: 150 },
  ],
  totalWatts = 1250,
  onBack,
  onRequestQuote,
  onRequestQuoteSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computations
  const totalKW = (totalWatts / 1000).toFixed(1);
  const extraSolarKWp = Math.max(1.2, +( (totalWatts * 1.76) / 1000 ).toFixed(1));
  const panelCount = Math.max(2, Math.ceil((extraSolarKWp * 1000) / 550));
  const extraBatteryKWh = Math.max(2.5, Math.round((totalWatts * 4) / 1000));
  const dieselAvoidedPerMonth = Math.round(totalWatts * 48);

  const handleRequestQuote = () => {
    if (onRequestQuote) {
      onRequestQuote();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Quote Request Received',
        `Your solar expansion request (+${extraSolarKWp} kWp solar & +${extraBatteryKWh} kWh lithium storage) has been routed to your dedicated SUNPULSE project engineer. You will receive an engineering feasibility review within 24 hours.`,
        [
          {
            text: 'Return to Account',
            onPress: () => {
              if (onRequestQuoteSuccess) {
                onRequestQuoteSuccess();
              } else if (onBack) {
                onBack();
              }
            },
          },
        ]
      );
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={onBack}
              accessibilityLabel="Back to appliances"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your estimate</Text>
            <Text style={styles.stepBadge}>Step 2 of 2</Text>
          </View>

          {/* Hero Dark Card: Recommended Addition */}
          <View style={styles.heroCard}>
            <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
              <Defs>
                <RadialGradient id="estimateGlow" cx="100%" cy="0%" r="55%">
                  <Stop offset="0%" stopColor="#dc2626" stopOpacity="0.35" />
                  <Stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" rx={20} fill="url(#estimateGlow)" />
            </Svg>

            <View style={styles.heroTopRow}>
              <Text style={styles.heroLabel}>Recommended addition</Text>
              <View style={styles.estimatePill}>
                <Text style={styles.estimatePillText}>Estimate</Text>
              </View>
            </View>

            <View style={styles.heroReadoutRow}>
              {/* Extra Solar */}
              <View style={styles.heroCol}>
                <Text style={styles.heroColLabel}>Extra solar</Text>
                <Text style={styles.heroColVal}>
                  {extraSolarKWp}{' '}
                  <Text style={styles.heroColUnit}>kWp</Text>
                </Text>
                <Text style={styles.heroColSub}>About {panelCount} panels</Text>
              </View>

              {/* Extra Battery */}
              <View style={[styles.heroCol, styles.heroColRight]}>
                <Text style={styles.heroColLabel}>Extra battery</Text>
                <Text style={styles.heroColVal}>
                  {extraBatteryKWh}{' '}
                  <Text style={styles.heroColUnit}>kWh</Text>
                </Text>
                <Text style={styles.heroColSub}>Lithium</Text>
              </View>
            </View>
          </View>

          {/* "You are adding" Breakdown Card */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeaderRow}>
              <Text style={styles.sectionHeader}>You are adding</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.breakdownList}>
              {selectedItems.map((item, idx) => (
                <View key={item.name + idx} style={styles.breakdownItemRow}>
                  <Text style={styles.breakdownItemName}>
                    {item.name} × {item.count}
                  </Text>
                  <Text style={styles.breakdownItemWatts}>
                    {(item.watts * item.count).toLocaleString()} W
                  </Text>
                </View>
              ))}

              {/* Total Added Load */}
              <View style={styles.breakdownTotalRow}>
                <Text style={styles.breakdownTotalLabel}>Total added load</Text>
                <Text style={styles.breakdownTotalVal}>{totalKW} kW</Text>
              </View>
            </View>
          </View>

          {/* Dual Metrics Row */}
          <View style={styles.metricsRow}>
            {/* Diesel Avoided */}
            <View style={styles.metricCard}>
              <Text style={styles.sectionHeader}>Diesel avoided</Text>
              <Text style={styles.metricVal}>₦{dieselAvoidedPerMonth.toLocaleString()}</Text>
              <Text style={styles.metricSub}>Per month</Text>
            </View>

            {/* Payback */}
            <View style={styles.metricCard}>
              <Text style={styles.sectionHeader}>Payback</Text>
              <Text style={styles.metricVal}>About 3 yr</Text>
              <Text style={styles.metricSub}>Estimated</Text>
            </View>
          </View>

          {/* Disclaimer Note */}
          <View style={styles.disclaimerRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} style={{ marginTop: 2, flexShrink: 0 }}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.disclaimerText}>
              This is a rough estimate. An engineer confirms the final size after a site check.
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons Footer */}
        <View style={styles.footer}>
          {/* Primary Button */}
          <TouchableOpacity
            style={styles.primaryButtonWrapper}
            activeOpacity={0.85}
            onPress={handleRequestQuote}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>
                {isSubmitting ? 'Submitting request...' : 'Request upgrade quote'}
              </Text>
              {!isSubmitting && (
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </Svg>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Secondary Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.75}
            onPress={onBack}
          >
            <Text style={styles.secondaryButtonText}>Change appliances</Text>
          </TouchableOpacity>
        </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },

  /* Header */
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
  headerTitle: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48, // -0.02em
    lineHeight: 28.8,
    color: '#020617',
  },
  stepBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },

  /* Hero Card */
  heroCard: {
    marginTop: 18,
    position: 'relative',
    borderRadius: 20,
    padding: 18,
    backgroundColor: '#0f172a',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 6,
    overflow: 'hidden',
  },
  heroTopRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.96, // 0.08em
    textTransform: 'uppercase',
    color: '#cbd5e1',
  },
  estimatePill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  estimatePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  heroReadoutRow: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  heroCol: {
    flex: 1,
  },
  heroColRight: {
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.14)',
  },
  heroColLabel: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  heroColVal: {
    marginTop: 2,
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.96,
    lineHeight: 36.8,
    color: '#ffffff',
  },
  heroColUnit: {
    fontSize: 15,
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: 0,
  },
  heroColSub: {
    marginTop: 2,
    fontSize: 12,
    color: '#cbd5e1',
  },

  /* Breakdown Card */
  breakdownCard: {
    marginTop: 14,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 6,
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
  breakdownHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  editText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },
  breakdownList: {
    marginTop: 6,
  },
  breakdownItemRow: {
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  breakdownItemName: {
    fontSize: 14,
    color: '#0f172a',
  },
  breakdownItemWatts: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  breakdownTotalRow: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakdownTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  breakdownTotalVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  /* Metrics Row */
  metricsRow: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    paddingVertical: 14,
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
  metricVal: {
    marginTop: 6,
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.44,
    color: '#020617',
  },
  metricSub: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },

  /* Disclaimer */
  disclaimerRow: {
    marginTop: 12,
    paddingHorizontal: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#fafbfd',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  primaryButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonGradient: {
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
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
});
