import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Leaf,
  Globe,
  Heart,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter
} from 'lucide-react';

function TeamMember({ name, role, image, linkedin }) {
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
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{role}</p>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-700 transition-colors"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </motion.div>
  );
}

function StatisticCard({ icon, number, label }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg p-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="text-green-600 mb-4 inline-block"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {icon}
      </motion.div>
      <motion.h3
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        {number}
      </motion.h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
}

function PartnerLogo({ name, logo }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.05 }}
    >
      <img src={logo} alt={name} className="max-h-12" />
    </motion.div>
  );
}

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800",
      linkedin: "#"
    },
    {
      name: "Michael Thompson",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800",
      linkedin: "#"
    },
    {
      name: "Priya Patel",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800",
      linkedin: "#"
    }
  ];

  const partners = [
    {
      name: "Local Food Bank",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200"
    },
    {
      name: "City Kitchen",
      logo: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&w=200"
    },
    {
      name: "Green Earth NGO",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=200"
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="relative h-[400px] mb-16">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=2000"
            alt="Team working together"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Connecting surplus food with those in need, we're building a world where no one goes hungry and no food goes to waste.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-4 gap-8">
          <StatisticCard
            icon={<Heart className="h-8 w-8" />}
            number="100,000+"
            label="Meals Served"
          />
          <StatisticCard
            icon={<Globe className="h-8 w-8" />}
            number="50+"
            label="Cities Covered"
          />
          <StatisticCard
            icon={<Award className="h-8 w-8" />}
            number="1,000+"
            label="Partner Organizations"
          />
          <StatisticCard
            icon={<Leaf className="h-8 w-8" />}
            number="500+"
            label="Tons Food Saved"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded in 2023, FoodShare began with a simple idea: to create a bridge between food surplus and scarcity. What started as a local initiative has grown into a nationwide movement, powered by technology and driven by compassion.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Partners
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <PartnerLogo key={partner.name} {...partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <motion.a
            href="mailto:contact@foodshare.org"
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <Mail className="h-6 w-6 text-green-600" />
            <span>contact@foodshare.org</span>
          </motion.a>
          <motion.a
            href="tel:1-800-FOOD-SHARE"
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <Phone className="h-6 w-6 text-green-600" />
            <span>1-800-FOOD-SHARE</span>
          </motion.a>
          <motion.div
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md"
            whileHover={{ y: -5 }}
          >
            <MapPin className="h-6 w-6 text-green-600" />
            <span>San Francisco, CA</span>
          </motion.div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Join Us in Making a Difference
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="bg-white text-green-600 px-8 py-3 rounded-full hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Become a Partner
              </motion.button>
              <motion.button
                className="bg-green-700 text-white px-8 py-3 rounded-full hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Support Our Mission
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}