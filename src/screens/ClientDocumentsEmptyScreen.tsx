import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export interface ClientDocumentsEmptyScreenProps {
  siteName?: string;
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onContactPM?: () => void;
  onOpenNotifications?: () => void;
  onOpenSiteSwitcher?: () => void;
  onViewDocumentsList?: () => void;
}

export const ClientDocumentsEmptyScreen: React.FC<ClientDocumentsEmptyScreenProps> = ({
  siteName = 'Main Residence',
  onSwitchTab,
  onContactPM,
  onOpenNotifications,
  onOpenSiteSwitcher,
  onViewDocumentsList,
}) => {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const handleNotificationPress = () => {
    setHasUnreadNotification(false);
    if (onOpenNotifications) {
      onOpenNotifications();
    } else {
      Alert.alert(
        'Document Notifications',
        'No new document uploads for this installation.',
        [{ text: 'Dismiss' }]
      );
    }
  };

  const handleSiteSwitch = () => {
    if (onOpenSiteSwitcher) {
      onOpenSiteSwitcher();
    } else {
      Alert.alert('Switch Site', 'Select another installation site to view documents.');
    }
  };

  const handleContactProjectManager = () => {
    if (onContactPM) {
      onContactPM();
    } else if (onSwitchTab) {
      onSwitchTab('support');
    } else {
      Alert.alert(
        'Contact Project Manager',
        'Senior PM: Engr. Ibrahim Gambo\nDirect line: +234 803 123 4567\nEmail: projects@sunpulse.ng',
        [{ text: 'Close' }]
      );
    }
  };

  const handleTabPress = (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => {
    if (onSwitchTab) {
      onSwitchTab(tab);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        {/* Header: Site Switcher + Notifications */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.siteSelector}
            activeOpacity={0.75}
            onPress={handleSiteSwitch}
            accessibilityLabel="Switch site"
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </Svg>
            <Text style={styles.siteSelectorText}>{siteName}</Text>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.75}
            onPress={handleNotificationPress}
            accessibilityLabel="Notifications"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </Svg>
            {hasUnreadNotification && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Documents</Text>
          <Text style={styles.subtitle}>Your system files for {siteName}.</Text>
        </View>

        {/* Empty State Center */}
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBadge}>
            <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </Svg>
          </View>

          <Text style={styles.emptyTitle}>No documents yet</Text>
          <Text style={styles.emptyDescription}>
            Your system files, like the single line diagram and handover papers, will show up here once your project team uploads them.
          </Text>

          <TouchableOpacity
            style={styles.contactButton}
            activeOpacity={0.75}
            onPress={handleContactProjectManager}
            accessibilityRole="button"
          >
            <Text style={styles.contactButtonText}>Contact your project manager</Text>
          </TouchableOpacity>

          {onViewDocumentsList && (
            <TouchableOpacity
              style={styles.viewSampleButton}
              activeOpacity={0.7}
              onPress={onViewDocumentsList}
            >
              <Text style={styles.viewSampleButtonText}>View sample documents</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom Tab Bar Navigation */}
        <View style={styles.bottomNav}>
          {/* Home Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('home')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </Svg>
            <Text style={styles.navLabelInactive}>Home</Text>
          </TouchableOpacity>

          {/* Project Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('project')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </Svg>
            <Text style={styles.navLabelInactive}>Project</Text>
          </TouchableOpacity>

          {/* Support Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('support')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
            </Svg>
            <Text style={styles.navLabelInactive}>Support</Text>
          </TouchableOpacity>

          {/* Documents Tab (Active) */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('documents')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </Svg>
            <Text style={styles.navLabelActive}>Documents</Text>
          </TouchableOpacity>

          {/* More Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('more')}
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
  siteSelector: {
    height: 44,
    paddingHorizontal: 12,
    paddingRight: 14,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  siteSelectorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#dc2626',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 28,
    color: '#020617',
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#64748b',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  emptyIconBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 24,
    color: '#020617',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 290,
  },
  contactButton: {
    marginTop: 20,
    height: 48,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  viewSampleButton: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  viewSampleButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },
  bottomNav: {
    height: 84,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 22,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabelInactive: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  navLabelActive: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626',
  },
});
