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

export interface PastTicketItem {
  id: string;
  ticketNumber: string;
  title: string;
  dateStr: string;
  month: 'October' | 'September' | 'August';
  category: 'fault' | 'maintenance';
  status: 'Resolved';
}

const PAST_TICKETS_DATA: PastTicketItem[] = [
  {
    id: 't-0987',
    ticketNumber: '#0987',
    title: 'Battery alarm',
    dateStr: 'Ticket #0987 · 2 Oct',
    month: 'October',
    category: 'fault',
    status: 'Resolved',
  },
  {
    id: 't-0951',
    ticketNumber: '#0951',
    title: 'Inverter offline',
    dateStr: 'Ticket #0951 · 18 Sep',
    month: 'September',
    category: 'fault',
    status: 'Resolved',
  },
  {
    id: 't-0902',
    ticketNumber: '#0902',
    title: 'No power',
    dateStr: 'Ticket #0902 · 4 Sep',
    month: 'September',
    category: 'fault',
    status: 'Resolved',
  },
  {
    id: 't-0874',
    ticketNumber: '#0874',
    title: 'Battery issue',
    dateStr: 'Ticket #0874 · 12 Aug',
    month: 'August',
    category: 'fault',
    status: 'Resolved',
  },
  {
    id: 't-0850',
    ticketNumber: '#0850',
    title: 'Panel washing visit',
    dateStr: 'Maintenance · 3 Aug',
    month: 'August',
    category: 'maintenance',
    status: 'Resolved',
  },
];

type FilterType = 'All' | 'Faults' | 'Maintenance';

export interface PastTicketsScreenProps {
  siteName?: string;
  onBack?: () => void;
  onSelectTicket?: (ticket: PastTicketItem) => void;
}

export const PastTicketsScreen: React.FC<PastTicketsScreenProps> = ({
  siteName = 'Main Residence',
  onBack,
  onSelectTicket,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredTickets = PAST_TICKETS_DATA.filter((ticket) => {
    if (activeFilter === 'Faults') return ticket.category === 'fault';
    if (activeFilter === 'Maintenance') return ticket.category === 'maintenance';
    return true;
  });

  const months: Array<'October' | 'September' | 'August'> = ['October', 'September', 'August'];

  const handleTicketPress = (ticket: PastTicketItem) => {
    if (onSelectTicket) {
      onSelectTicket(ticket);
      return;
    }
    Alert.alert(
      ticket.title,
      `${ticket.dateStr}\nStatus: ${ticket.status}\nLocation: ${siteName}\n\nEngineer confirmed full resolution and operational verification sign-off.`
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
              accessibilityLabel="Back to support"
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

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Past tickets</Text>
              <Text style={styles.headerSubtitle}>
                {siteName} · {filteredTickets.length} resolved
              </Text>
            </View>
          </View>

          {/* Filter Pills */}
          <View style={styles.filterPillsRow}>
            {(['All', 'Faults', 'Maintenance'] as FilterType[]).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterPill,
                    isActive ? styles.filterPillActive : styles.filterPillInactive,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isActive ? styles.filterPillTextActive : styles.filterPillTextInactive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Grouped Month Sections */}
          {months.map((month) => {
            const monthTickets = filteredTickets.filter((t) => t.month === month);
            if (monthTickets.length === 0) return null;

            return (
              <View key={month}>
                <Text style={styles.sectionHeader}>{month}</Text>
                <View style={styles.card}>
                  {monthTickets.map((ticket, index) => {
                    const isLast = index === monthTickets.length - 1;
                    return (
                      <TouchableOpacity
                        key={ticket.id}
                        style={[
                          styles.ticketRow,
                          !isLast && styles.ticketRowBorder,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handleTicketPress(ticket)}
                      >
                        <View style={styles.ticketContent}>
                          <Text style={styles.ticketTitle}>{ticket.title}</Text>
                          <Text style={styles.ticketSubtitle}>{ticket.dateStr}</Text>
                        </View>
                        <View style={styles.resolvedPill}>
                          <Text style={styles.resolvedPillText}>{ticket.status}</Text>
                        </View>
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                          <Path
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            stroke="#64748b"
                            strokeWidth={2.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
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
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48,
    lineHeight: 29,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  filterPillsRow: {
    marginTop: 16,
    display: 'flex',
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
    borderWidth: 1,
    borderColor: '#dc2626',
    backgroundColor: '#dc2626',
  },
  filterPillInactive: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  filterPillText: {
    fontFamily: 'System',
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#ffffff',
  },
  filterPillTextInactive: {
    color: '#334155',
  },
  sectionHeader: {
    marginTop: 16,
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
  ticketRow: {
    minHeight: 64,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ticketRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  ticketContent: {
    flex: 1,
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  ticketSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  resolvedPill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  resolvedPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
});
