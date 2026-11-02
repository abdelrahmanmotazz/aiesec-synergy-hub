import React, { useState } from 'react';
import { useTheme, themes } from '../context/ThemeContext';
import { 
  Layers, 
  Clock, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Palette, 
  Github, 
  CheckCircle,
  Zap
} from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, onOpenDeployModal }) => {
  const { 
    currentTheme, 
    currentThemeKey, 
    setTheme, 
    ambientGlow, 
    setAmbientGlow, 
    soundEnabled, 
    setSoundEnabled,
    playClickSound 
  } = useTheme();

  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const tabs = [
    { id: 'framework', label: 'Synergy Framework', icon: Layers, badge: 'Pipeline' },
    { id: 'simulator', label: 'Smart Router & Pitcher', icon: Compass, badge: 'AI Match' },
    { id: 'persona', label: 'Persona & Objection Matrix', icon: Users, badge: 'Guide' },
    { id: 'crm', label: 'Cross-Funnel SLA & CRM', icon: Clock, badge: 'Live Leads' },
    { id: 'cadence', label: 'Joint Cadence & Sprints', icon: Calendar, badge: 'Cadence' },
    { id: 'analytics', label: 'Executive Analytics', icon: TrendingUp, badge: 'Forecast' },
  ];

  const handleTabChange = (id) => {
    playClickSound();
    setActiveTab(id);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 bg-slate-950/85 transition-colors duration-300 shadow-lg shadow-black/20">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Compact Left Brand Mark */}
          <div className="flex items-center space-x-2.5 flex-shrink-0 mr-2">
            <div className={`w-8 h-8 rounded-lg ${currentTheme.primaryBg} flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-black text-sm`}>
              A
            </div>
            <div className="hidden xl:flex items-center space-x-1.5">
              <span className="font-heading font-black text-sm tracking-tight text-white">
                oGV &times; oGT &times; B2C
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${currentTheme.badgeClass}`}>
                Synergy
              </span>
            </div>
          </div>

          {/* Expanded Page Navigation Tabs: Taking Center Stage with Maximum Space */}
          <nav className="flex-1 flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 overflow-x-auto py-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`group relative flex items-center space-x-2 px-3 sm:px-3.5 md:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? `${currentTheme.primaryBg} text-white shadow-lg shadow-blue-500/30 scale-[1.02]`
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="tracking-tight">{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase transition ${
                        isActive
                          ? 'bg-black/25 text-white'
                          : 'bg-white/10 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sleek Right Utilities: Minimal, non-intrusive */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 ml-2">
            
            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playClickSound();
              }}
              title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition"
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
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition"
            >
              <Sparkles className={`w-4 h-4 ${ambientGlow ? 'text-amber-400' : 'text-slate-500'}`} />
            </button>

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  playClickSound();
                }}
                title="Change Atmosphere Theme"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition flex items-center space-x-1.5"
              >
                <Palette className="w-4 h-4 text-blue-400" />
                <span className="w-2 h-2 rounded-full hidden md:inline-block" style={{ backgroundColor: currentTheme.primaryColor }} />
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-bold text-slate-400 px-2.5 py-1 uppercase tracking-wider">
                    Select Theme
                  </div>
                  {Object.values(themes).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeMenu(false);
                        playClickSound();
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition ${
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

            {/* Vercel Deploy Button */}
            <button
              onClick={() => {
                onOpenDeployModal();
                playClickSound();
              }}
              title="Deploy to Vercel"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition transform hover:-translate-y-0.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vercel</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
