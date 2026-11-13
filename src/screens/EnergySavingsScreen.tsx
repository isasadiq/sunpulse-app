import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface EnergySavingsScreenProps {
  siteName?: string;
  onBack?: () => void;
}

type TimeRange = 'week' | 'month' | 'year';

interface BarData {
  label: string;
  value: number;
  heightPercent: number; // 0 to 100
  isActive?: boolean;
}

interface HistoryRow {
  period: string;
  producedText: string;
  savedAmount: string;
}

export const EnergySavingsScreen: React.FC<EnergySavingsScreenProps> = ({
  siteName = 'Main Residence',
  onBack,
}) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('month');

  // Dynamic content based on selected range
  const getContent = () => {
    switch (selectedRange) {
      case 'week':
        return {
          heroPeriod: 'This week',
          heroProduced: '102',
          heroUnit: 'kWh',
          heroSaved: '₦16,800',
          chartTitle: 'kWh per day',
          chartSubtitle: 'Last 7 days',
          bars: [
            { label: 'M', value: 14, heightPercent: 70 },
            { label: 'T', value: 15, heightPercent: 75 },
            { label: 'W', value: 16, heightPercent: 80 },
            { label: 'T', value: 13, heightPercent: 65 },
            { label: 'F', value: 15, heightPercent: 75 },
            { label: 'S', value: 14, heightPercent: 70 },
            { label: 'S', value: 15, heightPercent: 75, isActive: true },
          ] as BarData[],
          historyTitle: 'Earlier weeks',
          historySubtitle: 'Saved',
          historyItems: [
            { period: 'Week 3 (Oct 21–27)', producedText: '110 kWh produced', savedAmount: '₦18,200' },
            { period: 'Week 2 (Oct 14–20)', producedText: '104 kWh produced', savedAmount: '₦17,100' },
            { period: 'Week 1 (Oct 7–13)', producedText: '96 kWh produced', savedAmount: '₦15,800' },
          ] as HistoryRow[],
        };
      case 'year':
        return {
          heroPeriod: '2026 so far',
          heroProduced: '3,840',
          heroUnit: 'kWh',
          heroSaved: '₦635,000',
          chartTitle: 'kWh per quarter',
          chartSubtitle: 'This year',
          bars: [
            { label: 'Q1', value: 920, heightPercent: 72 },
            { label: 'Q2', value: 1040, heightPercent: 82 },
            { label: 'Q3', value: 1120, heightPercent: 88 },
            { label: 'Q4', value: 760, heightPercent: 60, isActive: true },
          ] as BarData[],
          historyTitle: 'Earlier years',
          historySubtitle: 'Saved',
          historyItems: [
            { period: '2025 Full year', producedText: '4,120 kWh produced', savedAmount: '₦680,000' },
            { period: '2024 (Installed Jun)', producedText: '2,240 kWh produced', savedAmount: '₦368,000' },
          ] as HistoryRow[],
        };
      case 'month':
      default:
        return {
          heroPeriod: 'November so far',
          heroProduced: '412',
          heroUnit: 'kWh',
          heroSaved: '₦68,400',
          chartTitle: 'kWh per week',
          chartSubtitle: 'Last 4 weeks',
          bars: [
            { label: 'Wk 1', value: 96, heightPercent: 79 },
            { label: 'Wk 2', value: 104, heightPercent: 85 },
            { label: 'Wk 3', value: 110, heightPercent: 90 },
            { label: 'Wk 4', value: 102, heightPercent: 83, isActive: true },
          ] as BarData[],
          historyTitle: 'Earlier months',
          historySubtitle: 'Saved',
          historyItems: [
            { period: 'October 2026', producedText: '398 kWh produced', savedAmount: '₦65,200' },
            { period: 'September 2026', producedText: '376 kWh produced', savedAmount: '₦61,000' },
            { period: 'August 2026', producedText: '350 kWh produced', savedAmount: '₦57,300' },
          ] as HistoryRow[],
        };
    }
  };

  const content = getContent();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={onBack}
            accessibilityLabel="Back to home"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </Svg>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Energy and savings</Text>
            <Text style={styles.headerSubtitle}>{siteName}</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Time Range Filter Pills */}
          <View style={styles.filterRow}>
            {(['week', 'month', 'year'] as TimeRange[]).map((range) => {
              const active = selectedRange === range;
              const label = range.charAt(0).toUpperCase() + range.slice(1);
              return (
                <TouchableOpacity
                  key={range}
                  style={[styles.filterPill, active ? styles.filterPillActive : styles.filterPillInactive]}
                  activeOpacity={0.75}
                  onPress={() => setSelectedRange(range)}
                >
                  <Text style={[styles.filterPillText, active ? styles.filterPillTextActive : styles.filterPillTextInactive]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Hero Dark Summary Card */}
          <View style={styles.heroCard}>
            <LinearGradient
              colors={['rgba(220, 38, 38, 0.35)', 'transparent']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.3, y: 0.7 }}
              style={styles.heroGlowOverlay}
            />
            <Text style={styles.heroPeriodText}>{content.heroPeriod}</Text>
            <View style={styles.heroMetricsRow}>
              <View style={styles.heroMetricCol}>
                <Text style={styles.heroMetricLabel}>Energy produced</Text>
                <View style={styles.heroValueGroup}>
                  <Text style={styles.heroValueText}>{content.heroProduced}</Text>
                  <Text style={styles.heroUnitText}>{content.heroUnit}</Text>
                </View>
              </View>

              <View style={styles.heroColDivider} />

              <View style={[styles.heroMetricCol, styles.heroMetricColRight]}>
                <Text style={styles.heroMetricLabel}>You saved</Text>
                <Text style={styles.heroValueText}>{content.heroSaved}</Text>
              </View>
            </View>
          </View>

          {/* kWh Bar Chart Card */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardHeaderTitle}>{content.chartTitle}</Text>
              <Text style={styles.cardHeaderSubtitle}>{content.chartSubtitle}</Text>
            </View>

            <View style={styles.chartContainer}>
              {content.bars.map((bar, index) => {
                const barHeight = Math.max(16, (bar.heightPercent / 100) * 88);
                return (
                  <View key={index} style={styles.barCol}>
                    <Text style={[styles.barValText, bar.isActive && styles.barValTextActive]}>
                      {bar.value}
                    </Text>
                    <View style={styles.barTrack}>
                      {bar.isActive ? (
                        <LinearGradient
                          colors={['#dc2626', '#b91c1c']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={[styles.barBar, { height: barHeight }]}
                        />
                      ) : (
                        <View style={[styles.barBar, styles.barInactive, { height: barHeight }]} />
                      )}
                    </View>
                    <Text style={styles.barLabelText}>{bar.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Earlier Months / Breakdown Card */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardHeaderTitle}>{content.historyTitle}</Text>
              <Text style={styles.cardHeaderSubtitle}>{content.historySubtitle}</Text>
            </View>

            <View style={styles.historyList}>
              {content.historyItems.map((item, index) => {
                const isLast = index === content.historyItems.length - 1;
                return (
                  <View key={index} style={[styles.historyRow, !isLast && styles.historyRowBorder]}>
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyPeriodText}>{item.period}</Text>
                      <Text style={styles.historySubText}>{item.producedText}</Text>
                    </View>
                    <Text style={styles.historyAmountText}>{item.savedAmount}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Footnote Caption */}
          <Text style={styles.footnoteText}>
            Savings are estimated from the diesel price saved for your site.
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
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
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
    lineHeight: 26,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
    gap: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPillActive: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  filterPillInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterPillText: {
    fontFamily: 'System',
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#ffffff',
  },
  filterPillTextInactive: {
    color: '#334155',
  },
  heroCard: {
    position: 'relative',
    borderRadius: 20,
    padding: 18,
    paddingHorizontal: 20,
    backgroundColor: '#0f172a',
    shadowColor: '#0f172a',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    overflow: 'hidden',
  },
  heroGlowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroPeriodText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#cbd5e1',
  },
  heroMetricsRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  heroMetricCol: {
    flex: 1,
  },
  heroMetricColRight: {
    paddingLeft: 20,
  },
  heroColDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  heroMetricLabel: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  heroValueGroup: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  heroValueText: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#ffffff',
    lineHeight: 32,
  },
  heroUnitText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  card: {
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardHeaderTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
  },
  cardHeaderSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  chartContainer: {
    marginTop: 10,
    height: 134,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  barValText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  barValTextActive: {
    color: '#0f172a',
  },
  barTrack: {
    width: '100%',
    maxWidth: 44,
    height: 90,
    justifyContent: 'flex-end',
  },
  barBar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  barInactive: {
    backgroundColor: '#cbd5e1',
  },
  barLabelText: {
    fontSize: 12,
    color: '#64748b',
  },
  historyList: {
    marginTop: 4,
  },
  historyRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  historyInfo: {
    justifyContent: 'center',
  },
  historyPeriodText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  historySubText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  historyAmountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  footnoteText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
    marginTop: 2,
  },
});
