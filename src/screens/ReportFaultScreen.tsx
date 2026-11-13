import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Path,
  Defs,
  RadialGradient,
  Stop,
  Rect,
} from 'react-native-svg';

interface ReportFaultScreenProps {
  onBack?: () => void;
  onSubmit?: (faultData: {
    site: string;
    category: string;
    urgency: 'normal' | 'urgent';
    description: string;
    hasPhoto: boolean;
  }) => void;
  siteName?: string;
}

const PROBLEM_CATEGORIES = [
  'No power',
  'Inverter error',
  'Battery issue',
  'Solar panels',
  'Other',
];

export const ReportFaultScreen: React.FC<ReportFaultScreenProps> = ({
  onBack,
  onSubmit,
  siteName = 'Main Residence',
}) => {
  const [selectedSite, setSelectedSite] = useState(siteName);
  const [selectedCategory, setSelectedCategory] = useState('Inverter error');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(true);

  const handleSiteSwitch = () => {
    Alert.alert(
      'Select Installation Site',
      'Choose which solar array or facility has an issue:',
      [
        {
          text: 'Main Residence (Primary)',
          onPress: () => setSelectedSite('Main Residence'),
        },
        {
          text: 'Victoria Island Penthouse',
          onPress: () => setSelectedSite('Victoria Island Penthouse'),
        },
        {
          text: 'Abuja Factory Mini-grid',
          onPress: () => setSelectedSite('Abuja Factory Mini-grid'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAddPhoto = () => {
    if (hasPhoto) {
      Alert.alert('Photo Attached', 'You already have an attachment for this report.');
    } else {
      setHasPhoto(true);
      Alert.alert('Photo Added', 'Diagnostic photo attached to fault report.');
    }
  };

  const handleRemovePhoto = () => {
    setHasPhoto(false);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        site: selectedSite,
        category: selectedCategory,
        urgency,
        description,
        hasPhoto,
      });
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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

            <Text style={styles.headerTitle}>Report a fault</Text>
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Tell us what is wrong and we will send an engineer. Our support desk answers 24/7.
          </Text>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Field: Site */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>SITE</Text>
              <TouchableOpacity
                style={styles.siteSelector}
                activeOpacity={0.75}
                onPress={handleSiteSwitch}
              >
                <View style={styles.siteSelectorLeft}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      stroke="#dc2626"
                      strokeWidth={1.9}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                  <Text style={styles.siteSelectorText}>{selectedSite}</Text>
                </View>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    stroke="#64748b"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Field: What is the problem? */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>WHAT IS THE PROBLEM?</Text>
              <View style={styles.categoriesWrap}>
                {PROBLEM_CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryPill,
                        isSelected && styles.categoryPillSelected,
                      ]}
                      activeOpacity={0.7}
                      onPress={() => setSelectedCategory(category)}
                    >
                      <Text
                        style={[
                          styles.categoryPillText,
                          isSelected && styles.categoryPillTextSelected,
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Field: How urgent is it? */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>HOW URGENT IS IT?</Text>
              <View style={styles.urgencyRow}>
                <TouchableOpacity
                  style={[
                    styles.urgencyButton,
                    urgency === 'normal'
                      ? styles.urgencyNormalSelected
                      : styles.urgencyUnselected,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setUrgency('normal')}
                >
                  <Text
                    style={[
                      styles.urgencyButtonText,
                      urgency === 'normal'
                        ? styles.urgencyNormalTextSelected
                        : styles.urgencyTextUnselected,
                    ]}
                  >
                    Normal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.urgencyButton,
                    urgency === 'urgent'
                      ? styles.urgencyUrgentSelected
                      : styles.urgencyUnselected,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setUrgency('urgent')}
                >
                  <Text
                    style={[
                      styles.urgencyButtonText,
                      urgency === 'urgent'
                        ? styles.urgencyUrgentTextSelected
                        : styles.urgencyTextUnselected,
                    ]}
                  >
                    Urgent: no power
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Field: Describe the problem */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>DESCRIBE THE PROBLEM</Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="What did you notice? For example, an error code on the inverter display."
                placeholderTextColor="#64748b"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Field: Photos (optional) */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                PHOTOS{' '}
                <Text style={styles.fieldLabelOptional}>(optional)</Text>
              </Text>
              <View style={styles.photosRow}>
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  activeOpacity={0.75}
                  onPress={handleAddPhoto}
                >
                  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      stroke="#475569"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                      stroke="#475569"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                  <Text style={styles.addPhotoText}>Add</Text>
                </TouchableOpacity>

                {hasPhoto && (
                  <View style={styles.photoThumbnail}>
                    <LinearGradient
                      colors={['#e2e8f0', '#f1f5f9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.thumbnailGradient}
                    >
                      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                          stroke="#64748b"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </LinearGradient>

                    {/* Delete badge */}
                    <TouchableOpacity
                      style={styles.photoDeleteBadge}
                      activeOpacity={0.8}
                      onPress={handleRemovePhoto}
                    >
                      <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="#ffffff"
                          strokeWidth={3.5}
                          strokeLinecap="round"
                        />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Bottom Action */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Submit fault report</Text>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    stroke="#ffffff"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerNotice}>
              You will be notified when an engineer is assigned.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
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
  headerTitle: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48, // -0.02em
    lineHeight: 28.8,
    color: '#020617',
  },
  subtitle: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4, // 1.6
    color: '#64748b',
  },
  formContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6, // 0.05em
    textTransform: 'uppercase',
    color: '#475569',
  },
  fieldLabelOptional: {
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: '500',
    color: '#64748b',
  },
  siteSelector: {
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  siteSelectorLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  siteSelectorText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  categoriesWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    height: 36,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 999,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPillSelected: {
    borderColor: '#dc2626',
    backgroundColor: '#dc2626',
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  categoryPillTextSelected: {
    color: '#ffffff',
  },
  urgencyRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  urgencyButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgencyNormalSelected: {
    borderWidth: 1.5,
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  urgencyUrgentSelected: {
    borderWidth: 1.5,
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  urgencyUnselected: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  urgencyButtonText: {
    fontSize: 14,
  },
  urgencyNormalTextSelected: {
    fontWeight: '700',
    color: '#b91c1c',
  },
  urgencyUrgentTextSelected: {
    fontWeight: '700',
    color: '#b91c1c',
  },
  urgencyTextUnselected: {
    fontWeight: '600',
    color: '#334155',
  },
  textArea: {
    height: 92,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 14,
    lineHeight: 21,
    color: '#0f172a',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  photosRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  addPhotoButton: {
    width: 72,
    height: 72,
    borderWidth: 1.5,
    borderColor: '#94a3b8',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addPhotoText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  photoThumbnail: {
    position: 'relative',
    width: 72,
    height: 72,
  },
  thumbnailGradient: {
    width: 72,
    height: 72,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoDeleteBadge: {
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
  bottomSection: {
    marginTop: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingBottom: 10,
  },
  submitButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.4, // 0.025em
  },
  footerNotice: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});

