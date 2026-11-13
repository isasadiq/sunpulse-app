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
}

const ShimmerBlock: React.FC<ShimmerBlockProps> = ({ style }) => {
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
        styles.shimmerLight,
        style,
        { opacity: pulseAnim },
      ]}
    />
  );
};

export const DocumentsSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Header: Site Switcher + Notification Bell Skeleton */}
      <View style={styles.header}>
        <ShimmerBlock style={styles.siteSelectorSkeleton} />
        <ShimmerBlock style={styles.notificationButtonSkeleton} />
      </View>

      {/* 2. Title Section Skeleton */}
      <View style={styles.titleSection}>
        <ShimmerBlock style={styles.titleSkeleton} />
        <ShimmerBlock style={styles.subtitleSkeleton} />
      </View>

      {/* 3. Document Cards List Skeleton (4 items mirroring documents) */}
      <View style={styles.documentList}>
        {/* Document 1: Single Line Diagram */}
        <View style={styles.documentCard}>
          <ShimmerBlock style={styles.docIconBadgeSkeleton} />
          <View style={styles.documentInfo}>
            <ShimmerBlock style={styles.docTitleSkeleton} />
            <ShimmerBlock style={styles.docMetaSkeleton} />
          </View>
          <ShimmerBlock style={styles.actionButtonSkeleton} />
        </View>

        {/* Document 2: Warranty Certificate */}
        <View style={styles.documentCard}>
          <ShimmerBlock style={styles.docIconBadgeSkeleton} />
          <View style={styles.documentInfo}>
            <ShimmerBlock style={[styles.docTitleSkeleton, { width: 140 }]} />
            <ShimmerBlock style={[styles.docMetaSkeleton, { width: 105 }]} />
          </View>
          <ShimmerBlock style={styles.actionButtonSkeleton} />
        </View>

        {/* Document 3: User Manual */}
        <View style={styles.documentCard}>
          <ShimmerBlock style={styles.docIconBadgeSkeleton} />
          <View style={styles.documentInfo}>
            <ShimmerBlock style={[styles.docTitleSkeleton, { width: 100 }]} />
            <ShimmerBlock style={[styles.docMetaSkeleton, { width: 115 }]} />
          </View>
          <ShimmerBlock style={styles.actionButtonSkeleton} />
        </View>

        {/* Document 4: Handover Sign-Off (Locked style card) */}
        <View style={styles.documentCardLocked}>
          <ShimmerBlock style={styles.lockedIconBadgeSkeleton} />
          <View style={styles.documentInfo}>
            <ShimmerBlock style={[styles.docTitleSkeleton, { width: 135 }]} />
            <ShimmerBlock style={[styles.docMetaSkeleton, { width: 155 }]} />
          </View>
          <ShimmerBlock style={styles.lockIconSkeleton} />
        </View>
      </View>

      {/* 4. Help Note Skeleton */}
      <View style={styles.helpNote}>
        <ShimmerBlock style={styles.helpIconSkeleton} />
        <ShimmerBlock style={styles.helpTextSkeleton} />
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

  /* Header */
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  siteSelectorSkeleton: {
    width: 175,
    height: 44,
    borderRadius: 12,
  },
  notificationButtonSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },

  /* Title */
  titleSection: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  titleSkeleton: {
    width: 145,
    height: 26,
    borderRadius: 6,
  },
  subtitleSkeleton: {
    width: 240,
    height: 14,
    borderRadius: 4,
  },

  /* Document List */
  documentList: {
    marginTop: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  documentCard: {
    height: 72,
    paddingLeft: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  documentCardLocked: {
    height: 72,
    paddingLeft: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  docIconBadgeSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    flexShrink: 0,
  },
  lockedIconBadgeSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    flexShrink: 0,
  },
  documentInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  docTitleSkeleton: {
    width: 155,
    height: 16,
    borderRadius: 4,
  },
  docMetaSkeleton: {
    width: 175,
    height: 12,
    borderRadius: 4,
  },
  actionButtonSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    flexShrink: 0,
  },
  lockIconSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    flexShrink: 0,
  },

  /* Help Note */
  helpNote: {
    marginTop: 2,
    paddingHorizontal: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helpIconSkeleton: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  helpTextSkeleton: {
    width: 250,
    height: 13,
    borderRadius: 4,
  },
});
