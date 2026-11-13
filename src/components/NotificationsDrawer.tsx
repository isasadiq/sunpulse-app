import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

interface NotificationsDrawerProps {
  visible: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  type: 'engineer' | 'battery' | 'stage' | 'ticket' | 'maintenance';
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'engineer',
    title: 'Engineer on the way',
    desc: 'Ticket #1042: about 25 minutes away.',
    time: '9:40 am',
    unread: true,
  },
  {
    id: 'n2',
    type: 'battery',
    title: 'Battery below 20%',
    desc: 'Battery is at 18% at Main Residence.',
    time: '7:05 am',
    unread: true,
  },
  {
    id: 'n3',
    type: 'stage',
    title: 'Stage completed',
    desc: 'Procurement is complete. Installation has started.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'n4',
    type: 'ticket',
    title: 'Ticket resolved',
    desc: 'Ticket #0987, Battery alarm, was resolved.',
    time: '2 Oct',
    unread: false,
  },
  {
    id: 'n5',
    type: 'maintenance',
    title: 'Maintenance visit complete',
    desc: 'Panel washing is finished. Please review and sign off.',
    time: '28 Sep',
    unread: false,
  },
];

const DRAWER_WIDTH = 318;

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  visible,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  // PanResponder to allow swiping right to close
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 80 || gestureState.vx > 0.5) {
          onClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Dark overlay backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Drawer Container */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.drawer,
          {
            paddingTop: Math.max(insets.top, 24) + 16,
            paddingBottom: Math.max(insets.bottom, 16) + 12,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Left vertical handle pill */}
        <View style={styles.dragPill} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.7}
            onPress={onClose}
            accessibilityLabel="Close notifications"
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M6 6l12 12M18 6L6 18"
                stroke="#334155"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Subtitle: Unread Count + Mark all read */}
        <View style={styles.subHeader}>
          <Text style={styles.unreadText}>{unreadCount} unread</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={handleMarkAllRead}>
            <Text style={styles.markReadLink}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollList}>
          {/* Section: Today */}
          <Text style={styles.sectionHeader}>TODAY</Text>
          <View>
            {/* Engineer on the way */}
            <View style={styles.notificationItem}>
              <View style={styles.iconBadgeSlate}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>Engineer on the way</Text>
                <Text style={styles.itemDesc}>Ticket #1042: about 25 minutes away.</Text>
                <Text style={styles.itemTime}>9:40 am</Text>
              </View>
              {notifications.find((n) => n.id === 'n1')?.unread && (
                <View style={styles.unreadDot} />
              )}
            </View>

            {/* Battery below 20% */}
            <View style={[styles.notificationItem, styles.notificationItemNoBorder]}>
              <View style={styles.iconBadgeRed}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    stroke="#dc2626"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>Battery below 20%</Text>
                <Text style={styles.itemDesc}>Battery is at 18% at Main Residence.</Text>
                <Text style={styles.itemTime}>7:05 am</Text>
              </View>
              {notifications.find((n) => n.id === 'n2')?.unread && (
                <View style={styles.unreadDot} />
              )}
            </View>
          </View>

          {/* Section: Earlier */}
          <Text style={[styles.sectionHeader, styles.sectionHeaderEarlier]}>EARLIER</Text>
          <View>
            {/* Stage completed */}
            <View style={styles.notificationItem}>
              <View style={styles.iconBadgeSlate}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitleRegular}>Stage completed</Text>
                <Text style={styles.itemDesc}>Procurement is complete. Installation has started.</Text>
                <Text style={styles.itemTime}>Yesterday</Text>
              </View>
              <View style={styles.dotPlaceholder} />
            </View>

            {/* Ticket resolved */}
            <View style={styles.notificationItem}>
              <View style={styles.iconBadgeSlate}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitleRegular}>Ticket resolved</Text>
                <Text style={styles.itemDesc}>Ticket #0987, Battery alarm, was resolved.</Text>
                <Text style={styles.itemTime}>2 Oct</Text>
              </View>
              <View style={styles.dotPlaceholder} />
            </View>

            {/* Maintenance visit complete */}
            <View style={[styles.notificationItem, styles.notificationItemNoBorder]}>
              <View style={styles.iconBadgeSlate}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437"
                    stroke="#334155"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitleRegular}>Maintenance visit complete</Text>
                <Text style={styles.itemDesc}>Panel washing is finished. Please review and sign off.</Text>
                <Text style={styles.itemTime}>28 Sep</Text>
              </View>
              <View style={styles.dotPlaceholder} />
            </View>
          </View>
        </ScrollView>

        {/* Footer Swipe Hint */}
        <View style={styles.footerHint}>
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 12h18m0 0l-6-6m6 6l-6 6"
              stroke="#64748b"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.footerHintText}>Swipe right to close</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0f172a',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingHorizontal: 16,
    paddingLeft: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: -12, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  dragPill: {
    position: 'absolute',
    left: 7,
    top: '50%',
    width: 4,
    height: 44,
    marginTop: -22,
    borderRadius: 2,
    backgroundColor: '#cbd5e1',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.44, // -0.02em
    lineHeight: 26.4,
    color: '#020617',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    marginTop: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unreadText: {
    fontSize: 13,
    color: '#64748b',
  },
  markReadLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },
  sectionHeader: {
    marginTop: 14,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.55, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  sectionHeaderEarlier: {
    marginTop: 16,
  },
  scrollList: {
    flex: 1,
    marginTop: 4,
  },
  notificationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  notificationItemNoBorder: {
    borderBottomWidth: 0,
  },
  iconBadgeSlate: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconBadgeRed: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemContent: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  itemTitleRegular: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  itemDesc: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16.8, // 1.4
    color: '#475569',
  },
  itemTime: {
    marginTop: 3,
    fontSize: 11,
    color: '#64748b',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc2626',
    marginTop: 6,
    flexShrink: 0,
  },
  dotPlaceholder: {
    width: 8,
    height: 8,
    flexShrink: 0,
  },
  footerHint: {
    marginTop: 'auto',
    paddingTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  footerHintText: {
    fontSize: 12,
    color: '#64748b',
  },
});
