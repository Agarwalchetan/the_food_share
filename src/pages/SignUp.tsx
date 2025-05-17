import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building2, UserCog } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState('donor');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'donor':
        navigate('/donor');
        break;
      case 'ngo':
        navigate('/ngo');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our community and make a difference
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <div className="mt-1 grid grid-cols-3 gap-3">
                <motion.button
                  type="button"
                  className={`flex flex-col items-center p-4 border rounded-lg ${
                    role === 'donor' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                  onClick={() => setRole('donor')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="h-6 w-6 text-green-600" />
                  <span className="mt-2 text-sm">Donor</span>
                </motion.button>
                <motion.button
                  type="button"
                  className={`flex flex-col items-center p-4 border rounded-lg ${
                    role === 'ngo' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                  onClick={() => setRole('ngo')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Building2 className="h-6 w-6 text-green-600" />
                  <span className="mt-2 text-sm">NGO</span>
                </motion.button>
                <motion.button
                  type="button"
                  className={`flex flex-col items-center p-4 border rounded-lg ${
                    role === 'admin' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                  onClick={() => setRole('admin')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserCog className="h-6 w-6 text-green-600" />
                  <span className="mt-2 text-sm">Admin</span>
                </motion.button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="you@example.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            {role === 'ngo' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="NGO Name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}