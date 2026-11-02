import React, { useState } from 'react';
import { useTheme, themes } from '../context/ThemeContext';
import { 
  Globe2, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Palette, 
  Github, 
  ExternalLink, 
  Layers, 
  Clock, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp, 
  Compass, 
  SlidersHorizontal,
  Flame,
  CheckCircle,
  Building2,
  Share2
} from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, onOpenDeployModal }) => {
  const { 
    currentTheme, 
    currentThemeKey, 
    setTheme, 
    lcName, 
    setLcName, 
    term, 
    setTerm,
    ambientGlow, 
    setAmbientGlow, 
    soundEnabled, 
    setSoundEnabled,
    playClickSound 
  } = useTheme();

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showEditLc, setShowEditLc] = useState(false);
  const [tempLcName, setTempLcName] = useState(lcName);
  const [tempTerm, setTempTerm] = useState(term);

  const tabs = [
    { id: 'framework', label: 'Synergy Framework', icon: Layers, badge: 'Pipeline' },
    { id: 'simulator', label: 'Smart Router & Pitcher', icon: Compass, badge: 'AI Match' },
    { id: 'persona', label: 'Persona & Objection Matrix', icon: Users, badge: 'Guide' },
    { id: 'crm', label: 'Cross-Funnel SLA & CRM', icon: Clock, badge: 'Live Leads' },
    { id: 'cadence', label: 'Joint Cadence & Sprints', icon: Calendar, badge: 'Cadence' },
    { id: 'activations', label: 'Activation Playbook', icon: Target, badge: 'Booths & Ads' },
    { id: 'analytics', label: 'Executive Analytics', icon: TrendingUp, badge: 'Forecast' },
  ];

  const handleTabChange = (id) => {
    playClickSound();
    setActiveTab(id);
  };

  const handleSaveLc = (e) => {
    e.preventDefault();
    setLcName(tempLcName);
    setTerm(tempTerm);
    setShowEditLc(false);
    playClickSound();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 bg-slate-950/80 transition-colors duration-300">
      {/* Top Bar: AIESEC Brand & LC Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Entity Name */}
          <div className="flex items-center space-x-3">
            <div className={`w-11 h-11 rounded-xl ${currentTheme.primaryBg} flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold transition-transform hover:scale-105`}>
              <span className="text-xl tracking-tighter font-heading font-black">A</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  AIESEC Global Framework
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                <button 
                  onClick={() => setShowEditLc(true)}
                  className="text-xs text-slate-300 hover:text-white flex items-center space-x-1 group"
                  title="Click to edit LC & Term"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-medium group-hover:underline">{lcName}</span>
                  <span className="text-slate-400">({term})</span>
                </button>
              </div>
              <h1 className="text-lg sm:text-xl font-heading font-black tracking-tight text-white flex items-center gap-2">
                <span>oGV &times; oGT &times; B2C</span>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
                  Synergy Hub
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Metrics & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Realtime KPI Pill */}
            <div className="hidden lg:flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Synergy Rate</span>
                <span className="font-bold text-emerald-400">23.7%</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Cross-Yield</span>
                <span className="font-bold text-blue-400">+22.4%</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">SLA Speed</span>
                <span className="font-bold text-teal-400">94.2%</span>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playClickSound();
              }}
              title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Ambient Glow Toggle */}
            <button
              onClick={() => {
                setAmbientGlow(!ambientGlow);
                playClickSound();
              }}
              title={ambientGlow ? 'Ambient Glow: ON' : 'Ambient Glow: OFF'}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
            >
              <Sparkles className={`w-4 h-4 ${ambientGlow ? 'text-amber-400' : 'text-slate-500'}`} />
            </button>

            {/* Theme Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  playClickSound();
                }}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition"
              >
                <Palette className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden md:inline">{currentTheme.name}</span>
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Select Atmosphere Theme
                  </div>
                  {Object.values(themes).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeMenu(false);
                        playClickSound();
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                        currentThemeKey === t.id
                          ? 'bg-blue-600/20 text-blue-400 font-semibold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                        <span>{t.name}</span>
                      </div>
                      {currentThemeKey === t.id && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vercel Deploy & GitHub Button */}
            <button
              onClick={() => {
                onOpenDeployModal();
                playClickSound();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition transform hover:-translate-y-0.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="font-semibold">Deploy on Vercel</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto mt-3 pt-1 pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? `${currentTheme.primaryBg} text-white shadow-md shadow-blue-500/25`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isActive
                        ? 'bg-black/20 text-white'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Edit LC & Term Modal */}
      {showEditLc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Configure Local Committee & Term
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Personalize this synergy workspace for your specific AIESEC LC entity and management term.
            </p>
            <form onSubmit={handleSaveLc} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Local Committee Name</label>
                <input
                  type="text"
                  value={tempLcName}
                  onChange={(e) => setTempLcName(e.target.value)}
                  placeholder="e.g. AIESEC in Cairo / LC Alexandria"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Active Executive Term</label>
                <input
                  type="text"
                  value={tempTerm}
                  onChange={(e) => setTempTerm(e.target.value)}
                  placeholder="e.g. 26.27 / Peak Term 2026"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditLc(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
