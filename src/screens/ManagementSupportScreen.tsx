import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface ManagementTicketItem {
  id: string;
  ticketNumber: string;
  title: string;
  siteName: string;
  status: 'unassigned' | 'in_progress' | 'resolved';
  timeInfo: string;
  assignedEngineer?: string;
  canDispatch?: boolean;
}

export interface ManagementSupportScreenProps {
  onSwitchTab?: (tab: 'overview' | 'projects' | 'support' | 'leads' | 'more') => void;
  onDispatchTicket?: (ticket: ManagementTicketItem) => void;
  onSelectTicket?: (ticket: ManagementTicketItem) => void;
}

const INITIAL_TICKETS: ManagementTicketItem[] = [
  {
    id: 't-0148',
    ticketNumber: '#T-0148',
    title: 'No power',
    siteName: 'Site 009 · Barnawa',
    status: 'unassigned',
    timeInfo: 'Waiting 18 min · target 60',
    canDispatch: true,
  },
  {
    id: 't-0147',
    ticketNumber: '#T-0147',
    title: 'Inverter offline',
    siteName: 'Site 014 · Barnawa',
    status: 'unassigned',
    timeInfo: 'Waiting 12 min · target 60',
    canDispatch: true,
  },
  {
    id: 't-0146',
    ticketNumber: '#T-0146',
    title: 'Battery alarm',
    siteName: 'Site 003 · Ungwan Rimi',
    status: 'unassigned',
    timeInfo: 'Waiting 31 min · target 60',
    canDispatch: true,
  },
  {
    id: 't-0145',
    ticketNumber: '#T-0145',
    title: 'Low generation',
    siteName: 'Site 021 · Malali',
    status: 'in_progress',
    timeInfo: 'Sani M. · responded in 22 min',
    assignedEngineer: 'Sani M.',
  },
  {
    id: 't-0144',
    ticketNumber: '#T-0144',
    title: 'App not loading',
    siteName: 'Site 006 · Tudun Wada',
    status: 'in_progress',
    timeInfo: 'Aisha B. · responded in 35 min',
    assignedEngineer: 'Aisha B.',
  },
  {
    id: 't-0143',
    ticketNumber: '#T-0143',
    title: 'No power',
    siteName: 'Site 011 · Sabon Tasha',
    status: 'resolved',
    timeInfo: 'Resolved in 2 h 10 min',
  },
];

type FilterType = 'all' | 'unassigned' | 'in_progress' | 'resolved';

export const ManagementSupportScreen: React.FC<ManagementSupportScreenProps> = ({
  onSwitchTab,
  onDispatchTicket,
  onSelectTicket,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const unassignedCount = INITIAL_TICKETS.filter((t) => t.status === 'unassigned').length;
  const inProgressCount = INITIAL_TICKETS.filter((t) => t.status === 'in_progress').length;
  const resolvedCount = INITIAL_TICKETS.filter((t) => t.status === 'resolved').length;

  const filteredTickets = INITIAL_TICKETS.filter((ticket) => {
    if (activeFilter === 'unassigned' && ticket.status !== 'unassigned') return false;
    if (activeFilter === 'in_progress' && ticket.status !== 'in_progress') return false;
    if (activeFilter === 'resolved' && ticket.status !== 'resolved') return false;

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        ticket.title.toLowerCase().includes(q) ||
        ticket.ticketNumber.toLowerCase().includes(q) ||
        ticket.siteName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Support</Text>
            <Text style={styles.headerSubtitle}>7 open tickets</Text>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            activeOpacity={0.75}
            onPress={() => setShowSearch(!showSearch)}
            accessibilityLabel="Search tickets"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </Svg>
          </TouchableOpacity>
        </View>

        {showSearch && (
          <View style={styles.searchBox}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </Svg>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by ticket # or site..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearSearchText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Filter Pills */}
        <View style={styles.filterRowWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'all' ? styles.filterPillActive : styles.filterPillInactive,
              ]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter('all')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'all' ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                All
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  activeFilter === 'all' ? styles.filterCountActive : styles.filterCountInactive,
                ]}
              >
                {INITIAL_TICKETS.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'unassigned' ? styles.filterPillActive : styles.filterPillInactive,
              ]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter('unassigned')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'unassigned' ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                Unassigned
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  activeFilter === 'unassigned' ? styles.filterCountActive : styles.filterCountInactive,
                ]}
              >
                {unassignedCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'in_progress' ? styles.filterPillActive : styles.filterPillInactive,
              ]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter('in_progress')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'in_progress' ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                In progress
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  activeFilter === 'in_progress' ? styles.filterCountActive : styles.filterCountInactive,
                ]}
              >
                {inProgressCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'resolved' ? styles.filterPillActive : styles.filterPillInactive,
              ]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter('resolved')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'resolved' ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                Resolved
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  activeFilter === 'resolved' ? styles.filterCountActive : styles.filterCountInactive,
                ]}
              >
                {resolvedCount}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tickets List */}
        <ScrollView
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredTickets.map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              style={styles.ticketCard}
              activeOpacity={0.85}
              onPress={() => onSelectTicket?.(ticket)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                {ticket.status === 'unassigned' && (
                  <View style={styles.unassignedBadge}>
                    <Text style={styles.unassignedBadgeText}>Unassigned</Text>
                  </View>
                )}
                {ticket.status === 'in_progress' && (
                  <View style={styles.inProgressBadge}>
                    <Text style={styles.inProgressBadgeText}>In progress</Text>
                  </View>
                )}
                {ticket.status === 'resolved' && (
                  <View style={styles.resolvedBadge}>
                    <Text style={styles.resolvedBadgeText}>Resolved</Text>
                  </View>
                )}
              </View>

              <Text style={styles.ticketSub}>
                {ticket.ticketNumber} · {ticket.siteName}
              </Text>

              {ticket.canDispatch ? (
                <View style={styles.cardActionRow}>
                  <Text style={styles.timeInfoText}>{ticket.timeInfo}</Text>
                  <TouchableOpacity
                    style={styles.dispatchButton}
                    activeOpacity={0.8}
                    onPress={() => onDispatchTicket?.(ticket)}
                  >
                    <LinearGradient
                      colors={['#dc2626', '#b91c1c']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.dispatchButtonGradient}
                    >
                      <Text style={styles.dispatchButtonText}>Dispatch</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.cardInfoRow}>
                  <Text style={styles.timeInfoText}>{ticket.timeInfo}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Management Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => onSwitchTab?.('overview')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </Svg>
            <Text style={styles.navLabelInactive}>Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => onSwitchTab?.('projects')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </Svg>
            <Text style={styles.navLabelInactive}>Projects</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => onSwitchTab?.('support')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
            </Svg>
            <Text style={styles.navLabelActive}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => onSwitchTab?.('leads')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
            </Svg>
            <Text style={styles.navLabelInactive}>Leads</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => onSwitchTab?.('more')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </Svg>
            <Text style={styles.navLabelInactive}>More</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
    lineHeight: 32,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 8,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },
  clearSearchText: {
    fontSize: 13,
    color: '#dc2626',
    fontWeight: '600',
  },
  filterRowWrapper: {
    marginTop: 10,
    paddingBottom: 4,
  },
  filterRow: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterPillActive: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
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
  filterCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterCountActive: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  filterCountInactive: {
    color: '#64748b',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 10,
  },
  ticketCard: {
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  unassignedBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fffbeb',
  },
  unassignedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b45309',
  },
  inProgressBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  inProgressBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  resolvedBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  resolvedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
  ticketSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  cardActionRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfoRow: {
    marginTop: 8,
  },
  timeInfoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  dispatchButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  dispatchButtonGradient: {
    height: 38,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dispatchButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  bottomNav: {
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626',
  },
  navLabelInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
});
