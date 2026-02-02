
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { 
  ArrowLeft, 
  MoreVertical, 
  BadgeCheck as VerifiedIcon, 
  MapPin, 
  Link as LinkIcon, 
  LayoutGrid, 
  Image as ImageIcon, 
  Video, 
  Heart, 
  Home, 
  Search, 
  PlusSquare, 
  Bell, 
  User, 
  Lock, 
  Settings, 
  ExternalLink,
  ChevronRight,
  LogOut,
  Save,
  MessageSquare,
  Bookmark,
  CreditCard,
  Plus,
  Star,
  Share2,
  HelpCircle,
  FileText,
  Play,
  Globe,
  Loader2
} from 'lucide-react';

// --- Supabase Configuration ---
const SUPABASE_URL = 'https://pegivrgrdumkpkcesddx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2nUcEQDMsbM0F9EsJCdfAg_dzLuVzHr';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Constants & Types ---
const ADMIN_CREDENTIALS = {
  username: '123@@',
  password: '123@@'
};

type View = 'profile' | 'admin-login' | 'admin-dashboard';

interface AppState {
  logoUrl: string;
  profilePic: string;
  coverImages: string[];
  redirectUrl: string;
  displayName: string;
  username: string;
  bio: string;
  location: string;
  postsCount: number;
  mediaCount: number;
  likesCount: string;
  videosCount: number;
}

const DEFAULT_STATE: AppState = {
  logoUrl: '',
  profilePic: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
  coverImages: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1481325544331-9cc4936354b8?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1529139513477-323c66b62adc?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop'
  ],
  redirectUrl: 'https://google.com',
  displayName: 'Stacy',
  username: 'stacy_vip',
  bio: 'Hi, I’m Stacy 💋 I love to travel, try new things, and bring a little sunshine wherever I go\nFitness, yoga, music, and exploring new places are my favorite things',
  location: 'Available now',
  postsCount: 20,
  mediaCount: 23,
  likesCount: '867',
  videosCount: 3
};

// --- Sub-Components ---

const OnlyFansLogo = ({ url, className }: { url?: string, className?: string }) => {
  if (url && url.trim() !== '') {
    return <img src={url} alt="Site Logo" className={`${className} object-contain`} />;
  }
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.5-16c-1.933 0-3.5 1.567-3.5 3.5S8.567 13 10.5 13s3.5-1.567 3.5-3.5S12.433 6 10.5 6zm0 5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm6 2c-1.933 0-3.5 1.567-3.5 3.5S13.067 20 15 20s3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5zm0 5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"/>
    </svg>
  );
};

const VerifiedBadge = ({ size = 18 }: { size?: number }) => (
  <div className="inline-flex items-center justify-center relative" style={{ width: size, height: size }}>
    <VerifiedIcon 
      size={size} 
      className="text-[#00aff0] fill-[#00aff0]" 
    />
    <div className="absolute inset-0 flex items-center justify-center pb-[0.5px]">
      <svg 
        viewBox="0 0 24 24" 
        width={size * 0.55} 
        height={size * 0.55} 
        fill="none" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 w-full px-4 py-3 rounded-full transition-colors ${
      active ? 'text-[#00aff0] font-bold' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-lg hidden xl:block">{label}</span>
  </button>
);

const ProfileView = ({ appState, setView }: { appState: AppState, setView: (v: View) => void }) => {
  const [showMoreBio, setShowMoreBio] = useState(false);

  const handleSubscribe = () => {
    window.open(appState.redirectUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex justify-center overflow-x-hidden">
      <div className="flex w-full max-w-[1440px]">
        
        {/* LEFT SIDEBAR - Desktop */}
        <aside className="hidden md:flex flex-col w-20 xl:w-72 sticky top-0 h-screen border-r border-gray-100 p-4">
          <div className="flex items-center justify-center xl:justify-start xl:px-4 mb-8">
            <div className="w-10 h-10 flex items-center justify-center text-[#00aff0]">
              <OnlyFansLogo url={appState.logoUrl} className="w-full h-full" />
            </div>
          </div>
          
          <nav className="space-y-1 flex-1">
            <SidebarItem icon={Home} label="Home" active />
            <SidebarItem icon={Bell} label="Notifications" />
            <SidebarItem icon={MessageSquare} label="Messages" />
            <SidebarItem icon={Bookmark} label="Collections" />
            <SidebarItem icon={User} label="Subscriptions" />
            <SidebarItem icon={CreditCard} label="Add card" onClick={handleSubscribe} />
            <SidebarItem icon={User} label="My profile" />
            <SidebarItem icon={MoreVertical} label="More" />
          </nav>

          <button className="bg-[#00aff0] hover:bg-[#0096ce] text-white rounded-full py-3 px-4 xl:px-8 font-bold flex items-center justify-center gap-2 mt-4 transition-all shadow-md shadow-sky-100">
            <Plus size={20} />
            <span className="hidden xl:block">NEW POST</span>
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-[600px] border-r border-gray-100 bg-white min-h-screen">
          <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <ArrowLeft size={20} className="text-gray-600 cursor-pointer" />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-lg leading-tight text-gray-900">
                  {appState.displayName} 💋 <VerifiedBadge size={16} />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                  <div className="flex items-center gap-1"><FileText size={12}/> {appState.postsCount}</div>
                  <div className="flex items-center gap-1"><ImageIcon size={12}/> {appState.mediaCount}</div>
                  <div className="flex items-center gap-1"><Play size={12}/> {appState.videosCount}</div>
                  <div className="flex items-center gap-1"><Heart size={12}/> {appState.likesCount}</div>
                </div>
              </div>
            </div>
            <MoreVertical size={20} className="text-gray-500 cursor-pointer" onClick={() => setView('admin-login')} />
          </div>

          <div className="grid grid-cols-4 h-48 md:h-64 overflow-hidden gap-0.5 bg-gray-100">
            {appState.coverImages.slice(0, 4).map((img, idx) => (
              <img key={idx} src={img} className="w-full h-full object-cover" alt="cover" />
            ))}
          </div>

          <div className="px-4 relative -top-12">
            <div className="flex justify-between items-end">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  <img src={appState.profilePic} className="w-full h-full object-cover" alt="avatar" />
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <div className="flex gap-2 mb-2">
                <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 text-[#00aff0] transition-colors">
                  <Star size={20} />
                </button>
                <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 text-[#00aff0] transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-1.5 text-xl font-bold text-gray-900">
                {appState.displayName} 💋 <VerifiedBadge size={20} />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>@{appState.username}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400">{appState.location}</span>
              </div>

              <div className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line max-w-lg">
                {appState.bio}
              </div>
              <button 
                onClick={() => setShowMoreBio(!showMoreBio)}
                className="text-[#00aff0] text-sm font-bold mt-2 hover:underline"
              >
                More info
              </button>
            </div>
          </div>

          <div className="px-4 -mt-4 mb-6">
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50/40 border-b border-gray-100">
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Subscription</h3>
              </div>
              <div className="p-4">
                <button 
                  onClick={handleSubscribe}
                  className="w-full bg-[#00aff0] hover:bg-[#0096ce] text-white px-6 py-3.5 rounded-full flex justify-between items-center transition-colors shadow-md shadow-sky-50"
                >
                  <span className="font-bold uppercase text-[13px] tracking-widest">Subscribe</span>
                  <span className="font-bold uppercase text-[13px] tracking-widest">For Free</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex border-b border-gray-100 sticky top-[60px] bg-white z-40">
            <button className="flex-1 py-4 text-center border-b-2 border-black font-bold text-xs uppercase tracking-widest text-black">
              {appState.postsCount} Posts
            </button>
            <button className="flex-1 py-4 text-center text-gray-400 hover:text-gray-600 transition-colors font-bold text-xs uppercase tracking-widest">
              {appState.mediaCount} Media
            </button>
          </div>

          <div className="relative min-h-[480px] bg-[#f8f9fa] flex flex-col items-center pt-16 pb-12 px-6 overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full opacity-50 blur-[100px] pointer-events-none"></div>
             
             <div className="relative z-10 mb-12">
                <Lock size={80} strokeWidth={1} className="text-gray-300" />
             </div>

             <div className="w-full max-w-[540px] bg-white border border-[#e9ecef] rounded-[16px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] z-10">
                <div className="bg-[#f8f9fa] border border-[#f1f3f5] rounded-xl p-4 mb-4 flex items-center justify-end">
                  <Lock size={16} strokeWidth={2.5} className="text-[#adb5bd]" />
                </div>

                <button 
                  onClick={handleSubscribe}
                  className="w-full bg-[#00aff0] hover:bg-[#009bd6] text-white font-extrabold py-5.5 px-6 rounded-full uppercase text-[18px] tracking-[0.06em] transition-all transform active:scale-[0.98] shadow-[0_12px_24px_rgba(0,175,240,0.18)] flex items-center justify-center"
                >
                  Subscribe to see user's posts
                </button>
             </div>
          </div>
        </main>

        <aside className="hidden lg:flex flex-col w-[350px] sticky top-0 h-screen p-6 space-y-6">
          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Subscription</h3>
            <button 
              onClick={handleSubscribe}
              className="w-full bg-[#00aff0] hover:bg-[#0096ce] text-white px-6 py-3 rounded-full flex justify-between items-center transition-colors shadow-md shadow-sky-50"
            >
              <span className="font-bold uppercase text-xs tracking-wider">Subscribe</span>
              <span className="font-bold uppercase text-xs tracking-wider">For Free</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-400 px-2">
            <button onClick={() => setView('admin-login')} className="hover:underline">Privacy</button>
            <span>•</span>
            <button className="hover:underline">Cookie Notice</button>
            <span>•</span>
            <button className="hover:underline">Terms of Service</button>
          </div>

          <div className="fixed bottom-6 right-6">
            <button className="w-12 h-12 bg-[#00aff0] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
              <HelpCircle size={24} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const AdminLogin = ({ setView, loginForm, setLoginForm, handleAdminLogin, loginError }: any) => (
  <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4 font-sans">
    <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-sky-100/50">
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500">
          <Lock size={32} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Admin Dashboard</h2>
      <p className="text-gray-500 text-center mb-10 text-sm">Enter credentials to modify profile</p>
      
      <form onSubmit={handleAdminLogin} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Username</label>
          <input 
            type="text" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all"
            placeholder="Username"
            value={loginForm.user}
            onChange={(e) => setLoginForm({ ...loginForm, user: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
          <input 
            type="password" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all"
            placeholder="Password"
            value={loginForm.pass}
            onChange={(e) => setLoginForm({ ...loginForm, pass: e.target.value })}
          />
        </div>
        
        {loginError && <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg">{loginError}</p>}
        
        <div className="flex gap-4">
            <button 
                type="button"
                onClick={() => setView('profile')}
                className="flex-1 border border-gray-200 text-gray-400 font-bold py-4 rounded-xl transition-all"
            >
                Cancel
            </button>
            <button 
                type="submit"
                className="flex-[2] bg-[#00aff0] hover:bg-[#0096ce] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-sky-200"
            >
                Sign In
            </button>
        </div>
      </form>
    </div>
  </div>
);

const AdminDashboard = ({ appState, updateState, setView, onSave, isSaving }: any) => {
  const handleCoverChange = (idx: number, val: string) => {
    const newCovers = [...appState.coverImages];
    newCovers[idx] = val;
    updateState('coverImages', newCovers);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-sky-500 text-white p-2 rounded-lg shadow-lg shadow-sky-200">
            <Settings size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Admin Control Panel</h1>
        </div>
        <button 
          onClick={() => setView('profile')}
          className="bg-white border border-gray-200 text-gray-600 font-bold px-6 py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <Globe size={16} className="text-sky-500" /> Website Branding
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Website Logo URL</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 border rounded-lg flex items-center justify-center p-2">
                       <OnlyFansLogo url={appState.logoUrl} className="w-full h-full" />
                    </div>
                    <input 
                      type="text" 
                      value={appState.logoUrl}
                      onChange={(e) => updateState('logoUrl', e.target.value)}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all text-gray-900"
                      placeholder="Image URL"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <ImageIcon size={16} className="text-sky-500" /> Media & Images
                </h2>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Cover Photos (4 Grid Slots)</label>
                  <div className="grid grid-cols-2 gap-4">
                    {appState.coverImages.map((img: string, i: number) => (
                      <div key={i} className="space-y-2">
                        <div className="h-24 bg-gray-100 rounded-lg overflow-hidden border">
                          <img src={img} className="w-full h-full object-cover" alt="preview" />
                        </div>
                        <input 
                          type="text" 
                          value={img}
                          onChange={(e) => handleCoverChange(i, e.target.value)}
                          className="w-full text-[11px] border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <label className="block text-sm font-bold text-gray-700 mb-4">Profile Avatar URL</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100">
                      <img src={appState.profilePic} className="w-full h-full object-cover" alt="avatar-preview" />
                    </div>
                    <input 
                      type="text" 
                      value={appState.profilePic}
                      onChange={(e) => updateState('profilePic', e.target.value)}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <User size={16} className="text-sky-500" /> Content Information
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Display Name</label>
                    <input 
                      type="text" 
                      value={appState.displayName}
                      onChange={(e) => updateState('displayName', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Username (@)</label>
                    <input 
                      type="text" 
                      value={appState.username}
                      onChange={(e) => updateState('username', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Bio Description</label>
                  <textarea 
                    value={appState.bio}
                    onChange={(e) => updateState('bio', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none resize-none transition-all text-gray-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Posts Count</label>
                      <input type="number" value={appState.postsCount} onChange={(e) => updateState('postsCount', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Media Count</label>
                      <input type="number" value={appState.mediaCount} onChange={(e) => updateState('mediaCount', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                <h2 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <ExternalLink size={16} className="text-sky-500" /> Redirect Link
                </h2>
              </div>
              <div className="p-8">
                <label className="block text-sm font-bold text-gray-700 mb-4">Destination URL</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={appState.redirectUrl}
                    onChange={(e) => updateState('redirectUrl', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-[#00aff0] font-bold focus:ring-2 focus:ring-sky-500 outline-none bg-sky-50/30 transition-all"
                  />
                  <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
                </div>
              </div>
            </section>

            <button 
              onClick={onSave}
              disabled={isSaving}
              className="w-full bg-[#00aff0] hover:bg-[#0096ce] text-white font-bold py-5 rounded-2xl shadow-xl shadow-sky-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {isSaving ? 'Saving...' : 'Apply & Save Profile'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const OnlyFansClone = () => {
  const [view, setView] = useState<View>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [appState, setAppState] = useState<AppState>(DEFAULT_STATE);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .eq('id', 'main')
        .single();

      if (error) {
        console.error('Supabase fetch error:', error);
      } else if (data) {
        setAppState({
          logoUrl: data.logo_url || '',
          profilePic: data.profile_pic || DEFAULT_STATE.profilePic,
          coverImages: data.cover_images || DEFAULT_STATE.coverImages,
          redirectUrl: data.redirect_url || DEFAULT_STATE.redirectUrl,
          displayName: data.display_name || DEFAULT_STATE.displayName,
          username: data.username || DEFAULT_STATE.username,
          bio: data.bio || DEFAULT_STATE.bio,
          location: data.location || DEFAULT_STATE.location,
          postsCount: data.posts_count || 0,
          mediaCount: data.media_count || 0,
          likesCount: data.likes_count || '0',
          videosCount: data.videos_count || 0,
        });
      }
    } catch (e) {
      console.error("Critical fetch error", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.user === ADMIN_CREDENTIALS.username && loginForm.pass === ADMIN_CREDENTIALS.password) {
      setView('admin-dashboard');
      setLoginError('');
      setLoginForm({ user: '', pass: '' });
    } else {
      setLoginError('Invalid credentials.');
    }
  };

  const updateLocalState = (key: keyof AppState, value: any) => {
    setAppState(prev => ({ ...prev, [key]: value }));
  };

  const saveToSupabase = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({
          id: 'main',
          logo_url: appState.logoUrl,
          profile_pic: appState.profilePic,
          cover_images: appState.coverImages,
          redirect_url: appState.redirectUrl,
          display_name: appState.displayName,
          username: appState.username,
          bio: appState.bio,
          location: appState.location,
          posts_count: Number(appState.postsCount),
          media_count: Number(appState.mediaCount),
          likes_count: String(appState.likesCount),
          videos_count: Number(appState.videosCount),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      alert('Changes saved successfully to database!');
      setView('profile');
      fetchData(); // Refresh local state
    } catch (e: any) {
      console.error("Supabase Save Error:", e);
      alert('Error: ' + (e.message || 'Database connection failed. Did you run the SQL script?'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
        <Loader2 size={40} className="text-[#00aff0] animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Loading from Database...</p>
      </div>
    );
  }

  switch (view) {
    case 'admin-login': 
      return <AdminLogin setView={setView} loginForm={loginForm} setLoginForm={setLoginForm} handleAdminLogin={handleAdminLogin} loginError={loginError} />;
    case 'admin-dashboard': 
      return <AdminDashboard appState={appState} updateState={updateLocalState} setView={setView} onSave={saveToSupabase} isSaving={isSaving} />;
    default: 
      return <ProfileView appState={appState} setView={setView} />;
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(<OnlyFansClone />);
