import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Menu,
  X,
  Twitter,
  Linkedin,
  Instagram,
  Search,
  Bell,
  User,
  ChevronDown
} from 'lucide-react';

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const menuItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100
    }
  })
};

const mobileMenuVariants = {
  hidden: { 
    height: 0,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  visible: { 
    height: "auto",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.1
    }
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New donation available nearby",
      time: "2 minutes ago"
    },
    {
      id: 2,
      message: "Your donation was picked up",
      time: "1 hour ago"
    }
  ]);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About Us', path: '/about' },
    { name: 'Donate Food', path: '/donate' },
    { name: 'Find Food', path: '/find-food' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      twitter: 'https://twitter.com/foodshare',
      linkedin: 'https://linkedin.com/company/foodshare',
      instagram: 'https://instagram.com/foodshare'
    };
    window.open(socialLinks[platform], '_blank');
  };

  const logoAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-lg shadow-lg' 
            : 'bg-white/50 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <motion.div animate={logoAnimation}>
                    <Leaf className="h-10 w-10 text-green-600" />
                  </motion.div>
                </div>
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  FoodShare
                </motion.span>
              </Link>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Search Bar */}
              <AnimatePresence>
                {showSearch && (
                  <motion.form
                    onSubmit={handleSearch}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Navigation Items */}
              {navItems.map((item, i) => (
                <motion.div key={item.path}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={item.path}
                    className={`relative text-gray-600 hover:text-green-600 transition-colors py-2 ${
                      location.pathname === item.path ? 'text-green-600 font-semibold' : ''
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                        initial={false}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </motion.button>
                
                <div className="relative">
                  <motion.button
                    onClick={handleNotificationClick}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
                      >
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-gray-50"
                            whileHover={{ x: 5 }}
                          >
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.button
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignUp}
                  >
                    <User className="h-5 w-5" />
                    <span>Sign Up</span>
                    <ChevronDown className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Mobile menu button */}
            <motion.div
              className="lg:hidden flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="p-4 space-y-2">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </form>

                {/* Mobile Navigation Items */}
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    variants={menuItemVariants}
                    custom={i}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === item.path 
                          ? 'bg-green-50 text-green-600 font-semibold' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="pt-4 border-t border-gray-100">
                  <motion.button
                    className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleSignUp();
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-5 w-5" />
                    Sign Up
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {navItems.map((item) => (
                  <motion.li
                    key={item.path}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="mailto:contact@foodshare.org">contact@foodshare.org</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="tel:1-800-FOOD-SHARE">1-800-FOOD-SHARE</a>
                </motion.li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <Twitter className="h-6 w-6" />, platform: 'twitter' },
                  { icon: <Linkedin className="h-6 w-6" />, platform: 'linkedin' },
                  { icon: <Instagram className="h-6 w-6" />, platform: 'instagram' }
                ].map((social, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleSocialClick(social.platform)}
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FoodShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}