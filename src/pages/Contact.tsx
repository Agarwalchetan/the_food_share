import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Clock,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
}

function OfficeCard({ office }: { office: Office }) {
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
      <img
        src={office.image}
        alt={office.city}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{office.city}</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-green-600 mt-1" />
            <p className="text-gray-600">{office.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-green-600" />
            <p className="text-gray-600">{office.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-green-600" />
            <p className="text-gray-600">{office.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-green-600" />
            <p className="text-gray-600">{office.hours}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Tell us more about your inquiry..."
        />
      </div>
      <div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-3 rounded-full hover:shadow-lg transition flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>Sending...</>
          ) : status === 'success' ? (
            <>Message Sent!</>
          ) : (
            <>
              Send Message
              <Send className="h-5 w-5" />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

export default function Contact() {
  const offices: Office[] = [
    {
      city: 'San Francisco',
      address: '123 Market Street, San Francisco, CA 94105',
      phone: '+1 (415) 555-0123',
      email: 'sf@foodshare.org',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800'
    },
    {
      city: 'New York',
      address: '456 Madison Avenue, New York, NY 10022',
      phone: '+1 (212) 555-0123',
      email: 'nyc@foodshare.org',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800'
    },
    {
      city: 'Los Angeles',
      address: '789 Wilshire Blvd, Los Angeles, CA 90017',
      phone: '+1 (213) 555-0123',
      email: 'la@foodshare.org',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=800'
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="relative h-[300px] mb-16">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000"
            alt="Contact us"
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
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.a
            href="mailto:contact@foodshare.org"
            className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <div className="bg-green-100 p-3 rounded-full">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <p className="text-gray-600">contact@foodshare.org</p>
            </div>
          </motion.a>
          <motion.a
            href="tel:1-800-FOOD-SHARE"
            className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <div className="bg-green-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-gray-600">1-800-FOOD-SHARE</p>
            </div>
          </motion.a>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <div className="bg-green-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Live Chat</h3>
              <p className="text-gray-600">Available 24/7</p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form and Global Reach */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <ContactForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Our Global Reach</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Globe className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">50+ Cities</h3>
                  <p className="text-gray-600">Serving communities worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-gray-600">Always here to help</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook className="h-5 w-5" />, href: '#' },
                    { icon: <Twitter className="h-5 w-5" />, href: '#' },
                    { icon: <Instagram className="h-5 w-5" />, href: '#' },
                    { icon: <Linkedin className="h-5 w-5" />, href: '#' }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200 transition"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Office Locations */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Our Offices</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office) => (
              <OfficeCard key={office.city} office={office} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}