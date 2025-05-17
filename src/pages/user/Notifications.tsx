import { motion } from 'framer-motion';
import { Bell, Heart, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import UserLayout from '../../components/user/Layout';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  time: string;
}

function NotificationCard({ notification }: { notification: Notification }) {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    info: <Bell className="h-5 w-5 text-blue-600" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-600" />
  };

  const colors = {
    success: 'bg-green-50',
    info: 'bg-blue-50',
    warning: 'bg-yellow-50'
  };

  return (
    <motion.div
      className={`${colors[notification.type]} rounded-lg p-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 5 }}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">{icons[notification.type]}</div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{notification.title}</h3>
          <p className="text-gray-600 mb-2">{notification.message}</p>
          <p className="text-sm text-gray-500">{notification.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Notifications() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Donation Completed',
      message: 'Your donation of fresh vegetables has been successfully picked up by City Food Bank.',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'info',
      title: 'New Pickup Request',
      message: 'Local Shelter has requested to pick up your bread donation.',
      time: '4 hours ago'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Upcoming Expiry',
      message: 'Your listed donation will expire in 24 hours. Consider updating the pickup time.',
      time: '6 hours ago'
    }
  ];

  return (
    <UserLayout title="Notifications">
      <div className="space-y-4 max-w-3xl">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </UserLayout>
  );
}