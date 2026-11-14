import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DocumentsSkeleton } from '../components/DocumentsSkeleton';
import Svg, {
  Path,
  Circle,
  Line,
} from 'react-native-svg';

export interface ClientDocumentsScreenProps {
  siteName?: string;
  documents?: DocumentItem[];
  onSwitchTab?: (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => void;
  onLogout?: () => void;
  onContactPM?: () => void;
  onOpenNotifications?: () => void;
  onOpenSiteSwitcher?: () => void;
  isLoading?: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  meta: string;
  locked?: boolean;
}

const DOCUMENTS_DATA: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Single Line Diagram',
    meta: 'Stamped SLD · PDF · 1.8 MB',
    locked: false,
  },
  {
    id: 'doc-2',
    title: 'Warranty Certificate',
    meta: 'PDF · 420 KB',
    locked: false,
  },
  {
    id: 'doc-3',
    title: 'User Manual',
    meta: 'PDF · 3.1 MB',
    locked: false,
  },
  {
    id: 'doc-4',
    title: 'Handover Sign-Off',
    meta: 'Available after handover',
    locked: true,
  },
];

export const ClientDocumentsScreen: React.FC<ClientDocumentsScreenProps> = ({
  siteName = 'Main Residence',
  documents,
  onSwitchTab,
  onLogout,
  onContactPM,
  onOpenNotifications,
  onOpenSiteSwitcher,
  isLoading,
}) => {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [selectedSite, setSelectedSite] = useState(siteName);
  const [internalLoading, setInternalLoading] = useState(isLoading === undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [docsList, setDocsList] = useState<DocumentItem[]>(documents ?? DOCUMENTS_DATA);

  const loading = isLoading !== undefined ? isLoading : internalLoading;

  useEffect(() => {
    if (isLoading === undefined) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleRefresh = () => {
    setRefreshing(true);
    setInternalLoading(true);
    setTimeout(() => {
      setInternalLoading(false);
      setRefreshing(false);
    }, 1200);
  };

  const handleTabPress = (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => {
    if (onSwitchTab) {
      onSwitchTab(tab);
    }
  };

  const handleSiteSwitch = () => {
    if (onOpenSiteSwitcher) {
      onOpenSiteSwitcher();
      return;
    }
    Alert.alert(
      'Switch Installation Site',
      'Select a registered site to view its documentation:',
      [
        {
          text: 'Sync Documents (Show Skeleton)',
          onPress: () => {
            setInternalLoading(true);
            setTimeout(() => setInternalLoading(false), 1500);
          },
        },
        {
          text: 'Main Residence (4 docs)',
          onPress: () => {
            setSelectedSite('Main Residence');
            setDocsList(DOCUMENTS_DATA);
          },
        },
        {
          text: 'Victoria Island Penthouse (Empty)',
          onPress: () => {
            setSelectedSite('Victoria Island Penthouse');
            setDocsList([]);
          },
        },
        {
          text: 'Abuja Factory Mini-grid',
          onPress: () => {
            setSelectedSite('Abuja Factory Mini-grid');
            setDocsList(DOCUMENTS_DATA.slice(0, 2));
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleNotificationPress = () => {
    setHasUnreadNotification(false);
    if (onOpenNotifications) {
      onOpenNotifications();
      return;
    }
    Alert.alert(
      'Document Notifications',
      '• Stamped Single Line Diagram (SLD) has been verified by the Chief Electrical Engineer.\n• Warranty certificate issued for Jinko Solar 550W array.',
      [{ text: 'Dismiss' }]
    );
  };

  const handleDownload = (doc: DocumentItem) => {
    if (doc.locked) {
      Alert.alert(
        'Document Unavailable',
        'The Handover Sign-Off document will be unlocked once final commissioning and client walkthrough are complete.'
      );
      return;
    }

    Alert.alert(
      'Document Download',
      `Downloading "${doc.title}" (${doc.meta.split('·')[2] || 'PDF'}).\n\nThe file is saved to your device downloads.`,
      [{ text: 'OK' }]
    );
  };

  const handleContactPM = () => {
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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#EA580C"
              colors={['#EA580C']}
            />
          }
        >
          {loading ? (
            <DocumentsSkeleton />
          ) : (
            <>
              {/* Header: Site Switcher + Notifications */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.siteSelector}
              activeOpacity={0.75}
              onPress={handleSiteSwitch}
              accessibilityLabel="Switch site"
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  stroke="#EA580C"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.siteSelectorText}>{selectedSite}</Text>
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

            <TouchableOpacity
              style={styles.notificationButton}
              activeOpacity={0.75}
              onPress={handleNotificationPress}
              accessibilityLabel="Notifications"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  stroke="#334155"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              {hasUnreadNotification && <View style={styles.notificationDot} />}
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Documents</Text>
            <Text style={styles.subtitle}>
              Your system files for {selectedSite}.
            </Text>
          </View>

          {/* Document Cards List or Empty State */}
          {docsList.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconBadge}>
                <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
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
                onPress={handleContactPM}
                accessibilityRole="button"
              >
                <Text style={styles.contactButtonText}>Contact your project manager</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.documentList}>
                {docsList.map((doc) => {
                  if (doc.locked) {
                    return (
                      <View key={doc.id} style={styles.documentCardLocked}>
                        <View style={styles.lockedIconBadge}>
                          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                            <Path
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              stroke="#475569"
                              strokeWidth={1.7}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        </View>

                        <View style={styles.documentInfo}>
                          <Text style={styles.documentTitleLocked}>{doc.title}</Text>
                          <Text style={styles.documentMeta}>{doc.meta}</Text>
                        </View>

                        <View style={styles.lockIconContainer}>
                          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                            <Path
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                              stroke="#64748b"
                              strokeWidth={1.8}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        </View>
                      </View>
                    );
                  }

                  return (
                    <View key={doc.id} style={styles.documentCard}>
                      <View style={styles.docIconBadge}>
                        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                          <Path
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            stroke="#EA580C"
                            strokeWidth={1.7}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      </View>

                      <View style={styles.documentInfo}>
                        <Text style={styles.documentTitle}>{doc.title}</Text>
                        <Text style={styles.documentMeta}>{doc.meta}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.downloadButton}
                        activeOpacity={0.75}
                        onPress={() => handleDownload(doc)}
                        accessibilityLabel={`Download ${doc.title}`}
                      >
                        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                          <Path
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            stroke="#0f172a"
                            strokeWidth={1.9}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              {/* Help Note */}
              <View style={styles.helpNote}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={styles.helpIcon}>
                  <Circle cx={12} cy={12} r={10} stroke="#64748b" strokeWidth={1.8} />
                  <Line x1={12} y1={16} x2={12} y2={12} stroke="#64748b" strokeWidth={1.8} />
                  <Line x1={12} y1={8} x2={12.01} y2={8} stroke="#64748b" strokeWidth={1.8} />
                </Svg>
                <Text style={styles.helpText}>
                  Cannot find a document?{' '}
                  <Text
                    style={styles.helpLink}
                    onPress={handleContactPM}
                  >
                    Contact your project manager
                  </Text>
                  .
                </Text>
              </View>
            </>
          )}
            </>
          )}
        </ScrollView>

        {/* Bottom Tab Bar Navigation */}
        <View style={styles.bottomNav}>
          {/* Home Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('home')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelInactive}>Home</Text>
          </TouchableOpacity>

          {/* Project Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('project')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelInactive}>Project</Text>
          </TouchableOpacity>

          {/* Support Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('support')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelInactive}>Support</Text>
          </TouchableOpacity>

          {/* Documents Tab (Active) */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('documents')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                stroke="#EA580C"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.navLabelActive}>Documents</Text>
          </TouchableOpacity>

          {/* More Tab */}
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => handleTabPress('more')}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                stroke="#64748b"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 104, // Space for fixed bottom nav
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  siteSelector: {
    height: 44,
    paddingLeft: 12,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  siteSelectorText: {
    fontFamily: 'System',
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000000',
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
    backgroundColor: '#EA580C',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  titleSection: {
    marginTop: 18,
  },
  title: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48, // -0.02em
    lineHeight: 28.8,
    color: '#020617',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21, // 1.5
    color: '#64748b',
  },
  documentList: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  documentCard: {
    height: 72,
    paddingLeft: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  documentCardLocked: {
    height: 72,
    paddingLeft: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  docIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  lockedIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  documentTitleLocked: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  documentMeta: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
  },
  downloadButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  emptyIconBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: '#020617',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyDescription: {
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
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  helpNote: {
    marginTop: 16,
    paddingHorizontal: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  helpIcon: {
    flexShrink: 0,
    marginTop: 2,
  },
  helpText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
  },
  helpLink: {
    color: '#334155',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
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
    display: 'flex',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabelInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EA580C',
  },
});

