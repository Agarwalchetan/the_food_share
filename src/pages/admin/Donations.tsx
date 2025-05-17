import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Package
} from 'lucide-react';
import AdminLayout from '../../components/admin/Layout';

interface Donation {
  id: string;
  type: string;
  quantity: string;
  unit: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  donor: {
    name: string;
    image: string;
  };
  recipient: {
    name: string;
    image: string;
  };
  pickupAddress: string;
  pickupTime: string;
  createdAt: string;
  expiryDate: string;
}

const donations: Donation[] = [
  {
    id: 'DON-001',
    type: 'Fresh Vegetables',
    quantity: '50',
    unit: 'kg',
    status: 'pending',
    donor: {
      name: 'Local Market',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150'
    },
    recipient: {
      name: 'City Food Bank',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150'
    },
    pickupAddress: '123 Market St, San Francisco',
    pickupTime: '9:00 AM - 5:00 PM',
    createdAt: '2025-03-15',
    expiryDate: '2025-03-20'
  },
  {
    id: 'DON-002',
    type: 'Bread and Pastries',
    quantity: '100',
    unit: 'pieces',
    status: 'confirmed',
    donor: {
      name: 'Fresh Bakery',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150'
    },
    recipient: {
      name: 'Hope Shelter',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150'
    },
    pickupAddress: '456 Baker St, San Francisco',
    pickupTime: '6:00 PM - 8:00 PM',
    createdAt: '2025-03-14',
    expiryDate: '2025-03-19'
  }
];

function DonationRow({ donation }: { donation: Donation }) {
  const [showActions, setShowActions] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: <Clock className="h-4 w-4" />,
    confirmed: <CheckCircle className="h-4 w-4" />,
    completed: <CheckCircle className="h-4 w-4" />,
    cancelled: <XCircle className="h-4 w-4" />
  };

  return (
    <motion.tr
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01 }}
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium">{donation.type}</p>
            <p className="text-sm text-gray-600">
              {donation.quantity} {donation.unit}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            src={donation.donor.image}
            alt={donation.donor.name}
            className="w-8 h-8 rounded-full"
          />
          <span>{donation.donor.name}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            src={donation.recipient.image}
            alt={donation.recipient.name}
            className="w-8 h-8 rounded-full"
          />
          <span>{donation.recipient.name}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${statusColors[donation.status]}`}>
          {statusIcons[donation.status]}
          <span className="capitalize">{donation.status}</span>
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {donation.pickupAddress}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {donation.pickupTime}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            Expires: {donation.expiryDate}
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
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
                Edit Donation
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Donation
              </button>
            </div>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

export default function AdminDonations() {
  return (
    <AdminLayout title="Donations">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search donations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="h-5 w-5" />
                Filters
              </motion.button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-4 px-6 text-left">Donation</th>
                <th className="py-4 px-6 text-left">Donor</th>
                <th className="py-4 px-6 text-left">Recipient</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Details</th>
                <th className="py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <DonationRow key={donation.id} donation={donation} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}