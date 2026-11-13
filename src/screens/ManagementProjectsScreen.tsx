import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export interface ManagementProjectItem {
  id: string;
  name: string;
  specs: string;
  stageName: 'Survey' | 'Procurement' | 'Installation' | 'Commissioning' | 'Handover';
  stageNumber: number; // 1 to 5
  assignedEngineer: string;
  badgeStatus?: 'Waiting' | 'Done';
}

export interface ManagementProjectsScreenProps {
  onSwitchTab?: (tab: 'overview' | 'projects' | 'support' | 'leads' | 'more') => void;
  onSelectProject?: (project: ManagementProjectItem) => void;
}

const INITIAL_PROJECTS: ManagementProjectItem[] = [
  {
    id: 'p1',
    name: 'Residence, Barnawa',
    specs: '5 kWp · 10 kWh · Kaduna',
    stageName: 'Installation',
    stageNumber: 3,
    assignedEngineer: 'Sani M.',
  },
  {
    id: 'p2',
    name: 'Clinic, Ungwan Rimi',
    specs: '12 kWp · 20 kWh · Kaduna',
    stageName: 'Commissioning',
    stageNumber: 4,
    assignedEngineer: 'Aisha B.',
  },
  {
    id: 'p3',
    name: 'Shop, Kasuwan Barchi',
    specs: '3 kWp · 5 kWh · Kaduna',
    stageName: 'Procurement',
    stageNumber: 2,
    assignedEngineer: 'Yusuf K.',
    badgeStatus: 'Waiting',
  },
  {
    id: 'p4',
    name: 'Residence, Malali',
    specs: '8 kWp · 15 kWh · Kaduna',
    stageName: 'Survey',
    stageNumber: 1,
    assignedEngineer: 'Unassigned',
  },
  {
    id: 'p5',
    name: 'School, Tudun Wada',
    specs: '20 kWp · 40 kWh · Kaduna',
    stageName: 'Handover',
    stageNumber: 5,
    assignedEngineer: 'Aisha B.',
    badgeStatus: 'Done',
  },
  {
    id: 'p6',
    name: 'Office, Sabon Tasha',
    specs: '10 kWp · 20 kWh · Kaduna',
    stageName: 'Installation',
    stageNumber: 3,
    assignedEngineer: 'Sani M.',
  },
];

type FilterType = 'All' | 'Survey' | 'Procurement' | 'Installation' | 'Commissioning' | 'Handover';

export const ManagementProjectsScreen: React.FC<ManagementProjectsScreenProps> = ({
  onSwitchTab,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return INITIAL_PROJECTS.filter((item) => {
      const matchesFilter = activeFilter === 'All' || item.stageName === activeFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignedEngineer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const filterCounts = useMemo(() => {
    return {
      All: INITIAL_PROJECTS.length,
      Survey: INITIAL_PROJECTS.filter((p) => p.stageName === 'Survey').length,
      Procurement: INITIAL_PROJECTS.filter((p) => p.stageName === 'Procurement').length,
      Installation: INITIAL_PROJECTS.filter((p) => p.stageName === 'Installation').length,
      Commissioning: INITIAL_PROJECTS.filter((p) => p.stageName === 'Commissioning').length,
      Handover: INITIAL_PROJECTS.filter((p) => p.stageName === 'Handover').length,
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitle}>Projects</Text>
              <Text style={styles.headerSubtitle}>
                {INITIAL_PROJECTS.length} active projects
              </Text>
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              activeOpacity={0.75}
              onPress={() => setIsSearchOpen((prev) => !prev)}
              accessibilityLabel="Search projects"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Optional Search Bar Input */}
          {isSearchOpen && (
            <View style={styles.searchBarWrapper}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2}>
                <Path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </Svg>
              <TextInput
                style={styles.searchInput}
                placeholder="Search projects, location, engineer..."
                placeholderTextColor="#64748b"
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

          {/* Stage Filters Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScrollContent}
            style={styles.filtersContainer}
          >
            {(['All', 'Survey', 'Procurement', 'Installation', 'Commissioning', 'Handover'] as FilterType[]).map(
              (filter) => {
                const isSelected = activeFilter === filter;
                return (
                  <TouchableOpacity
                    key={filter}
                    style={[styles.filterChip, isSelected ? styles.filterChipActive : styles.filterChipInactive]}
                    activeOpacity={0.8}
                    onPress={() => setActiveFilter(filter)}
                  >
                    <Text style={[styles.filterChipText, isSelected ? styles.filterTextActive : styles.filterTextInactive]}>
                      {filter}
                    </Text>
                    <Text style={[styles.filterCount, isSelected ? styles.filterCountActive : styles.filterCountInactive]}>
                      {filterCounts[filter]}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </ScrollView>

          {/* Projects List */}
          <View style={styles.projectsList}>
            {filteredProjects.map((project) => {
              const isDone = project.badgeStatus === 'Done';
              const isWaiting = project.badgeStatus === 'Waiting';

              return (
                <TouchableOpacity
                  key={project.id}
                  style={styles.projectCard}
                  activeOpacity={0.75}
                  onPress={() => onSelectProject?.(project)}
                >
                  {/* Card Title & Badge Row */}
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {isWaiting && (
                      <View style={styles.waitingBadge}>
                        <Text style={styles.waitingBadgeText}>Waiting</Text>
                      </View>
                    )}
                    {isDone && (
                      <View style={styles.doneBadge}>
                        <Text style={styles.doneBadgeText}>Done</Text>
                      </View>
                    )}
                  </View>

                  {/* Specs */}
                  <Text style={styles.projectSpecs}>{project.specs}</Text>

                  {/* 5-Stage Indicator Bar */}
                  <View style={styles.stageBarRow}>
                    {[1, 2, 3, 4, 5].map((stageIndex) => {
                      const isCompletedOrCurrent = stageIndex <= project.stageNumber;
                      const segmentColor = isDone
                        ? '#15803d' // All green when completed handover
                        : isCompletedOrCurrent
                        ? '#dc2626' // Red filled
                        : '#e2e8f0'; // Gray empty

                      return (
                        <View
                          key={stageIndex}
                          style={[styles.stageSegment, { backgroundColor: segmentColor }]}
                        />
                      );
                    })}
                  </View>

                  {/* Card Footer Row */}
                  <View style={styles.cardFooterRow}>
                    <Text style={styles.stageLabel}>
                      {project.stageName} · stage {project.stageNumber} of 5
                    </Text>
                    <Text style={styles.engineerLabel}>{project.assignedEngineer}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('overview')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </Svg>
            <Text style={styles.navText}>Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('projects')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </Svg>
            <Text style={[styles.navText, styles.navTextActive]}>Projects</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('support')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
            </Svg>
            <Text style={styles.navText}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('leads')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
            </Svg>
            <Text style={styles.navText}>Leads</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => onSwitchTab?.('more')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </Svg>
            <Text style={styles.navText}>More</Text>
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
    position: 'relative',
    backgroundColor: '#fafbfd',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100, // Space for bottom nav
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.52,
    lineHeight: 31.2,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  /* Search Input */
  searchBarWrapper: {
    marginTop: 10,
    height: 44,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0f172a',
  },
  clearSearchText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },

  /* Filters */
  filtersContainer: {
    marginTop: 14,
    marginRight: -20,
  },
  filtersScrollContent: {
    gap: 8,
    paddingRight: 20,
  },
  filterChip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  filterChipInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  filterTextInactive: {
    color: '#334155',
  },
  filterCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterCountActive: {
    color: 'rgba(255,255,255,0.85)',
  },
  filterCountInactive: {
    color: '#64748b',
  },

  /* Projects List */
  projectsList: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 10,
  },
  projectCard: {
    padding: 14,
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  waitingBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fffbeb',
  },
  waitingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b45309',
  },
  doneBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  doneBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
  projectSpecs: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },
  stageBarRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 4,
  },
  stageSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  cardFooterRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
  },
  stageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  engineerLabel: {
    fontSize: 12,
    color: '#64748b',
  },

  /* Bottom Nav */
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    paddingTop: 8,
    paddingBottom: 22,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  navTextActive: {
    color: '#dc2626',
    fontWeight: '700',
  },
});
