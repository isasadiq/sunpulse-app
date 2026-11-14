import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export interface SiteItem {
  id: string;
  name: string;
  status: string;
  type: 'residence' | 'clinic' | 'factory';
  hasLiveData: boolean;
  isOffline?: boolean;
}

export const REGISTERED_SITES: SiteItem[] = [
  {
    id: 's1',
    name: 'Main Residence',
    status: 'Live data',
    type: 'residence',
    hasLiveData: true,
  },
  {
    id: 's2',
    name: 'Kaduna Clinic',
    status: 'Live data',
    type: 'clinic',
    hasLiveData: true,
  },
  {
    id: 's3',
    name: 'Northgate Factory',
    status: 'No live data · System passport',
    type: 'factory',
    hasLiveData: false,
  },
  {
    id: 's4',
    name: 'Victoria Island Penthouse',
    status: 'Offline · Last data 2 h ago',
    type: 'residence',
    hasLiveData: false,
    isOffline: true,
  },
];

export interface SiteSwitcherModalProps {
  visible: boolean;
  currentSite: string;
  onSelectSite: (site: SiteItem) => void;
  onClose: () => void;
  onContactPM?: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SiteSwitcherModal: React.FC<SiteSwitcherModalProps> = ({
  visible,
  currentSite,
  onSelectSite,
  onClose,
  onContactPM,
}) => {
  const insets = useSafeAreaInsets();
  const [slideAnim] = useState(() => new Animated.Value(SCREEN_HEIGHT));
  const [fadeAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 24,
          stiffness: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  const renderIcon = (type: SiteItem['type'], isSelected: boolean) => {
    const strokeColor = isSelected ? '#EA580C' : '#334155';

    if (type === 'residence') {
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path
            d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            stroke={strokeColor}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    }

    if (type === 'clinic') {
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21"
            stroke={strokeColor}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    }

    // Factory
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 21V10l6 3.5V10l6 3.5V6l6 2v13H3z"
          stroke={strokeColor}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.5 17h.01M12 17h.01M16.5 17h.01"
          stroke={strokeColor}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      </Svg>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        {/* Dimmed Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Bottom Sheet Card */}
        <Animated.View
          style={[
            styles.sheetContainer,
            {
              paddingBottom: Math.max(32, insets.bottom + 16),
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Drag handle */}
          <View style={styles.dragHandle} />

          {/* Sheet Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Switch site</Text>
            <Text style={styles.siteCountText}>3 sites</Text>
          </View>

          {/* Sites List */}
          <View style={styles.sitesList}>
            {REGISTERED_SITES.map((site) => {
              const isSelected = site.name === currentSite;
              return (
                <TouchableOpacity
                  key={site.id}
                  style={[
                    styles.siteCard,
                    isSelected ? styles.siteCardSelected : styles.siteCardDefault,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => onSelectSite(site)}
                >
                  <View
                    style={[
                      styles.siteIconContainer,
                      isSelected
                        ? styles.siteIconContainerSelected
                        : styles.siteIconContainerDefault,
                    ]}
                  >
                    {renderIcon(site.type, isSelected)}
                  </View>

                  <View style={styles.siteInfo}>
                    <Text style={styles.siteNameText}>{site.name}</Text>
                    <Text style={styles.siteStatusText}>{site.status}</Text>
                  </View>

                  {/* Radio Indicator */}
                  {isSelected ? (
                    <View style={styles.checkCircle}>
                      <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M4.5 12.75l6 6 9-13.5"
                          stroke="#ffffff"
                          strokeWidth={3.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  ) : (
                    <View style={styles.unselectedRadio} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer Note with Link */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Need to add a site?{' '}
              <Text
                style={styles.footerLink}
                onPress={() => {
                  onClose();
                  if (onContactPM) {
                    onContactPM();
                  }
                }}
              >
                Contact your project manager
              </Text>
              .
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  sheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 16,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#cbd5e1',
    alignSelf: 'center',
  },
  sheetHeader: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.44,
    lineHeight: 26,
    color: '#020617',
  },
  siteCountText: {
    fontSize: 13,
    color: '#64748b',
  },
  sitesList: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  siteCard: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  siteCardDefault: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  siteCardSelected: {
    borderWidth: 1.5,
    borderColor: '#EA580C',
    backgroundColor: '#FFF7ED',
  },
  siteIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  siteIconContainerDefault: {
    backgroundColor: '#f1f5f9',
  },
  siteIconContainerSelected: {
    backgroundColor: '#ffffff',
  },
  siteInfo: {
    flex: 1,
  },
  siteNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  siteStatusText: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  footerContainer: {
    marginTop: 14,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
    textAlign: 'center',
  },
  footerLink: {
    color: '#334155',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
