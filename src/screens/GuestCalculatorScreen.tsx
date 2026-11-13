import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';

export interface GuestApplianceItem {
  id: string;
  name: string;
  description: string;
  watts: number;
  count: number;
  type: 'led' | 'fan' | 'tv' | 'fridge' | 'ac';
}

const INITIAL_APPLIANCES: GuestApplianceItem[] = [
  {
    id: 'led',
    name: 'LED bulbs',
    description: 'About 10 W each',
    watts: 10,
    count: 6,
    type: 'led',
  },
  {
    id: 'fan',
    name: 'Ceiling fan',
    description: 'About 75 W',
    watts: 75,
    count: 2,
    type: 'fan',
  },
  {
    id: 'tv',
    name: 'Television',
    description: 'About 100 W',
    watts: 100,
    count: 1,
    type: 'tv',
  },
  {
    id: 'fridge',
    name: 'Refrigerator',
    description: 'About 150 W',
    watts: 150,
    count: 1,
    type: 'fridge',
  },
  {
    id: 'ac',
    name: 'Air conditioner',
    description: '1.5 HP · about 1,100 W',
    watts: 1100,
    count: 0,
    type: 'ac',
  },
];

const GEN_HOURS = ['4 h', '8 h', '12 h', '24 h'];

export interface GuestCalculatorScreenProps {
  onBack?: () => void;
  onSeeEstimate?: (data: {
    selectedItems: { name: string; count: number; watts: number }[];
    totalWatts: number;
    generatorHours: string;
  }) => void;
}

export const GuestCalculatorScreen: React.FC<GuestCalculatorScreenProps> = ({
  onBack,
  onSeeEstimate,
}) => {
  const [appliances, setAppliances] = useState<GuestApplianceItem[]>(INITIAL_APPLIANCES);
  const [selectedHours, setSelectedHours] = useState('8 h');

  const updateCount = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const totalItems = appliances.reduce((sum, item) => sum + item.count, 0);
  const totalWatts = appliances.reduce((sum, item) => sum + item.count * item.watts, 0);
  const totalKW = (totalWatts / 1000).toFixed(1);

  const handleSeeEstimate = () => {
    if (onSeeEstimate) {
      const activeItems = appliances
        .filter((item) => item.count > 0)
        .map((item) => ({
          name: item.name,
          count: item.count,
          watts: item.watts,
        }));
      onSeeEstimate({
        selectedItems: activeItems.length > 0 ? activeItems : [
          { name: 'LED bulbs', count: 6, watts: 10 },
          { name: 'Ceiling fan', count: 2, watts: 75 },
        ],
        totalWatts: Math.max(100, totalWatts),
        generatorHours: selectedHours,
      });
    }
  };

  const renderIcon = (type: GuestApplianceItem['type'], active: boolean) => {
    const strokeColor = active ? '#dc2626' : '#334155';
    switch (type) {
      case 'led':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </Svg>
        );
      case 'fan':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </Svg>
        );
      case 'tv':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 20.25h12m-7.5-3v3m3-3v3m-10.5-3h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v11.25a1.5 1.5 0 001.5 1.5z" />
          </Svg>
        );
      case 'fridge':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Rect x={5} y={2.5} width={14} height={19} rx={2} />
            <Path d="M5 9h14M8 5.5v1.5M8 12v3" />
          </Svg>
        );
      case 'ac':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Rect x={3} y={5} width={18} height={9} rx={2} />
            <Path d="M7 18l-1 2M12 18v2M17 18l1 2M6 9.5h12" />
          </Svg>
        );
    }
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
              accessibilityLabel="Back to sign in"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Solar ROI calculator</Text>
              <Text style={styles.headerSubtitle}>No account needed</Text>
            </View>

            <Text style={styles.stepBadge}>Step 1 of 3</Text>
          </View>

          {/* Description */}
          <Text style={styles.leadText}>
            Choose what you want to power. We will size a solar system and compare it with your diesel cost.
          </Text>

          {/* Appliances Card */}
          <View style={styles.appliancesCard}>
            {appliances.map((item, index) => {
              const isLast = index === appliances.length - 1;
              const hasCount = item.count > 0;

              return (
                <View
                  key={item.id}
                  style={[styles.applianceRow, !isLast && styles.applianceRowBorder]}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      hasCount ? styles.iconCircleActive : styles.iconCircleInactive,
                    ]}
                  >
                    {renderIcon(item.type, hasCount)}
                  </View>

                  <View style={styles.applianceInfo}>
                    <Text style={styles.applianceName}>{item.name}</Text>
                    <Text style={styles.applianceDesc}>{item.description}</Text>
                  </View>

                  {hasCount ? (
                    <View style={styles.counterGroup}>
                      <TouchableOpacity
                        style={styles.counterMinusButton}
                        activeOpacity={0.7}
                        onPress={() => updateCount(item.id, -1)}
                        accessibilityLabel={`Remove one ${item.name}`}
                      >
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth={2.4} strokeLinecap="round">
                          <Path d="M5 12h14" />
                        </Svg>
                      </TouchableOpacity>

                      <Text style={styles.counterValue}>{item.count}</Text>

                      <TouchableOpacity
                        style={styles.counterPlusButton}
                        activeOpacity={0.7}
                        onPress={() => updateCount(item.id, 1)}
                        accessibilityLabel={`Add one ${item.name}`}
                      >
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.4} strokeLinecap="round">
                          <Path d="M12 5v14M5 12h14" />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      activeOpacity={0.8}
                      onPress={() => updateCount(item.id, 1)}
                      accessibilityLabel={`Add ${item.name}`}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>

          {/* Generator Hours per Day Section */}
          <View style={styles.genHoursSection}>
            <Text style={styles.genHoursLabel}>GENERATOR HOURS PER DAY</Text>
            <View style={styles.pillsRow}>
              {GEN_HOURS.map((hours) => {
                const isSelected = selectedHours === hours;
                return (
                  <TouchableOpacity
                    key={hours}
                    activeOpacity={0.8}
                    style={[
                      styles.pillButton,
                      isSelected ? styles.pillSelected : styles.pillUnselected,
                    ]}
                    onPress={() => setSelectedHours(hours)}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        isSelected ? styles.pillTextSelected : styles.pillTextUnselected,
                      ]}
                    >
                      {hours}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Floating Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomSummaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Selected</Text>
              <Text style={styles.summaryValue}>{totalItems} items</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.summaryLabel}>Total load</Text>
              <Text style={styles.summaryValueLoad}>
                {totalKW} <Text style={styles.summaryUnit}>kW</Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSeeEstimate}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.estimateButton}
            >
              <Text style={styles.estimateButtonText}>See estimate</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </Svg>
            </LinearGradient>
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
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
    lineHeight: 26,
    color: '#020617',
  },
  headerSubtitle: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  stepBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  leadText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: '#64748b',
  },
  appliancesCard: {
    marginTop: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  applianceRow: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  applianceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleActive: {
    backgroundColor: '#fef2f2',
  },
  iconCircleInactive: {
    backgroundColor: '#f1f5f9',
  },
  applianceInfo: {
    flex: 1,
  },
  applianceName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  applianceDesc: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },
  counterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  counterMinusButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    width: 24,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  counterPlusButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  genHoursSection: {
    marginTop: 14,
    flexDirection: 'column',
    gap: 8,
  },
  genHoursLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#475569',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pillButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  pillUnselected: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#ffffff',
  },
  pillTextUnselected: {
    color: '#334155',
  },
  bottomBar: {
    marginTop: 'auto',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    gap: 12,
  },
  bottomSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  summaryValue: {
    marginTop: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  summaryValueLoad: {
    marginTop: 1,
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: '#020617',
  },
  summaryUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  estimateButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
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
  estimateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
});
