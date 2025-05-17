import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageSquare, FileText, Mail } from 'lucide-react';
import UserLayout from '../../components/user/Layout';

interface FAQ {
  question: string;
  answer: string;
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="border-b border-gray-200 py-4">
      <motion.button
        className="flex items-center justify-between w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 pt-4">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Help() {
  const faqs: FAQ[] = [
    {
      question: "How do I create a new donation listing?",
      answer: "To create a new donation listing, go to the 'My Donations' page and click the 'New Donation' button. Fill in the required details about your food donation, including type, quantity, and pickup information."
    },
    {
      question: "What types of food can I donate?",
      answer: "You can donate various types of food including fresh produce, packaged goods, and prepared meals. All food must be safe for consumption and meet our quality guidelines. Please check our food safety guidelines for detailed information."
    },
    {
      question: "How do I schedule a pickup?",
      answer: "When creating a donation listing, you can specify available pickup times. NGOs will then be able to select a convenient time slot. You'll receive a notification once a pickup is scheduled."
    },
    {
      question: "What happens if no one claims my donation?",
      answer: "If your donation hasn't been claimed within 24 hours of the listed pickup time, we'll notify you and provide options to extend the pickup window or cancel the listing."
    }
  ];

  return (
    <UserLayout title="Help & Support">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.a
            href="#"
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600">Get instant help from our support team</p>
          </motion.a>
          <motion.a
            href="#"
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-gray-600">Browse our detailed guides</p>
          </motion.a>
          <motion.a
            href="#"
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600">Send us your questions</p>
          </motion.a>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-green-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Still Need Help?</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="What can we help you with?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your issue in detail..."
              />
            </div>
            <motion.button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}