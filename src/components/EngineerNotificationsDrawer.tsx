import React, { useEffect, useState } from 'react';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(320, SCREEN_WIDTH * 0.85);

export interface EngineerNotificationItem {
  id: string;
  type: 'urgent_ticket' | 'visit_reminder' | 'job_assigned' | 'ticket_closed';
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  targetScreen?: string;
  targetId?: string;
}

const INITIAL_ENGINEER_NOTIFICATIONS: EngineerNotificationItem[] = [
  {
    id: 'en-1',
    type: 'urgent_ticket',
    title: 'New urgent ticket',
    desc: 'Ticket #1042: Inverter error at Kaduna Clinic. Respond by 11:30 am.',
    time: '9:20 am',
    unread: true,
    targetScreen: 'engineer_ticket_detail',
    targetId: '1042',
  },
  {
    id: 'en-2',
    type: 'visit_reminder',
    title: 'Visit reminder',
    desc: 'Routine maintenance at Northgate Factory starts at 2:00 pm.',
    time: '8:00 am',
    unread: true,
    targetScreen: 'engineer_checklist',
    targetId: 'northgate',
  },
  {
    id: 'en-3',
    type: 'job_assigned',
    title: 'New job assigned',
    desc: 'Main Residence installation. You are the leader.',
    time: 'Yesterday',
    unread: false,
    targetScreen: 'engineer_job_detail',
    targetId: 'installation',
  },
  {
    id: 'en-4',
    type: 'ticket_closed',
    title: 'Ticket closed',
    desc: 'Ticket #0987, Battery alarm, was closed by the support desk.',
    time: '2 Oct',
    unread: false,
    targetScreen: 'engineer_tickets',
  },
];

export interface EngineerNotificationsDrawerProps {
  visible: boolean;
  onClose: () => void;
  onNavigateToScreen?: (screen: string, id?: string) => void;
}

export const EngineerNotificationsDrawer: React.FC<EngineerNotificationsDrawerProps> = ({
  visible,
  onClose,
  onNavigateToScreen,
}) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<EngineerNotificationItem[]>(
    INITIAL_ENGINEER_NOTIFICATIONS
  );

  const [translateX] = useState(() => new Animated.Value(DRAWER_WIDTH));
  const [overlayOpacity] = useState(() => new Animated.Value(0));

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: DRAWER_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const [panResponder] = useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 80 || gestureState.vx > 0.5) {
          closeDrawer();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    })
  );

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          bounciness: 0,
          speed: 16,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: DRAWER_WIDTH,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, overlayOpacity, translateX]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationPress = (item: EngineerNotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    if (item.targetScreen && onNavigateToScreen) {
      closeDrawer();
      setTimeout(() => {
        onNavigateToScreen(item.targetScreen!, item.targetId);
      }, 250);
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;
  const todayItems = notifications.filter((n) => n.id === 'en-1' || n.id === 'en-2');
  const earlierItems = notifications.filter((n) => n.id === 'en-3' || n.id === 'en-4');

  if (!visible) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={closeDrawer}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: overlayOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Drawer Panel */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.drawer,
          {
            width: DRAWER_WIDTH,
            paddingTop: Math.max(insets.top + 10, 44),
            paddingBottom: Math.max(insets.bottom + 16, 24),
            transform: [{ translateX }],
          },
        ]}
      >
        {/* Grab Handle */}
        <View style={styles.handle} />

        {/* Drawer Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.75}
            onPress={closeDrawer}
            accessibilityLabel="Close notifications"
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.2}>
              <Path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.unreadText}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </Text>
          {unreadCount > 0 && (
            <TouchableOpacity activeOpacity={0.7} onPress={markAllRead}>
              <Text style={styles.markAllRead}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notification Scrollable List */}
        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Today Section */}
          {todayItems.length > 0 && (
            <View>
              <Text style={styles.sectionHeader}>TODAY</Text>
              <View>
                {todayItems.map((item, idx) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.itemRow,
                      idx < todayItems.length - 1 && styles.itemBorder,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleNotificationPress(item)}
                  >
                    <View
                      style={[
                        styles.iconContainer,
                        item.type === 'urgent_ticket'
                          ? styles.iconUrgentTicket
                          : styles.iconDefault,
                      ]}
                    >
                      {item.type === 'urgent_ticket' ? (
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.8}>
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </Svg>
                      ) : (
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8}>
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                          />
                        </Svg>
                      )}
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemDesc}>{item.desc}</Text>
                      <Text style={styles.itemTime}>{item.time}</Text>
                    </View>

                    <View style={styles.dotContainer}>
                      {item.unread && <View style={styles.unreadDot} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Earlier Section */}
          {earlierItems.length > 0 && (
            <View style={styles.earlierSection}>
              <Text style={styles.sectionHeader}>EARLIER</Text>
              <View>
                {earlierItems.map((item, idx) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.itemRow,
                      idx < earlierItems.length - 1 && styles.itemBorder,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleNotificationPress(item)}
                  >
                    <View style={[styles.iconContainer, styles.iconDefault]}>
                      {item.type === 'job_assigned' ? (
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8}>
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </Svg>
                      ) : (
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8}>
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </Svg>
                      )}
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemDesc}>{item.desc}</Text>
                      <Text style={styles.itemTime}>{item.time}</Text>
                    </View>

                    <View style={styles.dotContainer}>
                      {item.unread && <View style={styles.unreadDot} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Footer Swipe Hint */}
        <View style={styles.footer}>
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m0 0l-6-6m6 6l-6 6" />
          </Svg>
          <Text style={styles.footerText}>Swipe right to close</Text>
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
    backgroundColor: 'rgba(15,23,42,0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: -12, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 16,
  },
  handle: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.4,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unreadText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  markAllRead: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },
  scrollArea: {
    flex: 1,
    marginTop: 14,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#475569',
    marginBottom: 4,
  },
  earlierSection: {
    marginTop: 14,
  },
  itemRow: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconUrgentTicket: {
    backgroundColor: '#fef2f2',
  },
  iconDefault: {
    backgroundColor: '#f1f5f9',
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  itemDesc: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    color: '#475569',
  },
  itemTime: {
    marginTop: 3,
    fontSize: 11,
    color: '#64748b',
  },
  dotContainer: {
    width: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc2626',
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
});
