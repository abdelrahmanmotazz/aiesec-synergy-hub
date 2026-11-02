import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { FrameworkVisualizer } from './components/FrameworkVisualizer';
import { SmartRoutingSimulator } from './components/SmartRoutingSimulator';
import { PersonaMatrix } from './components/PersonaMatrix';
import { SLATrackerCRM } from './components/SLATrackerCRM';
import { JointCadenceHub } from './components/JointCadenceHub';
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
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 z-10">
        
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

        {activeTab === 'analytics' && (
          <ExecutiveDashboard />
        )}

      </main>

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
