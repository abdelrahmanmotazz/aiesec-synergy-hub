import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { personaMatrixData, objectionHandlingGuide } from '../data/synergyData';
import { 
  Users, 
  HelpCircle, 
  CheckCircle, 
  Copy, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  MessageSquare,
  Filter,
  Layers,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

export const PersonaMatrix = () => {
  const { playClickSound } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'ogv' | 'ogt'
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedObjectionIndex, setSelectedObjectionIndex] = useState(0);

  const handleCopyPitch = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    playClickSound();
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const filteredObjections = objectionHandlingGuide.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ogv') return item.currentProduct.includes('oGV') || item.recommendedRoute.includes('oGV');
    if (activeFilter === 'ogt') return item.currentProduct.includes('oGT') || item.recommendedRoute.includes('oGT');
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Users className="w-3 h-3" />
              <span>Target Segmentation & Objections</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Market Segmentation & Persona Alignment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Preventing internal brand cannibalization through clean audience boundaries, tailored value propositions, and bulletproof objection-handling scripts.
            </p>
          </div>
        </div>
      </div>

      {/* Comparative Persona Breakdown Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Persona Dimension Comparison Matrix
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            oGV vs oGT Segmentation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-1/5">Dimension / Metric</th>
                <th className="py-3 px-4 w-2/5 text-[#F85A40] bg-[#F85A40]/5">
                  Outgoing Global Volunteer (oGV)
                </th>
                <th className="py-3 px-4 w-2/5 text-[#0CB9C1] bg-[#0CB9C1]/5">
                  Outgoing Global Talent / Teacher (oGT)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {personaMatrixData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white bg-slate-950/40">
                    <div className="font-bold text-slate-200">{row.dimension}</div>
                    <div className="text-[10px] text-blue-400/90 mt-1 font-normal">
                      💡 {row.synergyAdvantage}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 bg-[#F85A40]/[0.02] border-r border-white/5 leading-relaxed">
                    {row.ogv}
                  </td>
                  <td className="py-3.5 px-4 bg-[#0CB9C1]/[0.02] leading-relaxed">
                    {row.ogt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Objection Crusher & Cross-Route Playbook */}
      <div className="rounded-2xl glass-panel p-6 border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Objection Crusher & Cross-Conversion Playbook
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Battle-tested responses to turn student resistance into successful cross-routed approvals.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => { setActiveFilter('all'); playClickSound(); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Scenarios
            </button>
            <button
              onClick={() => { setActiveFilter('ogv'); playClickSound(); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeFilter === 'ogv' ? 'bg-[#F85A40] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              oGV Scenarios
            </button>
            <button
              onClick={() => { setActiveFilter('ogt'); playClickSound(); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeFilter === 'ogt' ? 'bg-[#0CB9C1] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              oGT Scenarios
            </button>
          </div>
        </div>

        {/* Objections Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredObjections.map((item, idx) => (
            <div 
              key={idx}
              className="rounded-xl bg-slate-900/80 border border-white/10 p-4 space-y-3 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Obstacle #{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.conversionRate}
                  </span>
                </div>

                {/* The Objection */}
                <div className="text-xs font-bold text-white mb-2 flex items-start space-x-2">
                  <span className="text-rose-400 text-base leading-none">“</span>
                  <span>{item.objection}</span>
                  <span className="text-rose-400 text-base leading-none">”</span>
                </div>

                {/* Trigger Criteria */}
                <div className="text-[11px] text-slate-400 bg-white/5 p-2 rounded-lg mb-3">
                  <span className="font-semibold text-slate-300">Trigger Rule: </span>
                  {item.triggerCriteria}
                </div>

                {/* Recommended Route Badge */}
                <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 mb-2">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Strategic Route: {item.recommendedRoute}</span>
                </div>

                {/* Counter Pitch */}
                <div className="text-xs text-slate-200 bg-slate-950/70 p-3 rounded-xl border border-white/5 italic leading-relaxed">
                  {item.counterPitch}
                </div>
              </div>

              {/* Copy Script Button */}
              <div className="pt-2 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => handleCopyPitch(item.counterPitch, idx)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedIndex === idx ? 'Copied to Clipboard!' : 'Copy Script to Send'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
