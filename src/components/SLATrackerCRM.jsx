import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { slaProtocols, mockLeads } from '../data/synergyData';
import { 
  Clock, 
  Search, 
  Filter, 
  ArrowLeftRight, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Plus, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Building,
  GraduationCap,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SLATrackerCRM = ({ leads, setLeads }) => {
  const { playClickSound, playSuccessSound } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterFunction, setFilterFunction] = useState('ALL'); // 'ALL' | 'oGV' | 'oGT'
  const [filterCrossRoutedOnly, setFilterCrossRoutedOnly] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferReason, setTransferReason] = useState('');
  const [targetFunction, setTargetFunction] = useState('oGV');

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFunc = filterFunction === 'ALL' || lead.assignedFunction === filterFunction;
    const matchesCross = !filterCrossRoutedOnly || lead.crossRouted;

    return matchesSearch && matchesFunc && matchesCross;
  });

  const handleAdvanceStage = (leadId, currentStage) => {
    playSuccessSound();
    const stageFlow = ['Contacted', 'Consultation Scheduled', 'Consulted', 'Application Created', 'Interview Pending', 'Approved'];
    const currentIndex = stageFlow.indexOf(currentStage);
    const nextStage = currentIndex !== -1 && currentIndex < stageFlow.length - 1 ? stageFlow[currentIndex + 1] : 'Approved';

    if (nextStage === 'Approved') {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }

    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          currentStage: nextStage,
          slaStatus: nextStage === 'Approved' ? 'COMPLETED' : l.slaStatus
        };
      }
      return l;
    }));
  };

  const openTransferModal = (lead) => {
    playClickSound();
    setSelectedLead(lead);
    setTargetFunction(lead.assignedFunction === 'oGV' ? 'oGT' : 'oGV');
    setTransferReason(
      lead.assignedFunction === 'oGT'
        ? 'oGT -> oGV Down-Funnel Nurturing: Candidate lacks senior commercial experience. Enrolled in short-term SDG leadership project to build credentials.'
        : 'oGV -> oGT Up-Funnel Progression: Returned oGV volunteer graduating this semester. Fast-tracked into corporate talent pool.'
    );
    setShowTransferModal(true);
  };

  const handleExecuteTransfer = (e) => {
    e.preventDefault();
    playSuccessSound();
    setLeads(prev => prev.map(l => {
      if (l.id === selectedLead.id) {
        return {
          ...l,
          assignedFunction: targetFunction,
          crossRouted: true,
          crossRouteReason: transferReason,
          slaTimeRemainingHours: 12, // Resets to 12h transfer SLA
          slaStatus: 'ON_TRACK',
          notes: `${l.notes || ''} [Cross-routed to ${targetFunction}: ${transferReason}]`
        };
      }
      return l;
    }));
    setShowTransferModal(false);
  };

  const handleExportCSV = () => {
    playClickSound();
    const headers = ['ID', 'Name', 'Email', 'Phone', 'University', 'Faculty', 'Academic Year', 'Function', 'Stage', 'SLA Remaining (Hours)', 'Cross Routed', 'Source Campaign', 'Notes'];
    const rows = filteredLeads.map(l => [
      l.id,
      `"${l.name}"`,
      l.email,
      l.phone,
      `"${l.university}"`,
      `"${l.faculty}"`,
      `"${l.academicYear}"`,
      l.assignedFunction,
      `"${l.currentStage}"`,
      l.slaTimeRemainingHours,
      l.crossRouted ? 'YES' : 'NO',
      `"${l.sourceCampaign}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aiesec_synergy_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* SLA Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {slaProtocols.map((sla) => (
          <div key={sla.id} className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  {sla.timeLimit}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {sla.currentPerformance}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{sla.title}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                {sla.description}
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Owner: {sla.owner}</span>
              <span className="font-semibold text-emerald-400">Active SLA</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Product Transfer Visual Logic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Down-Funnel Card */}
        <div className="glass-panel rounded-2xl p-5 border border-[#F85A40]/30 bg-[#F85A40]/[0.03]">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0CB9C1]/20 text-[#0CB9C1] border border-[#0CB9C1]/30">oGT</span>
            <span className="text-slate-400">&rarr;</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F85A40]/20 text-[#F85A40] border border-[#F85A40]/30">oGV</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider ml-1">Down-Funnel Nurturing</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            When an applicant is motivated for international experience but lacks commercial CV history, portfolio, or advanced language fluency for competitive corporate placements, they are smoothly re-routed to a 6-week oGV project to develop leadership and cross-cultural adaptability first.
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#F85A40] font-semibold">
            <span>SLA: Transfer within 12 Hours</span>
            <span>Historical Approval Yield: +31%</span>
          </div>
        </div>

        {/* Up-Funnel Card */}
        <div className="glass-panel rounded-2xl p-5 border border-[#0CB9C1]/30 bg-[#0CB9C1]/[0.03]">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F85A40]/20 text-[#F85A40] border border-[#F85A40]/30">oGV</span>
            <span className="text-slate-400">&rarr;</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0CB9C1]/20 text-[#0CB9C1] border border-[#0CB9C1]/30">oGT</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider ml-1">Up-Funnel Progression</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every returning or finishing oGV volunteer entering their final academic year or graduation phase is automatically flagged in CRM for oGT retargeting. They receive priority career consultations and fast-tracked partner interviews.
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#0CB9C1] font-semibold">
            <span>Automatic Retargeting Trigger</span>
            <span>Alumni-to-oGT Conversion: +34%</span>
          </div>
        </div>
      </div>

      {/* CRM Leads Table Header & Filters */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active Synergy CRM Lead Pipeline ({filteredLeads.length})
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live operational monitoring with real-time countdown SLAs and instant cross-routing handoffs.
            </p>
          </div>

          {/* Controls: Search, Filters, CSV Export */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-44"
              />
            </div>

            {/* Function Filter */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
              {['ALL', 'oGV', 'oGT'].map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilterFunction(f); playClickSound(); }}
                  className={`px-2 py-1 rounded text-xs font-semibold transition ${
                    filterFunction === f
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Cross-Routed Only Toggle */}
            <button
              onClick={() => { setFilterCrossRoutedOnly(!filterCrossRoutedOnly); playClickSound(); }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center space-x-1.5 transition ${
                filterCrossRoutedOnly
                  ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cross-Routed</span>
            </button>

            {/* CSV Export */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center space-x-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Lead ID & Candidate</th>
                <th className="py-3 px-4">University & Year</th>
                <th className="py-3 px-4">Function</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">SLA Countdown</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{lead.name}</span>
                        {lead.crossRouted && (
                          <span 
                            title={lead.crossRouteReason || 'Cross-routed lead'}
                            className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          >
                            Cross-Routed
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                        <span>{lead.id}</span>
                        <span>&bull;</span>
                        <span>{lead.email}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-200 font-medium">{lead.university}</div>
                      <div className="text-[11px] text-slate-400">{lead.faculty} &bull; {lead.academicYear}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span 
                        className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: lead.assignedFunction === 'oGV' ? '#F85A4020' : '#0CB9C120',
                          color: lead.assignedFunction === 'oGV' ? '#F85A40' : '#0CB9C1',
                          border: `1px solid ${lead.assignedFunction === 'oGV' ? '#F85A4040' : '#0CB9C140'}`
                        }}
                      >
                        {lead.assignedFunction}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        lead.currentStage === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-slate-300'
                      }`}>
                        {lead.currentStage}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {lead.slaStatus === 'COMPLETED' ? (
                        <span className="text-[11px] text-emerald-400 flex items-center space-x-1 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Met SLA</span>
                        </span>
                      ) : (
                        <div className="flex items-center space-x-1.5">
                          <Clock className={`w-3.5 h-3.5 ${lead.slaTimeRemainingHours <= 4 ? 'text-rose-400 animate-pulse' : 'text-blue-400'}`} />
                          <span className={`text-[11px] font-bold ${lead.slaTimeRemainingHours <= 4 ? 'text-rose-400' : 'text-slate-200'}`}>
                            {lead.slaTimeRemainingHours}h left
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {lead.currentStage !== 'Approved' && (
                          <button
                            onClick={() => handleAdvanceStage(lead.id, lead.currentStage)}
                            title="Advance to next funnel stage"
                            className="px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold transition flex items-center space-x-1"
                          >
                            <span>Advance</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => openTransferModal(lead)}
                          title="Cross-route between oGV and oGT"
                          className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center space-x-1"
                        >
                          <ArrowLeftRight className="w-3 h-3 text-amber-400" />
                          <span>Transfer</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer / Cross-Route Modal */}
      {showTransferModal && selectedLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-amber-400" />
              Cross-Route Lead: {selectedLead.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Current Function: <strong className="text-white">{selectedLead.assignedFunction}</strong> &rarr; Target: <strong className="text-blue-400">{targetFunction}</strong>
            </p>

            <form onSubmit={handleExecuteTransfer} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Exchange Function</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTargetFunction('oGV')}
                    className={`py-2 rounded-lg text-xs font-bold border transition ${
                      targetFunction === 'oGV'
                        ? 'bg-[#F85A40] text-white border-[#F85A40]'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Outgoing Global Volunteer (oGV)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetFunction('oGT')}
                    className={`py-2 rounded-lg text-xs font-bold border transition ${
                      targetFunction === 'oGT'
                        ? 'bg-[#0CB9C1] text-white border-[#0CB9C1]'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Outgoing Global Talent (oGT)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cross-Routing Justification & Consultation Notes (Mandatory SLA)
                </label>
                <textarea
                  rows="3"
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md shadow-blue-500/20"
                >
                  Confirm & Reassign (12h SLA)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
