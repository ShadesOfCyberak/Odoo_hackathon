
import React from 'react';
import { User as UserType } from '../types';
import { User as UserIcon, Settings, Globe, Bell, Shield, LogOut } from 'lucide-react';

interface ProfileProps {
  user: UserType;
  setUser: (u: UserType) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your profile and travel preferences</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <img src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg bg-white" />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-lg text-white shadow-lg">
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Display Name</label>
              <input value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <input value={user.email} disabled className="w-full p-3 bg-gray-100 border border-transparent rounded-xl text-gray-500 italic" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-500" /> Travel Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Default Currency</span>
              <select className="text-sm font-bold bg-gray-50 p-2 rounded-lg outline-none border border-transparent focus:border-blue-200">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Language</span>
              <select className="text-sm font-bold bg-gray-50 p-2 rounded-lg outline-none border border-transparent focus:border-blue-200">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2"><Bell className="w-5 h-5 text-orange-500" /> Notifications</h3>
          <div className="space-y-3">
             <label className="flex items-center justify-between cursor-pointer">
               <span className="text-sm font-medium text-gray-600">Trip Reminders</span>
               <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
             </label>
             <label className="flex items-center justify-between cursor-pointer">
               <span className="text-sm font-medium text-gray-600">Price Alerts</span>
               <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
             </label>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-red-900">Danger Zone</h3>
          <p className="text-xs text-red-700">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all">Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
