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

export const SupportSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Header: Site Switcher + Notification Bell Skeleton */}
      <View style={styles.header}>
        <ShimmerBlock style={styles.siteButtonSkeleton} />
        <ShimmerBlock style={styles.notificationButtonSkeleton} />
      </View>

      {/* 2. 24/7 Support Desk Crimson Hero Banner Skeleton */}
      <View style={styles.heroBanner}>
        <View style={styles.heroBannerLeft}>
          <ShimmerBlock dark style={styles.heroTagSkeleton} />
          <ShimmerBlock dark style={styles.heroTitleSkeleton} />
        </View>
        <ShimmerBlock dark style={styles.reportFaultBtnSkeleton} />
      </View>

      {/* 3. Open Ticket Section Skeleton */}
      <View style={styles.sectionHeaderRow}>
        <ShimmerBlock style={styles.sectionHeaderSkeleton} />
      </View>

      <View style={styles.ticketCard}>
        {/* Top row */}
        <View style={styles.ticketTopRow}>
          <View>
            <ShimmerBlock style={styles.ticketTitleSkeleton} />
            <ShimmerBlock style={styles.ticketSubSkeleton} />
          </View>
          <ShimmerBlock style={styles.enRoutePillSkeleton} />
        </View>

        {/* Stepper row (4 steps) */}
        <View style={styles.stepperRow}>
          {/* Step 1 */}
          <View style={styles.stepperCol}>
            <View style={styles.stepperTrack}>
              <View style={styles.lineTransparent} />
              <ShimmerBlock style={styles.stepCircleSkeleton} />
              <View style={styles.lineTrackSkeleton} />
            </View>
            <ShimmerBlock style={styles.stepLabelSkeleton} />
          </View>

          {/* Step 2 */}
          <View style={styles.stepperCol}>
            <View style={styles.stepperTrack}>
              <View style={styles.lineTrackSkeleton} />
              <ShimmerBlock style={styles.stepCircleSkeleton} />
              <View style={styles.lineTrackSkeleton} />
            </View>
            <ShimmerBlock style={styles.stepLabelSkeleton} />
          </View>

          {/* Step 3 */}
          <View style={styles.stepperCol}>
            <View style={styles.stepperTrack}>
              <View style={styles.lineTrackSkeleton} />
              <ShimmerBlock style={styles.stepCircleSkeleton} />
              <View style={styles.lineTrackSkeleton} />
            </View>
            <ShimmerBlock style={styles.stepLabelSkeleton} />
          </View>

          {/* Step 4 */}
          <View style={styles.stepperCol}>
            <View style={styles.stepperTrack}>
              <View style={styles.lineTrackSkeleton} />
              <ShimmerBlock style={styles.stepCircleSkeleton} />
              <View style={styles.lineTransparent} />
            </View>
            <ShimmerBlock style={styles.stepLabelSkeleton} />
          </View>
        </View>

        {/* Engineer dispatch status row */}
        <View style={styles.engineerRow}>
          <ShimmerBlock style={styles.engineerAvatarSkeleton} />
          <ShimmerBlock style={styles.engineerTextSkeleton} />
          <ShimmerBlock style={styles.engineerEtaSkeleton} />
        </View>
      </View>

      {/* 4. Maintenance Visit Complete Card Skeleton */}
      <View style={styles.maintenanceCard}>
        <View style={styles.maintenanceHeaderRow}>
          <ShimmerBlock style={styles.checkIconBoxSkeleton} />
          <View style={{ flex: 1, gap: 6 }}>
            <ShimmerBlock style={styles.maintenanceTitleSkeleton} />
            <ShimmerBlock style={styles.maintenanceSubSkeleton} />
          </View>
        </View>

        <ShimmerBlock style={styles.signOffButtonSkeleton} />
      </View>

      {/* 5. Past Tickets Section Skeleton */}
      <View style={styles.pastHeaderRow}>
        <ShimmerBlock style={styles.pastHeaderTitleSkeleton} />
        <ShimmerBlock style={styles.seeAllSkeleton} />
      </View>

      <View style={styles.pastTicketCard}>
        <View style={{ gap: 6 }}>
          <ShimmerBlock style={styles.pastTicketTitleSkeleton} />
          <ShimmerBlock style={styles.pastTicketSubSkeleton} />
        </View>
        <ShimmerBlock style={styles.resolvedPillSkeleton} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
  },

  /* Header */
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

  /* Hero Banner */
  heroBanner: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#EA580C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  heroBannerLeft: {
    flex: 1,
    gap: 6,
  },
  heroTagSkeleton: {
    width: 120,
    height: 12,
    borderRadius: 4,
  },
  heroTitleSkeleton: {
    width: 160,
    height: 22,
    borderRadius: 6,
  },
  reportFaultBtnSkeleton: {
    width: 110,
    height: 44,
    borderRadius: 12,
  },

  /* Section Header */
  sectionHeaderRow: {
    marginTop: 2,
  },
  sectionHeaderSkeleton: {
    width: 90,
    height: 12,
    borderRadius: 4,
  },

  /* Open Ticket Card */
  ticketCard: {
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
  ticketTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  ticketTitleSkeleton: {
    width: 170,
    height: 16,
    borderRadius: 4,
  },
  ticketSubSkeleton: {
    marginTop: 6,
    width: 195,
    height: 12,
    borderRadius: 4,
  },
  enRoutePillSkeleton: {
    width: 68,
    height: 24,
    borderRadius: 999,
  },

  /* Stepper */
  stepperRow: {
    marginTop: 16,
    flexDirection: 'row',
  },
  stepperCol: {
    flex: 1,
    alignItems: 'center',
  },
  stepperTrack: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineTransparent: {
    flex: 1,
    height: 2,
    backgroundColor: 'transparent',
  },
  lineTrackSkeleton: {
    flex: 1,
    height: 2,
    backgroundColor: '#e2e8f0',
  },
  stepCircleSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  stepLabelSkeleton: {
    marginTop: 8,
    width: 50,
    height: 11,
    borderRadius: 3,
  },

  /* Engineer Row */
  engineerRow: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  engineerAvatarSkeleton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  engineerTextSkeleton: {
    flex: 1,
    height: 13,
    borderRadius: 4,
  },
  engineerEtaSkeleton: {
    width: 70,
    height: 13,
    borderRadius: 4,
  },

  /* Maintenance Card */
  maintenanceCard: {
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
  maintenanceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIconBoxSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  maintenanceTitleSkeleton: {
    width: 180,
    height: 16,
    borderRadius: 4,
  },
  maintenanceSubSkeleton: {
    width: 150,
    height: 12,
    borderRadius: 4,
  },
  signOffButtonSkeleton: {
    marginTop: 14,
    width: '100%',
    height: 44,
    borderRadius: 12,
  },

  /* Past Tickets */
  pastHeaderRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pastHeaderTitleSkeleton: {
    width: 80,
    height: 12,
    borderRadius: 4,
  },
  seeAllSkeleton: {
    width: 45,
    height: 12,
    borderRadius: 4,
  },
  pastTicketCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pastTicketTitleSkeleton: {
    width: 100,
    height: 15,
    borderRadius: 4,
  },
  pastTicketSubSkeleton: {
    width: 125,
    height: 12,
    borderRadius: 4,
  },
  resolvedPillSkeleton: {
    width: 65,
    height: 22,
    borderRadius: 999,
  },
});
