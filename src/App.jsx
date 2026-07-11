import { Routes, Route } from 'react-router-dom'
import { RoleProvider } from './lib/RoleContext'
import { EntriesProvider } from './lib/EntriesContext'
import NavShell from './components/shared/NavShell'

import Splash from './screens/shared/Splash'
import Onboarding from './screens/shared/Onboarding'
import RoleSelection from './screens/shared/RoleSelection'
import ArchiveExplorer from './screens/shared/ArchiveExplorer'
import ArchiveEntryDetail from './screens/shared/ArchiveEntryDetail'

import VillageDashboard from './screens/village/VillageDashboard'
import VoiceContribution from './screens/village/VoiceContribution'
import DraftReview from './screens/village/DraftReview'
import CoAuthorInvitation from './screens/village/CoAuthorInvitation'
import PublishApproval from './screens/village/PublishApproval'

import ContributorDashboard from './screens/contributor/ContributorDashboard'
import ScaffoldThreadView from './screens/contributor/ScaffoldThreadView'
import CollaborativeEditing from './screens/contributor/CollaborativeEditing'
import ContributionsProfile from './screens/contributor/ContributionsProfile'
import VisitEligibility from './screens/contributor/VisitEligibility'

import VisitDiscovery from './screens/visitor/VisitDiscovery'
import BookingFlow from './screens/visitor/BookingFlow'
import PreVisitPrep from './screens/visitor/PreVisitPrep'
import OnSiteItinerary from './screens/visitor/OnSiteItinerary'
import PostVisitCertificate from './screens/visitor/PostVisitCertificate'

import DerivativeGenerator from './screens/ops/DerivativeGenerator'
import RevenueDashboard from './screens/ops/RevenueDashboard'
import ActivityFeed from './screens/ops/ActivityFeed'
import SettingsProfile from './screens/ops/SettingsProfile'

function ShellLayout({ children }) {
  return <NavShell>{children}</NavShell>
}

function App() {
  return (
    <RoleProvider>
      <EntriesProvider>
        <Routes>
          {/* Pre-role-selection entry flow — no nav shell */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* Shared, role-agnostic archive screens */}
          <Route path="/archive" element={<ShellLayout><ArchiveExplorer /></ShellLayout>} />
          <Route path="/archive/:entryId" element={<ShellLayout><ArchiveEntryDetail /></ShellLayout>} />

          {/* Village Author track */}
          <Route path="/village" element={<ShellLayout><VillageDashboard /></ShellLayout>} />
          <Route path="/village/record" element={<ShellLayout><VoiceContribution /></ShellLayout>} />
          <Route path="/village/draft/:entryId" element={<ShellLayout><DraftReview /></ShellLayout>} />
          <Route path="/village/invite/:entryId" element={<ShellLayout><CoAuthorInvitation /></ShellLayout>} />
          <Route path="/village/publish/:entryId" element={<ShellLayout><PublishApproval /></ShellLayout>} />

          {/* Contributor track */}
          <Route path="/contributor" element={<ShellLayout><ContributorDashboard /></ShellLayout>} />
          <Route path="/contributor/scaffold/:scaffoldId" element={<ShellLayout><ScaffoldThreadView /></ShellLayout>} />
          <Route path="/contributor/edit/:entryId" element={<ShellLayout><CollaborativeEditing /></ShellLayout>} />
          <Route path="/contributor/profile" element={<ShellLayout><ContributionsProfile /></ShellLayout>} />
          <Route path="/contributor/eligibility" element={<ShellLayout><VisitEligibility /></ShellLayout>} />

          {/* Visitor track */}
          <Route path="/visitor" element={<ShellLayout><VisitDiscovery /></ShellLayout>} />
          <Route path="/visitor/booking" element={<ShellLayout><BookingFlow /></ShellLayout>} />
          <Route path="/visitor/prep" element={<ShellLayout><PreVisitPrep /></ShellLayout>} />
          <Route path="/visitor/itinerary" element={<ShellLayout><OnSiteItinerary /></ShellLayout>} />
          <Route path="/visitor/certificate" element={<ShellLayout><PostVisitCertificate /></ShellLayout>} />

          {/* Distribution & Operations */}
          <Route path="/export" element={<ShellLayout><DerivativeGenerator /></ShellLayout>} />
          <Route path="/revenue" element={<ShellLayout><RevenueDashboard /></ShellLayout>} />
          <Route path="/activity" element={<ShellLayout><ActivityFeed /></ShellLayout>} />
          <Route path="/settings" element={<ShellLayout><SettingsProfile /></ShellLayout>} />
        </Routes>
      </EntriesProvider>
    </RoleProvider>
  )
}

export default App
