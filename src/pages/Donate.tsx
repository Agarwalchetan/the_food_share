import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Upload,
  Calendar,
  MapPin,
  Clock,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface FoodListing {
  id: string;
  type: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  pickupAddress: string;
  pickupTime: string;
  description: string;
  images: string[];
  status: 'pending' | 'scheduled' | 'completed' | 'expired';
}

function ListingCard({ listing, onEdit, onDelete }: { listing: FoodListing; onEdit: (id: string) => void; onDelete: (id: string) => void }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: <AlertCircle className="h-5 w-5" />,
    scheduled: <Calendar className="h-5 w-5" />,
    completed: <CheckCircle className="h-5 w-5" />,
    expired: <XCircle className="h-5 w-5" />
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {listing.images.length > 0 && (
        <img
          src={listing.images[0]}
          alt={listing.type}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{listing.type}</h3>
            <p className="text-gray-600">
              {listing.quantity} {listing.unit}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${statusColors[listing.status]}`}>
            {statusIcons[listing.status]}
            <span className="capitalize">{listing.status}</span>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>Expires: {listing.expiryDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>{listing.pickupAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span>{listing.pickupTime}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{listing.description}</p>
        <div className="flex justify-end gap-2">
          <motion.button
            onClick={() => onEdit(listing.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={() => onDelete(listing.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Donate() {
  const [showForm, setShowForm] = useState(false);
  const [listings] = useState<FoodListing[]>([
    {
      id: '1',
      type: 'Fresh Vegetables',
      quantity: '50',
      unit: 'kg',
      expiryDate: '2025-03-20',
      pickupAddress: '123 Market St, San Francisco',
      pickupTime: '9:00 AM - 5:00 PM',
      description: 'Assorted fresh vegetables including carrots, tomatoes, and lettuce.',
      images: ['https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800'],
      status: 'pending'
    },
    {
      id: '2',
      type: 'Bread and Pastries',
      quantity: '100',
      unit: 'pieces',
      expiryDate: '2025-03-19',
      pickupAddress: '456 Baker St, San Francisco',
      pickupTime: '6:00 PM - 8:00 PM',
      description: 'Fresh bread and pastries from our bakery.',
      images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800'],
      status: 'scheduled'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    // Handle edit
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    // Handle delete
  };

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="relative h-[300px] mb-16">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=2000"
            alt="Food donation"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Donate Surplus Food
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              List your surplus food and help us fight hunger in our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Add New Listing Button */}
        <div className="mb-8">
          <motion.button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-3 rounded-full hover:shadow-lg transition flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-5 w-5" />
            Add New Listing
          </motion.button>
        </div>

        {/* Donation Form */}
        {showForm && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">New Food Listing</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Food Type
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Fresh Vegetables"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option>kg</option>
                        <option>pieces</option>
                        <option>boxes</option>
                        <option>servings</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Time
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter the pickup address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      placeholder="Describe the food items..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Drag and drop images here, or click to select files
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Listing
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Listings */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Listings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}