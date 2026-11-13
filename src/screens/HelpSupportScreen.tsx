import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

export interface HelpSupportScreenProps {
  onBack?: () => void;
  onReportFault?: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 'power-flow',
    question: 'How do I read the power-flow chart?',
    answer:
      'The power-flow chart displays live kilowatt flows from your solar panels, current household load, grid synchronization, and real-time battery charge/discharge rates.',
  },
  {
    id: 'battery-drop',
    question: 'Why is my battery percentage dropping?',
    answer:
      'During evening hours or heavy overcast weather, your home automatically draws power from your battery reserve. When sunrise arrives, solar production automatically recharges it.',
  },
  {
    id: 'warranty',
    question: 'What does my warranty cover?',
    answer:
      'Your SUNPULSE installation is protected by a 10-year solar panel performance guarantee, 5-year battery warranty, and certified preventive servicing with replacement guarantee.',
  },
  {
    id: 'servicing',
    question: 'How often will my system be serviced?',
    answer:
      'SUNPULSE field engineers conduct bi-annual preventative maintenance visits, panel cleans, and terminal torque checks, alongside 24/7 autonomous remote cloud telemetry.',
  },
];

export const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({
  onBack,
  onReportFault,
}) => {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  const handleCall = () => {
    const phoneNumber = 'tel:+23480078277526';
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneNumber);
        } else {
          Alert.alert(
            'SUNPULSE Support Desk',
            'Toll-free hotline: +234 800 SUNPULSE (+234 800 7827 7526)\nHours: 24/7 Priority Operations'
          );
        }
      })
      .catch(() => {
        Alert.alert(
          'SUNPULSE Support Desk',
          'Toll-free hotline: +234 800 SUNPULSE (+234 800 7827 7526)'
        );
      });
  };

  const handleWhatsApp = () => {
    const whatsappUrl = 'whatsapp://send?phone=+23480078277526&text=Hello%20SUNPULSE%20Support';
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappUrl);
        } else {
          Alert.alert(
            'SUNPULSE WhatsApp Desk',
            'Direct WhatsApp support line: +234 800 7827 7526\nOur support desk is online.'
          );
        }
      })
      .catch(() => {
        Alert.alert(
          'SUNPULSE WhatsApp Desk',
          'Direct WhatsApp support line: +234 800 7827 7526'
        );
      });
  };

  const handleEmail = () => {
    const emailUrl = 'mailto:support@sunpulse.ng?subject=SUNPULSE%20Support%20Inquiry';
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          Alert.alert(
            'SUNPULSE Email Support',
            'support@sunpulse.ng\nResponse time: Under 15 minutes.'
          );
        }
      })
      .catch(() => {
        Alert.alert(
          'SUNPULSE Email Support',
          'support@sunpulse.ng'
        );
      });
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
              accessibilityLabel="Back to more"
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
            <Text style={styles.title}>Help and support</Text>
          </View>

          {/* Hero Banner: 24/7 Support Desk */}
          <LinearGradient
            colors={['#dc2626', '#b91c1c']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroBanner}
          >
            <Text style={styles.heroBadge}>24/7 SUPPORT DESK</Text>
            <Text style={styles.heroTitle}>System not working?</Text>
            <Text style={styles.heroSubtitle}>
              Report a fault so we can send an engineer.
            </Text>
            <TouchableOpacity
              style={styles.reportFaultButton}
              activeOpacity={0.85}
              onPress={onReportFault}
            >
              <Text style={styles.reportFaultButtonText}>Report a fault</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Section: CONTACT US */}
          <Text style={styles.sectionHeader}>CONTACT US</Text>
          <View style={styles.card}>
            {/* Call the support desk */}
            <TouchableOpacity
              style={styles.cardRow}
              activeOpacity={0.7}
              onPress={handleCall}
            >
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    stroke="#dc2626"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Call the support desk</Text>
                <Text style={styles.rowSubtitle}>Speak to someone now</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* WhatsApp */}
            <TouchableOpacity
              style={styles.cardRow}
              activeOpacity={0.7}
              onPress={handleWhatsApp}
            >
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    stroke="#dc2626"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>WhatsApp</Text>
                <Text style={styles.rowSubtitle}>Message the support desk</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity
              style={[styles.cardRow, styles.cardRowLast]}
              activeOpacity={0.7}
              onPress={handleEmail}
            >
              <View style={styles.iconContainer}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-7.74 5.372a2.25 2.25 0 01-2.52 0L2.25 6.75"
                    stroke="#dc2626"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Email</Text>
                <Text style={styles.rowSubtitle}>Send us a message</Text>
              </View>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke="#64748b"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Section: COMMON QUESTIONS */}
          <Text style={styles.sectionHeader}>COMMON QUESTIONS</Text>
          <View style={styles.card}>
            {FAQ_LIST.map((faq, index) => {
              const isLast = index === FAQ_LIST.length - 1;
              const isExpanded = expandedFaqId === faq.id;
              return (
                <View
                  key={faq.id}
                  style={[
                    styles.faqRowWrapper,
                    !isLast && styles.faqDivider,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.faqRow}
                    activeOpacity={0.7}
                    onPress={() => toggleFaq(faq.id)}
                    accessibilityRole="button"
                    accessibilityLabel={faq.question}
                  >
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <View
                      style={[
                        styles.faqChevron,
                        isExpanded && styles.faqChevronExpanded,
                      ]}
                    >
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          stroke="#64748b"
                          strokeWidth={2.2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.faqAnswerContainer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
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
  title: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.48,
    lineHeight: 29,
    color: '#020617',
  },
  heroBanner: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  heroBadge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.32,
    textTransform: 'uppercase',
    color: '#fee2e2',
  },
  heroTitle: {
    marginTop: 4,
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 25,
    color: '#ffffff',
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19.5,
    color: '#fee2e2',
  },
  reportFaultButton: {
    marginTop: 12,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  reportFaultButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b91c1c',
  },
  sectionHeader: {
    marginTop: 18,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  card: {
    marginTop: 6,
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
  cardRow: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cardRowLast: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  rowSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  faqRowWrapper: {
    paddingVertical: 4,
  },
  faqDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  faqRow: {
    minHeight: 52,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19.6,
    color: '#0f172a',
  },
  faqChevron: {
    transform: [{ rotate: '0deg' }],
  },
  faqChevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  faqAnswerContainer: {
    paddingBottom: 12,
    paddingRight: 16,
  },
  faqAnswerText: {
    fontSize: 13,
    lineHeight: 19.5,
    color: '#475569',
  },
});
