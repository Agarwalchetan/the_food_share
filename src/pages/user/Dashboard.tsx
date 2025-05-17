import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Heart,
  Clock,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';
import UserLayout from '../../components/user/Layout';

function StatCard({ icon, title, value, change }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="bg-green-100 p-3 rounded-full">
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

function ActivityItem({ icon, title, description, time }) {
  return (
    <motion.div
      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
      whileHover={{ x: 5 }}
    >
      <div className="bg-green-100 p-2 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </motion.div>
  );
}

export default function UserDashboard() {
  return (
    <UserLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            icon={<Heart className="h-6 w-6 text-green-600" />}
            title="Total Donations"
            value="24"
            change={12}
          />
          <StatCard
            icon={<Clock className="h-6 w-6 text-blue-600" />}
            title="Active Donations"
            value="3"
            change={-5}
          />
          <StatCard
            icon={<Award className="h-6 w-6 text-purple-600" />}
            title="Impact Score"
            value="850"
            change={3}
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
            title="Food Saved (kg)"
            value="120"
            change={8}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              icon={<Heart className="h-5 w-5 text-green-600" />}
              title="New Donation"
              description="You donated 5kg of vegetables"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<Clock className="h-5 w-5 text-blue-600" />}
              title="Pickup Scheduled"
              description="City Food Bank will pickup your donation"
              time="4 hours ago"
            />
            <ActivityItem
              icon={<Calendar className="h-5 w-5 text-purple-600" />}
              title="Donation Completed"
              description="Your donation helped feed 20 people"
              time="1 day ago"
            />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}