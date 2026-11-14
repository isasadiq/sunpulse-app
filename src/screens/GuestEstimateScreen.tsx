import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface GuestEstimateScreenProps {
  itemsCount?: number;
  generatorHours?: string;
  totalWatts?: number;
  onBack?: () => void;
  onRequestQuote?: () => void;
  onChangeAppliances?: () => void;
}

export const GuestEstimateScreen: React.FC<GuestEstimateScreenProps> = ({
  itemsCount = 10,
  generatorHours = '8 h',
  totalWatts = 810,
  onBack,
  onRequestQuote,
  onChangeAppliances,
}) => {
  // Calculations
  const calculatedSolarKwp = Math.max(1.5, +((totalWatts * 1.85) / 1000).toFixed(1));
  const estimatedPanelsCount = Math.max(3, Math.ceil(calculatedSolarKwp / 0.5));
  const calculatedBatteryKwh = Math.max(5, Math.ceil((totalWatts * 5) / 1000));

  // Generator fuel cost estimation (assuming petrol/diesel ~₦1,100/L in Nigeria, generator runs X hrs/day)
  const numericHours = parseInt(generatorHours, 10) || 8;
  const monthlyGenCostNum = Math.round(numericHours * 30 * 730 + 10000);
  const monthlySolarUpkeepNum = 15000;
  const monthlySavingsNum = monthlyGenCostNum - monthlySolarUpkeepNum;

  const formattedGenCost = `₦${monthlyGenCostNum.toLocaleString()}`;
  const formattedSolarCost = `₦${monthlySolarUpkeepNum.toLocaleString()}`;
  const formattedSavings = `₦${monthlySavingsNum.toLocaleString()}`;

  const solarBarPercent = Math.max(8, Math.min(25, Math.round((monthlySolarUpkeepNum / monthlyGenCostNum) * 100)));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={onBack || onChangeAppliances}
              accessibilityLabel="Back to appliances"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Your estimate</Text>
              <Text style={styles.headerSubtitle}>
                {itemsCount} {itemsCount === 1 ? 'item' : 'items'} · generator {generatorHours} a day
              </Text>
            </View>

            <Text style={styles.stepBadge}>Step 2 of 3</Text>
          </View>

          {/* Recommended System Card */}
          <View style={styles.recommendedCard}>
            <View style={styles.recommendedHeaderRow}>
              <Text style={styles.recommendedLabel}>RECOMMENDED SYSTEM</Text>
              <View style={styles.estimatePill}>
                <Text style={styles.estimatePillText}>Estimate</Text>
              </View>
            </View>

            <View style={styles.systemSpecsRow}>
              {/* Solar Panels Column */}
              <View style={styles.specColumn}>
                <Text style={styles.specLabel}>Solar panels</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.specValue}>{calculatedSolarKwp} </Text>
                  <Text style={styles.specUnit}>kWp</Text>
                </View>
                <Text style={styles.specDetail}>About {estimatedPanelsCount} panels</Text>
              </View>

              {/* Battery Column */}
              <View style={[styles.specColumn, styles.specColumnBordered]}>
                <Text style={styles.specLabel}>Battery</Text>
                <View style={styles.valueRow}>
                  <Text style={styles.specValue}>{calculatedBatteryKwh} </Text>
                  <Text style={styles.specUnit}>kWh</Text>
                </View>
                <Text style={styles.specDetail}>Lithium</Text>
              </View>
            </View>
          </View>

          {/* Monthly Cost Comparison Card */}
          <View style={styles.monthlyCostCard}>
            <Text style={styles.sectionHeading}>MONTHLY COST</Text>

            <View style={styles.comparisonRow}>
              {/* Diesel generator */}
              <View style={styles.costColumn}>
                <Text style={styles.costLabel}>Diesel generator</Text>
                <Text style={styles.costValueDark}>{formattedGenCost}</Text>
                <View style={styles.costBarTrack}>
                  <View style={styles.costBarFillDark} />
                </View>
                <Text style={styles.costSubtext}>Fuel and servicing</Text>
              </View>

              {/* With SUNPULSE solar */}
              <View style={[styles.costColumn, styles.costColumnBordered]}>
                <Text style={styles.costLabel}>With SUNPULSE solar</Text>
                <Text style={styles.costValueRed}>{formattedSolarCost}</Text>
                <View style={styles.costBarTrack}>
                  <LinearGradient
                    colors={['#EA580C', '#C2410C']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.costBarFillSolar, { width: `${solarBarPercent}%` }]}
                  />
                </View>
                <Text style={styles.costSubtext}>Upkeep only</Text>
              </View>
            </View>
          </View>

          {/* Two-card Metric Row */}
          <View style={styles.metricRow}>
            {/* You Save */}
            <View style={styles.metricCard}>
              <Text style={styles.sectionHeading}>YOU SAVE</Text>
              <Text style={styles.metricValue}>{formattedSavings}</Text>
              <Text style={styles.metricSubtext}>Per month</Text>
            </View>

            {/* Payback */}
            <View style={styles.metricCard}>
              <Text style={styles.sectionHeading}>PAYBACK</Text>
              <Text style={styles.metricValue}>About 2 yr</Text>
              <Text style={styles.metricSubtext}>Estimated</Text>
            </View>
          </View>

          {/* Disclaimer Info */}
          <View style={styles.disclaimerRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.disclaimerText}>
              This is a rough estimate. Fuel prices change, and an engineer confirms the final size after a site check.
            </Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.quoteButtonWrapper}
              activeOpacity={0.85}
              onPress={onRequestQuote}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.quoteButtonGradient}
              >
                <Text style={styles.quoteButtonText}>Request a quote</Text>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </Svg>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.changeButton}
              activeOpacity={0.75}
              onPress={onChangeAppliances || onBack}
            >
              <Text style={styles.changeButtonText}>Change appliances</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  stepBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  recommendedCard: {
    marginTop: 16,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#0f172a',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 4,
  },
  recommendedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendedLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#cbd5e1',
  },
  estimatePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  estimatePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  systemSpecsRow: {
    marginTop: 12,
    flexDirection: 'row',
  },
  specColumn: {
    flex: 1,
  },
  specColumnBordered: {
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.14)',
  },
  specLabel: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  valueRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  specValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.6,
  },
  specUnit: {
    fontSize: 15,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  specDetail: {
    marginTop: 2,
    fontSize: 12,
    color: '#cbd5e1',
  },
  monthlyCostCard: {
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
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
  sectionHeading: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  comparisonRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 12,
  },
  costColumn: {
    flex: 1,
  },
  costColumnBordered: {
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#f1f5f9',
  },
  costLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  costValueDark: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.4,
  },
  costValueRed: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '800',
    color: '#C2410C',
    letterSpacing: -0.4,
  },
  costBarTrack: {
    marginTop: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  costBarFillDark: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    backgroundColor: '#475569',
  },
  costBarFillSolar: {
    height: 8,
    borderRadius: 999,
  },
  costSubtext: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748b',
  },
  metricRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
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
  metricValue: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.4,
  },
  metricSubtext: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },
  disclaimerRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },
  quoteButtonWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 3,
  },
  quoteButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quoteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  changeButton: {
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
  changeButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
  },
});
