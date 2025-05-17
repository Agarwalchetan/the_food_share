import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Donate from './pages/Donate';
import FindFood from './pages/FindFood';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';

// Admin Routes
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminDonations from './pages/admin/Donations';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';

// User Routes
import UserDashboard from './pages/user/Dashboard';
import UserDonations from './pages/user/Donations';
import UserHistory from './pages/user/History';
import UserNotifications from './pages/user/Notifications';
import UserMessages from './pages/user/Messages';
import UserReports from './pages/user/Reports';
import UserCommunity from './pages/user/Community';
import UserHelp from './pages/user/Help';

// NGO Routes
import NgoDashboard from './pages/ngo/Dashboard';
import NgoRequests from './pages/ngo/Requests';
import NgoProfile from './pages/ngo/Profile';
import NgoSettings from './pages/ngo/Settings';

// Donor Routes
import DonorDashboard from './pages/donor/Dashboard';
import DonorDonations from './pages/donor/Donations';
import DonorHistory from './pages/donor/History';
import DonorNotifications from './pages/donor/Notifications';
import DonorProfile from './pages/donor/Profile';
import DonorReports from './pages/donor/Reports';
import DonorSettings from './pages/donor/Settings';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/find-food" element={<FindFood />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/donations" element={<AdminDonations />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        
        {/* User Routes */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/donations" element={<UserDonations />} />
        <Route path="/user/history" element={<UserHistory />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        <Route path="/user/messages" element={<UserMessages />} />
        <Route path="/user/reports" element={<UserReports />} />
        <Route path="/user/community" element={<UserCommunity />} />
        <Route path="/user/help" element={<UserHelp />} />
        
        {/* NGO Routes */}
        <Route path="/ngo" element={<NgoDashboard />} />
        <Route path="/ngo/requests" element={<NgoRequests />} />
        <Route path="/ngo/profile" element={<NgoProfile />} />
        <Route path="/ngo/settings" element={<NgoSettings />} />

        {/* Donor Routes */}
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/donor/donations" element={<DonorDonations />} />
        <Route path="/donor/history" element={<DonorHistory />} />
        <Route path="/donor/notifications" element={<DonorNotifications />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/reports" element={<DonorReports />} />
        <Route path="/donor/settings" element={<DonorSettings />} />
      </Routes>
    </Layout>
  );
}