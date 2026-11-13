import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface ShimmerBlockProps {
  style?: StyleProp<ViewStyle>;
  dark?: boolean;
}

const ShimmerBlock: React.FC<ShimmerBlockProps> = ({ style, dark = false }) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        dark ? styles.shimmerDark : styles.shimmerLight,
        style,
        { opacity: pulseAnim },
      ]}
    />
  );
};

export const HomeSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Header Skeleton */}
      <View style={styles.header}>
        {/* Site Switcher Pill */}
        <ShimmerBlock style={styles.siteButtonSkeleton} />
        {/* Notification Button */}
        <ShimmerBlock style={styles.notificationButtonSkeleton} />
      </View>

      {/* 2. Hero Solar Telemetry Card Skeleton */}
      <View style={styles.heroCard}>
        {/* Top row: Label + Live Badge */}
        <View style={styles.heroTopRow}>
          <ShimmerBlock dark style={styles.heroLabelSkeleton} />
          <ShimmerBlock dark style={styles.heroLiveBadgeSkeleton} />
        </View>

        {/* Big generation readout */}
        <View style={styles.heroReadoutRow}>
          <ShimmerBlock dark style={styles.heroValueSkeleton} />
          <ShimmerBlock dark style={styles.heroUnitSkeleton} />
        </View>

        {/* Bottom divider with Load & Battery */}
        <View style={styles.heroBottomDivider}>
          {/* Load */}
          <View style={styles.heroCol}>
            <ShimmerBlock dark style={styles.heroColLabel} />
            <ShimmerBlock dark style={styles.heroColVal} />
          </View>

          {/* Battery */}
          <View style={styles.heroCol}>
            <ShimmerBlock dark style={styles.heroColLabel} />
            <View style={styles.batteryRow}>
              <ShimmerBlock dark style={styles.batteryVal} />
              <ShimmerBlock dark style={styles.batteryBar} />
            </View>
          </View>
        </View>
      </View>

      {/* 3. Power Flow Card Skeleton */}
      <View style={styles.card}>
        <ShimmerBlock style={styles.cardTitleSkeleton} />

        {/* Flow diagram circles and connectors */}
        <View style={styles.powerFlowRow}>
          {/* Node 1: Solar */}
          <View style={styles.nodeCol}>
            <ShimmerBlock style={styles.nodeCircle} />
            <ShimmerBlock style={styles.nodeLabel} />
            <ShimmerBlock style={styles.nodeValue} />
          </View>

          {/* Line 1 */}
          <ShimmerBlock style={styles.connectorLine} />

          {/* Node 2: Home */}
          <View style={styles.nodeCol}>
            <ShimmerBlock style={styles.nodeCircle} />
            <ShimmerBlock style={styles.nodeLabel} />
            <ShimmerBlock style={styles.nodeValue} />
          </View>

          {/* Line 2 */}
          <ShimmerBlock style={styles.connectorLine} />

          {/* Node 3: Battery */}
          <View style={styles.nodeCol}>
            <ShimmerBlock style={styles.nodeCircle} />
            <ShimmerBlock style={styles.nodeLabel} />
            <ShimmerBlock style={styles.nodeValue} />
          </View>
        </View>
      </View>

      {/* 4. Dual Metrics Row Skeleton */}
      <View style={styles.metricsRow}>
        {/* Card 1: Today */}
        <View style={styles.metricCard}>
          <ShimmerBlock style={styles.metricLabelSkeleton} />
          <ShimmerBlock style={styles.metricValSkeleton} />
          <ShimmerBlock style={styles.metricSubSkeleton} />
        </View>

        {/* Card 2: Diesel Saved */}
        <View style={styles.metricCard}>
          <ShimmerBlock style={styles.metricLabelSkeleton} />
          <ShimmerBlock style={styles.metricValSkeleton} />
          <ShimmerBlock style={styles.metricSubSkeleton} />
        </View>
      </View>

      {/* 5. Today's Generation Wave Curve Skeleton */}
      <View style={styles.card}>
        <View style={styles.chartHeader}>
          <ShimmerBlock style={styles.chartTitleSkeleton} />
          <ShimmerBlock style={styles.chartUnitSkeleton} />
        </View>

        {/* Wave placeholder simulation */}
        <View style={styles.chartArea}>
          <ShimmerBlock style={styles.chartWavePlaceholder} />
        </View>

        {/* Timeline hours placeholder */}
        <View style={styles.timelineRow}>
          <ShimmerBlock style={styles.timeTag} />
          <ShimmerBlock style={styles.timeTag} />
          <ShimmerBlock style={styles.timeTag} />
          <ShimmerBlock style={styles.timeTag} />
          <ShimmerBlock style={styles.timeTag} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  shimmerLight: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },
  shimmerDark: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  siteButtonSkeleton: {
    width: 175,
    height: 44,
    borderRadius: 12,
  },
  notificationButtonSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  heroCard: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 8,
  },
  heroTopRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabelSkeleton: {
    width: 120,
    height: 14,
    borderRadius: 4,
  },
  heroLiveBadgeSkeleton: {
    width: 54,
    height: 24,
    borderRadius: 999,
  },
  heroReadoutRow: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  heroValueSkeleton: {
    width: 110,
    height: 46,
    borderRadius: 10,
  },
  heroUnitSkeleton: {
    width: 32,
    height: 20,
    borderRadius: 4,
  },
  heroBottomDivider: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  heroCol: {
    flex: 1,
  },
  heroColLabel: {
    width: 45,
    height: 12,
    borderRadius: 4,
  },
  heroColVal: {
    marginTop: 6,
    width: 75,
    height: 22,
    borderRadius: 6,
  },
  batteryRow: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  batteryVal: {
    width: 38,
    height: 22,
    borderRadius: 6,
  },
  batteryBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitleSkeleton: {
    width: 90,
    height: 14,
    borderRadius: 4,
  },
  powerFlowRow: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nodeCol: {
    alignItems: 'center',
    width: 58,
  },
  nodeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  nodeLabel: {
    marginTop: 8,
    width: 34,
    height: 11,
    borderRadius: 3,
  },
  nodeValue: {
    marginTop: 4,
    width: 48,
    height: 13,
    borderRadius: 4,
  },
  connectorLine: {
    flex: 1,
    height: 3,
    marginHorizontal: 4,
    marginBottom: 26,
    borderRadius: 2,
  },
  metricsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricLabelSkeleton: {
    width: 55,
    height: 12,
    borderRadius: 4,
  },
  metricValSkeleton: {
    marginTop: 8,
    width: 85,
    height: 26,
    borderRadius: 6,
  },
  metricSubSkeleton: {
    marginTop: 6,
    width: 95,
    height: 12,
    borderRadius: 4,
  },
  chartHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartTitleSkeleton: {
    width: 130,
    height: 14,
    borderRadius: 4,
  },
  chartUnitSkeleton: {
    width: 22,
    height: 14,
    borderRadius: 4,
  },
  chartArea: {
    marginTop: 10,
    height: 60,
    justifyContent: 'center',
  },
  chartWavePlaceholder: {
    width: '100%',
    height: 48,
    borderRadius: 10,
  },
  timelineRow: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeTag: {
    width: 28,
    height: 10,
    borderRadius: 3,
  },
});

