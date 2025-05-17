import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  MapPin,
  MessageSquare,
  PieChart,
  Upload,
  Clock,
  Leaf,
  ChevronDown
} from 'lucide-react';

function AnimatedCounter({ value, duration = 2 }: { value: string, duration?: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {inView ? (
          <motion.span
            initial={{ value: 0 }}
            animate={{ value: numericValue }}
            transition={{ duration }}
          >
            {value}
          </motion.span>
        ) : (
          "0"
        )}
      </motion.span>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, index }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="text-green-600 mb-4"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <AnimatedCounter value={number} />
      <motion.div
        className="text-green-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role, image }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
    >
      <p className="text-gray-600 mb-4 italic">"{quote}"</p>
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-gray-600">{role}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=2000"
            alt="Food donation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Turn Surplus Food into Hope
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8"
              variants={fadeInUp}
            >
              Connect food donors with NGOs & shelters. Reduce waste. Feed lives.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={fadeInUp}
            >
              <motion.button
                className="bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition flex items-center justify-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
              <motion.button
                className="bg-white text-green-600 px-8 py-3 rounded-full hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload className="h-8 w-8 text-green-600" />,
                title: "List Surplus Food",
                description: "Donors easily list available food with details and pickup times"
              },
              {
                icon: <MapPin className="h-8 w-8 text-green-600" />,
                title: "Browse & Request",
                description: "NGOs find and request nearby available food donations"
              },
              {
                icon: <Leaf className="h-8 w-8 text-green-600" />,
                title: "Deliver Hope",
                description: "Food gets delivered to those who need it most"
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <motion.div
                  className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Upload className="h-6 w-6" />,
                title: "Easy Food Listing",
                description: "Add food details & schedule pickups with just a few clicks"
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Smart Matching",
                description: "Connects NGOs with the nearest food donors automatically"
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Real-time Tracking",
                description: "Know exactly when pickups and deliveries happen"
              },
              {
                icon: <MessageSquare className="h-6 w-6" />,
                title: "Chat & Notifications",
                description: "Communicate instantly with other platform users"
              },
              {
                icon: <PieChart className="h-6 w-6" />,
                title: "Impact Reports",
                description: "Track your contributions and measure your impact"
              }
            ].map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Meals Saved" },
              { number: "500+", label: "NGOs Registered" },
              { number: "1,200+", label: "Active Donors" },
              { number: "40%", label: "Less Food Waste" }
            ].map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What People Say
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="This platform made food donation effortless! We've reduced our waste significantly while helping the community."
              author="Sarah Chen"
              role="Restaurant Owner"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150"
            />
            <TestimonialCard
              quote="We've fed 1,000+ people thanks to this platform. The impact on our community has been incredible."
              author="Michael Thompson"
              role="NGO Representative"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Join the Movement – Start Saving Lives Today!</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up as a Donor
              </motion.button>
              <motion.button
                className="bg-green-100 text-green-600 px-8 py-3 rounded-full hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up as an NGO
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}