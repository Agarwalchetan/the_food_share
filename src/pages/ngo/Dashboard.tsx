import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Users,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Search,
  MapPin,
  Heart,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import UserLayout from '../../components/user/Layout';

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

function AvailableDonations({ donations }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Available Donations</h2>
        <Link 
          to="/ngo/requests" 
          className="text-green-600 hover:text-green-700 flex items-center gap-1"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search available donations..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-4">
        {donations.map((donation, index) => (
          <motion.div
            key={donation.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="bg-green-100 p-2 rounded-full">
              <Heart className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{donation.type}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {donation.location} ({donation.distance})
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Available until: {donation.expiry}
                </div>
              </div>
            </div>
            <motion.button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DistributionSchedule({ schedules }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Distribution Schedule</h2>
      <div className="space-y-4">
        {schedules.map((schedule, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{schedule.title}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {schedule.time}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {schedule.beneficiaries} beneficiaries
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              schedule.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {schedule.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AlertCenter({ alerts }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Important Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 p-4 bg-red-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="bg-red-100 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-red-900">{alert.title}</h3>
              <p className="text-sm text-red-700">{alert.message}</p>
              <p className="text-xs text-red-600 mt-1">{alert.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function NgoDashboard() {
  const availableDonations = [
    {
      id: 1,
      type: "Fresh Vegetables (50kg)",
      location: "Local Market",
      distance: "0.5 miles",
      expiry: "Today, 6:00 PM"
    },
    {
      id: 2,
      type: "Bread and Pastries (100 pieces)",
      location: "City Bakery",
      distance: "1.2 miles",
      expiry: "Tomorrow, 10:00 AM"
    }
  ];

  const distributionSchedules = [
    {
      title: "Morning Distribution",
      time: "Today, 9:00 AM",
      beneficiaries: 50,
      status: "ready"
    },
    {
      title: "Evening Distribution",
      time: "Today, 5:00 PM",
      beneficiaries: 75,
      status: "preparing"
    }
  ];

  const alerts = [
    {
      title: "Storage Space Alert",
      message: "Cold storage reaching capacity. Please schedule distribution.",
      time: "30 minutes ago"
    },
    {
      title: "Expiring Items",
      message: "5 items need to be distributed within 24 hours",
      time: "1 hour ago"
    }
  ];

  return (
    <UserLayout title="NGO Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            title="People Helped"
            value="1,234"
            change={12}
            color="green"
          />
          <StatCard
            icon={<Clock className="h-6 w-6" />}
            title="Active Requests"
            value="8"
            change={-5}
            color="blue"
          />
          <StatCard
            icon={<Award className="h-6 w-6" />}
            title="Reputation Score"
            value="4.9"
            change={3}
            color="purple"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Food Received (kg)"
            value="450"
            change={8}
            color="orange"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AvailableDonations donations={availableDonations} />
          <div className="space-y-6">
            <DistributionSchedule schedules={distributionSchedules} />
            <AlertCenter alerts={alerts} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}