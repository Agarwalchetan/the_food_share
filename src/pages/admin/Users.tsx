import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';
import AdminLayout from '../../components/admin/Layout';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'ngo' | 'admin';
  status: 'active' | 'inactive';
  joinedDate: string;
  image: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'donor',
    status: 'active',
    joinedDate: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150'
  },
  {
    id: '2',
    name: 'Michael Thompson',
    email: 'michael@example.com',
    role: 'ngo',
    status: 'active',
    joinedDate: '2025-02-01',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150'
  }
];

function UserRow({ user }: { user: User }) {
  const [showActions, setShowActions] = useState(false);

  const roleColors = {
    donor: 'bg-blue-100 text-blue-800',
    ngo: 'bg-purple-100 text-purple-800',
    admin: 'bg-gray-100 text-gray-800'
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800'
  };

  return (
    <motion.tr
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01 }}
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            src={user.image}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-sm ${roleColors[user.role]}`}>
          {user.role}
        </span>
      </td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[user.status]}`}>
          {user.status}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-600">
        {new Date(user.joinedDate).toLocaleDateString()}
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
                <Edit className="h-4 w-4" />
                Edit User
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete User
              </button>
            </div>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

export default function AdminUsers() {
  return (
    <AdminLayout title="Users">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users..."
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
            <motion.button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="h-5 w-5" />
              Add User
            </motion.button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-4 px-6 text-left">User</th>
                <th className="py-4 px-6 text-left">Role</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Joined Date</th>
                <th className="py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}