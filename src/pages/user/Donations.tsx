import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Clock,
  MapPin,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import UserLayout from '../../components/user/Layout';

interface Donation {
  id: string;
  type: string;
  quantity: string;
  status: 'active' | 'completed' | 'expired';
  pickupDate: string;
  pickupLocation: string;
  recipient?: string;
}

function DonationCard({ donation }: { donation: Donation }) {
  const [showActions, setShowActions] = useState(false);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{donation.type}</h3>
          <p className="text-gray-600">{donation.quantity}</p>
        </div>
        <div className="relative">
          <motion.button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowActions(!showActions)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </motion.button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Details
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>Pickup: {donation.pickupDate}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-5 w-5" />
          <span>{donation.pickupLocation}</span>
        </div>
        {donation.recipient && (
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="h-5 w-5" />
            <span>Recipient: {donation.recipient}</span>
          </div>
        )}
      </div>
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColors[donation.status]}`}>
        <Clock className="h-4 w-4 mr-2" />
        <span className="capitalize">{donation.status}</span>
      </div>
    </motion.div>
  );
}

export default function UserDonations() {
  const donations: Donation[] = [
    {
      id: '1',
      type: 'Fresh Vegetables',
      quantity: '5kg',
      status: 'active',
      pickupDate: 'Tomorrow, 10:00 AM',
      pickupLocation: '123 Main St',
      recipient: 'City Food Bank'
    },
    {
      id: '2',
      type: 'Canned Goods',
      quantity: '10 items',
      status: 'completed',
      pickupDate: 'Yesterday',
      pickupLocation: '456 Oak Ave',
      recipient: 'Local Shelter'
    }
  ];

  return (
    <UserLayout title="My Donations">
      <div className="space-y-6">
        <motion.button
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="h-5 w-5" />
          New Donation
        </motion.button>

        <div className="grid md:grid-cols-2 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}