import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, CheckCircle } from 'lucide-react';
import UserLayout from '../../components/user/Layout';

interface HistoryItem {
  id: string;
  type: string;
  date: string;
  location: string;
  recipient: string;
  impact: string;
  status: 'completed';
}

function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{item.type}</h3>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <Calendar className="h-5 w-5" />
            <span>{item.date}</span>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Completed</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-5 w-5" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Heart className="h-5 w-5" />
          <span>Recipient: {item.recipient}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-green-600">Impact: {item.impact}</p>
      </div>
    </motion.div>
  );
}

export default function History() {
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'Fresh Vegetables',
      date: 'March 15, 2025',
      location: '123 Main St, San Francisco',
      recipient: 'City Food Bank',
      impact: 'Helped feed 20 families',
      status: 'completed'
    },
    {
      id: '2',
      type: 'Bread and Pastries',
      date: 'March 10, 2025',
      location: '456 Market St, San Francisco',
      recipient: 'Local Shelter',
      impact: 'Provided breakfast for 50 people',
      status: 'completed'
    },
    {
      id: '3',
      type: 'Canned Goods',
      date: 'March 5, 2025',
      location: '789 Oak St, San Francisco',
      recipient: 'Community Center',
      impact: 'Stocked food pantry for a week',
      status: 'completed'
    }
  ];

  return (
    <UserLayout title="Donation History">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {historyItems.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}