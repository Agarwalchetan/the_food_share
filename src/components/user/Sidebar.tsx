import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Heart,
  History,
  Bell,
  Settings,
  LogOut,
  MessageSquare,
  FileText,
  Users,
  HelpCircle
} from 'lucide-react';

const menuItems = [
  { path: '/user', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
  { path: '/user/donations', icon: <Heart className="h-5 w-5" />, label: 'My Donations' },
  { path: '/user/history', icon: <History className="h-5 w-5" />, label: 'History' },
  { path: '/user/notifications', icon: <Bell className="h-5 w-5" />, label: 'Notifications' },
  { path: '/user/messages', icon: <MessageSquare className="h-5 w-5" />, label: 'Messages' },
  { path: '/user/reports', icon: <FileText className="h-5 w-5" />, label: 'Reports' },
  { path: '/user/community', icon: <Users className="h-5 w-5" />, label: 'Community' },
  { path: '/user/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  { path: '/user/help', icon: <HelpCircle className="h-5 w-5" />, label: 'Help & Support' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg overflow-y-auto">
      <div className="p-6">
        <Link to="/user" className="flex items-center gap-2 mb-8">
          <motion.div
            className="bg-green-100 p-2 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <LayoutDashboard className="h-6 w-6 text-green-600" />
          </motion.div>
          <span className="text-xl font-bold">User Portal</span>
        </Link>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-100">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors w-full">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}