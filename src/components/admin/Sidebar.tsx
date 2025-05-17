import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Package,
  BarChart2,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  { path: '/admin', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
  { path: '/admin/users', icon: <Users className="h-5 w-5" />, label: 'Users' },
  { path: '/admin/donations', icon: <Package className="h-5 w-5" />, label: 'Donations' },
  { path: '/admin/analytics', icon: <BarChart2 className="h-5 w-5" />, label: 'Analytics' },
  { path: '/admin/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      <div className="p-6">
        <Link to="/admin" className="flex items-center gap-2 mb-8">
          <motion.div
            className="bg-green-100 p-2 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <LayoutDashboard className="h-6 w-6 text-green-600" />
          </motion.div>
          <span className="text-xl font-bold">Admin Panel</span>
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
      <div className="absolute bottom-0 w-full p-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}