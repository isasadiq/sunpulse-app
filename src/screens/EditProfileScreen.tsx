import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface EditProfileScreenProps {
  initialName?: string;
  initialPhone?: string;
  email?: string;
  onBack?: () => void;
  onCancel?: () => void;
  onSave?: (updatedProfile: { name: string; phone: string }) => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  initialName = 'Client Name',
  initialPhone = '+234 800 000 0000',
  email = 'name@example.com',
  onBack,
  onCancel,
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  const initialLetter = name.trim().charAt(0).toUpperCase() || 'U';

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter your full name.');
      return;
    }
    onSave?.({ name, phone });
    Alert.alert('Profile Updated', 'Your profile details have been saved successfully.', [
      { text: 'OK', onPress: () => onBack?.() },
    ]);
  };

  const handleChangePhoto = () => {
    Alert.alert('Change Photo', 'Select a new profile photo from your library or camera.', [
      { text: 'Choose from Library', onPress: () => {} },
      { text: 'Take Photo', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={onBack}
              accessibilityLabel="Back to profile"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit profile</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.avatarCircle}
              >
                <Text style={styles.avatarLetter}>{initialLetter}</Text>
              </LinearGradient>
              <TouchableOpacity
                style={styles.changePhotoButton}
                activeOpacity={0.7}
                onPress={handleChangePhoto}
              >
                <Text style={styles.changePhotoText}>Change photo</Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.formSection}>
              {/* Full Name */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>FULL NAME</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIcon}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Your full name"
                    placeholderTextColor="#64748b"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIcon}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="+234 800 000 0000"
                    placeholderTextColor="#64748b"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              {/* Email (Readonly) */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>EMAIL</Text>
                <View style={[styles.inputWrapper, styles.readonlyWrapper]}>
                  <View style={styles.inputIcon}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </Svg>
                  </View>
                  <TextInput
                    style={[styles.input, styles.readonlyInput]}
                    value={email}
                    editable={false}
                  />
                </View>
                <Text style={styles.helperText}>This is your login. Contact support to change it.</Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionFooter}>
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.85}
              onPress={handleSave}
            >
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.saveGradient}
              >
                <Text style={styles.saveText}>Save changes</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              activeOpacity={0.7}
              onPress={onCancel || onBack}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
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
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#020617',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dc2626',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarLetter: {
    fontFamily: 'System',
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
  },
  changePhotoButton: {
    marginTop: 6,
    height: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },
  formSection: {
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#475569',
  },
  inputWrapper: {
    position: 'relative',
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  readonlyWrapper: {
    backgroundColor: '#f1f5f9',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 44,
    paddingRight: 16,
    fontSize: 14,
    color: '#0f172a',
  },
  readonlyInput: {
    color: '#64748b',
  },
  helperText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  actionFooter: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  saveButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  saveGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  cancelButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
});
