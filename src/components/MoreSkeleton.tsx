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

export const MoreSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Header: Site Switcher + Notification Bell Skeleton */}
      <View style={styles.header}>
        <ShimmerBlock style={styles.siteSelectorSkeleton} />
        <ShimmerBlock style={styles.notificationButtonSkeleton} />
      </View>

      {/* 2. User Profile Card Skeleton */}
      <View style={styles.profileCard}>
        <ShimmerBlock style={styles.avatarSkeleton} />
        <View style={styles.profileTextContainer}>
          <ShimmerBlock style={styles.profileNameSkeleton} />
          <ShimmerBlock style={styles.profileEmailSkeleton} />
        </View>
      </View>

      {/* 3. Expansion & ROI Calculator Promo Card Skeleton */}
      <View style={styles.calculatorCard}>
        <ShimmerBlock style={styles.calculatorIconBadgeSkeleton} />
        <View style={styles.calculatorTextContainer}>
          <ShimmerBlock style={styles.calculatorTitleSkeleton} />
          <ShimmerBlock style={styles.calculatorSubSkeleton} />
        </View>
        <ShimmerBlock style={styles.chevronSkeleton} />
      </View>

      {/* 4. Settings Options Group Skeleton (3 rows) */}
      <View style={styles.settingsGroup}>
        {/* Row 1: Notifications */}
        <View style={styles.settingsRow}>
          <ShimmerBlock style={styles.settingsIconBadgeSkeleton} />
          <ShimmerBlock style={styles.settingsLabelSkeleton} />
          <ShimmerBlock style={styles.chevronSmallSkeleton} />
        </View>

        {/* Row 2: Security */}
        <View style={styles.settingsRow}>
          <ShimmerBlock style={styles.settingsIconBadgeSkeleton} />
          <ShimmerBlock style={[styles.settingsLabelSkeleton, { width: 85 }]} />
          <ShimmerBlock style={styles.chevronSmallSkeleton} />
        </View>

        {/* Row 3: Help and Support */}
        <View style={[styles.settingsRow, styles.settingsRowLast]}>
          <ShimmerBlock style={styles.settingsIconBadgeSkeleton} />
          <ShimmerBlock style={[styles.settingsLabelSkeleton, { width: 135 }]} />
          <ShimmerBlock style={styles.chevronSmallSkeleton} />
        </View>
      </View>

      {/* 5. Sign Out Button Skeleton */}
      <View style={styles.signOutButton}>
        <ShimmerBlock style={styles.signOutTextSkeleton} />
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

  /* Profile Card */
  profileCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarSkeleton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    flexShrink: 0,
  },
  profileTextContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  profileNameSkeleton: {
    width: 135,
    height: 18,
    borderRadius: 4,
  },
  profileEmailSkeleton: {
    width: 185,
    height: 13,
    borderRadius: 4,
  },

  /* Calculator Card */
  calculatorCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: '#fef2f2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  calculatorIconBadgeSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    flexShrink: 0,
  },
  calculatorTextContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  calculatorTitleSkeleton: {
    width: 190,
    height: 16,
    borderRadius: 4,
  },
  calculatorSubSkeleton: {
    width: 205,
    height: 12,
    borderRadius: 4,
  },
  chevronSkeleton: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },

  /* Settings Group */
  settingsGroup: {
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
  settingsRow: {
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingsRowLast: {
    borderBottomWidth: 0,
  },
  settingsIconBadgeSkeleton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    flexShrink: 0,
  },
  settingsLabelSkeleton: {
    flex: 1,
    width: 110,
    height: 16,
    borderRadius: 4,
  },
  chevronSmallSkeleton: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },

  /* Sign Out Button */
  signOutButton: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutTextSkeleton: {
    width: 90,
    height: 15,
    borderRadius: 4,
  },
});
