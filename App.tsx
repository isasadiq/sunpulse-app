import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { CheckEmailScreen } from './src/screens/CheckEmailScreen';
import { SetNewPasswordScreen } from './src/screens/SetNewPasswordScreen';
import { PasswordUpdatedScreen } from './src/screens/PasswordUpdatedScreen';
import { ClientHomeScreen } from './src/screens/ClientHomeScreen';
import { ClientHomeOfflineScreen } from './src/screens/ClientHomeOfflineScreen';
import { SystemPassportScreen } from './src/screens/SystemPassportScreen';
import { ConnectInverterScreen, InverterConnectionData } from './src/screens/ConnectInverterScreen';
import { ClientProjectScreen } from './src/screens/ClientProjectScreen';
import { ClientSupportScreen } from './src/screens/ClientSupportScreen';
import { ReportFaultScreen } from './src/screens/ReportFaultScreen';
import { FaultReportedScreen } from './src/screens/FaultReportedScreen';
import { ClientDocumentsScreen } from './src/screens/ClientDocumentsScreen';
import { ClientDocumentsEmptyScreen } from './src/screens/ClientDocumentsEmptyScreen';
import { ClientMoreScreen } from './src/screens/ClientMoreScreen';
import { MaintenanceSignoffScreen } from './src/screens/MaintenanceSignoffScreen';
import { EngineerSignatureScreen } from './src/screens/EngineerSignatureScreen';
import { EngineerJobsScreen } from './src/screens/EngineerJobsScreen';
import { EngineerJobsEmptyScreen } from './src/screens/EngineerJobsEmptyScreen';
import { EngineerJobDetailScreen } from './src/screens/EngineerJobDetailScreen';
import { EngineerMediaScreen } from './src/screens/EngineerMediaScreen';
import { EngineerProgressNoteScreen } from './src/screens/EngineerProgressNoteScreen';
import { EngineerInverterTestScreen } from './src/screens/EngineerInverterTestScreen';
import { EngineerInverterTestFailedScreen } from './src/screens/EngineerInverterTestFailedScreen';
import { EngineerDiagnosticsScreen } from './src/screens/EngineerDiagnosticsScreen';
import { EngineerTicketsScreen } from './src/screens/EngineerTicketsScreen';
import { EngineerTicketDetailScreen } from './src/screens/EngineerTicketDetailScreen';
import { EngineerTicketResolvedScreen } from './src/screens/EngineerTicketResolvedScreen';
import { EngineerChecklistScreen } from './src/screens/EngineerChecklistScreen';
import { EngineerVisitDoneScreen } from './src/screens/EngineerVisitDoneScreen';
import { EngineerVisitsScreen } from './src/screens/EngineerVisitsScreen';
import { EngineerMoreScreen } from './src/screens/EngineerMoreScreen';
import { EngineerSyncStatusScreen } from './src/screens/EngineerSyncStatusScreen';
import { EngineerSyncSyncingScreen } from './src/screens/EngineerSyncSyncingScreen';
import { EngineerSyncAllSyncedScreen } from './src/screens/EngineerSyncAllSyncedScreen';
import { GuestCalculatorScreen } from './src/screens/GuestCalculatorScreen';
import { GuestEstimateScreen } from './src/screens/GuestEstimateScreen';
import { GuestQuoteScreen } from './src/screens/GuestQuoteScreen';
import { GuestQuoteRequestedScreen } from './src/screens/GuestQuoteRequestedScreen';
import { ManagementOverviewScreen } from './src/screens/ManagementOverviewScreen';
import { ManagementProjectsScreen } from './src/screens/ManagementProjectsScreen';
import { ManagementProjectDetailScreen, ManagementProjectDetailData } from './src/screens/ManagementProjectDetailScreen';
import { ManagementActivateClientScreen } from './src/screens/ManagementActivateClientScreen';
import { ManagementMaintenanceScreen } from './src/screens/ManagementMaintenanceScreen';
import { ManagementDispatchScreen } from './src/screens/ManagementDispatchScreen';
import { ManagementSupportScreen } from './src/screens/ManagementSupportScreen';
import { ManagementLeadsScreen } from './src/screens/ManagementLeadsScreen';
import { ManagementMoreScreen } from './src/screens/ManagementMoreScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { EnergySavingsScreen } from './src/screens/EnergySavingsScreen';
import { ExpansionCalculatorScreen } from './src/screens/ExpansionCalculatorScreen';
import { ExpansionEstimateScreen, SelectedApplianceItem } from './src/screens/ExpansionEstimateScreen';
import { RequestQuoteScreen } from './src/screens/RequestQuoteScreen';
import { QuoteRequestedScreen } from './src/screens/QuoteRequestedScreen';
import { SecurityScreen } from './src/screens/SecurityScreen';
import { HelpSupportScreen } from './src/screens/HelpSupportScreen';
import { NotificationSettingsScreen } from './src/screens/NotificationSettingsScreen';
import { ClientTicketScreen } from './src/screens/ClientTicketScreen';
import { PastTicketsScreen } from './src/screens/PastTicketsScreen';
import { VisitSignedOffScreen } from './src/screens/VisitSignedOffScreen';
import { ChangePasswordScreen } from './src/screens/ChangePasswordScreen';
import { SitePhotosScreen } from './src/screens/SitePhotosScreen';
import { NotificationsDrawer } from './src/components/NotificationsDrawer';
import { EngineerNotificationsDrawer } from './src/components/EngineerNotificationsDrawer';
import { ManagementNotificationsDrawer } from './src/components/ManagementNotificationsDrawer';
import { SignOutModal } from './src/components/SignOutModal';
import { SiteSwitcherModal, SiteItem } from './src/components/SiteSwitcherModal';
import {
  authService,
  telemetryService,
  ticketService,
  leadService,
} from './src/services';
import { TicketCategory } from './src/types/database';

export type ScreenState =
  | 'splash'
  | 'login'
  | 'connect_inverter'
  | 'forgot_password'
  | 'check_email'
  | 'set_new_password'
  | 'password_updated'
  | 'client_home'
  | 'client_home_offline'
  | 'system_passport'
  | 'client_project'
  | 'client_support'
  | 'client_documents'
  | 'client_documents_empty'
  | 'client_more'
  | 'report_fault'
  | 'fault_reported'
  | 'maintenance_signoff'
  | 'engineer_signature'
  | 'visit_signed_off'
  | 'expansion_calculator'
  | 'expansion_estimate'
  | 'request_quote'
  | 'quote_requested'
  | 'security'
  | 'change_password'
  | 'help_support'
  | 'notification_settings'
  | 'ticket_tracking'
  | 'past_tickets'
  | 'site_photos'
  | 'guest_calculator'
  | 'guest_estimate'
  | 'guest_quote'
  | 'guest_quote_requested'
  | 'engineer_jobs'
  | 'engineer_jobs_empty'
  | 'engineer_job_detail'
  | 'engineer_media'
  | 'engineer_progress_note'
  | 'engineer_test_inverter'
  | 'engineer_test_inverter_failed'
  | 'engineer_diagnostics'
  | 'engineer_tickets'
  | 'engineer_ticket_detail'
  | 'engineer_ticket_resolved'
  | 'engineer_checklist'
  | 'engineer_visit_done'
  | 'engineer_visits'
  | 'engineer_more'
  | 'engineer_sync_status'
  | 'engineer_sync_syncing'
  | 'engineer_sync_all_synced'
  | 'management_overview'
  | 'management_projects'
  | 'management_project_detail'
  | 'management_activate_client'
  | 'management_maintenance'
  | 'management_dispatch'
  | 'management_support'
  | 'management_leads'
  | 'management_more'
  | 'edit_profile'
  | 'energy_savings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('splash');
  const [resetEmail, setResetEmail] = useState<string>('name@example.com');
  const [selectedSite, setSelectedSite] = useState<string>('Main Residence');
  const [connectedInverter, setConnectedInverter] = useState<InverterConnectionData | null>({
    brand: 'Deye Cloud',
    serialNumber: 'DEYE-DEMO-2026-LIVE',
    capacityKva: '5.0',
    batteryKwh: '10.0',
    siteName: 'Primary Healthcare Clinic · Kura',
    isDemo: true,
  });
  const [isSiteSwitcherOpen, setIsSiteSwitcherOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEngineerNotificationsOpen, setIsEngineerNotificationsOpen] = useState(false);
  const [isManagementNotificationsOpen, setIsManagementNotificationsOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [lastMoreScreen, setLastMoreScreen] = useState<ScreenState>('client_more');
  const [profileData, setProfileData] = useState({
    name: 'Client Name',
    phone: '+234 800 000 0000',
    email: 'name@example.com',
  });
  const [isMaintenanceSignedOff, setIsMaintenanceSignedOff] = useState(false);
  const [isGuestFlow, setIsGuestFlow] = useState(false);
  const [calculatorEstimateData, setCalculatorEstimateData] = useState<{
    selectedItems: SelectedApplianceItem[];
    totalWatts: number;
    generatorHours?: string;
  }>({
    selectedItems: [
      { name: 'Air conditioner', count: 1, watts: 1100 },
      { name: 'Deep freezer', count: 1, watts: 150 },
    ],
    totalWatts: 1250,
    generatorHours: '8 h',
  });
  const [reportedTicket, setReportedTicket] = useState<{
    ticketNumber: string;
    problem: string;
    siteName: string;
    urgency: string;
    status: string;
  }>({
    ticketNumber: '#1043',
    problem: 'Inverter error',
    siteName: 'Main Residence',
    urgency: 'Normal',
    status: 'Received',
  });
  const [submittedQuote, setSubmittedQuote] = useState<{
    requestNumber: string;
    upgrade: string;
    siteName: string;
    contactMethod: string;
    visitTiming: string;
    status: string;
  }>({
    requestNumber: '#Q-0215',
    upgrade: '+2.2 kWp · +5 kWh',
    siteName: 'Main Residence',
    contactMethod: 'Phone call',
    visitTiming: 'Next week',
    status: 'Received',
  });
  const [submittedGuestQuote, setSubmittedGuestQuote] = useState<{
    requestNumber: string;
    systemSummary: string;
    location: string;
    contactMethod: string;
    status: string;
  }>({
    requestNumber: '#Q-0216',
    systemSummary: '1.5 kWp · 5 kWh',
    location: 'Barnawa, Kaduna',
    contactMethod: 'Phone call',
    status: 'Received',
  });
  const [selectedDispatchTicket, setSelectedDispatchTicket] = useState<{
    ticketNumber: string;
    siteName: string;
    issue: string;
    elapsedMinutes: number;
    slaMinutes: number;
    returnScreen: ScreenState;
  }>({
    ticketNumber: '#T-0148',
    siteName: 'Site 009 · Barnawa',
    issue: 'No power',
    elapsedMinutes: 18,
    slaMinutes: 60,
    returnScreen: 'management_overview',
  });
  const [selectedManagementProject, setSelectedManagementProject] = useState<ManagementProjectDetailData>({
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
  });

  const handleTabSwitch = (tab: 'home' | 'project' | 'support' | 'documents' | 'more') => {
    if (tab === 'home') setCurrentScreen('client_home');
    if (tab === 'project') setCurrentScreen('client_project');
    if (tab === 'support') setCurrentScreen('client_support');
    if (tab === 'documents') setCurrentScreen('client_documents');
    if (tab === 'more') setCurrentScreen('client_more');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
      {currentScreen === 'splash' && (
        <SplashScreen
          onAnimationComplete={() => {
            setTimeout(() => {
              setCurrentScreen('login');
            }, 600);
          }}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          onBackToSplash={() => setCurrentScreen('splash')}
          onForgotPassword={() => setCurrentScreen('forgot_password')}
          onLoginSuccess={(email) => {
            const lower = (email || '').toLowerCase().trim();
            if (lower.includes('manage') || lower.includes('admin') || lower.includes('mgmt')) {
              setCurrentScreen('management_overview');
            } else if (lower.includes('engineer') || lower.includes('eng')) {
              setCurrentScreen('engineer_jobs');
            } else {
              setCurrentScreen('client_home');
            }
          }}
          onCalculateROI={() => {
            setIsGuestFlow(true);
            setCurrentScreen('guest_calculator');
          }}
        />
      )}

      {currentScreen === 'connect_inverter' && (
        <ConnectInverterScreen
          onBack={() => setCurrentScreen('client_home')}
          onConnected={(data) => {
            setConnectedInverter(data);
            setSelectedSite(data.siteName || 'Solar Facility');
            setCurrentScreen('client_home');
          }}
        />
      )}

      {currentScreen === 'forgot_password' && (
        <ForgotPasswordScreen
          onBackToSignIn={() => setCurrentScreen('login')}
          onSendResetLink={async (email) => {
            const targetEmail = email || 'name@example.com';
            setResetEmail(targetEmail);
            setCurrentScreen('check_email');
            try {
              await authService.resetPasswordForEmail(targetEmail);
            } catch (err) {
              console.warn('Password reset offline/fallback:', err);
            }
          }}
        />
      )}

      {currentScreen === 'check_email' && (
        <CheckEmailScreen
          email={resetEmail}
          onBackToSignIn={() => setCurrentScreen('login')}
          onBackToForgotPassword={() => setCurrentScreen('forgot_password')}
          onSimulateResetLinkReceived={() => setCurrentScreen('set_new_password')}
          onResendLink={async () => {
            try {
              await authService.resetPasswordForEmail(resetEmail);
            } catch (err) {
              console.warn('Resend reset link fallback:', err);
            }
          }}
        />
      )}

      {currentScreen === 'set_new_password' && (
        <SetNewPasswordScreen
          onBackToSignIn={() => setCurrentScreen('login')}
          onPasswordUpdated={() => setCurrentScreen('password_updated')}
        />
      )}

      {currentScreen === 'password_updated' && (
        <PasswordUpdatedScreen
          onContinueToSignIn={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'client_home' && (
        <ClientHomeScreen
          siteName={selectedSite}
          connectedInverter={connectedInverter}
          onConnectInverter={() => setCurrentScreen('connect_inverter')}
          onLogout={() => setIsSignOutModalOpen(true)}
          onSwitchToPassport={() => setCurrentScreen('system_passport')}
          onSwitchTab={handleTabSwitch}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSiteSwitcher={() => setIsSiteSwitcherOpen(true)}
          onOpenEnergySavings={() => setCurrentScreen('energy_savings')}
        />
      )}

      {currentScreen === 'client_home_offline' && (
        <ClientHomeOfflineScreen
          siteName={selectedSite}
          onSwitchTab={handleTabSwitch}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSiteSwitcher={() => setIsSiteSwitcherOpen(true)}
          onOpenSavings={() => setCurrentScreen('energy_savings')}
          onReconnect={() => setCurrentScreen('client_home')}
        />
      )}

      {currentScreen === 'energy_savings' && (
        <EnergySavingsScreen
          siteName={selectedSite}
          onBack={() => setCurrentScreen('client_home')}
        />
      )}

      {currentScreen === 'system_passport' && (
        <SystemPassportScreen
          siteName={selectedSite}
          inverterModel="Deye / Growatt 5 kW Hybrid"
          onLogout={() => setCurrentScreen('login')}
          onSwitchToLive={() => setCurrentScreen('client_home')}
          onRequestDatalogger={() => setCurrentScreen('request_quote')}
          onSwitchTab={handleTabSwitch}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />
      )}

      {currentScreen === 'client_project' && (
        <ClientProjectScreen
          siteName={selectedSite}
          onLogout={() => setCurrentScreen('login')}
          onSwitchTab={handleTabSwitch}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSiteSwitcher={() => setIsSiteSwitcherOpen(true)}
          onOpenSitePhotos={() => setCurrentScreen('site_photos')}
        />
      )}

      {currentScreen === 'client_support' && (
        <ClientSupportScreen
          siteName={selectedSite}
          onLogout={() => setCurrentScreen('login')}
          onReportFault={() => setCurrentScreen('report_fault')}
          onReviewSignOff={() => setCurrentScreen('maintenance_signoff')}
          isMaintenanceSignedOff={isMaintenanceSignedOff}
          onSwitchTab={handleTabSwitch}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSiteSwitcher={() => setIsSiteSwitcherOpen(true)}
          onOpenTicketTracking={() => setCurrentScreen('ticket_tracking')}
          onOpenPastTickets={() => setCurrentScreen('past_tickets')}
        />
      )}

      {currentScreen === 'client_documents' && (
        <ClientDocumentsScreen
          siteName={selectedSite}
          onLogout={() => setCurrentScreen('login')}
          onSwitchTab={handleTabSwitch}
          onContactPM={() => setCurrentScreen('client_support')}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSiteSwitcher={() => setIsSiteSwitcherOpen(true)}
        />
      )}

      {currentScreen === 'client_documents_empty' && (
        <ClientDocumentsEmptyScreen
          siteName={selectedSite}
          onSwitchTab={handleTabSwitch}
          onContactPM={() => setCurrentScreen('client_support')}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSiteSwitcher={() => setIsSiteSwitcherOpen(true)}
          onViewDocumentsList={() => setCurrentScreen('client_documents')}
        />
      )}

      {currentScreen === 'client_more' && (
        <ClientMoreScreen
          siteName={selectedSite}
          clientName={profileData.name}
          clientEmail={profileData.email}
          onLogout={() => setIsSignOutModalOpen(true)}
          onSwitchTab={handleTabSwitch}
          onOpenCalculator={() => setCurrentScreen('expansion_calculator')}
          onOpenSecurity={() => setCurrentScreen('security')}
          onOpenHelp={() => setCurrentScreen('help_support')}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenNotificationSettings={() => setCurrentScreen('notification_settings')}
          onOpenSiteSwitcher={() => setIsSiteSwitcherOpen(true)}
          onOpenConnectInverter={() => setCurrentScreen('connect_inverter')}
          onOpenEngineerPortal={() => setCurrentScreen('engineer_jobs')}
          onEditProfile={() => {
            setLastMoreScreen('client_more');
            setCurrentScreen('edit_profile');
          }}
        />
      )}

      {currentScreen === 'report_fault' && (
        <ReportFaultScreen
          siteName={selectedSite}
          onBack={() => setCurrentScreen('client_support')}
          onSubmit={async (faultData) => {
            const fallbackNo = `#${Math.floor(1040 + Math.random() * 20)}`;
            setReportedTicket({
              ticketNumber: fallbackNo,
              problem: faultData.category,
              siteName: faultData.site,
              urgency: faultData.urgency === 'urgent' ? 'Urgent: no power' : 'Normal',
              status: 'Received',
            });
            setCurrentScreen('fault_reported');

            try {
              const categoryMap: Record<string, TicketCategory> = {
                'No power': 'grid_switch',
                'Inverter error': 'inverter',
                'Battery issue': 'battery',
                'Solar panels': 'solar_pv',
                'Other': 'other',
              };
              const created = await ticketService.createTicket({
                projectId: 'proj-1',
                category: categoryMap[faultData.category] || 'other',
                title: faultData.category,
                description: faultData.description || 'Reported from mobile application',
                priority: faultData.urgency === 'urgent' ? 'high' : 'normal',
              });
              if (created?.ticket_no) {
                setReportedTicket((prev) => ({ ...prev, ticketNumber: created.ticket_no }));
              }
            } catch (err) {
              console.warn('Ticket saved locally / offline fallback:', err);
            }
          }}
        />
      )}

      {currentScreen === 'fault_reported' && (
        <FaultReportedScreen
          ticketNumber={reportedTicket.ticketNumber}
          problem={reportedTicket.problem}
          siteName={reportedTicket.siteName}
          urgency={reportedTicket.urgency}
          status={reportedTicket.status}
          onTrackTicket={() => setCurrentScreen('ticket_tracking')}
          onBackToSupport={() => setCurrentScreen('client_support')}
        />
      )}

      {currentScreen === 'maintenance_signoff' && (
        <MaintenanceSignoffScreen
          siteName={selectedSite}
          visitDate="28 Sep"
          onBack={() => setCurrentScreen('client_support')}
          onConfirmSignOff={() => {
            setCurrentScreen('engineer_signature');
          }}
        />
      )}

      {currentScreen === 'engineer_signature' && (
        <EngineerSignatureScreen
          siteName={selectedSite}
          initialClientName="Client Name"
          onBack={() => setCurrentScreen('maintenance_signoff')}
          onReviewChecks={() => setCurrentScreen('maintenance_signoff')}
          onSaveSignOff={() => {
            setIsMaintenanceSignedOff(true);
            setCurrentScreen('visit_signed_off');
          }}
        />
      )}

      {currentScreen === 'visit_signed_off' && (
        <VisitSignedOffScreen
          visitType="Routine maintenance"
          siteName={selectedSite}
          visitDate="28 Sep"
          signedTime="Today, 3:20 pm"
          onBackToSupport={() => setCurrentScreen('client_support')}
          onBackToHome={() => setCurrentScreen('client_home')}
        />
      )}

      {currentScreen === 'guest_calculator' && (
        <GuestCalculatorScreen
          onBack={() => setCurrentScreen('login')}
          onSeeEstimate={(data) => {
            setIsGuestFlow(true);
            setCalculatorEstimateData({
              selectedItems: data.selectedItems,
              totalWatts: data.totalWatts,
              generatorHours: data.generatorHours,
            });
            setCurrentScreen('guest_estimate');
          }}
        />
      )}

      {currentScreen === 'guest_estimate' && (
        <GuestEstimateScreen
          itemsCount={calculatorEstimateData.selectedItems.reduce((acc, i) => acc + i.count, 0)}
          generatorHours={calculatorEstimateData.generatorHours || '8 h'}
          totalWatts={calculatorEstimateData.totalWatts}
          onBack={() => setCurrentScreen('guest_calculator')}
          onChangeAppliances={() => setCurrentScreen('guest_calculator')}
          onRequestQuote={() => setCurrentScreen('guest_quote')}
        />
      )}

      {currentScreen === 'guest_quote' && (
        <GuestQuoteScreen
          systemSummary={
            calculatorEstimateData.totalWatts > 0
              ? `${((calculatorEstimateData.totalWatts * 1.5) / 1000).toFixed(1)} kWp solar · ${Math.max(
                  3,
                  Math.round((calculatorEstimateData.totalWatts * 4) / 1000)
                )} kWh battery`
              : '1.5 kWp solar · 5 kWh battery'
          }
          onBack={() => setCurrentScreen('guest_estimate')}
          onSubmitSuccess={async (quoteData) => {
            const fallbackNo = `#Q-${Math.floor(200 + Math.random() * 50)}`;
            setSubmittedGuestQuote({
              requestNumber: fallbackNo,
              systemSummary: quoteData.systemSummary.replace(' solar', '').replace(' battery', '').trim(),
              location: quoteData.location,
              contactMethod: quoteData.reachMethod,
              status: 'Received',
            });
            setCurrentScreen('guest_quote_requested');

            try {
              const lead = await leadService.submitQuoteRequest({
                leadSource: 'guest_calculator',
                fullName: quoteData.fullName,
                phone: quoteData.phone,
                email: 'guest@sunpulse.ng',
                address: quoteData.location,
                recommendedPackage: quoteData.systemSummary,
                estimatedSystemKw: (calculatorEstimateData.totalWatts * 1.5) / 1000,
                appliancesData: calculatorEstimateData.selectedItems.map((i) => ({
                  name: i.name,
                  qty: i.count,
                  watts: i.watts,
                  hours: 8,
                })),
              });
              if (lead?.lead_no) {
                setSubmittedGuestQuote((prev) => ({ ...prev, requestNumber: lead.lead_no }));
              }
            } catch (err) {
              console.warn('Lead saved locally / offline fallback:', err);
            }
          }}
        />
      )}

      {currentScreen === 'guest_quote_requested' && (
        <GuestQuoteRequestedScreen
          requestNumber={submittedGuestQuote.requestNumber}
          systemSummary={submittedGuestQuote.systemSummary}
          location={submittedGuestQuote.location}
          contactMethod={submittedGuestQuote.contactMethod}
          status={submittedGuestQuote.status}
          onBackToHome={() => setCurrentScreen('login')}
          onStartNewEstimate={() => setCurrentScreen('guest_calculator')}
        />
      )}

      {currentScreen === 'expansion_calculator' && (
        <ExpansionCalculatorScreen
          onBack={() => setCurrentScreen('client_more')}
          onSeeEstimate={(summary) => {
            setIsGuestFlow(false);
            setCalculatorEstimateData({
              selectedItems: summary.selectedItems,
              totalWatts: summary.totalWatts,
            });
            setCurrentScreen('expansion_estimate');
          }}
        />
      )}

      {currentScreen === 'expansion_estimate' && (
        <ExpansionEstimateScreen
          selectedItems={calculatorEstimateData.selectedItems}
          totalWatts={calculatorEstimateData.totalWatts}
          onBack={() => setCurrentScreen('expansion_calculator')}
          onRequestQuote={() => setCurrentScreen('request_quote')}
          onRequestQuoteSuccess={() => setCurrentScreen('client_more')}
        />
      )}

      {currentScreen === 'request_quote' && (
        <RequestQuoteScreen
          upgradeSummary={`+${Math.max(1.2, +((calculatorEstimateData.totalWatts * 1.76) / 1000).toFixed(1))} kWp solar · +${Math.max(2.5, Math.round((calculatorEstimateData.totalWatts * 4) / 1000))} kWh battery`}
          initialSite={selectedSite}
          onBack={() => setCurrentScreen(isGuestFlow ? 'guest_estimate' : 'expansion_estimate')}
          onSubmitSuccess={async (quoteData) => {
            const fallbackNo = `#Q-${Math.floor(200 + Math.random() * 50)}`;
            const submission = { ...quoteData, requestNumber: quoteData.requestNumber || fallbackNo };
            setSubmittedQuote(submission);
            setCurrentScreen('quote_requested');

            try {
              const lead = await leadService.submitQuoteRequest({
                leadSource: 'client_expansion',
                fullName: profileData.name || 'Client User',
                phone: profileData.phone || '+234 800 000 0000',
                email: profileData.email || 'client@sunpulse.ng',
                address: selectedSite,
                recommendedPackage: quoteData.upgrade,
                estimatedSystemKw: (calculatorEstimateData.totalWatts * 1.76) / 1000,
                appliancesData: calculatorEstimateData.selectedItems.map((i) => ({
                  name: i.name,
                  qty: i.count,
                  watts: i.watts,
                  hours: 8,
                })),
              });
              if (lead?.lead_no) {
                setSubmittedQuote((prev) => ({ ...prev, requestNumber: lead.lead_no }));
              }
            } catch (err) {
              console.warn('Expansion quote saved locally / offline fallback:', err);
            }
          }}
        />
      )}

      {currentScreen === 'quote_requested' && (
        <QuoteRequestedScreen
          requestNumber={submittedQuote.requestNumber}
          upgrade={submittedQuote.upgrade}
          siteName={submittedQuote.siteName}
          contactMethod={submittedQuote.contactMethod}
          visitTiming={submittedQuote.visitTiming}
          status={submittedQuote.status}
          onBackToHome={() => setCurrentScreen(isGuestFlow ? 'login' : 'client_home')}
          onBackToMore={() => setCurrentScreen(isGuestFlow ? 'login' : 'client_more')}
        />
      )}

      {currentScreen === 'security' && (
        <SecurityScreen
          onBack={() => setCurrentScreen('client_more')}
          onChangePassword={() => setCurrentScreen('change_password')}
          onSignOut={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'change_password' && (
        <ChangePasswordScreen
          onBack={() => setCurrentScreen('security')}
          onPasswordUpdated={() => setCurrentScreen('password_updated')}
          onForgotPassword={() => setCurrentScreen('forgot_password')}
        />
      )}

      {currentScreen === 'help_support' && (
        <HelpSupportScreen
          onBack={() => setCurrentScreen('client_more')}
          onReportFault={() => setCurrentScreen('report_fault')}
        />
      )}

      {currentScreen === 'notification_settings' && (
        <NotificationSettingsScreen
          onBack={() => setCurrentScreen('client_more')}
        />
      )}

      {currentScreen === 'ticket_tracking' && (
        <ClientTicketScreen
          ticketNumber={reportedTicket.ticketNumber || '#1042'}
          issueTitle={reportedTicket.problem === 'Inverter error' ? 'Inverter error on display' : reportedTicket.problem}
          statusBadge="En route"
          engineerEta="About 25 minutes away"
          onBack={() => setCurrentScreen('client_support')}
        />
      )}

      {currentScreen === 'past_tickets' && (
        <PastTicketsScreen
          siteName={selectedSite}
          onBack={() => setCurrentScreen('client_support')}
          onSelectTicket={() => {
            setCurrentScreen('ticket_tracking');
          }}
        />
      )}

      {currentScreen === 'site_photos' && (
        <SitePhotosScreen
          siteName={selectedSite}
          onBack={() => setCurrentScreen('client_project')}
        />
      )}

      {currentScreen === 'engineer_jobs' && (
        <EngineerJobsScreen
          onOpenNotifications={() => setIsEngineerNotificationsOpen(true)}
          onSelectJob={(job) => {
            if (job.category === 'Maintenance') {
              setCurrentScreen('engineer_checklist');
            } else if (job.category === 'Fault ticket') {
              setCurrentScreen('ticket_tracking');
            } else if (job.category === 'Installation') {
              setCurrentScreen('engineer_job_detail');
            }
          }}
          onSwitchToClientMode={() => setCurrentScreen('client_home')}
          onSwitchTab={(tab) => {
            if (tab === 'tickets') {
              setCurrentScreen('engineer_tickets');
            } else if (tab === 'visits') {
              setCurrentScreen('engineer_visits');
            } else if (tab === 'more') {
              setCurrentScreen('engineer_more');
            }
          }}
        />
      )}

      {currentScreen === 'engineer_jobs_empty' && (
        <EngineerJobsEmptyScreen
          onOpenNotifications={() => setIsEngineerNotificationsOpen(true)}
          onRefresh={() => setCurrentScreen('engineer_jobs')}
          onSwitchTab={(tab) => {
            if (tab === 'jobs') setCurrentScreen('engineer_jobs');
            if (tab === 'tickets') setCurrentScreen('engineer_tickets');
            if (tab === 'visits') setCurrentScreen('engineer_visits');
            if (tab === 'more') setCurrentScreen('engineer_more');
          }}
        />
      )}

      {currentScreen === 'engineer_tickets' && (
        <EngineerTicketsScreen
          onOpenNotifications={() => setIsEngineerNotificationsOpen(true)}
          onSelectTicket={(ticket) => {
            setCurrentScreen('engineer_ticket_detail');
          }}
          onSwitchToClientMode={() => setCurrentScreen('client_home')}
          onSwitchTab={(tab) => {
            if (tab === 'jobs') {
              setCurrentScreen('engineer_jobs');
            } else if (tab === 'tickets') {
              setCurrentScreen('engineer_tickets');
            } else if (tab === 'visits') {
              setCurrentScreen('engineer_visits');
            } else if (tab === 'more') {
              setCurrentScreen('engineer_more');
            }
          }}
        />
      )}

      {currentScreen === 'engineer_ticket_detail' && (
        <EngineerTicketDetailScreen
          ticketNumber="#1042"
          siteName="Kaduna Clinic"
          issueTitle="Inverter error on display"
          slaText="Respond by 11:30 am"
          priority="Urgent"
          currentStage="En route"
          onBack={() => setCurrentScreen('engineer_tickets')}
          onMarkAsResolved={() => {
            setCurrentScreen('engineer_ticket_resolved');
          }}
        />
      )}

      {currentScreen === 'engineer_ticket_resolved' && (
        <EngineerTicketResolvedScreen
          ticketNumber="#1042"
          problemTitle="Inverter error"
          siteName="Kaduna Clinic"
          resolvedTime="Today, 11:05 am"
          repairNotesStatus="Saved"
          onBackToTickets={() => setCurrentScreen('engineer_tickets')}
          onBackToJobs={() => setCurrentScreen('engineer_jobs')}
        />
      )}

      {currentScreen === 'engineer_checklist' && (
        <EngineerChecklistScreen
          siteName="Northgate Factory"
          planName="6-month plan"
          onBack={() => setCurrentScreen('engineer_jobs')}
          onCompleteVisit={() => setCurrentScreen('engineer_visit_done')}
        />
      )}

      {currentScreen === 'engineer_visit_done' && (
        <EngineerVisitDoneScreen
          visitTitle="Routine maintenance"
          siteName="Northgate Factory"
          planName="6-month plan"
          checksText="5 of 5"
          completedTime="Today, 3:20 pm"
          onBackToVisits={() => setCurrentScreen('engineer_visits')}
          onBackToJobs={() => setCurrentScreen('engineer_jobs')}
        />
      )}

      {currentScreen === 'engineer_visits' && (
        <EngineerVisitsScreen
          onOpenNotifications={() => setIsEngineerNotificationsOpen(true)}
          onStartVisit={(visit) => {
            setCurrentScreen('engineer_checklist');
          }}
          onSwitchToClientMode={() => setCurrentScreen('client_home')}
          onSwitchTab={(tab) => {
            if (tab === 'jobs') {
              setCurrentScreen('engineer_jobs');
            } else if (tab === 'tickets') {
              setCurrentScreen('engineer_tickets');
            } else if (tab === 'visits') {
              setCurrentScreen('engineer_visits');
            } else if (tab === 'more') {
              setCurrentScreen('engineer_more');
            }
          }}
        />
      )}

      {currentScreen === 'engineer_more' && (
        <EngineerMoreScreen
          engineerName="Abubakar S."
          engineerEmail="abubakar@sunpulse.ng"
          pendingSyncCount={3}
          onOpenSyncStatus={() => {
            setCurrentScreen('engineer_sync_status');
          }}
          onOpenNotifications={() => setIsEngineerNotificationsOpen(true)}
          onOpenSecurity={() => setCurrentScreen('security')}
          onOpenHelp={() => setCurrentScreen('help_support')}
          onSignOut={() => setIsSignOutModalOpen(true)}
          onSwitchToClientMode={() => setCurrentScreen('client_home')}
          onSwitchTab={(tab) => {
            if (tab === 'jobs') {
              setCurrentScreen('engineer_jobs');
            } else if (tab === 'tickets') {
              setCurrentScreen('engineer_tickets');
            } else if (tab === 'visits') {
              setCurrentScreen('engineer_visits');
            } else if (tab === 'more') {
              setCurrentScreen('engineer_more');
            }
          }}
        />
      )}

      {currentScreen === 'engineer_sync_status' && (
        <EngineerSyncStatusScreen
          onBack={() => setCurrentScreen('engineer_more')}
          onStartSyncing={() => setCurrentScreen('engineer_sync_syncing')}
          onSyncComplete={() => setCurrentScreen('engineer_sync_all_synced')}
        />
      )}

      {currentScreen === 'engineer_sync_syncing' && (
        <EngineerSyncSyncingScreen
          onBack={() => setCurrentScreen('engineer_sync_status')}
          onSyncFinished={() => setCurrentScreen('engineer_sync_all_synced')}
        />
      )}

      {currentScreen === 'engineer_sync_all_synced' && (
        <EngineerSyncAllSyncedScreen
          onBack={() => setCurrentScreen('engineer_more')}
        />
      )}

      {currentScreen === 'engineer_job_detail' && (
        <EngineerJobDetailScreen
          jobTitle="Installation job"
          siteName={selectedSite}
          stageName="Installation"
          stageNumber={3}
          totalStages={5}
          progressPercent={60}
          roleTag="Leader"
          onBack={() => setCurrentScreen('engineer_jobs')}
          onOpenPhotos={() => setCurrentScreen('engineer_media')}
          onOpenProgressNote={() => setCurrentScreen('engineer_progress_note')}
          onOpenTestInverter={() => setCurrentScreen('engineer_test_inverter')}
          onOpenDiagnostics={() => setCurrentScreen('engineer_diagnostics')}
          onJobCompleted={() => {
            setCurrentScreen('engineer_jobs');
          }}
        />
      )}

      {currentScreen === 'engineer_media' && (
        <EngineerMediaScreen
          siteName={selectedSite}
          initialStage="Installation"
          onBack={() => setCurrentScreen('engineer_job_detail')}
          onSaveToJob={() => setCurrentScreen('engineer_job_detail')}
        />
      )}

      {currentScreen === 'engineer_progress_note' && (
        <EngineerProgressNoteScreen
          siteName={selectedSite}
          stageName="Installation"
          onBack={() => setCurrentScreen('engineer_job_detail')}
          onSaveNote={() => setCurrentScreen('engineer_job_detail')}
        />
      )}

      {currentScreen === 'engineer_test_inverter' && (
        <EngineerInverterTestScreen
          siteName={selectedSite}
          initialSerial="3428625515"
          initialBrand="Deye"
          onBack={() => setCurrentScreen('engineer_job_detail')}
          onLinkSerialToJob={async (serial, brand) => {
            setCurrentScreen('engineer_job_detail');
            try {
              await telemetryService.linkDataloggerToProject('proj-1', serial, brand);
            } catch (err) {
              console.warn('Linking datalogger offline/fallback:', err);
            }
          }}
          onTestFailed={() => setCurrentScreen('engineer_test_inverter_failed')}
        />
      )}

      {currentScreen === 'engineer_test_inverter_failed' && (
        <EngineerInverterTestFailedScreen
          siteName={selectedSite}
          initialSerial="3428625515"
          onBack={() => setCurrentScreen('engineer_job_detail')}
          onTestAgain={() => setCurrentScreen('engineer_test_inverter')}
          onSaveLater={() => setCurrentScreen('engineer_job_detail')}
        />
      )}

      {currentScreen === 'engineer_diagnostics' && (
        <EngineerDiagnosticsScreen
          siteName={selectedSite}
          onBack={() => setCurrentScreen('engineer_job_detail')}
          onSaveReadings={() => setCurrentScreen('engineer_job_detail')}
        />
      )}

      {currentScreen === 'management_overview' && (
        <ManagementOverviewScreen
          onSwitchTab={(tab) => {
            if (tab === 'overview') setCurrentScreen('management_overview');
            if (tab === 'projects') setCurrentScreen('management_projects');
            if (tab === 'support') setCurrentScreen('management_support');
            if (tab === 'leads') setCurrentScreen('management_leads');
            if (tab === 'more') setCurrentScreen('management_more');
          }}
          onOpenNotifications={() => setIsManagementNotificationsOpen(true)}
          onViewAllAlerts={() => setCurrentScreen('management_support')}
          onSelectAlert={(alertType) => {
            if (alertType === 'ticket_not_assigned') {
              setSelectedDispatchTicket({
                ticketNumber: '#T-0148',
                siteName: 'Site 009 · Barnawa',
                issue: 'No power',
                elapsedMinutes: 18,
                slaMinutes: 60,
                returnScreen: 'management_overview',
              });
              setCurrentScreen('management_dispatch');
            }
          }}
        />
      )}

      {currentScreen === 'management_projects' && (
        <ManagementProjectsScreen
          onSwitchTab={(tab) => {
            if (tab === 'overview') setCurrentScreen('management_overview');
            if (tab === 'projects') setCurrentScreen('management_projects');
            if (tab === 'support') setCurrentScreen('management_support');
            if (tab === 'leads') setCurrentScreen('management_leads');
            if (tab === 'more') setCurrentScreen('management_more');
          }}
          onSelectProject={(project) => {
            setSelectedManagementProject({
              projectName: project.name,
              specs: project.specs,
              clientName: project.id === 'p2' ? 'Dr. Amina' : 'Hauwa S.',
              engineerName: project.assignedEngineer,
              mobileAccessStatus: project.badgeStatus === 'Done' ? 'Activated' : 'Not activated',
              stages: [
                {
                  name: 'Survey',
                  status: project.stageNumber >= 1 ? 'completed' : 'not_started',
                  dateOrStatusText: project.stageNumber >= 1 ? '3 Sep' : 'Not started',
                },
                {
                  name: 'Procurement',
                  status: project.stageNumber > 2 ? 'completed' : project.stageNumber === 2 ? 'in_progress' : 'not_started',
                  dateOrStatusText: project.stageNumber > 2 ? '21 Sep' : project.stageNumber === 2 ? 'In progress' : 'Not started',
                },
                {
                  name: 'Installation',
                  status: project.stageNumber > 3 ? 'completed' : project.stageNumber === 3 ? 'in_progress' : 'not_started',
                  dateOrStatusText: project.stageNumber > 3 ? '1 Oct' : project.stageNumber === 3 ? 'In progress' : 'Not started',
                },
                {
                  name: 'Commissioning',
                  status: project.stageNumber > 4 ? 'completed' : project.stageNumber === 4 ? 'in_progress' : 'not_started',
                  dateOrStatusText: project.stageNumber > 4 ? '15 Oct' : project.stageNumber === 4 ? 'In progress' : 'Not started',
                },
                {
                  name: 'Handover',
                  status: project.stageNumber === 5 ? 'completed' : 'not_started',
                  dateOrStatusText: project.stageNumber === 5 ? '28 Oct' : 'Not started',
                },
              ],
              photoCount: '3 of 14',
            });
            setCurrentScreen('management_project_detail');
          }}
        />
      )}

      {currentScreen === 'management_project_detail' && (
        <ManagementProjectDetailScreen
          project={selectedManagementProject}
          onBack={() => setCurrentScreen('management_projects')}
          onActivateMobile={() => setCurrentScreen('management_activate_client')}
          onEnrolMaintenance={() => setCurrentScreen('management_maintenance')}
          onViewSitePhotos={() => setCurrentScreen('site_photos')}
        />
      )}

      {currentScreen === 'management_activate_client' && (
        <ManagementActivateClientScreen
          projectName={selectedManagementProject.projectName}
          initialClientName={selectedManagementProject.clientName}
          onBack={() => setCurrentScreen('management_project_detail')}
          onCancel={() => setCurrentScreen('management_project_detail')}
          onActivateSuccess={(_data) => {
            setSelectedManagementProject((prev) => ({
              ...prev,
              mobileAccessStatus: 'Activated',
            }));
            setCurrentScreen('management_project_detail');
          }}
        />
      )}

      {currentScreen === 'management_maintenance' && (
        <ManagementMaintenanceScreen
          projectName={selectedManagementProject.projectName}
          initialTechnician={selectedManagementProject.engineerName}
          onBack={() => setCurrentScreen('management_project_detail')}
          onCancel={() => setCurrentScreen('management_project_detail')}
          onEnrolSuccess={(_data) => {
            setCurrentScreen('management_project_detail');
          }}
        />
      )}

      {currentScreen === 'management_dispatch' && (
        <ManagementDispatchScreen
          ticketNumber={selectedDispatchTicket.ticketNumber}
          siteName={selectedDispatchTicket.siteName}
          issue={selectedDispatchTicket.issue}
          elapsedMinutes={selectedDispatchTicket.elapsedMinutes}
          slaMinutes={selectedDispatchTicket.slaMinutes}
          onBack={() => setCurrentScreen(selectedDispatchTicket.returnScreen)}
          onCancel={() => setCurrentScreen(selectedDispatchTicket.returnScreen)}
          onDispatchSuccess={(_engineer) => {
            setCurrentScreen(selectedDispatchTicket.returnScreen);
          }}
        />
      )}

      {currentScreen === 'management_support' && (
        <ManagementSupportScreen
          onSwitchTab={(tab) => {
            if (tab === 'overview') setCurrentScreen('management_overview');
            if (tab === 'projects') setCurrentScreen('management_projects');
            if (tab === 'support') setCurrentScreen('management_support');
            if (tab === 'leads') setCurrentScreen('management_leads');
            if (tab === 'more') setCurrentScreen('management_more');
          }}
          onDispatchTicket={(ticket) => {
            const elapsedMatch = ticket.timeInfo.match(/(\d+)\s*min/);
            const elapsed = elapsedMatch ? parseInt(elapsedMatch[1], 10) : 18;
            setSelectedDispatchTicket({
              ticketNumber: ticket.ticketNumber,
              siteName: ticket.siteName,
              issue: ticket.title,
              elapsedMinutes: elapsed,
              slaMinutes: 60,
              returnScreen: 'management_support',
            });
            setCurrentScreen('management_dispatch');
          }}
          onSelectTicket={(ticket) => {
            const elapsedMatch = ticket.timeInfo.match(/(\d+)\s*min/);
            const elapsed = elapsedMatch ? parseInt(elapsedMatch[1], 10) : 18;
            setSelectedDispatchTicket({
              ticketNumber: ticket.ticketNumber,
              siteName: ticket.siteName,
              issue: ticket.title,
              elapsedMinutes: elapsed,
              slaMinutes: 60,
              returnScreen: 'management_support',
            });
            setCurrentScreen('management_dispatch');
          }}
        />
      )}

      {currentScreen === 'management_leads' && (
        <ManagementLeadsScreen
          onSwitchTab={(tab) => {
            if (tab === 'overview') setCurrentScreen('management_overview');
            if (tab === 'projects') setCurrentScreen('management_projects');
            if (tab === 'support') setCurrentScreen('management_support');
            if (tab === 'leads') setCurrentScreen('management_leads');
            if (tab === 'more') setCurrentScreen('management_more');
          }}
          onSelectLead={(_lead) => {}}
        />
      )}

      {currentScreen === 'management_more' && (
        <ManagementMoreScreen
          managerName="Manager Name"
          managerEmail="name@example.com"
          onSwitchTab={(tab) => {
            if (tab === 'overview') setCurrentScreen('management_overview');
            if (tab === 'projects') setCurrentScreen('management_projects');
            if (tab === 'support') setCurrentScreen('management_support');
            if (tab === 'leads') setCurrentScreen('management_leads');
            if (tab === 'more') setCurrentScreen('management_more');
          }}
          onProfile={() => {
            setLastMoreScreen('management_more');
            setCurrentScreen('edit_profile');
          }}
          onNotificationSettings={() => setCurrentScreen('notification_settings')}
          onSecurity={() => setCurrentScreen('security')}
          onHelpSupport={() => setCurrentScreen('help_support')}
          onSignOut={() => setIsSignOutModalOpen(true)}
        />
      )}

      {currentScreen === 'edit_profile' && (
        <EditProfileScreen
          initialName={profileData.name}
          initialPhone={profileData.phone}
          email={profileData.email}
          onBack={() => setCurrentScreen(lastMoreScreen)}
          onCancel={() => setCurrentScreen(lastMoreScreen)}
          onSave={(updated) => {
            setProfileData((prev) => ({
              ...prev,
              name: updated.name,
              phone: updated.phone,
            }));
            setCurrentScreen(lastMoreScreen);
          }}
        />
      )}

      {/* Global Notifications Drawer Overlay */}
      <NotificationsDrawer
        visible={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Engineer Notifications Drawer Overlay */}
      <EngineerNotificationsDrawer
        visible={isEngineerNotificationsOpen}
        onClose={() => setIsEngineerNotificationsOpen(false)}
        onNavigateToScreen={(screen) => {
          setIsEngineerNotificationsOpen(false);
          setCurrentScreen(screen as ScreenState);
        }}
      />

      {/* Management Notifications Drawer Overlay */}
      <ManagementNotificationsDrawer
        visible={isManagementNotificationsOpen}
        onClose={() => setIsManagementNotificationsOpen(false)}
        onNavigateToScreen={(screen) => {
          setIsManagementNotificationsOpen(false);
          setCurrentScreen(screen as ScreenState);
        }}
      />

      {/* Global Sign Out Confirmation Modal */}
      <SignOutModal
        visible={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirmSignOut={() => {
          setIsSignOutModalOpen(false);
          setCurrentScreen('login');
        }}
      />

      {/* Global Site Switcher Bottom Sheet */}
      <SiteSwitcherModal
        visible={isSiteSwitcherOpen}
        currentSite={selectedSite}
        onClose={() => setIsSiteSwitcherOpen(false)}
        onSelectSite={(site: SiteItem) => {
          setSelectedSite(site.name);
          setIsSiteSwitcherOpen(false);
          if (site.isOffline) {
            setCurrentScreen('client_home_offline');
          } else if (!site.hasLiveData) {
            setCurrentScreen('system_passport');
          } else if (currentScreen === 'system_passport' || currentScreen === 'client_home_offline') {
            setCurrentScreen('client_home');
          }
        }}
        onContactPM={() => setCurrentScreen('client_support')}
      />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfd',
  },
});
