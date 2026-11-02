import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { jointCadenceTouchpoints } from '../data/synergyData';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckSquare, 
  Plus, 
  FileText, 
  Share2, 
  Target, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ListTodo
} from 'lucide-react';

export const JointCadenceHub = () => {
  const { playClickSound, playSuccessSound } = useTheme();

  const [selectedCadenceId, setSelectedCadenceId] = useState('cadence_weekly');
  const [actionItems, setActionItems] = useState([
    { id: 1, text: 'Align top 3 oGV projects & top 3 oGT roles for upcoming Instagram Carousel', assignee: 'B2C + oGV + oGT', done: true, due: 'This Thursday' },
    { id: 2, text: 'Review 18 stalled leads approaching 24h SLA deadline in CRM', assignee: 'VP oGV & VP oGT', done: false, due: 'Today, 6:00 PM' },
    { id: 3, text: 'Finalize booth zoning & iPad quiz for Cairo Univ Global Opportunities Fair', assignee: 'VP B2C', done: false, due: 'Nov 5' },
    { id: 4, text: 'Schedule parent Q&A webinar for winter break oGV applicants', assignee: 'oGV CX Team', done: true, due: 'Completed' },
    { id: 5, text: 'Deliver weekly lead conversion & CPA report to LCP', assignee: 'VP B2C', done: false, due: 'Monday' },
  ]);

  const [newActionText, setNewActionText] = useState('');
  const [newAssignee, setNewAssignee] = useState('Joint');

  const selectedCadence = jointCadenceTouchpoints.find(c => c.id === selectedCadenceId) || jointCadenceTouchpoints[0];

  const handleToggleAction = (id) => {
    playSuccessSound();
    setActionItems(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a));
  };

  const handleAddAction = (e) => {
    e.preventDefault();
    if (!newActionText.trim()) return;
    playClickSound();
    setActionItems([
      ...actionItems,
      {
        id: Date.now(),
        text: newActionText.trim(),
        assignee: newAssignee,
        done: false,
        due: 'Upcoming'
      }
    ]);
    setNewActionText('');
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Calendar className="w-3 h-3" />
              <span>Operational Rhythm & Governance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Joint Operational Cadence & Touchpoints
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Anchored cross-functional meetings guaranteeing continuous lead flow monitoring, real-time opportunity sourcing, and rapid strategic course correction.
            </p>
          </div>
        </div>
      </div>

      {/* Semester Timeline Flowcard */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Academic Semester Operational Journey
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            { step: '1. Semester Start', title: 'Joint Target & Resource Setting', desc: 'Unified LC goals, B2C budget split, faculty assignments, and SLA contracts.', color: '#8B5CF6' },
            { step: '2. Integrated Campaigns', title: 'Co-Branded Digital Content & Paid Ads', desc: 'Opportunity spotlights, reels, parent info sessions, lead intake blitz.', color: '#037EF3' },
            { step: '3. Global Opp Fairs', title: 'Physical Campus Super-Booths', desc: 'Zone A (oGV Impact) & Zone B (oGT Career Lounge), on-spot consultations.', color: '#F85A40' },
            { step: '4. Post-Exchange Upsell', title: 'Returned EP Alumni Progression', desc: 'Alumni homecoming, oGV returnees up-leveled into oGT career applicants.', color: '#10B981' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 rounded-xl p-4 border border-white/5 relative overflow-hidden flex flex-col justify-between">
              <div 
                className="w-1.5 h-full absolute left-0 top-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="pl-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.step}
                </span>
                <h4 className="text-xs font-bold text-white mt-1 mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Grid: Cadence Selector (5 cols) & Active Meeting Blueprint (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Meeting Rhythm Selectors */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
            Cadence Rhythm Touchpoints
          </div>

          {jointCadenceTouchpoints.map((c) => {
            const isSelected = selectedCadenceId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => { setSelectedCadenceId(c.id); playClickSound(); }}
                className={`cursor-pointer rounded-2xl p-4 border transition-all text-left ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/30'
                    : 'glass-panel hover:bg-slate-900/60 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                    {c.frequency}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{c.timing}</span>
                  </span>
                </div>
                
                <h4 className="text-sm font-bold text-white mb-1">
                  {c.title}
                </h4>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {c.primaryObjectives}
                </p>

                <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-white/5 text-slate-400">
                  <span>{c.attendees.length} Required Roles</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-0.5">
                    View Blueprint <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Meeting Agenda Blueprint & Deliverables */}
        <div className="lg:col-span-7 rounded-2xl glass-panel p-6 border border-white/10 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                {selectedCadence.frequency} Blueprint
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5">
                {selectedCadence.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Scheduled Window</span>
              <span className="text-xs font-semibold text-slate-200">{selectedCadence.timing}</span>
            </div>
          </div>

          {/* Attendees */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Mandatory Attendees</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCadence.attendees.map((a, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10 font-medium">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Objectives */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Core Session Objective</span>
            </div>
            <p className="text-xs text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-white/5 leading-relaxed">
              {selectedCadence.primaryObjectives}
            </p>
          </div>

          {/* Deliverables Checklist */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Standard Operational Deliverables</span>
            </div>
            <div className="space-y-2">
              {selectedCadence.deliverables.map((d, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Cross-Functional Action Items Tracker */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <ListTodo className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Synergy Action Items Tracker ({actionItems.filter(a => a.done).length}/{actionItems.length})
                </h4>
              </div>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {actionItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleAction(item.id)}
                  className={`cursor-pointer p-2.5 rounded-lg border text-xs flex items-center justify-between transition ${
                    item.done
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-400 line-through'
                      : 'bg-slate-900/80 border-white/10 text-slate-200 hover:border-blue-500/30'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <CheckSquare className={`w-4 h-4 ${item.done ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{item.text}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-semibold">
                      {item.assignee}
                    </span>
                    <span className="text-slate-400">{item.due}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddAction} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add new synergy action item..."
                value={newActionText}
                onChange={(e) => setNewActionText(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <select
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="B2C">B2C</option>
                <option value="oGV">oGV</option>
                <option value="oGT">oGT</option>
                <option value="Joint">Joint Team</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
