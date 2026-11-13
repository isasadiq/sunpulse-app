import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface ManagementLeadItem {
  id: string;
  name: string;
  location: string;
  systemSpecs: string;
  channel: string;
  timeAgo: string;
  status: 'new' | 'contacted' | 'quoted';
  phoneNumber?: string;
  canContact?: boolean;
}

export interface ManagementLeadsScreenProps {
  onSwitchTab?: (tab: 'overview' | 'projects' | 'support' | 'leads' | 'more') => void;
  onSelectLead?: (lead: ManagementLeadItem) => void;
}

const INITIAL_LEADS: ManagementLeadItem[] = [
  {
    id: 'lead-1',
    name: 'Musa I.',
    location: 'Barnawa, Kaduna',
    systemSpecs: '1.5 kWp · 5 kWh',
    channel: 'Phone call',
    timeAgo: '20 min ago',
    status: 'new',
    phoneNumber: '+234 803 123 4567',
    canContact: true,
  },
  {
    id: 'lead-2',
    name: 'Zainab A.',
    location: 'Malali, Kaduna',
    systemSpecs: '3 kWp · 10 kWh',
    channel: 'WhatsApp',
    timeAgo: '1 h ago',
    status: 'new',
    phoneNumber: '+234 802 987 6543',
    canContact: true,
  },
  {
    id: 'lead-3',
    name: 'Ibrahim D.',
    location: 'Ungwan Rimi, Kaduna',
    systemSpecs: '2 kWp · 5 kWh',
    channel: 'SMS',
    timeAgo: '3 h ago',
    status: 'new',
    phoneNumber: '+234 814 555 0199',
    canContact: true,
  },
  {
    id: 'lead-4',
    name: 'Fatima Y.',
    location: 'Kawo, Kaduna',
    systemSpecs: '5 kWp · 10 kWh',
    channel: 'WhatsApp',
    timeAgo: 'called yesterday',
    status: 'contacted',
    phoneNumber: '+234 805 444 3322',
  },
  {
    id: 'lead-5',
    name: 'Abdul R.',
    location: 'Tudun Wada, Kaduna',
    systemSpecs: '8 kWp · 15 kWh',
    channel: 'Quote sent',
    timeAgo: '2 days ago',
    status: 'quoted',
    phoneNumber: '+234 809 777 8899',
  },
  {
    id: 'lead-6',
    name: 'Rabi U.',
    location: 'Sabon Tasha, Kaduna',
    systemSpecs: '4 kWp · 10 kWh',
    channel: 'Phone call',
    timeAgo: 'called 3 days ago',
    status: 'contacted',
    phoneNumber: '+234 818 222 1100',
  },
];

type LeadFilterType = 'all' | 'new' | 'contacted' | 'quoted';

export const ManagementLeadsScreen: React.FC<ManagementLeadsScreenProps> = ({
  onSwitchTab,
  onSelectLead,
}) => {
  const [activeFilter, setActiveFilter] = useState<LeadFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [leadsList, setLeadsList] = useState<ManagementLeadItem[]>(INITIAL_LEADS);

  const newCount = leadsList.filter((l) => l.status === 'new').length;
  const contactedCount = leadsList.filter((l) => l.status === 'contacted').length;
  const quotedCount = leadsList.filter((l) => l.status === 'quoted').length;

  const filteredLeads = leadsList.filter((lead) => {
    if (activeFilter === 'new' && lead.status !== 'new') return false;
    if (activeFilter === 'contacted' && lead.status !== 'contacted') return false;
    if (activeFilter === 'quoted' && lead.status !== 'quoted') return false;

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.location.toLowerCase().includes(q) ||
        lead.systemSpecs.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleContact = (lead: ManagementLeadItem) => {
    Alert.alert(
      `Contact ${lead.name}`,
      `Preferred channel: ${lead.channel}\nPhone: ${lead.phoneNumber || 'Not provided'}`,
      [
        {
          text: 'Call Phone',
          onPress: () => {
            if (lead.phoneNumber) {
              Linking.openURL(`tel:${lead.phoneNumber}`);
            }
            markAsContacted(lead.id);
          },
        },
        {
          text: 'Open WhatsApp',
          onPress: () => {
            if (lead.phoneNumber) {
              const cleaned = lead.phoneNumber.replace(/[^0-9]/g, '');
              Linking.openURL(`whatsapp://send?phone=${cleaned}&text=Hello ${lead.name}, regarding your clean energy quote request from SUNPULSE...`);
            }
            markAsContacted(lead.id);
          },
        },
        {
          text: 'Mark Contacted',
          onPress: () => markAsContacted(lead.id),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const markAsContacted = (id: string) => {
    setLeadsList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'contacted', canContact: false, timeAgo: 'Contacted just now' } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Leads</Text>
            <Text style={styles.headerSubtitle}>{newCount} new quote requests</Text>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            activeOpacity={0.75}
            onPress={() => setShowSearch(!showSearch)}
            accessibilityLabel="Search leads"
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
              placeholder="Search leads by name or location..."
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
                {leadsList.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'new' ? styles.filterPillActive : styles.filterPillInactive,
              ]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter('new')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'new' ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                New
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  activeFilter === 'new' ? styles.filterCountActive : styles.filterCountInactive,
                ]}
              >
                {newCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'contacted' ? styles.filterPillActive : styles.filterPillInactive,
              ]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter('contacted')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'contacted' ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                Contacted
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  activeFilter === 'contacted' ? styles.filterCountActive : styles.filterCountInactive,
                ]}
              >
                {contactedCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'quoted' ? styles.filterPillActive : styles.filterPillInactive,
              ]}
              activeOpacity={0.75}
              onPress={() => setActiveFilter('quoted')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'quoted' ? styles.filterPillTextActive : styles.filterPillTextInactive,
                ]}
              >
                Quoted
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  activeFilter === 'quoted' ? styles.filterCountActive : styles.filterCountInactive,
                ]}
              >
                {quotedCount}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Leads List */}
        <ScrollView
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredLeads.map((lead) => (
            <TouchableOpacity
              key={lead.id}
              style={styles.leadCard}
              activeOpacity={0.85}
              onPress={() => onSelectLead?.(lead)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.leadName}>{lead.name}</Text>
                {lead.status === 'new' && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New</Text>
                  </View>
                )}
                {lead.status === 'contacted' && (
                  <View style={styles.contactedBadge}>
                    <Text style={styles.contactedBadgeText}>Contacted</Text>
                  </View>
                )}
                {lead.status === 'quoted' && (
                  <View style={styles.quotedBadge}>
                    <Text style={styles.quotedBadgeText}>Quoted</Text>
                  </View>
                )}
              </View>

              <Text style={styles.leadSub}>
                {lead.location} · {lead.systemSpecs}
              </Text>

              {lead.canContact ? (
                <View style={styles.cardActionRow}>
                  <Text style={styles.timeInfoText}>
                    {lead.channel} · {lead.timeAgo}
                  </Text>
                  <TouchableOpacity
                    style={styles.contactButton}
                    activeOpacity={0.8}
                    onPress={() => handleContact(lead)}
                  >
                    <LinearGradient
                      colors={['#dc2626', '#b91c1c']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.contactButtonGradient}
                    >
                      <Text style={styles.contactButtonText}>Contact</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.cardInfoRow}>
                  <Text style={styles.timeInfoText}>
                    {lead.channel} · {lead.timeAgo}
                  </Text>
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
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
            </Svg>
            <Text style={styles.navLabelInactive}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => onSwitchTab?.('leads')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
            </Svg>
            <Text style={styles.navLabelActive}>Leads</Text>
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
  leadCard: {
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
  leadName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  newBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fef2f2',
  },
  newBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
  contactedBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  contactedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  quotedBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  quotedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  leadSub: {
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
  contactButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  contactButtonGradient: {
    height: 38,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
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
