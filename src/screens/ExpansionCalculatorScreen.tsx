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
import Svg, {
  Path,
  Rect,
  Circle,
  Line,
} from 'react-native-svg';

interface ApplianceItem {
  id: string;
  name: string;
  subtitle: string;
  watts: number;
  initialCount: number;
  iconType: 'ac' | 'freezer' | 'pump' | 'tv' | 'fan' | 'washing';
}

const APPLIANCES_CATALOG: ApplianceItem[] = [
  {
    id: 'ac',
    name: 'Air conditioner',
    subtitle: '1.5 HP · about 1,100 W',
    watts: 1100,
    initialCount: 1,
    iconType: 'ac',
  },
  {
    id: 'freezer',
    name: 'Deep freezer',
    subtitle: 'About 150 W',
    watts: 150,
    initialCount: 1,
    iconType: 'freezer',
  },
  {
    id: 'pump',
    name: 'Water pump',
    subtitle: '0.5 HP · about 400 W',
    watts: 400,
    initialCount: 0,
    iconType: 'pump',
  },
  {
    id: 'tv',
    name: 'Television',
    subtitle: 'About 100 W',
    watts: 100,
    initialCount: 0,
    iconType: 'tv',
  },
  {
    id: 'fan',
    name: 'Ceiling fan',
    subtitle: 'About 75 W',
    watts: 75,
    initialCount: 0,
    iconType: 'fan',
  },
  {
    id: 'washing',
    name: 'Washing machine',
    subtitle: 'About 500 W',
    watts: 500,
    initialCount: 0,
    iconType: 'washing',
  },
];

export interface SelectedApplianceItem {
  name: string;
  count: number;
  watts: number;
}

interface ExpansionCalculatorScreenProps {
  onBack?: () => void;
  onSeeEstimate?: (summary: {
    selectedItems: SelectedApplianceItem[];
    totalAppliances: number;
    totalWatts: number;
    recommendedSolarKW: number;
    recommendedBatteryKWh: number;
  }) => void;
}

export const ExpansionCalculatorScreen: React.FC<ExpansionCalculatorScreenProps> = ({
  onBack,
  onSeeEstimate,
}) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    ac: 1,
    freezer: 1,
    pump: 0,
    tv: 0,
    fan: 0,
    washing: 0,
  });

  const handleIncrement = (id: string) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  // Compute total selected items and total added wattage
  const totalCount = Object.values(counts).reduce((acc, c) => acc + c, 0);
  const totalWatts = APPLIANCES_CATALOG.reduce((acc, item) => {
    return acc + (counts[item.id] || 0) * item.watts;
  }, 0);

  const totalKW = (totalWatts / 1000).toFixed(1);
  const recommendedSolarKW = Math.max(1.2, +( (totalWatts * 1.35) / 1000 ).toFixed(1));
  const recommendedBatteryKWh = Math.max(2.5, +( (totalWatts * 3.5) / 1000 ).toFixed(1));

  const handleEstimatePress = () => {
    if (totalCount === 0) {
      Alert.alert(
        'Select Appliances',
        'Please add at least one appliance to calculate your solar expansion and battery storage requirements.'
      );
      return;
    }

    const selectedItems = APPLIANCES_CATALOG
      .filter((item) => (counts[item.id] || 0) > 0)
      .map((item) => ({
        name: item.name,
        count: counts[item.id],
        watts: item.watts,
      }));

    if (onSeeEstimate) {
      onSeeEstimate({
        selectedItems,
        totalAppliances: totalCount,
        totalWatts,
        recommendedSolarKW,
        recommendedBatteryKWh,
      });
      return;
    }

    Alert.alert(
      'System Expansion Estimate',
      `Based on ${totalCount} appliance${totalCount > 1 ? 's' : ''} adding ${totalKW} kW of peak load:\n\n` +
      `• Recommended Extra Solar: +${recommendedSolarKW} kWp\n` +
      `• Recommended Lithium Storage: +${recommendedBatteryKWh} kWh\n` +
      `• Estimated Monthly Diesel Offset: ₦${Math.round(totalWatts * 42).toLocaleString()}\n\n` +
      `Would you like an engineer from SUNPULSE to inspect your site and prepare a formal quote?`,
      [
        { text: 'Later', style: 'cancel' },
        {
          text: 'Request Quote',
          onPress: () => {
            Alert.alert(
              'Quote Requested',
              'Your expansion inquiry has been forwarded to your SUNPULSE account engineer. We will contact you within 24 hours.'
            );
          },
        },
      ]
    );
  };

  const renderIcon = (type: string, active: boolean) => {
    const strokeColor = active ? '#EA580C' : '#334155';
    switch (type) {
      case 'ac':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Rect x={3} y={5} width={18} height={9} rx={2} />
            <Path d="M7 18l-1 2M12 18v2M17 18l1 2M6 9.5h12" />
          </Svg>
        );
      case 'freezer':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Rect x={5} y={2.5} width={14} height={19} rx={2} />
            <Path d="M5 9h14M8 5.5v1.5M8 12v3" />
          </Svg>
        );
      case 'pump':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 21a7 7 0 01-7-7c0-3.5 7-11 7-11s7 7.5 7 11a7 7 0 01-7 7z" />
          </Svg>
        );
      case 'tv':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 20.25h12m-7.5-3v3m3-3v3m-10.5-3h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v11.25a1.5 1.5 0 001.5 1.5z" />
          </Svg>
        );
      case 'fan':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </Svg>
        );
      case 'washing':
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <Rect x={4} y={3} width={16} height={18} rx={2} />
            <Circle cx={12} cy={13.5} r={4} />
            <Path d="M8 6.5h.01M11 6.5h.01" />
          </Svg>
        );
      default:
        return null;
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
              accessibilityLabel="Back"
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Expansion calculator</Text>
            <Text style={styles.stepBadge}>Step 1 of 2</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Choose what you want to add. We will estimate the extra solar and battery size you need.
          </Text>

          {/* Appliances Catalog List Card */}
          <View style={styles.catalogCard}>
            {APPLIANCES_CATALOG.map((item, index) => {
              const count = counts[item.id] || 0;
              const hasItems = count > 0;
              const isLast = index === APPLIANCES_CATALOG.length - 1;

              return (
                <View
                  key={item.id}
                  style={[
                    styles.applianceRow,
                    !isLast && styles.applianceRowBorder,
                  ]}
                >
                  {/* Icon badge */}
                  <View style={[styles.iconBadge, hasItems ? styles.iconBadgeActive : styles.iconBadgeInactive]}>
                    {renderIcon(item.iconType, hasItems)}
                  </View>

                  {/* Info text */}
                  <View style={styles.applianceInfo}>
                    <Text style={styles.applianceName}>{item.name}</Text>
                    <Text style={styles.applianceSub}>{item.subtitle}</Text>
                  </View>

                  {/* Action / Stepper */}
                  {hasItems ? (
                    <View style={styles.stepperContainer}>
                      {/* Decrement Button */}
                      <TouchableOpacity
                        style={styles.stepBtnMinus}
                        activeOpacity={0.75}
                        onPress={() => handleDecrement(item.id)}
                        accessibilityLabel={`Remove one ${item.name}`}
                      >
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth={2.4} strokeLinecap="round">
                          <Path d="M5 12h14" />
                        </Svg>
                      </TouchableOpacity>

                      {/* Count Display */}
                      <Text style={styles.stepCountText}>{count}</Text>

                      {/* Increment Button */}
                      <TouchableOpacity
                        style={styles.stepBtnPlus}
                        activeOpacity={0.75}
                        onPress={() => handleIncrement(item.id)}
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
                      activeOpacity={0.75}
                      onPress={() => handleIncrement(item.id)}
                      accessibilityLabel={`Add ${item.name}`}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Estimate Dock */}
        <View style={styles.bottomDock}>
          <View style={styles.dockSummaryRow}>
            {/* Selected Count */}
            <View>
              <Text style={styles.dockLabel}>Selected</Text>
              <Text style={styles.dockCountVal}>
                {totalCount} {totalCount === 1 ? 'appliance' : 'appliances'}
              </Text>
            </View>

            {/* Added Load */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.dockLabel}>Added load</Text>
              <Text style={styles.dockLoadVal}>
                {totalKW} <Text style={styles.dockUnitText}>kW</Text>
              </Text>
            </View>
          </View>

          {/* See Estimate Button */}
          <TouchableOpacity
            style={styles.estimateButtonWrapper}
            activeOpacity={0.85}
            onPress={handleEstimatePress}
          >
            <LinearGradient
              colors={['#EA580C', '#C2410C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.estimateButtonGradient}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },

  /* Header */
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
    flex: 1,
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4, // -0.02em
    lineHeight: 24,
    color: '#020617',
  },
  stepBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },

  /* Description */
  description: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4, // 1.6
    color: '#64748b',
  },

  /* Catalog Card */
  catalogCard: {
    marginTop: 14,
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
  applianceRow: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  applianceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconBadgeActive: {
    backgroundColor: '#FFF7ED',
  },
  iconBadgeInactive: {
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
  applianceSub: {
    marginTop: 1,
    fontSize: 12,
    color: '#64748b',
  },

  /* Stepper */
  stepperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepBtnMinus: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCountText: {
    width: 24,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  stepBtnPlus: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Add Button */
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

  /* Bottom Dock */
  bottomDock: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  dockSummaryRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dockLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  dockCountVal: {
    marginTop: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  dockLoadVal: {
    marginTop: 1,
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: '#020617',
  },
  dockUnitText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  estimateButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  estimateButtonGradient: {
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  estimateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#ffffff',
  },
});
