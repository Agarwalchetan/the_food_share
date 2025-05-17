import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bell, Lock, Globe, Mail, User, Shield, Database, Save, ToggleLeft as Toggle, Check } from 'lucide-react';
import AdminLayout from '../../components/admin/Layout';

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

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        <SettingCard
          icon={<Bell className="h-6 w-6 text-green-600" />}
          title="Notifications"
          description="Configure how you receive notifications"
        >
          <ToggleSwitch
            label="Email Notifications"
            description="Receive notifications about new donations and pickups"
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
          icon={<Globe className="h-6 w-6 text-green-600" />}
          title="Regional Settings"
          description="Customize your location and timezone preferences"
        >
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Pacific Time (PT)</option>
                <option>Eastern Time (ET)</option>
                <option>Central Time (CT)</option>
                <option>Mountain Time (MT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Format
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
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
            label="Share Statistics"
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
    </AdminLayout>
  );
}