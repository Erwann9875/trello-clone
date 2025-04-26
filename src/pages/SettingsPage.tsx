import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { Bell, Lock, User, Palette, Globe, X, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

const SettingsPage = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [theme, setTheme] = useState('Dark');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software Engineer',
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative group">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={32} className="text-primary" />
              </div>
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white" />
              </button>
            </div>
            <div>
              <h2 className="font-medium text-lg">{formData.name}</h2>
              <p className="text-sm text-secondary">{formData.email}</p>
              <p className="text-sm text-secondary mt-1">{formData.bio}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsEditProfileOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <div className="divide-y divide-border">
          <section className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-secondary" />
              <h3 className="font-medium">Notifications</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <Switch.Root 
                  className="w-11 h-6 bg-card-hover rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Push notifications</span>
                <Switch.Root 
                  className="w-11 h-6 bg-card-hover rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </label>
            </div>
          </section>

          <section className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock size={20} className="text-secondary" />
              <h3 className="font-medium">Privacy</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm">Make boards public by default</span>
                <Switch.Root 
                  className="w-11 h-6 bg-card-hover rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </label>
            </div>
          </section>

          <section className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette size={20} className="text-secondary" />
              <h3 className="font-medium">Theme</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['System', 'Light', 'Dark'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    theme === t ? "bg-primary text-white" : "bg-card-hover hover:bg-card-active"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          <section className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={20} className="text-secondary" />
              <h3 className="font-medium">Language</h3>
            </div>
            <select
              className={cn(
                "w-full px-3 py-2 rounded-md text-sm",
                "bg-card-hover border border-border",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
            >
              <option>English (US)</option>
              <option>French</option>
              <option>German</option>
              <option>Spanish</option>
            </select>
          </section>
        </div>
      </div>

      <Dialog.Root open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] bg-background rounded-lg shadow-xl p-6">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Edit Profile
            </Dialog.Title>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={cn(
                    "w-full px-3 py-2 rounded-md text-sm",
                    "bg-card-hover border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50"
                  )}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={cn(
                    "w-full px-3 py-2 rounded-md text-sm",
                    "bg-card-hover border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50"
                  )}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className={cn(
                    "w-full px-3 py-2 rounded-md text-sm",
                    "bg-card-hover border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "resize-none"
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded-md hover:bg-card-hover"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium"
              >
                Save changes
              </button>
            </div>

            <Dialog.Close className="absolute top-4 right-4 p-2 hover:bg-card-hover rounded-md">
              <X size={16} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default SettingsPage;