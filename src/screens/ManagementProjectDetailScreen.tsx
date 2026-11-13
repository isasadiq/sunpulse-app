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
import Svg, { Path } from 'react-native-svg';

export interface ProjectStageItem {
  name: string;
  status: 'completed' | 'in_progress' | 'not_started';
  dateOrStatusText: string;
}

export interface ManagementProjectDetailData {
  projectName: string;
  specs: string;
  clientName: string;
  engineerName: string;
  mobileAccessStatus: 'Not activated' | 'Activated';
  stages: ProjectStageItem[];
  photoCount?: string;
}

export interface ManagementProjectDetailScreenProps {
  project?: ManagementProjectDetailData;
  onBack?: () => void;
  onActivateMobile?: () => void;
  onChangeEngineer?: () => void;
  onEnrolMaintenance?: () => void;
  onViewSitePhotos?: () => void;
}

const DEFAULT_PROJECT_DETAIL: ManagementProjectDetailData = {
  projectName: 'Residence, Barnawa',
  specs: '5 kWp · 10 kWh · Kaduna',
  clientName: 'Hauwa S.',
  engineerName: 'Sani M.',
  mobileAccessStatus: 'Not activated',
  stages: [
    { name: 'Survey', status: 'completed', dateOrStatusText: '3 Sep' },
    { name: 'Procurement', status: 'completed', dateOrStatusText: '21 Sep' },
    { name: 'Installation', status: 'in_progress', dateOrStatusText: 'In progress' },
    { name: 'Commissioning', status: 'not_started', dateOrStatusText: 'Not started' },
    { name: 'Handover', status: 'not_started', dateOrStatusText: 'Not started' },
  ],
  photoCount: '3 of 14',
};

export const ManagementProjectDetailScreen: React.FC<ManagementProjectDetailScreenProps> = ({
  project = DEFAULT_PROJECT_DETAIL,
  onBack,
  onActivateMobile,
  onChangeEngineer,
  onEnrolMaintenance,
  onViewSitePhotos,
}) => {
  const [mobileActivated, setMobileActivated] = useState(
    project.mobileAccessStatus === 'Activated'
  );
  const [engineer, setEngineer] = useState(project.engineerName);

  const handleActivateMobile = () => {
    if (onActivateMobile) {
      onActivateMobile();
    } else {
      setMobileActivated(true);
      Alert.alert(
        'Mobile Access Activated',
        `Client ${project.clientName} can now sign in using their registered email and view telemetry.`
      );
    }
  };

  const handleChangeEngineer = () => {
    if (onChangeEngineer) {
      onChangeEngineer();
    } else {
      Alert.alert(
        'Reassign Engineer',
        `Select lead engineer for ${project.projectName}:`,
        [
          { text: 'Sani M.', onPress: () => setEngineer('Sani M.') },
          { text: 'Aisha B.', onPress: () => setEngineer('Aisha B.') },
          { text: 'Yusuf K.', onPress: () => setEngineer('Yusuf K.') },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={onBack}
              accessibilityLabel="Back to projects"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitle}>{project.projectName}</Text>
              <Text style={styles.headerSubtitle}>{project.specs}</Text>
            </View>
          </View>

          {/* Metadata Card */}
          <View style={styles.metaCard}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Client</Text>
              <Text style={styles.metaValue}>{project.clientName}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Engineer</Text>
              <Text style={styles.metaValue}>{engineer}</Text>
            </View>
            <View style={[styles.metaRow, styles.metaRowLast]}>
              <Text style={styles.metaLabel}>Mobile access</Text>
              {mobileActivated ? (
                <View style={styles.activatedBadge}>
                  <Text style={styles.activatedBadgeText}>Activated</Text>
                </View>
              ) : (
                <View style={styles.notActivatedBadge}>
                  <Text style={styles.notActivatedBadgeText}>Not activated</Text>
                </View>
              )}
            </View>
          </View>

          {/* Project Stages Stepper Card */}
          <View style={styles.stagesCard}>
            <Text style={styles.stagesTitle}>Project stages</Text>
            <View style={styles.stagesList}>
              {project.stages.map((stage, idx) => {
                const isLast = idx === project.stages.length - 1;
                const isCompleted = stage.status === 'completed';
                const isInProgress = stage.status === 'in_progress';

                return (
                  <View key={stage.name} style={styles.stageStepRow}>
                    {/* Stepper Node & Vertical Line */}
                    <View style={styles.nodeContainer}>
                      {isCompleted && (
                        <View style={styles.completedNode}>
                          <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <Path d="M4.5 12.75l6 6 9-13.5" />
                          </Svg>
                        </View>
                      )}
                      {isInProgress && (
                        <View style={styles.inProgressNode}>
                          <LinearGradient
                            colors={['#dc2626', '#b91c1c']}
                            style={styles.inProgressInnerDot}
                          />
                        </View>
                      )}
                      {!isCompleted && !isInProgress && (
                        <View style={styles.unstartedNode} />
                      )}
                      {!isLast && (
                        <View
                          style={[
                            styles.connectorLine,
                            isCompleted ? styles.connectorCompleted : styles.connectorPending,
                          ]}
                        />
                      )}
                    </View>

                    {/* Step Title & Status */}
                    <View style={styles.stageInfoRow}>
                      <Text
                        style={[
                          styles.stageStepName,
                          isCompleted || isInProgress
                            ? styles.stageStepActive
                            : styles.stageStepPending,
                        ]}
                      >
                        {stage.name}
                      </Text>
                      <Text
                        style={[
                          styles.stageStatusText,
                          isInProgress && styles.stageStatusInProgress,
                        ]}
                      >
                        {stage.dateOrStatusText}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Site Photos Card */}
          <TouchableOpacity
            style={styles.photosCard}
            activeOpacity={0.8}
            onPress={onViewSitePhotos}
          >
            <View style={styles.photosHeader}>
              <Text style={styles.photosTitle}>Site photos</Text>
              <Text style={styles.photosCount}>{project.photoCount || '3 of 14'}</Text>
            </View>
            <View style={styles.photosThumbnailsRow}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.photoThumb}>
                  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                  </Svg>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Action Buttons Footer */}
        <View style={styles.footer}>
          {mobileActivated ? (
            <TouchableOpacity
              style={styles.primaryButtonWrapper}
              activeOpacity={0.85}
              onPress={onEnrolMaintenance}
            >
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.primaryGradient}
              >
                <Text style={styles.primaryButtonText}>Enrol in preventive maintenance</Text>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </Svg>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.primaryButtonWrapper}
              activeOpacity={0.85}
              onPress={handleActivateMobile}
            >
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.primaryGradient}
              >
                <Text style={styles.primaryButtonText}>Activate for mobile</Text>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </Svg>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.75}
            onPress={handleChangeEngineer}
          >
            <Text style={styles.secondaryButtonText}>Change engineer</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    flexShrink: 0,
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
  headerTextCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.44, // -0.02em
    lineHeight: 26.4,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },

  /* Meta Card */
  metaCard: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
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
  metaRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  metaRowLast: {
    borderBottomWidth: 0,
  },
  metaLabel: {
    fontSize: 13,
    color: '#475569',
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  notActivatedBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#fffbeb',
  },
  notActivatedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b45309',
  },
  activatedBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0fdf4',
  },
  activatedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },

  /* Project Stages Card */
  stagesCard: {
    marginTop: 12,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
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
  stagesTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
    marginBottom: 6,
  },
  stagesList: {
    flexDirection: 'column',
  },
  stageStepRow: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeContainer: {
    width: 36,
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
  },
  completedNode: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inProgressNode: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inProgressInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  unstartedNode: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  connectorLine: {
    position: 'absolute',
    left: 10,
    top: 31,
    width: 2,
    height: 18,
    zIndex: 1,
  },
  connectorCompleted: {
    backgroundColor: '#bbf7d0',
  },
  connectorPending: {
    backgroundColor: '#e2e8f0',
  },
  stageInfoRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stageStepName: {
    fontSize: 14,
    fontWeight: '700',
  },
  stageStepActive: {
    color: '#0f172a',
  },
  stageStepPending: {
    color: '#64748b',
  },
  stageStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  stageStatusInProgress: {
    fontWeight: '700',
    color: '#b91c1c',
  },

  /* Photos Card */
  photosCard: {
    marginTop: 12,
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
  photosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photosTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  photosCount: {
    fontSize: 12,
    color: '#64748b',
  },
  photosThumbnailsRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  photoThumb: {
    flex: 1,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Action Buttons Footer */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#fafbfd',
    flexDirection: 'column',
    gap: 10,
  },
  primaryButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 4,
  },
  primaryGradient: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
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
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
});
