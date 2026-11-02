import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { synergyFrameworkNodes } from '../data/synergyData';
import { 
  Megaphone, 
  HeartHandshake, 
  Briefcase, 
  ArrowLeftRight, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle,
  ExternalLink,
  Zap,
  TrendingUp,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

const iconMap = {
  Megaphone,
  HeartHandshake,
  Briefcase,
  ArrowLeftRight,
  Award,
  CheckCircle2,
  Sparkles,
};

export const FrameworkVisualizer = ({ onSelectRouting }) => {
  const { currentTheme, playClickSound } = useTheme();
  const [selectedNodeId, setSelectedNodeId] = useState('cross_routing');
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'operational_guide'

  const selectedNode = synergyFrameworkNodes.find(n => n.id === selectedNodeId) || synergyFrameworkNodes[0];

  const handleNodeClick = (nodeId) => {
    playClickSound();
    setSelectedNodeId(nodeId);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Unified Operational Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
              Strategic Synergy Framework
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              Eliminating functional silos between B2C Marketing and Outgoing Exchange (oGV & oGT). 
              A seamless engine aligning persona routing, bi-directional cross-funnel transfers, and closed-loop alumni Customer Lifetime Value (CLV).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectRouting && onSelectRouting()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-2 transition"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Launch Router Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Diagram Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Center: Interactive Node Canvas (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl glass-panel p-6 border border-white/10 relative">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Full-Funnel Lifecycle Map
              </h3>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                Click any stage to inspect
              </span>
            </div>
            
            {/* Legend */}
            <div className="hidden sm:flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-slate-400">B2C</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F85A40]" />
                <span className="text-slate-400">oGV</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0CB9C1]" />
                <span className="text-slate-400">oGT</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-400">Alumni</span>
              </span>
            </div>
          </div>

          {/* Interactive Flow Tree */}
          <div className="flex flex-col items-center space-y-6 py-2">
            
            {/* STEP 1: Unified B2C Lead Generation */}
            <div className="w-full max-w-md">
              <NodeCard
                node={synergyFrameworkNodes.find(n => n.id === 'unified_lead_gen')}
                isSelected={selectedNodeId === 'unified_lead_gen'}
                onClick={() => handleNodeClick('unified_lead_gen')}
              />
            </div>

            {/* Split Connection Lines */}
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500 to-blue-500" />
              <div className="w-full h-0.5 bg-gradient-to-r from-[#F85A40] via-blue-500 to-[#0CB9C1]" />
              <div className="w-full flex justify-between px-20">
                <div className="w-0.5 h-6 bg-[#F85A40]" />
                <div className="w-0.5 h-6 bg-[#0CB9C1]" />
              </div>
            </div>

            {/* STEP 2: oGV Match & oGT Match (Parallel) with Cross-Routing in between */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              
              {/* oGV Node */}
              <div>
                <NodeCard
                  node={synergyFrameworkNodes.find(n => n.id === 'ogv_match')}
                  isSelected={selectedNodeId === 'ogv_match'}
                  onClick={() => handleNodeClick('ogv_match')}
                />
              </div>

              {/* oGT Node */}
              <div>
                <NodeCard
                  node={synergyFrameworkNodes.find(n => n.id === 'ogt_match')}
                  isSelected={selectedNodeId === 'ogt_match'}
                  onClick={() => handleNodeClick('ogt_match')}
                />
              </div>

              {/* Bi-directional Cross-Routing Bridge */}
              <div className="col-span-full my-1">
                <div 
                  onClick={() => handleNodeClick('cross_routing')}
                  className={`cursor-pointer rounded-xl p-3 border transition-all duration-300 relative overflow-hidden ${
                    selectedNodeId === 'cross_routing'
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/30'
                      : 'bg-slate-900/80 border-blue-500/30 hover:border-blue-400'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center animate-pulse">
                        <ArrowLeftRight className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Cross-Funnel Lead Routing Engine</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-semibold">
                            Zero Lead Drop-off
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300">
                          oGT &rarr; oGV (Down-Funnel Nurturing) &bull; oGV &rarr; oGT (Alumni Up-Funnel Progression)
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400">
                      <span>SLA: &lt; 12 Hours</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Down Connector Lines to Approvals */}
            <div className="w-full grid grid-cols-2 px-20">
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#F85A40]" />
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#0CB9C1]" />
              </div>
            </div>

            {/* STEP 3: Parallel Approvals */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <NodeCard
                  node={synergyFrameworkNodes.find(n => n.id === 'ogv_approval')}
                  isSelected={selectedNodeId === 'ogv_approval'}
                  onClick={() => handleNodeClick('ogv_approval')}
                />
              </div>
              <div>
                <NodeCard
                  node={synergyFrameworkNodes.find(n => n.id === 'ogt_approval')}
                  isSelected={selectedNodeId === 'ogt_approval'}
                  onClick={() => handleNodeClick('ogt_approval')}
                />
              </div>
            </div>

            {/* Merge Line into Returned Network */}
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="w-full flex justify-between px-20">
                <div className="w-0.5 h-6 bg-[#F85A40]" />
                <div className="w-0.5 h-6 bg-[#0CB9C1]" />
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-[#F85A40] via-emerald-500 to-[#0CB9C1]" />
              <div className="w-0.5 h-6 bg-emerald-500" />
            </div>

            {/* STEP 4: Returned EP Network */}
            <div className="w-full max-w-md">
              <NodeCard
                node={synergyFrameworkNodes.find(n => n.id === 'returned_network')}
                isSelected={selectedNodeId === 'returned_network'}
                onClick={() => handleNodeClick('returned_network')}
              />
            </div>

            {/* Upward Retargeting Loop Indicator */}
            <div className="w-full max-w-md p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs text-emerald-300 font-medium flex items-center justify-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Closed-Loop: Returned oGV EPs enter final year &rarr; Re-injected as qualified oGT candidates</span>
              </span>
            </div>

          </div>
        </div>

        {/* Right: Stage Detail & SLA Protocol Drawer (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Stage Deep-Dive
              </span>
              <span 
                className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                style={{ 
                  backgroundColor: `${selectedNode.color}20`, 
                  color: selectedNode.color,
                  border: `1px solid ${selectedNode.color}40`
                }}
              >
                {selectedNode.function}
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: selectedNode.color }}
              >
                {React.createElement(iconMap[selectedNode.icon] || Sparkles, { className: 'w-5 h-5' })}
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{selectedNode.title}</h4>
                <p className="text-xs text-slate-400">{selectedNode.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedNode.description}
            </p>

            {/* Metrics Chips */}
            <div className="space-y-1.5 mb-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Key Performance Thresholds
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedNode.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs bg-white/5 px-2.5 py-1.5 rounded-lg text-slate-200">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Action Checklist */}
            <div className="space-y-2 mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Operational Protocol Checklist
              </div>
              <div className="space-y-2">
                {selectedNode.keyActions.map((action, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Card Helper */}
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SLA Governed Process</span>
            </span>
            <span className="text-[11px] text-blue-400 font-semibold">
              Updated Live
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

const NodeCard = ({ node, isSelected, onClick }) => {
  const Icon = iconMap[node.icon] || Sparkles;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 text-left relative overflow-hidden group ${
        isSelected
          ? 'bg-slate-900/90 shadow-xl ring-2'
          : 'bg-slate-900/50 hover:bg-slate-900/80'
      }`}
      style={{
        borderColor: isSelected ? node.color : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected ? `0 8px 24px -6px ${node.color}40` : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105"
            style={{ backgroundColor: node.color }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                {node.title}
              </span>
              <span 
                className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase"
                style={{ 
                  backgroundColor: `${node.color}20`, 
                  color: node.color 
                }}
              >
                {node.function}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              {node.subtitle}
            </div>
          </div>
        </div>

        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-white' : 'group-hover:translate-x-0.5'}`} />
      </div>
    </div>
  );
};
