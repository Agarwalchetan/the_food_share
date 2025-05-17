import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  List,
  Map as MapIcon,
  ArrowRight
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
  image: string;
  distance: string;
  donor: {
    name: string;
    rating: number;
    image: string;
  };
}

function ListingCard({ listing }: { listing: FoodListing }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.type}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-md">
          {listing.distance}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{listing.type}</h3>
            <p className="text-gray-600">
              {listing.quantity} {listing.unit}
            </p>
          </div>
          <div className="flex items-center">
            <img
              src={listing.donor.image}
              alt={listing.donor.name}
              className="w-10 h-10 rounded-full"
            />
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
        <motion.button
          className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-2 rounded-full hover:shadow-lg transition flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request Pickup
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function FilterSection({ title, options }: { title: string; options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-4 space-y-2">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-green-600" />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function FindFood() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
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
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800',
      distance: '0.5 miles',
      donor: {
        name: 'Local Market',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150'
      }
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
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800',
      distance: '1.2 miles',
      donor: {
        name: 'City Bakery',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150'
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for food donations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <motion.button
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-5 w-5" />
              Filters
            </motion.button>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1">
              <motion.button
                className={`p-2 rounded-full transition ${
                  viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </motion.button>
              <motion.button
                className={`p-2 rounded-full transition ${
                  viewMode === 'map' ? 'bg-green-100 text-green-600' : 'text-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode('map')}
              >
                <MapIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <FilterSection
                title="Food Type"
                options={[
                  'Vegetables & Fruits',
                  'Bread & Pastries',
                  'Dairy Products',
                  'Prepared Meals',
                  'Packaged Foods'
                ]}
              />
              <FilterSection
                title="Distance"
                options={[
                  'Under 1 mile',
                  '1-3 miles',
                  '3-5 miles',
                  '5-10 miles'
                ]}
              />
              <FilterSection
                title="Pickup Time"
                options={[
                  'Morning (6AM-12PM)',
                  'Afternoon (12PM-5PM)',
                  'Evening (5PM-9PM)',
                  'Night (9PM-12AM)'
                ]}
              />
              <FilterSection
                title="Quantity"
                options={[
                  'Small (1-10 units)',
                  'Medium (11-50 units)',
                  'Large (50+ units)'
                ]}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === 'list' ? (
              <div className="grid md:grid-cols-2 gap-8">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-4 h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Map view coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}