import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export interface NotificationSettingsScreenProps {
  onBack?: () => void;
}

export const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({
  onBack,
}) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [batteryLow, setBatteryLow] = useState(true);
  const [faultDetected, setFaultDetected] = useState(true);
  const [stageCompleted, setStageCompleted] = useState(true);
  const [ticketUpdates, setTicketUpdates] = useState(true);
  const [maintenanceVisits, setMaintenanceVisits] = useState(false);

  const handleToggleMasterPush = () => {
    const nextVal = !pushEnabled;
    setPushEnabled(nextVal);
    if (!nextVal) {
      Alert.alert(
        'Push Notifications Paused',
        'Lock screen alerts are turned off. You will still receive in-app notifications in the bell tray.'
      );
    }
  };

  const renderSwitch = (value: boolean, onToggle: () => void, label: string) => {
    return (
      <TouchableOpacity
        style={[
          styles.switchTrack,
          value ? styles.switchTrackActive : styles.switchTrackInactive,
        ]}
        activeOpacity={0.8}
        onPress={onToggle}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        accessibilityLabel={label}
      >
        <View
          style={[
            styles.switchThumb,
            value ? styles.switchThumbActive : styles.switchThumbInactive,
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={onBack}
              accessibilityLabel="Back to more"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  stroke="#334155"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.title}>Notifications</Text>
          </View>

          {/* Master Push Card */}
          <View style={styles.masterPushCard}>
            <View style={styles.masterPushIconContainer}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  stroke="#EA580C"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <View style={styles.masterPushContent}>
              <Text style={styles.masterPushTitle}>Push notifications</Text>
              <Text style={styles.masterPushSubtitle}>Alerts on your lock screen</Text>
            </View>
            {renderSwitch(pushEnabled, handleToggleMasterPush, 'Push notifications')}
          </View>

          {/* Section: YOUR SYSTEM */}
          <Text style={styles.sectionHeader}>YOUR SYSTEM</Text>
          <View style={styles.card}>
            {/* Battery below 20% */}
            <View style={styles.cardRow}>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Battery below 20%</Text>
                <Text style={styles.rowSubtitle}>When the battery charge gets low</Text>
              </View>
              {renderSwitch(
                batteryLow,
                () => setBatteryLow(!batteryLow),
                'Battery below 20%'
              )}
            </View>

            {/* Fault detected */}
            <View style={[styles.cardRow, styles.cardRowLast]}>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Fault detected</Text>
                <Text style={styles.rowSubtitle}>When your system reports a fault</Text>
              </View>
              {renderSwitch(
                faultDetected,
                () => setFaultDetected(!faultDetected),
                'Fault detected'
              )}
            </View>
          </View>

          {/* Section: PROJECT */}
          <Text style={styles.sectionHeader}>PROJECT</Text>
          <View style={styles.card}>
            {/* Stage completed */}
            <View style={[styles.cardRow, styles.cardRowLast]}>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Stage completed</Text>
                <Text style={styles.rowSubtitle}>When an installation stage is finished</Text>
              </View>
              {renderSwitch(
                stageCompleted,
                () => setStageCompleted(!stageCompleted),
                'Stage completed'
              )}
            </View>
          </View>

          {/* Section: SUPPORT */}
          <Text style={styles.sectionHeader}>SUPPORT</Text>
          <View style={styles.card}>
            {/* Ticket updates */}
            <View style={styles.cardRow}>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Ticket updates</Text>
                <Text style={styles.rowSubtitle}>
                  When an engineer is assigned, on the way, or done
                </Text>
              </View>
              {renderSwitch(
                ticketUpdates,
                () => setTicketUpdates(!ticketUpdates),
                'Ticket updates'
              )}
            </View>

            {/* Maintenance visits */}
            <View style={[styles.cardRow, styles.cardRowLast]}>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Maintenance visits</Text>
                <Text style={styles.rowSubtitle}>
                  When a visit is complete and needs your sign-off
                </Text>
              </View>
              {renderSwitch(
                maintenanceVisits,
                () => setMaintenanceVisits(!maintenanceVisits),
                'Maintenance visits'
              )}
            </View>
          </View>

          {/* Footer Notice */}
          <Text style={styles.footerText}>
            Every alert also appears in the panel under the bell on the Home screen.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: '#fafbfd',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48,
    lineHeight: 29,
    color: '#020617',
  },
  masterPushCard: {
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  masterPushIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  masterPushContent: {
    flex: 1,
  },
  masterPushTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  masterPushSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#475569',
  },
  sectionHeader: {
    marginTop: 18,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  card: {
    marginTop: 6,
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
  cardRow: {
    minHeight: 64,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cardRowLast: {
    borderBottomWidth: 0,
  },
  rowContent: {
    flex: 1,
    paddingRight: 8,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  rowSubtitle: {
    marginTop: 1,
    fontSize: 12,
    lineHeight: 16.8,
    color: '#64748b',
  },
  switchTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 3,
    justifyContent: 'center',
  },
  switchTrackActive: {
    backgroundColor: '#EA580C',
  },
  switchTrackInactive: {
    backgroundColor: '#cbd5e1',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  footerText: {
    marginTop: 16,
    paddingHorizontal: 4,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
