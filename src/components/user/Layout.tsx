import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { Leaf, Twitter, Linkedin, Instagram } from 'lucide-react';

interface UserLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function UserLayout({ children, title }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold mb-8">{title}</h1>
            {children}
          </motion.div>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Leaf className="h-8 w-8 text-green-500" />
                  <span className="ml-2 text-xl font-bold">FoodShare</span>
                </div>
                <p className="text-gray-400">Connecting surplus food with those in need.</p>
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <motion.li whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Donations</a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Profile</a>
                  </motion.li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <motion.li whileHover={{ x: 5 }}>contact@foodshare.org</motion.li>
                  <motion.li whileHover={{ x: 5 }}>1-800-FOOD-SHARE</motion.li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: <Twitter className="h-6 w-6" />, href: "#" },
                    { icon: <Linkedin className="h-6 w-6" />, href: "#" },
                    { icon: <Instagram className="h-6 w-6" />, href: "#" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
              <p>&copy; 2025 FoodShare. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}