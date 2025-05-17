import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Bell,
  Lock,
  Globe,
  Mail,
  Shield,
  Database,
  Save,
  ToggleLeft as Toggle,
  Check,
  Phone,
  FileText,
  AlertTriangle,
  Building2,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import DonorLayout from '../../components/donor/Layout';

interface SettingSection {
  icon: JSX.Element;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingCard({ icon, title, description, children }: SettingSection) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-green-100 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

function ToggleSwitch({ label, description }: { label: string; description: string }) {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="flex items-start justify-between py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <motion.button
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isEnabled ? 'bg-green-600' : 'bg-gray-200'
        }`}
        onClick={() => setIsEnabled(!isEnabled)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="inline-block h-4 w-4 transform rounded-full bg-white transition"
          animate={{ x: isEnabled ? 20 : 4 }}
        />
      </motion.button>
    </div>
  );
}

export default function DonorSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <DonorLayout title="Settings">
      <div className="space-y-6">
        <SettingCard
          icon={<Bell className="h-6 w-6 text-green-600" />}
          title="Notifications"
          description="Configure how you receive notifications"
        >
          <ToggleSwitch
            label="Email Notifications"
            description="Receive notifications about donation pickups and updates"
          />
          <ToggleSwitch
            label="Push Notifications"
            description="Get instant updates on your desktop or mobile"
          />
          <ToggleSwitch
            label="Weekly Reports"
            description="Receive weekly summary of your donations and impact"
          />
        </SettingCard>

        <SettingCard
          icon={<Building2 className="h-6 w-6 text-green-600" />}
          title="Business Information"
          description="Manage your business details and preferences"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Restaurant</option>
                <option>Grocery Store</option>
                <option>Bakery</option>
                <option>Catering Service</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Hours
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<MapPin className="h-6 w-6 text-green-600" />}
          title="Pickup Settings"
          description="Configure your donation pickup preferences"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Pickup Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your default pickup address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Pickup Times
              </label>
              <div className="space-y-2">
                <ToggleSwitch
                  label="Morning (8 AM - 12 PM)"
                  description="Allow pickups during morning hours"
                />
                <ToggleSwitch
                  label="Afternoon (12 PM - 4 PM)"
                  description="Allow pickups during afternoon hours"
                />
                <ToggleSwitch
                  label="Evening (4 PM - 8 PM)"
                  description="Allow pickups during evening hours"
                />
              </div>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Lock className="h-6 w-6 text-green-600" />}
          title="Security"
          description="Manage your account security settings"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <motion.button
                className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enable
              </motion.button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-600">Update your password regularly</p>
              </div>
              <motion.button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Update
              </motion.button>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Shield className="h-6 w-6 text-green-600" />}
          title="Verification"
          description="Manage your business verification status"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Verification Required</p>
                <p className="text-sm text-yellow-600">Please submit your business registration documents for verification.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Registration Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter business registration number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Drag and drop your registration documents here, or click to browse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Mail className="h-6 w-6 text-green-600" />}
          title="Communication"
          description="Manage your communication preferences"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Contact Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="contact@business.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <ToggleSwitch
              label="Newsletter Subscription"
              description="Receive updates about platform features and community news"
            />
          </div>
        </SettingCard>

        <SettingCard
          icon={<Database className="h-6 w-6 text-green-600" />}
          title="Data Management"
          description="Control your data and privacy settings"
        >
          <ToggleSwitch
            label="Analytics Tracking"
            description="Allow us to collect anonymous usage data"
          />
          <ToggleSwitch
            label="Share Impact Statistics"
            description="Make your donation statistics public"
          />
          <div className="pt-4">
            <motion.button
              className="text-red-600 hover:text-red-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Account
            </motion.button>
          </div>
        </SettingCard>

        <div className="flex justify-end">
          <motion.button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Check className="h-5 w-5" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </div>
    </DonorLayout>
  );
}