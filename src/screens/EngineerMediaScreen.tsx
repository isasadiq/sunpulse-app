import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface MediaUploadItem {
  id: string;
  type: 'photo' | 'video';
  duration?: string;
  name?: string;
}

const INITIAL_MEDIA_ITEMS: MediaUploadItem[] = [
  { id: 'm-1', type: 'photo', name: 'Roof brackets' },
  { id: 'm-2', type: 'photo', name: 'Combiner box' },
  { id: 'm-3', type: 'photo', name: 'DC isolator' },
  { id: 'm-4', type: 'video', duration: '0:24', name: 'String voltage check' },
];

const STAGES = [
  'Survey',
  'Procurement',
  'Installation',
  'Commissioning',
  'Handover',
];

export interface EngineerMediaScreenProps {
  siteName?: string;
  initialStage?: string;
  onBack?: () => void;
  onSaveToJob?: (savedCount: number) => void;
}

export const EngineerMediaScreen: React.FC<EngineerMediaScreenProps> = ({
  siteName = 'Main Residence',
  initialStage = 'Installation',
  onBack,
  onSaveToJob,
}) => {
  const [mediaList, setMediaList] = useState<MediaUploadItem[]>(INITIAL_MEDIA_ITEMS);
  const [selectedStage, setSelectedStage] = useState(initialStage);
  const [isStagePickerOpen, setIsStagePickerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const photoCount = mediaList.filter((m) => m.type === 'photo').length;
  const videoCount = mediaList.filter((m) => m.type === 'video').length;

  const handleRemoveItem = (id: string) => {
    setMediaList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTakePhoto = () => {
    const newItem: MediaUploadItem = {
      id: `photo-${Date.now()}`,
      type: 'photo',
      name: `Photo #${mediaList.length + 1}`,
    };
    setMediaList((prev) => [...prev, newItem]);
    Alert.alert('Photo Captured', 'Image captured and added to upload queue.');
  };

  const handleRecordVideo = () => {
    const newItem: MediaUploadItem = {
      id: `video-${Date.now()}`,
      type: 'video',
      duration: '0:15',
      name: `Clip #${videoCount + 1}`,
    };
    setMediaList((prev) => [...prev, newItem]);
    Alert.alert('Video Recorded', '15s field video saved to local upload queue.');
  };

  const handleChooseFromGallery = () => {
    const newItem: MediaUploadItem = {
      id: `gallery-${Date.now()}`,
      type: 'photo',
      name: 'Imported photo',
    };
    setMediaList((prev) => [...prev, newItem]);
    Alert.alert('Imported', 'Selected photo added from device library.');
  };

  const handleSave = () => {
    if (mediaList.length === 0) {
      Alert.alert('No Media', 'Please capture or select at least one photo or video.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        'Media Saved to Job',
        `${mediaList.length} items saved locally and assigned to ${selectedStage}. Will sync automatically when 4G connects.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onSaveToJob) {
                onSaveToJob(mediaList.length);
              } else if (onBack) {
                onBack();
              }
            },
          },
        ]
      );
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={onBack}
              accessibilityLabel="Back to job"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Photos and video</Text>
              <Text style={styles.headerSubtitle}>{siteName}</Text>
            </View>
          </View>

          {/* Primary Capture Action Buttons */}
          <View style={styles.captureRow}>
            {/* Take photo button */}
            <TouchableOpacity
              style={styles.captureButtonContainer}
              activeOpacity={0.85}
              onPress={handleTakePhoto}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.takePhotoButton}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <Path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </Svg>
                <Text style={styles.takePhotoText}>Take photo</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Record video button */}
            <TouchableOpacity
              style={styles.recordVideoButton}
              activeOpacity={0.8}
              onPress={handleRecordVideo}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </Svg>
              <Text style={styles.recordVideoText}>Record video</Text>
            </TouchableOpacity>
          </View>

          {/* Choose from gallery link */}
          <TouchableOpacity
            style={styles.galleryLink}
            activeOpacity={0.7}
            onPress={handleChooseFromGallery}
          >
            <Text style={styles.galleryLinkText}>Choose from gallery</Text>
          </TouchableOpacity>

          {/* Attach to Stage Dropdown */}
          <View style={styles.stageSection}>
            <Text style={styles.stageLabel}>ATTACH TO STAGE</Text>
            <TouchableOpacity
              style={styles.stageSelectorButton}
              activeOpacity={0.8}
              onPress={() => setIsStagePickerOpen(true)}
            >
              <Text style={styles.stageSelectorText}>{selectedStage}</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Ready to save Section */}
          <View style={styles.gridSection}>
            <View style={styles.gridHeaderRow}>
              <Text style={styles.gridTitle}>READY TO SAVE</Text>
              <Text style={styles.gridCount}>
                {photoCount} {photoCount === 1 ? 'photo' : 'photos'} · {videoCount} {videoCount === 1 ? 'video' : 'videos'}
              </Text>
            </View>

            <View style={styles.mediaGrid}>
              {mediaList.map((item) => (
                <View key={item.id} style={styles.mediaItemWrapper}>
                  {item.type === 'photo' ? (
                    <LinearGradient
                      colors={['#e2e8f0', '#f1f5f9']}
                      style={styles.mediaThumbnail}
                    >
                      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
                      </Svg>
                    </LinearGradient>
                  ) : (
                    <LinearGradient
                      colors={['#cbd5e1', '#e2e8f0']}
                      style={styles.mediaThumbnail}
                    >
                      <View style={styles.playIconCircle}>
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="#ffffff">
                          <Path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
                        </Svg>
                      </View>
                      {item.duration && (
                        <View style={styles.durationBadge}>
                          <Text style={styles.durationText}>{item.duration}</Text>
                        </View>
                      )}
                    </LinearGradient>
                  )}

                  {/* Remove Button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    activeOpacity={0.8}
                    onPress={() => handleRemoveItem(item.id)}
                    accessibilityLabel="Remove item"
                  >
                    <Svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round">
                      <Path d="M6 6l12 12M18 6L6 18" />
                    </Svg>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Add more button */}
              <TouchableOpacity
                style={styles.addMoreButton}
                activeOpacity={0.75}
                onPress={handleTakePhoto}
                accessibilityLabel="Add more"
              >
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth={2} strokeLinecap="round">
                  <Path d="M12 5v14M5 12h14" />
                </Svg>
                <Text style={styles.addMoreText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Offline Tip Notice */}
          <View style={styles.tipRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} style={{ marginTop: 2 }}>
              <Circle cx={12} cy={12} r={10} />
              <Line x1={12} y1={16} x2={12} y2={12} />
              <Line x1={12} y1={8} x2={12.01} y2={8} />
            </Svg>
            <Text style={styles.tipText}>
              Kept on this phone and uploaded when 4G returns. Keep each video under 50 MB.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSave}
            disabled={isSaving}
          >
            <LinearGradient
              colors={['#EA580C', '#C2410C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>
                {isSaving
                  ? 'Saving to job...'
                  : `Save ${mediaList.length} ${mediaList.length === 1 ? 'item' : 'items'} to job`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stage Picker Modal */}
        <Modal
          visible={isStagePickerOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsStagePickerOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsStagePickerOpen(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Attach to Stage</Text>
              {STAGES.map((st) => (
                <TouchableOpacity
                  key={st}
                  style={[
                    styles.modalStageItem,
                    selectedStage === st && styles.modalStageItemActive,
                  ]}
                  onPress={() => {
                    setSelectedStage(st);
                    setIsStagePickerOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalStageText,
                      selectedStage === st && styles.modalStageTextActive,
                    ]}
                  >
                    {st}
                  </Text>
                  {selectedStage === st && (
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M4.5 12.75l6 6 9-13.5" />
                    </Svg>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
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
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 28,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  captureRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },
  captureButtonContainer: {
    flex: 1,
  },
  takePhotoButton: {
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  takePhotoText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  recordVideoButton: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#0f172a',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  recordVideoText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  galleryLink: {
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 4,
  },
  galleryLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EA580C',
  },
  stageSection: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 6,
  },
  stageLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  stageSelectorButton: {
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stageSelectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  gridSection: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 8,
  },
  gridHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  gridCount: {
    fontSize: 12,
    color: '#64748b',
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mediaItemWrapper: {
    width: '31%',
    height: 98,
    position: 'relative',
  },
  mediaThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconCircle: {
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
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0f172a',
    borderWidth: 2,
    borderColor: '#fafbfd',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  addMoreButton: {
    width: '31%',
    height: 98,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#94a3b8',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  tipRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
  bottomBar: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#fafbfd',
  },
  saveButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalStageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  modalStageItemActive: {
    backgroundColor: '#FFF7ED',
  },
  modalStageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  modalStageTextActive: {
    color: '#EA580C',
    fontWeight: '700',
  },
});
