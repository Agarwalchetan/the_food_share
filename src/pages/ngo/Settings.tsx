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
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import UserLayout from '../../components/user/Layout';

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

export default function NgoSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <UserLayout title="Settings">
      <div className="space-y-6">
        <SettingCard
          icon={<Building2 className="h-6 w-6 text-green-600" />}
          title="Organization Information"
          description="Manage your NGO details"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Food Bank</option>
                <option>Homeless Shelter</option>
                <option>Community Center</option>
                <option>Religious Organization</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID / EIN
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your tax ID"
              />
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Users className="h-6 w-6 text-green-600" />}
          title="Capacity Settings"
          description="Configure your organization's capacity information"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daily Meal Capacity
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Number of meals per day"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Storage Capacity
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Capacity"
                />
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>kg</option>
                  <option>lbs</option>
                  <option>cubic feet</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Area Radius
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Distance"
                />
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>miles</option>
                  <option>kilometers</option>
                </select>
              </div>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Clock className="h-6 w-6 text-green-600" />}
          title="Operating Hours"
          description="Set your organization's operating hours"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opening Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Closing Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operating Days
              </label>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <button
                    key={day}
                    className="px-2 py-1 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-500 transition"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Bell className="h-6 w-6 text-green-600" />}
          title="Notifications"
          description="Configure how you receive notifications"
        >
          <ToggleSwitch
            label="Email Notifications"
            description="Receive notifications about new donations and requests"
          />
          <ToggleSwitch
            label="Push Notifications"
            description="Get instant updates on your desktop or mobile"
          />
          <ToggleSwitch
            label="Weekly Reports"
            description="Receive weekly summary of platform activities"
          />
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
          title="NGO Verification"
          description="Manage your organization's verification status"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Verification Required</p>
                <p className="text-sm text-yellow-600">Please submit your NGO registration documents for verification.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter NGO registration number"
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
                placeholder="contact@ngo.org"
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
    </UserLayout>
  );
}