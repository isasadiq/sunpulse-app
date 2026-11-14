import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const SUNPULSE_LOGO = require('../../assets/sunpulse-logo.png');

const BRAND_AMBER = '#F59E0B';
const BRAND_ORANGE = '#EA580C';
const BRAND_DARK = '#0F172A';

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const animEmblem = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(0.7)).current;
  const animPulse = useRef(new Animated.Value(0)).current;
  const animTitle = useRef(new Animated.Value(0)).current;
  const animBadge = useRef(new Animated.Value(0)).current;

  const runAnimation = () => {
    animEmblem.setValue(0);
    animScale.setValue(0.7);
    animPulse.setValue(0);
    animTitle.setValue(0);
    animBadge.setValue(0);

    Animated.parallel([
      // 1. Emblem Scale and Fade In
      Animated.timing(animEmblem, {
        toValue: 1,
        duration: 700,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),
      Animated.timing(animScale, {
        toValue: 1,
        duration: 750,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),

      // 2. Solar Shockwave Pulse
      Animated.timing(animPulse, {
        toValue: 1,
        duration: 900,
        delay: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      // 3. Title Wordmark Reveal
      Animated.timing(animTitle, {
        toValue: 1,
        duration: 500,
        delay: 600,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),

      // 4. Telemetry Subtitle Badge
      Animated.timing(animBadge, {
        toValue: 1,
        duration: 400,
        delay: 900,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  };

  useEffect(() => {
    runAnimation();
  }, []);

  const pulseScale = animPulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 2.5] });
  const pulseOpacity = animPulse.interpolate({ inputRange: [0, 1], outputRange: [0.85, 0] });
  const titleTranslateY = animTitle.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.centerStage}>
        {/* Animated Solar Emblem */}
        <View style={styles.logoStage}>
          {/* Solar Shockwave Pulse */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pulseRing,
              {
                opacity: pulseOpacity,
                transform: [{ scale: pulseScale }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.emblemContainer,
              {
                opacity: animEmblem,
                transform: [{ scale: animScale }],
              },
            ]}
          >
            <Image
              source={SUNPULSE_LOGO}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Brand Title Lockup */}
        <Animated.View
          style={[
            styles.titleBlock,
            {
              opacity: animTitle,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          <Text style={styles.brandTitle}>
            SUN<Text style={styles.brandTitleHighlight}>PULSE</Text>
          </Text>
          <Text style={styles.brandTagline}>Power You Can See</Text>
        </Animated.View>

        {/* Sub-badge: Energy Infrastructure Telemetry */}
        <Animated.View style={[styles.subBadgeWrap, { opacity: animBadge }]}>
          <Text style={styles.subBadgeText}>CLEAN ENERGY TELEMETRY & LIFECYCLE</Text>
        </Animated.View>
      </View>

      {/* Replay Controls */}
      <View style={styles.controlsBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.replayButton}
          onPress={runAnimation}
        >
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={BRAND_DARK} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </Svg>
          <Text style={styles.replayButtonText}>Replay Splash</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerStage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoStage: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
  },
  emblemContainer: {
    width: 130,
    height: 130,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: BRAND_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BRAND_ORANGE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  pulseRing: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: BRAND_AMBER,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    zIndex: 1,
  },
  titleBlock: {
    marginTop: 22,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
    color: BRAND_DARK,
  },
  brandTitleHighlight: {
    color: BRAND_ORANGE,
  },
  brandTagline: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  subBadgeWrap: {
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
  },
  subBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: BRAND_ORANGE,
  },
  controlsBar: {
    paddingBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  replayButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  replayButtonText: {
    color: BRAND_DARK,
    fontSize: 13,
    fontWeight: '600',
  },
});
