import { motion } from 'framer-motion';
import { FileText, Download, Filter } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import DonorLayout from '../../components/donor/Layout';

const areaData = [
  { month: 'Jan', donations: 4 },
  { month: 'Feb', donations: 3 },
  { month: 'Mar', donations: 6 },
  { month: 'Apr', donations: 4 },
  { month: 'May', donations: 7 },
  { month: 'Jun', donations: 5 }
];

const pieData = [
  { name: 'Vegetables', value: 40 },
  { name: 'Fruits', value: 25 },
  { name: 'Bread', value: 20 },
  { name: 'Canned Goods', value: 15 }
];

const COLORS = ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b'];

function ReportCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-5 w-5" />
          Export
        </motion.button>
      </div>
      {children}
    </motion.div>
  );
}

export default function DonorReports() {
  const reports = [
    {
      id: '1',
      name: 'March 2025 Donation Report',
      date: 'April 1, 2025',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Q1 2025 Impact Summary',
      date: 'March 31, 2025',
      size: '3.1 MB'
    },
    {
      id: '3',
      name: 'February 2025 Donation Report',
      date: 'March 1, 2025',
      size: '2.1 MB'
    }
  ];

  return (
    <DonorLayout title="Reports & Analytics">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="h-5 w-5" />
              Generate Report
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-5 w-5" />
              Filter
            </motion.button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ReportCard title="Donation Trends">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorDonations)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ReportCard>

          <ReportCard title="Donation Categories">
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
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ReportCard>
        </div>

        <ReportCard title="Available Reports">
          <div className="divide-y divide-gray-200">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                className="py-4 flex items-center justify-between"
                whileHover={{ x: 5 }}
              >
                <div>
                  <h3 className="font-medium">{report.name}</h3>
                  <p className="text-sm text-gray-600">
                    Generated on {report.date} • {report.size}
                  </p>
                </div>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-5 w-5" />
                  Download
                </motion.button>
              </motion.div>
            ))}
          </div>
        </ReportCard>
      </div>
    </DonorLayout>
  );
}