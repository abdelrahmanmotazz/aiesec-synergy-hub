import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { FrameworkVisualizer } from './components/FrameworkVisualizer';
import { SmartRoutingSimulator } from './components/SmartRoutingSimulator';
import { PersonaMatrix } from './components/PersonaMatrix';
import { SLATrackerCRM } from './components/SLATrackerCRM';
import { JointCadenceHub } from './components/JointCadenceHub';
import { ActivationPlaybook } from './components/ActivationPlaybook';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { VercelDeployModal } from './components/VercelDeployModal';
import { mockLeads } from './data/synergyData';
import { 
  HeartHandshake, 
  Briefcase, 
  Megaphone, 
  Sparkles, 
  Globe2, 
  Layers, 
  Github, 
  Zap,
  ArrowRight
} from 'lucide-react';

export function App() {
  const { currentTheme, ambientGlow, lcName, term } = useTheme();
  
  const [activeTab, setActiveTab] = useState('framework');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const repoUrl = 'https://github.com/abdelrahmanmotazz/aiesec-synergy-hub';

  // Leads state with local persistence
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('aiesec_synergy_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return mockLeads;
  });

  useEffect(() => {
    localStorage.setItem('aiesec_synergy_leads', JSON.stringify(leads));
  }, [leads]);

  const handleLeadAdded = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  return (
    <div className={`min-h-screen ${currentTheme.bgClass} flex flex-col transition-colors duration-500 relative selection:bg-blue-600 selection:text-white`}>
      
      {/* Background Decorative Gradient Meshes & Grid */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
      
      {ambientGlow && (
        <div 
          className="fixed -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-700"
          style={{ backgroundColor: currentTheme.glowColor }}
        />
      )}

      {/* Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        
        {/* Render Tab Components */}
        {activeTab === 'framework' && (
          <FrameworkVisualizer onSelectRouting={() => setActiveTab('simulator')} />
        )}

        {activeTab === 'simulator' && (
          <SmartRoutingSimulator onLeadAdded={handleLeadAdded} />
        )}

        {activeTab === 'persona' && (
          <PersonaMatrix />
        )}

        {activeTab === 'crm' && (
          <SLATrackerCRM leads={leads} setLeads={setLeads} />
        )}

        {activeTab === 'cadence' && (
          <JointCadenceHub />
        )}

        {activeTab === 'activations' && (
          <ActivationPlaybook />
        )}

        {activeTab === 'analytics' && (
          <ExecutiveDashboard />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/70 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8 z-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg ${currentTheme.primaryBg} flex items-center justify-center text-white font-bold text-sm`}>
              A
            </div>
            <div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <span>{lcName}</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-300 font-normal">{term} Executive Term</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Peace and fulfillment of humankind's potential.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button 
              onClick={() => setIsDeployModalOpen(true)}
              className="hover:text-white flex items-center space-x-1 text-blue-400 font-semibold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub / Vercel Status</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-400">oGV &times; oGT &times; B2C Unified Synergy Platform</span>
          </div>
        </div>
      </footer>

      {/* Vercel Deploy Modal */}
      <VercelDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        repoUrl={repoUrl}
      />

    </div>
  );
}

export default App;
