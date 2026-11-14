import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface PhotoMediaItem {
  id: string;
  type: 'photo' | 'video';
  duration?: string;
  title: string;
  stage: 'Survey' | 'Procurement' | 'Installation';
  gradient: [string, string];
}

interface PhotoSection {
  id: string;
  stage: 'Survey' | 'Procurement' | 'Installation';
  title: string;
  dateStr: string;
  items: PhotoMediaItem[];
}

const SECTIONS_DATA: PhotoSection[] = [
  {
    id: 'sec-install',
    stage: 'Installation',
    title: 'Installation · 4 Mar',
    dateStr: '4 Mar',
    items: [
      { id: 'p1', type: 'photo', title: 'Roof panel racking mounted', stage: 'Installation', gradient: ['#e2e8f0', '#f1f5f9'] },
      { id: 'p2', type: 'photo', title: 'PV array wiring harness', stage: 'Installation', gradient: ['#f1f5f9', '#e2e8f0'] },
      { id: 'p3', type: 'video', duration: '0:24', title: 'Solar array overview clip', stage: 'Installation', gradient: ['#cbd5e1', '#e2e8f0'] },
      { id: 'p4', type: 'photo', title: 'Inverter busbar connection', stage: 'Installation', gradient: ['#e2e8f0', '#f8fafc'] },
      { id: 'p5', type: 'photo', title: 'Surge protection device check', stage: 'Installation', gradient: ['#e2e8f0', '#f1f5f9'] },
      { id: 'p6', type: 'photo', title: 'DC isolator switchboard', stage: 'Installation', gradient: ['#f1f5f9', '#e2e8f0'] },
    ],
  },
  {
    id: 'sec-procure',
    stage: 'Procurement',
    title: 'Procurement · 20 Feb',
    dateStr: '20 Feb',
    items: [
      { id: 'p7', type: 'photo', title: 'Tier-1 Mono PERC panels delivered', stage: 'Procurement', gradient: ['#e2e8f0', '#f8fafc'] },
      { id: 'p8', type: 'photo', title: 'Lithium LiFePO4 battery crates', stage: 'Procurement', gradient: ['#e2e8f0', '#f1f5f9'] },
      { id: 'p9', type: 'photo', title: 'Hybrid inverter & balance of system', stage: 'Procurement', gradient: ['#f1f5f9', '#e2e8f0'] },
    ],
  },
  {
    id: 'sec-survey',
    stage: 'Survey',
    title: 'Survey · 3 Feb',
    dateStr: '3 Feb',
    items: [
      { id: 'p10', type: 'photo', title: 'Main roof structure & azimuth', stage: 'Survey', gradient: ['#f1f5f9', '#e2e8f0'] },
      { id: 'p11', type: 'photo', title: 'Shadow analysis & irradiance check', stage: 'Survey', gradient: ['#e2e8f0', '#f8fafc'] },
      { id: 'p12', type: 'photo', title: 'Distribution panel inspection', stage: 'Survey', gradient: ['#e2e8f0', '#f1f5f9'] },
    ],
  },
];

type FilterType = 'All' | 'Survey' | 'Procurement' | 'Installation';

export interface SitePhotosScreenProps {
  siteName?: string;
  onBack?: () => void;
}

export const SitePhotosScreen: React.FC<SitePhotosScreenProps> = ({
  siteName = 'Main Residence',
  onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [previewItem, setPreviewItem] = useState<PhotoMediaItem | null>(null);

  const visibleSections = SECTIONS_DATA.filter((sec) => {
    if (activeFilter === 'All') return true;
    return sec.stage === activeFilter;
  });

  const totalItemsCount = visibleSections.reduce((sum, s) => sum + s.items.length, 0);

  const handleItemPress = (item: PhotoMediaItem) => {
    setPreviewItem(item);
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
              accessibilityLabel="Back to project"
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
              <Text style={styles.headerTitle}>Site photos</Text>
              <Text style={styles.headerSubtitle}>
                {siteName} · {totalItemsCount} items
              </Text>
            </View>
          </View>

          {/* Filter Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPillsContainer}
            style={styles.filterScrollView}
          >
            {(['All', 'Survey', 'Procurement', 'Installation'] as FilterType[]).map((filter) => {
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
          </ScrollView>

          {/* Grouped Sections */}
          {visibleSections.map((section) => (
            <View key={section.id} style={styles.sectionContainer}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
                <Text style={styles.sectionHeaderCount}>{section.items.length} items</Text>
              </View>

              <View style={styles.photoGrid}>
                {section.items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.gridItemWrapper}
                    activeOpacity={0.8}
                    onPress={() => handleItemPress(item)}
                  >
                    <LinearGradient
                      colors={item.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.mediaBox}
                    >
                      {item.type === 'video' ? (
                        <>
                          <View style={styles.playButtonBadge}>
                            <Svg width={16} height={16} viewBox="0 0 24 24" fill="#ffffff">
                              <Path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
                            </Svg>
                          </View>
                          {item.duration && (
                            <View style={styles.durationBadge}>
                              <Text style={styles.durationBadgeText}>{item.duration}</Text>
                            </View>
                          )}
                        </>
                      ) : (
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                          <Path
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                            stroke="#64748b"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Media Preview Modal */}
      {previewItem && (
        <Modal
          visible={true}
          transparent
          animationType="fade"
          onRequestClose={() => setPreviewItem(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <LinearGradient
                colors={previewItem.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalMediaPreview}
              >
                {previewItem.type === 'video' ? (
                  <View style={styles.modalPlayCircle}>
                    <Svg width={28} height={28} viewBox="0 0 24 24" fill="#ffffff">
                      <Path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
                    </Svg>
                  </View>
                ) : (
                  <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                      stroke="#64748b"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </LinearGradient>

              <View style={styles.modalInfoContent}>
                <View style={styles.modalTagRow}>
                  <View style={styles.modalTag}>
                    <Text style={styles.modalTagText}>{previewItem.stage}</Text>
                  </View>
                  {previewItem.duration && (
                    <Text style={styles.modalDurationText}>{previewItem.duration}</Text>
                  )}
                </View>
                <Text style={styles.modalTitleText}>{previewItem.title}</Text>
                <Text style={styles.modalSiteText}>{siteName} · Verified SUNPULSE QA</Text>

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  activeOpacity={0.8}
                  onPress={() => setPreviewItem(null)}
                >
                  <Text style={styles.modalCloseButtonText}>Close preview</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  filterScrollView: {
    marginTop: 16,
    marginHorizontal: -20,
  },
  filterPillsContainer: {
    paddingHorizontal: 20,
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
    flexShrink: 0,
  },
  filterPillActive: {
    borderWidth: 1,
    borderColor: '#EA580C',
    backgroundColor: '#EA580C',
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
  sectionContainer: {
    marginTop: 18,
  },
  sectionHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  sectionHeaderCount: {
    fontSize: 12,
    color: '#64748b',
  },
  photoGrid: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItemWrapper: {
    width: (Dimensions.get('window').width - 40 - 16) / 3,
    height: 104,
  },
  mediaBox: {
    width: '100%',
    height: 104,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  playButtonBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    left: 6,
    bottom: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
  },
  durationBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  modalMediaPreview: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPlayCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInfoContent: {
    padding: 20,
  },
  modalTagRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTag: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#FFF7ED',
  },
  modalTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EA580C',
  },
  modalDurationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  modalTitleText: {
    marginTop: 10,
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  modalSiteText: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748b',
  },
  modalCloseButton: {
    marginTop: 20,
    width: '100%',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
