import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { initialSynergyAnalytics } from '../data/synergyData';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ArrowLeftRight, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  Sliders, 
  Sparkles,
  PieChart,
  Calculator,
  ShieldCheck,
  Target
} from 'lucide-react';

export const ExecutiveDashboard = () => {
  const { playClickSound } = useTheme();

  // What-If Simulator State
  const [b2cBudget, setB2cBudget] = useState(2500); // USD
  const [leadVolume, setLeadVolume] = useState(1200);
  const [crossRoutingEfficiency, setCrossRoutingEfficiency] = useState(35); // %
  const [slaContactSpeed, setSlaContactSpeed] = useState(95); // %

  // Simulated calculations
  const simContacted = Math.round(leadVolume * (slaContactSpeed / 100));
  const simConsulted = Math.round(simContacted * 0.82);
  const simBaseApprovals = Math.round(simConsulted * 0.28);
  const simTransfers = Math.round(leadVolume * 0.15);
  const simCrossRecoveredApprovals = Math.round(simTransfers * (crossRoutingEfficiency / 100));
  const simTotalApprovals = simBaseApprovals + simCrossRecoveredApprovals;
  const simConversionRate = ((simTotalApprovals / leadVolume) * 100).toFixed(1);
  const simCPA = (b2cBudget / (simTotalApprovals || 1)).toFixed(2);

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <TrendingUp className="w-3 h-3" />
              <span>Full-Funnel Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Executive Synergy Performance & Forecast Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Track conversion velocity, cross-routing recovery yields, and unit economics across both exchange programs in real time.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Synergy Conversion Rate */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Synergy Conversion
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-white">
            {initialSynergyAnalytics.synergyConversionRate}%
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <span>+4.8% vs single-product funnel</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            Formula: (Total Approvals / B2C Leads) &times; 100
          </div>
        </div>

        {/* KPI 2: Cross-Routing Yield */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Cross-Routing Yield
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-white">
            {initialSynergyAnalytics.crossRoutingYieldPercentage}%
          </div>
          <div className="text-[11px] text-amber-400 font-semibold mt-1">
            {initialSynergyAnalytics.crossRoutedApprovals} Recovered Approvals
          </div>
          <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            Zero-waste transfers (oGT &harr; oGV)
          </div>
        </div>

        {/* KPI 3: SLA Contact Speed */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              24h Contact SLA Speed
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-white">
            {initialSynergyAnalytics.slaComplianceRate}%
          </div>
          <div className="text-[11px] text-teal-400 font-semibold mt-1">
            Target: &gt;90% on-time response
          </div>
          <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            1,168 of 1,240 contacted &lt; 24h
          </div>
        </div>

        {/* KPI 4: Cost Per Approval (CPA) */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Combined CPA
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-white">
            ${initialSynergyAnalytics.costPerApproval}
          </div>
          <div className="text-[11px] text-purple-400 font-semibold mt-1">
            Total Spend: ${initialSynergyAnalytics.totalMarketingSpend}
          </div>
          <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-white/5">
            Formula: B2C Ad Spend / Total Approvals
          </div>
        </div>

      </div>

      {/* Funnel Pipeline Conversion Visualization */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Unified Pipeline Conversion Stages
            </h3>
            <p className="text-xs text-slate-400">
              Comparative drop-off & retention rates across each operational touchpoint.
            </p>
          </div>
          <div className="text-xs text-slate-400 flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#F85A40]" />
              <span>oGV ({initialSynergyAnalytics.ogvApprovals} APD)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#0CB9C1]" />
              <span>oGT ({initialSynergyAnalytics.ogtApprovals} APD)</span>
            </span>
          </div>
        </div>

        {/* Funnel Stages Bars */}
        <div className="space-y-3">
          {[
            { label: 'Total B2C Leads Generated', total: 1240, ogv: 768, ogt: 472, pct: '100%' },
            { label: 'First Contact SLA Met (< 24h)', total: 1168, ogv: 724, ogt: 444, pct: '94.2%' },
            { label: 'Completed Consultations', total: 964, ogv: 610, ogt: 354, pct: '77.7%' },
            { label: 'Official Applications Created', total: 428, ogv: 298, ogt: 130, pct: '34.5%' },
            { label: 'Final Approvals Achieved', total: 294, ogv: 212, ogt: 82, pct: '23.7%' },
          ].map((stage, idx) => (
            <div key={idx} className="bg-slate-900/70 p-3 rounded-xl border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{stage.label}</span>
                <span className="font-semibold text-blue-400">{stage.total.toLocaleString()} leads ({stage.pct})</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-r from-[#F85A40] to-rose-400"
                  style={{ width: `${(stage.ogv / 1240) * 100}%` }}
                  title={`oGV: ${stage.ogv}`}
                />
                <div 
                  className="h-full bg-gradient-to-r from-[#0CB9C1] to-teal-400"
                  style={{ width: `${(stage.ogt / 1240) * 100}%` }}
                  title={`oGT: ${stage.ogt}`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                <span className="text-[#F85A40]">oGV: {stage.ogv}</span>
                <span className="text-[#0CB9C1]">oGT: {stage.ogt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive What-If Scenario Forecast Simulator */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                What-If Synergy Forecast Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Model the impact of increasing marketing spend, cross-routing recovery, and SLA response speed.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
            Dynamic Model
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Slider 1: B2C Budget */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Monthly B2C Marketing Budget</span>
                <span className="text-purple-400 font-bold">${b2cBudget}</span>
              </div>
              <input
                type="range"
                min="500"
                max="6000"
                step="100"
                value={b2cBudget}
                onChange={(e) => setB2cBudget(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$500</span>
                <span>$6,000</span>
              </div>
            </div>

            {/* Slider 2: Target Leads */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Projected Top-of-Funnel Leads</span>
                <span className="text-blue-400 font-bold">{leadVolume.toLocaleString()} leads</span>
              </div>
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={leadVolume}
                onChange={(e) => setLeadVolume(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>300 leads</span>
                <span>3,000 leads</span>
              </div>
            </div>

            {/* Slider 3: Cross-Routing Efficiency */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Cross-Routing Conversion Efficiency</span>
                <span className="text-amber-400 font-bold">{crossRoutingEfficiency}% recovery</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="1"
                value={crossRoutingEfficiency}
                onChange={(e) => setCrossRoutingEfficiency(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>10% (Passive)</span>
                <span>70% (High Synergy Clinic)</span>
              </div>
            </div>

            {/* Slider 4: SLA Speed */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">24h First Contact SLA Compliance</span>
                <span className="text-teal-400 font-bold">{slaContactSpeed}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                step="1"
                value={slaContactSpeed}
                onChange={(e) => setSlaContactSpeed(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>70%</span>
                <span>100% (Instant)</span>
              </div>
            </div>

          </div>

          {/* Forecast Output (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Simulated Output Metrics
              </span>

              <div className="space-y-3">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase">Projected Approvals</span>
                  <div className="text-2xl font-black text-white mt-0.5">
                    {simTotalApprovals} Approvals
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">
                    Includes +{simCrossRecoveredApprovals} rescued via cross-routing
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase">Conversion</span>
                    <div className="text-lg font-bold text-blue-400">{simConversionRate}%</div>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase">Cost Per Approval</span>
                    <div className="text-lg font-bold text-purple-400">${simCPA}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300 leading-relaxed">
              💡 <strong>Takeaway:</strong> Raising cross-routing efficiency from 15% to {crossRoutingEfficiency}% yields <strong>+{simCrossRecoveredApprovals} additional approvals</strong> without spending an extra dollar on marketing ads!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
