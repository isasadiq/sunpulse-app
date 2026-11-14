import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const QUICK_ADD_OPTIONS = [
  'Panels mounted',
  'Wiring done',
  'Waiting for materials',
  'Weather delay',
];

export interface EngineerProgressNoteScreenProps {
  siteName?: string;
  stageName?: string;
  onBack?: () => void;
  onSaveNote?: (note: { text: string; sharedWithClient: boolean }) => void;
}

export const EngineerProgressNoteScreen: React.FC<EngineerProgressNoteScreenProps> = ({
  siteName = 'Main Residence',
  stageName = 'Installation',
  onBack,
  onSaveNote,
}) => {
  const [noteText, setNoteText] = useState('');
  const [shareWithClient, setShareWithClient] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleQuickAdd = (text: string) => {
    setNoteText((prev) => {
      if (!prev.trim()) {
        return text;
      }
      return `${prev.trim()}\n• ${text}`;
    });
  };

  const handleDictate = () => {
    setIsDictating(true);
    setTimeout(() => {
      setIsDictating(false);
      setNoteText((prev) => {
        const dictatedSnippet = 'Inverter mounted on wall bracket. DC conduit run completed to roof.';
        if (!prev.trim()) {
          return dictatedSnippet;
        }
        return `${prev.trim()} ${dictatedSnippet}`;
      });
      Alert.alert('Dictation Recorded', 'Voice memo transcribed into your progress note.');
    }, 1200);
  };

  const handleSave = () => {
    if (!noteText.trim()) {
      Alert.alert('Empty Note', 'Please type or dictate your progress note before saving.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        'Progress Note Saved',
        `Update recorded for ${siteName} (${stageName}). ${
          shareWithClient ? 'It will be visible to the client in their Project tab.' : 'Saved internally for SUNPULSE dispatch.'
        }`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onSaveNote) {
                onSaveNote({
                  text: noteText.trim(),
                  sharedWithClient: shareWithClient,
                });
              } else if (onBack) {
                onBack();
              }
            },
          },
        ]
      );
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
              <Text style={styles.headerTitle}>Progress note</Text>
              <Text style={styles.headerSubtitle}>{siteName} · {stageName}</Text>
            </View>
          </View>

          {/* Main Textarea Container */}
          <View style={styles.textareaSection}>
            <Text style={styles.sectionLabel}>WHAT WAS DONE TODAY?</Text>

            <View style={styles.textareaWrapper}>
              <TextInput
                style={styles.textarea}
                placeholder="Describe the work done, any problems, and what is next."
                placeholderTextColor="#64748b"
                value={noteText}
                onChangeText={setNoteText}
                multiline
                textAlignVertical="top"
                autoFocus={false}
              />

              {/* Dictate Button */}
              <TouchableOpacity
                style={styles.dictateButton}
                activeOpacity={0.8}
                onPress={handleDictate}
                disabled={isDictating}
                accessibilityLabel="Dictate note"
              >
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </Svg>
                <Text style={styles.dictateText}>
                  {isDictating ? 'Listening...' : 'Dictate'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Add Pills Section */}
          <View style={styles.quickAddSection}>
            <Text style={styles.sectionLabel}>QUICK ADD</Text>

            <View style={styles.pillsWrap}>
              {QUICK_ADD_OPTIONS.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.pill}
                  activeOpacity={0.75}
                  onPress={() => handleQuickAdd(item)}
                >
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.4} strokeLinecap="round">
                    <Path d="M12 5v14M5 12h14" />
                  </Svg>
                  <Text style={styles.pillText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Share with Client Toggle Card */}
          <View style={styles.shareCard}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.shareTitle}>Share with the client</Text>
              <Text style={styles.shareSubtitle}>Shows on their Project tab</Text>
            </View>

            <Switch
              value={shareWithClient}
              onValueChange={setShareWithClient}
              trackColor={{ false: '#cbd5e1', true: '#EA580C' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Spacer pushing footer down */}
          <View style={{ flex: 1, minHeight: 32 }} />

          {/* Bottom Save Action */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              disabled={isSaving}
            >
              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>
                  {isSaving ? 'Saving note...' : 'Save note'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerCaption}>
              Kept on this phone and synced when 4G returns.
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
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  textareaSection: {
    marginTop: 18,
    flexDirection: 'column',
    gap: 6,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  textareaWrapper: {
    position: 'relative',
  },
  textarea: {
    width: '100%',
    height: 170,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 52,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#0f172a',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dictateButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    height: 40,
    paddingLeft: 12,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dictateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  quickAddSection: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 8,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    height: 36,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 999,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  shareCard: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
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
  shareTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  shareSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  bottomSection: {
    marginTop: 'auto',
    flexDirection: 'column',
    gap: 10,
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
  footerCaption: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
});
