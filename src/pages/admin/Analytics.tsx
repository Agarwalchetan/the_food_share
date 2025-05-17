import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  TrendingUp,
  Users,
  Package,
  Clock,
  Calendar,
  MapPin,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import AdminLayout from '../../components/admin/Layout';

const areaData = [
  { name: 'Jan', donations: 400, pickups: 240 },
  { name: 'Feb', donations: 300, pickups: 139 },
  { name: 'Mar', donations: 200, pickups: 980 },
  { name: 'Apr', donations: 278, pickups: 390 },
  { name: 'May', donations: 189, pickups: 480 },
  { name: 'Jun', donations: 239, pickups: 380 },
  { name: 'Jul', donations: 349, pickups: 430 }
];

const barData = [
  { name: 'Vegetables', amount: 400 },
  { name: 'Fruits', amount: 300 },
  { name: 'Bread', amount: 200 },
  { name: 'Dairy', amount: 278 },
  { name: 'Meat', amount: 189 }
];

const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Cancelled', value: 100 }
];

const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

function StatCard({ title, value, change, icon, color }) {
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
        <div className={`p-3 rounded-full ${color}`}>
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

function ChartCard({ title, children }) {
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
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="h-5 w-5" />
          Filter
        </motion.button>
      </div>
      {children}
    </motion.div>
  );
}

export default function AdminAnalytics() {
  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Donations"
            value="1,234"
            change={12}
            icon={<Package className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Active Users"
            value="856"
            change={-5}
            icon={<Users className="h-6 w-6 text-green-600" />}
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
            title="Avg. Response Time"
            value="2.5h"
            change={-15}
            icon={<Clock className="h-6 w-6 text-orange-600" />}
            color="bg-orange-100"
          />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <ChartCard title="Donations vs Pickups">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPickups" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="pickups"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorPickups)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Food Categories">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Donation Status">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Recent Activity">
            <div className="space-y-4">
              {[
                {
                  icon: <Package className="h-5 w-5 text-green-600" />,
                  title: "New Donation",
                  description: "50kg of vegetables donated by Local Market",
                  time: "2 hours ago"
                },
                {
                  icon: <Users className="h-5 w-5 text-blue-600" />,
                  title: "New User",
                  description: "City Food Bank joined the platform",
                  time: "4 hours ago"
                },
                {
                  icon: <MapPin className="h-5 w-5 text-purple-600" />,
                  title: "Pickup Completed",
                  description: "Donation #123 successfully delivered",
                  time: "5 hours ago"
                },
                {
                  icon: <Calendar className="h-5 w-5 text-orange-600" />,
                  title: "Scheduled Pickup",
                  description: "New pickup scheduled for tomorrow",
                  time: "6 hours ago"
                }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-gray-100 p-2 rounded-lg">
                    {activity.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </AdminLayout>
  );
}