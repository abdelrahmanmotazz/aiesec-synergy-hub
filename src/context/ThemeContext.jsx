import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  aiesec: {
    id: 'aiesec',
    name: 'AIESEC Signature',
    icon: 'Globe2',
    primaryColor: '#037EF3',
    primaryClass: 'text-blue-500',
    primaryBg: 'bg-blue-600',
    borderClass: 'border-blue-500/30',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    bgClass: 'bg-slate-950 text-slate-100',
    surfaceClass: 'bg-slate-900/70 border-slate-800/80',
    glowColor: 'rgba(3, 126, 243, 0.25)',
  },
  ogv: {
    id: 'ogv',
    name: 'Global Volunteer (oGV)',
    icon: 'HeartHandshake',
    primaryColor: '#F85A40',
    primaryClass: 'text-[#F85A40]',
    primaryBg: 'bg-[#F85A40]',
    borderClass: 'border-[#F85A40]/30',
    badgeClass: 'bg-[#F85A40]/10 text-[#F85A40] border-[#F85A40]/20',
    gradient: 'from-[#F85A40] via-rose-500 to-amber-500',
    bgClass: 'bg-[#150a09] text-rose-50',
    surfaceClass: 'bg-[#22100e]/70 border-[#F85A40]/20',
    glowColor: 'rgba(248, 90, 64, 0.25)',
  },
  ogt: {
    id: 'ogt',
    name: 'Global Talent (oGT)',
    icon: 'Briefcase',
    primaryColor: '#0CB9C1',
    primaryClass: 'text-[#0CB9C1]',
    primaryBg: 'bg-[#0CB9C1]',
    borderClass: 'border-[#0CB9C1]/30',
    badgeClass: 'bg-[#0CB9C1]/10 text-[#0CB9C1] border-[#0CB9C1]/20',
    gradient: 'from-[#0CB9C1] via-teal-500 to-emerald-500',
    bgClass: 'bg-[#041215] text-cyan-50',
    surfaceClass: 'bg-[#082024]/70 border-[#0CB9C1]/20',
    glowColor: 'rgba(12, 185, 193, 0.25)',
  },
  cyber: {
    id: 'cyber',
    name: 'Synergy Holographic',
    icon: 'Sparkles',
    primaryColor: '#8B5CF6',
    primaryClass: 'text-purple-400',
    primaryBg: 'bg-purple-600',
    borderClass: 'border-purple-500/30',
    badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    gradient: 'from-purple-600 via-pink-500 to-cyan-400',
    bgClass: 'bg-[#090714] text-purple-50',
    surfaceClass: 'bg-[#140d2b]/70 border-purple-500/20',
    glowColor: 'rgba(139, 92, 246, 0.3)',
  },
  light: {
    id: 'light',
    name: 'Executive Frost Light',
    icon: 'Sun',
    primaryColor: '#037EF3',
    primaryClass: 'text-blue-600',
    primaryBg: 'bg-blue-600',
    borderClass: 'border-slate-200',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    gradient: 'from-blue-600 via-indigo-600 to-blue-800',
    bgClass: 'bg-slate-50 text-slate-900',
    surfaceClass: 'bg-white/80 border-slate-200/90 shadow-sm',
    glowColor: 'rgba(3, 126, 243, 0.1)',
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    return localStorage.getItem('aiesec_synergy_theme') || 'aiesec';
  });

  const [lcName, setLcName] = useState(() => {
    return localStorage.getItem('aiesec_lc_name') || 'AIESEC Local Committee';
  });

  const [term, setTerm] = useState(() => {
    return localStorage.getItem('aiesec_term') || '2026/2027';
  });

  const [ambientGlow, setAmbientGlow] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('aiesec_synergy_theme', currentThemeKey);
    const root = document.documentElement;
    if (currentThemeKey === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [currentThemeKey]);

  useEffect(() => {
    localStorage.setItem('aiesec_lc_name', lcName);
  }, [lcName]);

  useEffect(() => {
    localStorage.setItem('aiesec_term', term);
  }, [term]);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // AudioContext fallback
    }
  };

  const playSuccessSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.16);
      });
    } catch (e) {}
  };

  const currentTheme = themes[currentThemeKey] || themes.aiesec;

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentThemeKey,
        setTheme: setCurrentThemeKey,
        lcName,
        setLcName,
        term,
        setTerm,
        ambientGlow,
        setAmbientGlow,
        soundEnabled,
        setSoundEnabled,
        playClickSound,
        playSuccessSound,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
