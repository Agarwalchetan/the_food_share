import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Heart,
  ChevronDown
} from 'lucide-react';
import UserLayout from '../../components/user/Layout';

interface FoodRequest {
  id: string;
  type: string;
  quantity: string;
  donor: {
    name: string;
    distance: string;
    rating: number;
  };
  pickupDate: string;
  pickupLocation: string;
  status: 'available' | 'requested' | 'confirmed';
}

function RequestCard({ request }: { request: FoodRequest }) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    requested: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-purple-100 text-purple-800'
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
          <h3 className="text-xl font-semibold">{request.type}</h3>
          <p className="text-gray-600">{request.quantity}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${statusColors[request.status]}`}>
          <span className="capitalize">{request.status}</span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Heart className="h-5 w-5" />
          <span>{request.donor.name} ({request.donor.rating}★)</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-5 w-5" />
          <span>{request.pickupLocation} ({request.donor.distance})</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>{request.pickupDate}</span>
        </div>
      </div>
      {request.status === 'available' && (
        <motion.button
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Request Pickup
        </motion.button>
      )}
    </motion.div>
  );
}

export default function NgoRequests() {
  const requests: FoodRequest[] = [
    {
      id: '1',
      type: 'Fresh Vegetables',
      quantity: '50kg',
      donor: {
        name: 'Local Market',
        distance: '0.5 miles',
        rating: 4.8
      },
      pickupDate: 'Today, 2-4 PM',
      pickupLocation: '123 Market St',
      status: 'available'
    },
    {
      id: '2',
      type: 'Bread and Pastries',
      quantity: '100 pieces',
      donor: {
        name: 'City Bakery',
        distance: '1.2 miles',
        rating: 4.9
      },
      pickupDate: 'Tomorrow, 6-8 PM',
      pickupLocation: '456 Baker St',
      status: 'requested'
    }
  ];

  return (
    <UserLayout title="Available Donations">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search available donations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-5 w-5" />
            Filters
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Requests Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}