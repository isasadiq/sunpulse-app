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

export const ProjectSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Header: Site Switcher + Notification Bell Skeleton */}
      <View style={styles.header}>
        <ShimmerBlock style={styles.siteButtonSkeleton} />
        <ShimmerBlock style={styles.notificationButtonSkeleton} />
      </View>

      {/* 2. Installation Progress Dark Hero Card Skeleton */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <ShimmerBlock dark style={styles.heroLabelSkeleton} />
          <ShimmerBlock dark style={styles.heroPercentageSkeleton} />
        </View>

        <ShimmerBlock dark style={styles.heroProgressTrackSkeleton} />

        <ShimmerBlock dark style={styles.heroSubtitleSkeleton} />
      </View>

      {/* 3. Project Stages Stepper Card Skeleton */}
      <View style={styles.card}>
        <ShimmerBlock style={styles.cardTitleSkeleton} />

        <View style={styles.stepperContainer}>
          {/* Stage 1 */}
          <View style={styles.stageItem}>
            <ShimmerBlock style={styles.badgeSkeleton} />
            <View style={styles.connectorSkeleton} />
            <View style={styles.stageInfo}>
              <View>
                <ShimmerBlock style={styles.stageTitleSkeleton} />
                <ShimmerBlock style={styles.stageDateSkeleton} />
              </View>
            </View>
          </View>

          {/* Stage 2 */}
          <View style={styles.stageItem}>
            <ShimmerBlock style={styles.badgeSkeleton} />
            <View style={styles.connectorSkeleton} />
            <View style={styles.stageInfo}>
              <View>
                <ShimmerBlock style={[styles.stageTitleSkeleton, { width: 105 }]} />
                <ShimmerBlock style={[styles.stageDateSkeleton, { width: 120 }]} />
              </View>
            </View>
          </View>

          {/* Stage 3 (In progress with status badge) */}
          <View style={styles.stageItem}>
            <ShimmerBlock style={styles.badgeSkeleton} />
            <View style={styles.connectorSkeleton} />
            <View style={styles.stageInfo}>
              <View>
                <ShimmerBlock style={[styles.stageTitleSkeleton, { width: 95 }]} />
                <ShimmerBlock style={[styles.stageDateSkeleton, { width: 95 }]} />
              </View>
              <ShimmerBlock style={styles.inProgressPillSkeleton} />
            </View>
          </View>

          {/* Stage 4 */}
          <View style={styles.stageItem}>
            <ShimmerBlock style={styles.badgeSkeleton} />
            <View style={styles.connectorSkeleton} />
            <View style={styles.stageInfo}>
              <View>
                <ShimmerBlock style={[styles.stageTitleSkeleton, { width: 115 }]} />
                <ShimmerBlock style={[styles.stageDateSkeleton, { width: 65 }]} />
              </View>
            </View>
          </View>

          {/* Stage 5 */}
          <View style={[styles.stageItem, { height: 40 }]}>
            <ShimmerBlock style={styles.badgeSkeleton} />
            <View style={styles.stageInfo}>
              <View>
                <ShimmerBlock style={[styles.stageTitleSkeleton, { width: 85 }]} />
                <ShimmerBlock style={[styles.stageDateSkeleton, { width: 65 }]} />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 4. Site Photos Section Skeleton */}
      <View style={styles.photosSection}>
        <View style={styles.photosHeaderRow}>
          <ShimmerBlock style={styles.photosTitleSkeleton} />
          <ShimmerBlock style={styles.seeAllSkeleton} />
        </View>

        <View style={styles.photosRow}>
          {/* Photo 1 */}
          <View style={styles.photoItem}>
            <ShimmerBlock style={styles.photoBoxSkeleton} />
            <ShimmerBlock style={styles.photoCaptionSkeleton} />
          </View>

          {/* Photo 2 */}
          <View style={styles.photoItem}>
            <ShimmerBlock style={styles.photoBoxSkeleton} />
            <ShimmerBlock style={[styles.photoCaptionSkeleton, { width: 70 }]} />
          </View>

          {/* Photo 3 */}
          <View style={styles.photoItem}>
            <ShimmerBlock style={styles.photoBoxSkeleton} />
            <ShimmerBlock style={[styles.photoCaptionSkeleton, { width: 78 }]} />
          </View>
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

  /* Hero Card */
  heroCard: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 6,
  },
  heroTopRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabelSkeleton: {
    width: 145,
    height: 14,
    borderRadius: 4,
  },
  heroPercentageSkeleton: {
    width: 52,
    height: 26,
    borderRadius: 6,
  },
  heroProgressTrackSkeleton: {
    marginTop: 12,
    width: '100%',
    height: 8,
    borderRadius: 4,
  },
  heroSubtitleSkeleton: {
    marginTop: 10,
    width: 155,
    height: 13,
    borderRadius: 4,
  },

  /* Card */
  card: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 14,
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
  cardTitleSkeleton: {
    width: 110,
    height: 14,
    borderRadius: 4,
  },

  /* Stepper */
  stepperContainer: {
    marginTop: 16,
  },
  stageItem: {
    position: 'relative',
    height: 52,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  badgeSkeleton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  connectorSkeleton: {
    position: 'absolute',
    left: 11,
    top: 26,
    width: 2,
    height: 24,
    backgroundColor: '#e2e8f0',
  },
  stageInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stageTitleSkeleton: {
    width: 80,
    height: 15,
    borderRadius: 4,
  },
  stageDateSkeleton: {
    marginTop: 6,
    width: 105,
    height: 12,
    borderRadius: 4,
  },
  inProgressPillSkeleton: {
    width: 80,
    height: 24,
    borderRadius: 999,
  },

  /* Photos Section */
  photosSection: {
    marginTop: 2,
  },
  photosHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photosTitleSkeleton: {
    width: 90,
    height: 14,
    borderRadius: 4,
  },
  seeAllSkeleton: {
    width: 50,
    height: 14,
    borderRadius: 4,
  },
  photosRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  photoItem: {
    flex: 1,
  },
  photoBoxSkeleton: {
    height: 84,
    borderRadius: 12,
  },
  photoCaptionSkeleton: {
    marginTop: 6,
    width: 75,
    height: 12,
    borderRadius: 4,
  },
});
