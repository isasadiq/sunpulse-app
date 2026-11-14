import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface ManagementNotificationItem {
  id: string;
  type: 'ticket' | 'quote' | 'offline' | 'maintenance' | 'resolved';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  targetScreen?: string;
}

export interface ManagementNotificationsDrawerProps {
  visible: boolean;
  onClose: () => void;
  onNavigateToScreen?: (screen: string) => void;
}

const INITIAL_MANAGEMENT_NOTIFICATIONS: ManagementNotificationItem[] = [
  {
    id: 'mnotif-1',
    type: 'ticket',
    title: 'Ticket not assigned',
    description: '#T-0148, No power at Site 009. Waiting 18 min, target 60.',
    time: '9:20 am',
    unread: true,
    targetScreen: 'management_dispatch',
  },
  {
    id: 'mnotif-2',
    type: 'quote',
    title: 'New quote request',
    description: 'Musa I. asked for a quote: 1.5 kWp, 5 kWh.',
    time: '9:05 am',
    unread: true,
    targetScreen: 'management_leads',
  },
  {
    id: 'mnotif-3',
    type: 'offline',
    title: 'Inverter offline',
    description: 'Site 014 · Barnawa, no data for 25 min.',
    time: '8:40 am',
    unread: true,
  },
  {
    id: 'mnotif-4',
    type: 'maintenance',
    title: 'Maintenance visit complete',
    description: 'Site 021 · Malali checklist done by Sani M.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'mnotif-5',
    type: 'resolved',
    title: 'Ticket resolved',
    description: '#T-0143 was resolved in 2 h 10 min.',
    time: '5 Nov',
    unread: false,
  },
];

export const ManagementNotificationsDrawer: React.FC<ManagementNotificationsDrawerProps> = ({
  visible,
  onClose,
  onNavigateToScreen,
}) => {
  const [notifications, setNotifications] = useState<ManagementNotificationItem[]>(
    INITIAL_MANAGEMENT_NOTIFICATIONS
  );

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationPress = (notif: ManagementNotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    if (notif.targetScreen) {
      onClose();
      onNavigateToScreen?.(notif.targetScreen);
    }
  };

  const todayNotifications = notifications.slice(0, 3);
  const earlierNotifications = notifications.slice(3);

  const renderIcon = (type: ManagementNotificationItem['type']) => {
    switch (type) {
      case 'ticket':
        return (
          <View style={[styles.iconBox, styles.redIconBox]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </Svg>
          </View>
        );
      case 'quote':
        return (
          <View style={[styles.iconBox, styles.redIconBox]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
            </Svg>
          </View>
        );
      case 'offline':
        return (
          <View style={[styles.iconBox, styles.amberIconBox]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3 3l18 18M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </Svg>
          </View>
        );
      case 'maintenance':
        return (
          <View style={[styles.iconBox, styles.grayIconBox]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </Svg>
          </View>
        );
      case 'resolved':
        return (
          <View style={[styles.iconBox, styles.grayIconBox]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Svg>
          </View>
        );
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.drawer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={onClose}
              accessibilityLabel="Close notifications"
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2.2} strokeLinecap="round">
                <Path d="M6 6l12 12M18 6L6 18" />
              </Svg>
            </TouchableOpacity>
          </View>

          <View style={styles.subHeader}>
            <Text style={styles.unreadCountText}>{unreadCount} unread</Text>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={handleMarkAllRead}>
                <Text style={styles.markReadText}>Mark all read</Text>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            style={styles.scrollList}
            showsVerticalScrollIndicator={false}
          >
            {/* Today Section */}
            <Text style={styles.sectionTitle}>TODAY</Text>
            {todayNotifications.map((notif) => (
              <TouchableOpacity
                key={notif.id}
                style={styles.itemRow}
                activeOpacity={0.7}
                onPress={() => handleNotificationPress(notif)}
              >
                {renderIcon(notif.type)}
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemTitle}>{notif.title}</Text>
                  <Text style={styles.itemDesc}>{notif.description}</Text>
                  <Text style={styles.itemTime}>{notif.time}</Text>
                </View>
                {notif.unread && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}

            {/* Earlier Section */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>EARLIER</Text>
            {earlierNotifications.map((notif) => (
              <TouchableOpacity
                key={notif.id}
                style={styles.itemRow}
                activeOpacity={0.7}
                onPress={() => handleNotificationPress(notif)}
              >
                {renderIcon(notif.type)}
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemTitle}>{notif.title}</Text>
                  <Text style={styles.itemDesc}>{notif.description}</Text>
                  <Text style={styles.itemTime}>{notif.time}</Text>
                </View>
                {notif.unread && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Swipe indicator */}
          <TouchableOpacity
            style={styles.bottomCloseIndicator}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3 12h18m0 0l-6-6m6 6l-6 6" />
            </Svg>
            <Text style={styles.closeHintText}>Swipe right to close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  drawer: {
    width: 318,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingTop: 48,
    paddingHorizontal: 18,
    paddingBottom: 24,
    shadowColor: '#0f172a',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: -8, height: 0 },
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  unreadCountText: {
    fontSize: 13,
    color: '#64748b',
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EA580C',
  },
  scrollList: {
    flex: 1,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#475569',
    marginBottom: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redIconBox: {
    backgroundColor: '#FFF7ED',
  },
  amberIconBox: {
    backgroundColor: '#fffbeb',
  },
  grayIconBox: {
    backgroundColor: '#f1f5f9',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  itemDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: '#475569',
    marginTop: 2,
  },
  itemTime: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 3,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EA580C',
    marginTop: 4,
  },
  bottomCloseIndicator: {
    marginTop: 'auto',
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  closeHintText: {
    fontSize: 12,
    color: '#64748b',
  },
});
