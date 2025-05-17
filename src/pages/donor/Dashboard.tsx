import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Heart,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DonorLayout from '../../components/donor/Layout';

function StatCard({ icon, title, value, change, color = "green" }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${colors[color]}`}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DonationSchedule({ donations }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Upcoming Pickups</h2>
        <Link 
          to="/donor/donations" 
          className="text-green-600 hover:text-green-700 flex items-center gap-1"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-4">
        {donations.map((donation, index) => (
          <motion.div
            key={donation.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="bg-green-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{donation.type}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {donation.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {donation.location}
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              donation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {donation.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ImpactMetrics({ metrics }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Your Impact</h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="text-center p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl font-bold text-green-600 mb-2">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600">{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NotificationCenter({ notifications }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Recent Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className={`p-2 rounded-full ${notification.type === 'alert' ? 'bg-red-100' : 'bg-blue-100'}`}>
              <AlertCircle className={`h-5 w-5 ${notification.type === 'alert' ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
            <div>
              <p className="font-medium">{notification.message}</p>
              <p className="text-sm text-gray-600">{notification.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function DonorDashboard() {
  const upcomingDonations = [
    {
      id: 1,
      type: "Fresh Vegetables",
      time: "Today, 2:00 PM",
      location: "123 Market St",
      status: "confirmed"
    },
    {
      id: 2,
      type: "Baked Goods",
      time: "Tomorrow, 10:00 AM",
      location: "456 Baker Ave",
      status: "pending"
    }
  ];

  const impactMetrics = [
    { value: "1,234", label: "Meals Donated" },
    { value: "50+", label: "Organizations Helped" },
    { value: "500kg", label: "Food Saved" },
    { value: "98%", label: "Success Rate" }
  ];

  const notifications = [
    {
      type: "info",
      message: "Your donation was picked up by City Food Bank",
      time: "2 hours ago"
    },
    {
      type: "alert",
      message: "Upcoming pickup tomorrow at 10:00 AM",
      time: "5 hours ago"
    }
  ];

  return (
    <DonorLayout title="Donor Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            icon={<Heart className="h-6 w-6" />}
            title="Total Donations"
            value="24"
            change={12}
            color="green"
          />
          <StatCard
            icon={<Clock className="h-6 w-6" />}
            title="Active Donations"
            value="3"
            change={-5}
            color="blue"
          />
          <StatCard
            icon={<Award className="h-6 w-6" />}
            title="Impact Score"
            value="850"
            change={3}
            color="purple"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Food Saved (kg)"
            value="120"
            change={8}
            color="orange"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <DonationSchedule donations={upcomingDonations} />
          <NotificationCenter notifications={notifications} />
        </div>

        <ImpactMetrics metrics={impactMetrics} />
      </div>
    </DonorLayout>
  );
}