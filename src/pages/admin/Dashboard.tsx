import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Users,
  Package,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import AdminLayout from '../../components/admin/Layout';

const data = [
  { name: 'Jan', donations: 400, users: 240 },
  { name: 'Feb', donations: 300, users: 139 },
  { name: 'Mar', donations: 200, users: 980 },
  { name: 'Apr', donations: 278, users: 390 },
  { name: 'May', donations: 189, users: 480 },
  { name: 'Jun', donations: 239, users: 380 },
  { name: 'Jul', donations: 349, users: 430 }
];

function StatCard({ title, value, change, icon, color }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const isPositive = change >= 0;

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold mb-2">{value}</h3>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span className="text-sm">{Math.abs(change)}% from last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'New User',
      description: 'Sarah Chen joined as a donor',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'Donation',
      description: 'Local Market donated 50kg of vegetables',
      time: '10 minutes ago'
    },
    {
      id: 3,
      type: 'Alert',
      description: 'Food pickup #123 is pending confirmation',
      time: '15 minutes ago'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ x: 5 }}
          >
            <div className="bg-green-100 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">{activity.type}</p>
              <p className="text-gray-600">{activity.description}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="1,234"
          change={12}
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Active Donations"
          value="856"
          change={-5}
          icon={<Package className="h-6 w-6 text-green-600" />}
          color="bg-green-100"
        />
        <StatCard
          title="Success Rate"
          value="94%"
          change={3}
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
          color="bg-purple-100"
        />
        <StatCard
          title="Food Saved (kg)"
          value="2,450"
          change={8}
          icon={<Package className="h-6 w-6 text-orange-600" />}
          color="bg-orange-100"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorDonations)"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <RecentActivity />
      </div>
    </AdminLayout>
  );
}