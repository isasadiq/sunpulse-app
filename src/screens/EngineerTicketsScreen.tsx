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
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

export interface TicketItem {
  id: string;
  ticketNumber: string;
  title: string;
  siteName: string;
  priority: 'Urgent' | 'Normal';
  status: 'New' | 'En route' | 'Assigned' | 'Resolved';
  slaText: string;
  slaUrgent?: boolean;
  hasTravelCta?: boolean;
  isResolved?: boolean;
}

const INITIAL_TICKETS: TicketItem[] = [
  {
    id: 'ticket-1042',
    ticketNumber: '#1042',
    title: 'Inverter error on display',
    siteName: 'Kaduna Clinic',
    priority: 'Urgent',
    status: 'New',
    slaText: 'Respond by 11:30 am',
    slaUrgent: true,
    hasTravelCta: true,
    isResolved: false,
  },
  {
    id: 'ticket-1045',
    ticketNumber: '#1045',
    title: 'No power at site',
    siteName: 'Northgate Factory',
    priority: 'Urgent',
    status: 'En route',
    slaText: 'Arrive by 12:15 pm',
    slaUrgent: false,
    isResolved: false,
  },
  {
    id: 'ticket-1039',
    ticketNumber: '#1039',
    title: 'Battery alarm',
    siteName: 'Main Residence',
    priority: 'Normal',
    status: 'Assigned',
    slaText: 'Due tomorrow',
    slaUrgent: false,
    isResolved: false,
  },
  {
    id: 'ticket-1028',
    ticketNumber: '#1028',
    title: 'Solar string 2 bypass diode replaced',
    siteName: 'Main Residence',
    priority: 'Normal',
    status: 'Resolved',
    slaText: 'Completed yesterday',
    slaUrgent: false,
    isResolved: true,
  },
];

type FilterType = 'Assigned to me' | 'Open' | 'Resolved';

export interface EngineerTicketsScreenProps {
  onOpenNotifications?: () => void;
  onSelectTicket?: (ticket: TicketItem) => void;
  onSwitchTab?: (tab: 'jobs' | 'tickets' | 'visits' | 'more') => void;
  onSwitchToClientMode?: () => void;
}

export const EngineerTicketsScreen: React.FC<EngineerTicketsScreenProps> = ({
  onOpenNotifications,
  onSelectTicket,
  onSwitchTab,
  onSwitchToClientMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Assigned to me');
  const [tickets, setTickets] = useState<TicketItem[]>(INITIAL_TICKETS);
  const [activeTab, setActiveTab] = useState<'jobs' | 'tickets' | 'visits' | 'more'>('tickets');

  const filteredTickets = tickets.filter((t) => {
    if (activeFilter === 'Resolved') {
      return t.isResolved || t.status === 'Resolved';
    }
    if (activeFilter === 'Open') {
      return !t.isResolved;
    }
    // 'Assigned to me' - show open tickets assigned
    return !t.isResolved;
  });

  const handleStartTravel = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'En route',
            slaText: 'Arrive by 12:45 pm',
            slaUrgent: false,
            hasTravelCta: false,
          };
        }
        return t;
      })
    );
    Alert.alert(
      'Travel Started',
      'Status updated to "En route". Client Kaduna Clinic and SUNPULSE Dispatch have been notified with live ETA tracking.'
    );
  };

  const handleTabPress = (tab: 'jobs' | 'tickets' | 'visits' | 'more') => {
    setActiveTab(tab);
    if (onSwitchTab) {
      onSwitchTab(tab);
    } else if (tab === 'more' && onSwitchToClientMode) {
      Alert.alert(
        'Engineer Menu',
        'Logged in as Field Engineer · Abubakar S.',
        [
          { text: 'Switch to Client View', onPress: onSwitchToClientMode },
          { text: 'Close', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Tickets</Text>
              <Text style={styles.headerSubtitle}>
                {tickets.filter((t) => !t.isResolved).length} open, assigned to you
              </Text>
            </View>

            <TouchableOpacity
              style={styles.notificationButton}
              activeOpacity={0.75}
              onPress={onOpenNotifications}
              accessibilityLabel="Notifications"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8}>
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </Svg>
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Filter Pills */}
          <View style={styles.filterRow}>
            {(['Assigned to me', 'Open', 'Resolved'] as FilterType[]).map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterPill,
                    isSelected ? styles.filterPillActive : styles.filterPillInactive,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isSelected ? styles.filterPillTextActive : styles.filterPillTextInactive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tickets List */}
          <View style={styles.ticketsList}>
            {filteredTickets.map((ticket) => {
              const isUrgent = ticket.priority === 'Urgent';
              const isNewOrUrgentBorder = isUrgent && ticket.status === 'New';

              return (
                <View
                  key={ticket.id}
                  style={[
                    styles.ticketCard,
                    isNewOrUrgentBorder && styles.ticketCardUrgentBorder,
                  ]}
                >
                  {/* Top badges */}
                  <View style={styles.badgeRow}>
                    <View
                      style={[
                        styles.badge,
                        isUrgent ? styles.badgeUrgent : styles.badgeNormal,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          isUrgent ? styles.badgeTextUrgent : styles.badgeTextNormal,
                        ]}
                      >
                        {ticket.priority}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.badge,
                        ticket.status === 'En route'
                          ? styles.badgeEnRoute
                          : ticket.status === 'Resolved'
                          ? styles.badgeResolved
                          : styles.badgeStatusDefault,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          ticket.status === 'En route'
                            ? styles.badgeTextEnRoute
                            : ticket.status === 'Resolved'
                            ? styles.badgeTextResolved
                            : styles.badgeTextStatusDefault,
                        ]}
                      >
                        {ticket.status}
                      </Text>
                    </View>
                  </View>

                  {/* Title and Subtitle Row */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      if (onSelectTicket) {
                        onSelectTicket(ticket);
                      } else {
                        Alert.alert(
                          ticket.title,
                          `Site: ${ticket.siteName}\nTicket ID: ${ticket.ticketNumber}\nStatus: ${ticket.status}\nPriority: ${ticket.priority}`
                        );
                      }
                    }}
                  >
                    <View style={styles.ticketContentRow}>
                      <View style={styles.ticketTextContainer}>
                        <Text style={styles.ticketTitle}>{ticket.title}</Text>
                        <Text style={styles.ticketSubtitle}>
                          {ticket.siteName} · Ticket {ticket.ticketNumber}
                        </Text>
                      </View>
                      {!ticket.hasTravelCta && (
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2}>
                          <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </Svg>
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* SLA / Time indicator */}
                  <View style={styles.slaRow}>
                    <Svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={ticket.slaUrgent ? '#C2410C' : '#475569'}
                      strokeWidth={2}
                    >
                      <Circle cx={12} cy={12} r={9} />
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                    </Svg>
                    <Text
                      style={[
                        styles.slaText,
                        ticket.slaUrgent ? styles.slaTextUrgent : styles.slaTextNormal,
                      ]}
                    >
                      {ticket.slaText}
                    </Text>
                  </View>

                  {/* Optional Action Buttons (e.g. for Ticket 1) */}
                  {ticket.hasTravelCta && (
                    <View style={styles.ctaRow}>
                      <TouchableOpacity
                        style={styles.travelButtonWrapper}
                        activeOpacity={0.85}
                        onPress={() => handleStartTravel(ticket.id)}
                      >
                        <LinearGradient
                          colors={['#EA580C', '#C2410C']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={styles.travelButtonGradient}
                        >
                          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2}>
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </Svg>
                          <Text style={styles.travelButtonText}>Start travel</Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.detailsButton}
                        activeOpacity={0.75}
                        onPress={() => {
                          if (onSelectTicket) {
                            onSelectTicket(ticket);
                          } else {
                            Alert.alert(
                              `Ticket ${ticket.ticketNumber}`,
                              `Site: ${ticket.siteName}\nIssue: ${ticket.title}\nStatus: ${ticket.status}\nTarget SLA: ${ticket.slaText}`
                            );
                          }
                        }}
                      >
                        <Text style={styles.detailsButtonText}>Details</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}

            {filteredTickets.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No tickets found</Text>
                <Text style={styles.emptySubtitle}>All assigned tickets for this view are up to date.</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.bottomNav}>
          {/* Jobs */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('jobs')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'jobs' ? '#EA580C' : '#64748b'}
              strokeWidth={activeTab === 'jobs' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'jobs' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              Jobs
            </Text>
          </TouchableOpacity>

          {/* Tickets */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('tickets')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'tickets' ? '#EA580C' : '#64748b'}
              strokeWidth={activeTab === 'tickets' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'tickets' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              Tickets
            </Text>
          </TouchableOpacity>

          {/* Visits */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('visits')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'visits' ? '#EA580C' : '#64748b'}
              strokeWidth={activeTab === 'visits' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'visits' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              Visits
            </Text>
          </TouchableOpacity>

          {/* More */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('more')}
          >
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke={activeTab === 'more' ? '#EA580C' : '#64748b'}
              strokeWidth={activeTab === 'more' ? 2 : 1.8}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </Svg>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'more' ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  container: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#020617',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: 9,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#EA580C',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  filterRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPillActive: {
    backgroundColor: '#EA580C',
    borderWidth: 1,
    borderColor: '#EA580C',
  },
  filterPillInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#ffffff',
  },
  filterPillTextInactive: {
    color: '#334155',
  },
  ticketsList: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 10,
  },
  ticketCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ticketCardUrgentBorder: {
    borderColor: '#fecaca',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeUrgent: {
    backgroundColor: '#FFF7ED',
  },
  badgeNormal: {
    backgroundColor: '#f1f5f9',
  },
  badgeEnRoute: {
    backgroundColor: '#FFF7ED',
  },
  badgeResolved: {
    backgroundColor: '#ecfdf5',
  },
  badgeStatusDefault: {
    backgroundColor: '#f1f5f9',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTextUrgent: {
    color: '#C2410C',
  },
  badgeTextNormal: {
    color: '#334155',
  },
  badgeTextEnRoute: {
    color: '#C2410C',
  },
  badgeTextResolved: {
    color: '#059669',
  },
  badgeTextStatusDefault: {
    color: '#334155',
  },
  ticketContentRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ticketTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  ticketSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  slaRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  slaText: {
    fontSize: 12,
    fontWeight: '600',
  },
  slaTextUrgent: {
    color: '#C2410C',
  },
  slaTextNormal: {
    color: '#475569',
  },
  ctaRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  travelButtonWrapper: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
  },
  travelButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  travelButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  detailsButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },
  emptySubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 11,
  },
  navLabelActive: {
    color: '#EA580C',
    fontWeight: '700',
  },
  navLabelInactive: {
    color: '#64748b',
    fontWeight: '600',
  },
});
