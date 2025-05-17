import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Upload,
  Clock,
  Truck,
  Search,
  Calendar,
  Users,
  HelpCircle
} from 'lucide-react';

function ProcessStep({ icon, title, description, index }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2 }}
    >
      <motion.div
        className="bg-green-100 p-3 rounded-full"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="border-b border-gray-200 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
    >
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-green-600" />
        {question}
      </h3>
      <p className="text-gray-600">{answer}</p>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <div className="py-12">
      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-6">How FoodShare Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We connect food donors with NGOs to reduce waste and fight hunger. Our platform makes it easy to donate surplus food and get it to those who need it most.
          </p>
        
        </motion.div>

        {/* Process for Donors */}
        <div className="mb-16">
          <motion.h2
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            For Donors
          </motion.h2>
          <div className="space-y-8">
            <ProcessStep
              icon={<Upload className="h-6 w-6 text-green-600" />}
              title="List Your Surplus Food"
              description="Easily list available food items with details like quantity, type, and expiry date."
              index={0}
            />
            <ProcessStep
              icon={<Calendar className="h-6 w-6 text-green-600" />}
              title="Set Pickup Times"
              description="Specify when the food is available for pickup to ensure timely collection."
              index={1}
            />
            <ProcessStep
              icon={<Truck className="h-6 w-6 text-green-600" />}
              title="Track Donation Progress"
              description="Monitor the status of your donations and see their impact in real-time."
              index={2}
            />
          </div>
        </div>

        {/* Process for NGOs */}
        <div className="mb-16">
          <motion.h2
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            For NGOs
          </motion.h2>
          <div className="space-y-8">
            <ProcessStep
              icon={<Search className="h-6 w-6 text-green-600" />}
              title="Find Available Donations"
              description="Browse and search for available food donations in your area."
              index={0}
            />
            <ProcessStep
              icon={<Clock className="h-6 w-6 text-green-600" />}
              title="Schedule Pickups"
              description="Request and schedule food pickups at convenient times."
              index={1}
            />
            <ProcessStep
              icon={<Users className="h-6 w-6 text-green-600" />}
              title="Distribute to Those in Need"
              description="Get food to the people who need it most in your community."
              index={2}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <motion.h2
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            <FAQItem
              question="How do I sign up?"
              answer="Simply click the 'Sign Up' button and choose whether you're a donor or an NGO. Fill in your details, and you can start using the platform immediately."
            />
            <FAQItem
              question="What types of food can be donated?"
              answer="We accept various types of food including fresh produce, packaged goods, and prepared meals. All food must be safe for consumption and meet our quality guidelines."
            />
            <FAQItem
              question="Who can receive donations?"
              answer="Registered and verified NGOs, food banks, and charitable organizations can receive food donations through our platform."
            />
            <FAQItem
              question="Is there a cost involved?"
              answer="No, our platform is completely free for both donors and NGOs. We believe in making food donation as accessible as possible."
            />
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Ready to Make a Difference?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Donating
            </motion.button>
            <motion.button
              className="bg-green-100 text-green-600 px-8 py-3 rounded-full hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register as NGO
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}