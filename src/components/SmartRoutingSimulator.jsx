import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';
import { 
  Compass, 
  Sparkles, 
  CheckCircle, 
  Send, 
  Copy, 
  MessageSquare, 
  Mail, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';

export const SmartRoutingSimulator = ({ onLeadAdded }) => {
  const { playClickSound, playSuccessSound, lcName } = useTheme();

  // Form State
  const [formData, setFormData] = useState({
    name: 'Sarah Nabil',
    university: 'Cairo University',
    faculty: 'Business & Economics',
    academicYear: '2nd Year',
    motivation: 'impact', // 'impact' | 'career' | 'both' | 'earn'
    availability: 'summer_short', // 'summer_short' | 'winter_short' | 'long_term'
    experienceLevel: 'student_activity', // 'none' | 'student_activity' | 'moderate' | 'commercial'
    englishLevel: 'B2', // 'B1' | 'B2' | 'C1'
  });

  const [copiedType, setCopiedType] = useState(null);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  // Dynamic Routing Logic
  const calculateMatch = () => {
    let ogvScore = 50;
    let ogtScore = 50;
    const reasons = [];
    let isCrossRoute = false;
    let crossRouteType = null;

    // Academic Year weight
    if (formData.academicYear === '1st Year' || formData.academicYear === '2nd Year') {
      ogvScore += 30;
      ogtScore -= 20;
      reasons.push('Early undergraduate years (1-2) are optimal for short-term leadership & SDG impact before career lock-in.');
    } else if (formData.academicYear === '3rd Year') {
      ogvScore += 15;
      ogtScore += 15;
      reasons.push('Junior year (Year 3) allows either oGV summer leadership or early oGT preparation depending on portfolio.');
    } else {
      // Final Year or Graduate
      ogtScore += 35;
      ogvScore -= 25;
      reasons.push('Graduating students and alumni urgently prioritize corporate resume building and employment.');
    }

    // Availability weight
    if (formData.availability === 'summer_short' || formData.availability === 'winter_short') {
      ogvScore += 25;
      ogtScore -= 20;
      reasons.push('Short-term 6–8 week window during university breaks aligns seamlessly with oGV volunteer projects.');
    } else {
      ogtScore += 30;
      ogvScore -= 20;
      reasons.push('Long-term 8–78 week window requires full-time commitment suited for oGT internships.');
    }

    // Motivation weight
    if (formData.motivation === 'impact') {
      ogvScore += 25;
      reasons.push('Explicit passion for UN Sustainable Development Goals and personal growth.');
    } else if (formData.motivation === 'career' || formData.motivation === 'earn') {
      ogtScore += 25;
      reasons.push('Clear career-first drive and salary/stipend expectations.');
    } else {
      ogvScore += 10;
      ogtScore += 10;
    }

    // Experience & English
    if (formData.experienceLevel === 'commercial' && (formData.englishLevel === 'B2' || formData.englishLevel === 'C1')) {
      ogtScore += 20;
      reasons.push('Strong commercial portfolio and English readiness satisfy host corporate vetting requirements.');
    } else if (formData.experienceLevel === 'none' || formData.experienceLevel === 'student_activity') {
      if (formData.academicYear === 'Final Year' || formData.academicYear === 'Recent Graduate') {
        isCrossRoute = true;
        crossRouteType = 'oGT_to_oGV_DownNurture';
        reasons.push('⚠️ Cross-Routing Trigger: Candidate wants career placement but lacks commercial work history. Down-funnel nurture to oGV recommended to build international profile first.');
      } else {
        ogvScore += 15;
        ogtScore -= 15;
      }
    }

    // Clamp scores
    ogvScore = Math.min(Math.max(ogvScore, 10), 98);
    ogtScore = Math.min(Math.max(ogtScore, 10), 98);

    const primaryProduct = ogvScore >= ogtScore ? 'oGV' : 'oGT';

    return {
      ogvScore,
      ogtScore,
      primaryProduct,
      isCrossRoute,
      crossRouteType,
      reasons,
    };
  };

  const match = calculateMatch();

  // Generated WhatsApp & Email Pitch Templates
  const getWhatsAppPitch = () => {
    if (match.primaryProduct === 'oGV') {
      return `Hey ${formData.name}! 👋 This is ${lcName} from AIESEC. We saw you're interested in making the most of your ${formData.academicYear === '1st Year' || formData.academicYear === '2nd Year' ? 'university breaks' : 'journey'}! 🌍

Based on your profile in ${formData.faculty}, we have an amazing 6-week Global Volunteer opportunity focusing on UN SDGs that fits your schedule perfectly. It includes covered accommodation, leadership certification, and friends from over 30 countries!

Are you free for a quick 5-min chat today to see our top project spots? 🚀`;
    } else {
      return `Hi ${formData.name}! 🌟 This is ${lcName} from AIESEC Global Talent. 

We reviewed your background in ${formData.faculty} and noticed your strong motivation for international career growth! 💼

We have open global internship opportunities with verified corporate partners that offer competitive monthly stipends and international work visas. We'd love to invite you for a 1-on-1 profile consultation to fast-track your CV to our host managers.

Can we set up a quick 10-minute call tomorrow at 4:00 PM or 6:00 PM? 📲`;
    }
  };

  const getEmailPitch = () => {
    const subject = match.primaryProduct === 'oGV'
      ? `Your Global Leadership Journey with ${lcName} | UN SDG Opportunities`
      : `Fast-Track Your Global Career with ${lcName} | International Corporate Placement`;

    const body = `Dear ${formData.name},

Thank you for reaching out to AIESEC! 

Based on your academic profile at ${formData.university} (${formData.faculty}) and your target timeline, you have been selected for our ${match.primaryProduct === 'oGV' ? 'Outgoing Global Volunteer (oGV)' : 'Outgoing Global Talent (oGT)'} priority pool.

Key highlights of your matched program:
• Duration: ${match.primaryProduct === 'oGV' ? '6–8 weeks (aligned with your breaks)' : '8–78 weeks (professional work placement)'}
• Focus: ${match.primaryProduct === 'oGV' ? 'Hands-on leadership & UN SDG project impact' : 'International work experience, competitive salary/stipend, verified visa'}
• Next Step: 1-on-1 personalized discovery consultation with our Customer Experience team.

Please reply to this email or book your preferred slot directly with our exchange manager.

Warm regards,
Customer Experience & Synergy Operations
${lcName}`;

    return { subject, body };
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    playClickSound();
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDispatchToCRM = () => {
    playSuccessSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newLead = {
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      email: `${formData.name.toLowerCase().replace(/\s+/g, '.')}@univ.edu`,
      phone: '+20 100 000 0000',
      university: formData.university,
      faculty: formData.faculty,
      academicYear: formData.academicYear,
      initialInterest: `${match.primaryProduct} Matched via Smart Router`,
      currentStage: 'Contacted',
      assignedFunction: match.primaryProduct,
      slaTimeRemainingHours: 24,
      slaStatus: 'ON_TRACK',
      crossRouted: match.isCrossRoute,
      crossRouteReason: match.isCrossRoute ? 'Routed through Synergy Down-Funnel Nurture protocol' : null,
      sourceCampaign: 'Synergy Smart Router Lead',
      dateCreated: new Date().toISOString().split('T')[0],
      notes: `Automated Routing Result: ${match.primaryProduct} (${match.primaryProduct === 'oGV' ? match.ogvScore : match.ogtScore}% Fit). Motivation: ${formData.motivation}. Availability: ${formData.availability}.`
    };

    if (onLeadAdded) {
      onLeadAdded(newLead);
    }
    setDispatchedSuccess(true);
    setTimeout(() => setDispatchedSuccess(false), 3500);
  };

  return (
    <div className="space-y-5">
      {/* Title Card */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <Compass className="w-3 h-3" />
              <span>Intelligent Lead Routing Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Candidate Profiler & First-Contact Pitch Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Input applicant credentials to calculate instant objective product fit scores, trigger automated cross-routing flags, and generate personalized first-touch pitches.
            </p>
          </div>

          <button
            onClick={() => {
              setFormData({
                name: 'Omar Sherif',
                university: 'Ain Shams University',
                faculty: 'Computer Science',
                academicYear: 'Final Year',
                motivation: 'career',
                availability: 'long_term',
                experienceLevel: 'moderate',
                englishLevel: 'C1',
              });
              playClickSound();
            }}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
            <span>Load Sample Profile</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split: Form on Left (5 cols), Analysis & Action Pitch on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Profiler Form */}
        <div className="lg:col-span-5 rounded-2xl glass-panel p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              1. Candidate Persona Profile
            </h3>
            <span className="text-[11px] text-slate-400">Live Calibration</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Student Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">University Entity</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Major / Faculty</label>
              <input
                type="text"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Academic Year</label>
            <select
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="1st Year">1st Year (Freshman - Early Explorer)</option>
              <option value="2nd Year">2nd Year (Sophomore - Mid Studies)</option>
              <option value="3rd Year">3rd Year (Junior - Pre-Graduation)</option>
              <option value="Final Year">Final Year (Senior - Graduating soon)</option>
              <option value="Recent Graduate">Recent Graduate (Alumni / Young Pro)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Core Motivation</label>
            <select
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="impact">Social Impact & UN SDGs (Personal Leadership)</option>
              <option value="career">Corporate Career & CV Boost (Hard Skills)</option>
              <option value="earn">Earning Salary / Stipend Abroad</option>
              <option value="both">Balanced: Adventure + Skill Building</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Availability Window</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="summer_short">Summer Break (6-8 wks)</option>
                <option value="winter_short">Winter Break (6-8 wks)</option>
                <option value="long_term">Long-Term (3-12 mos)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Experience Level</label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="none">No experience</option>
                <option value="student_activity">Student Activities only</option>
                <option value="moderate">Academic Projects</option>
                <option value="commercial">1+ Yr Work / Internships</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">English Proficiency</label>
            <div className="grid grid-cols-3 gap-2">
              {['B1', 'B2', 'C1'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFormData({ ...formData, englishLevel: lvl })}
                  className={`py-1.5 rounded-lg text-xs font-semibold border transition ${
                    formData.englishLevel === lvl
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {lvl} ({lvl === 'B1' ? 'Intermediate' : lvl === 'B2' ? 'Upper Int.' : 'Fluent'})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Smart Fit Gauge & Generated Pitch (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Recommendation Banner */}
          <div 
            className="rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: match.primaryProduct === 'oGV' ? 'rgba(248, 90, 64, 0.12)' : 'rgba(12, 185, 193, 0.12)',
              borderColor: match.primaryProduct === 'oGV' ? 'rgba(248, 90, 64, 0.35)' : 'rgba(12, 185, 193, 0.35)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span 
                  className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: match.primaryProduct === 'oGV' ? '#F85A40' : '#0CB9C1',
                    color: '#fff'
                  }}
                >
                  Priority Route: {match.primaryProduct === 'oGV' ? 'Outgoing Global Volunteer (oGV)' : 'Outgoing Global Talent (oGT)'}
                </span>
                <h3 className="text-xl font-heading font-black text-white mt-1.5 flex items-center gap-2">
                  <span>Matched to {match.primaryProduct} CX Funnel</span>
                  {match.isCrossRoute && (
                    <span className="text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      Cross-Route Active
                    </span>
                  )}
                </h3>
              </div>

              {/* Action: Dispatch to Live CRM */}
              <button
                onClick={handleDispatchToCRM}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition transform hover:scale-105"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>{dispatchedSuccess ? '✓ Dispatched to CRM!' : 'Dispatch to Live CRM'}</span>
              </button>
            </div>

            {/* Score Comparison Bars */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#F85A40]">oGV Fit Score</span>
                  <span className="text-white">{match.ogvScore}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#F85A40] to-rose-400 transition-all duration-500"
                    style={{ width: `${match.ogvScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#0CB9C1]">oGT Fit Score</span>
                  <span className="text-white">{match.ogtScore}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#0CB9C1] to-teal-300 transition-all duration-500"
                    style={{ width: `${match.ogtScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Strategic Routing Reasoning */}
            <div className="mt-4 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Strategic Routing Rationale
              </div>
              {match.reasons.map((r, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Pitch Copy Box */}
          <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Personalized First-Contact Pitch
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">100% Ready to Send</span>
            </div>

            {/* WhatsApp Ready Message */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-white/5 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp Direct Pitch (Higher Conversion)
                </span>
                <button
                  onClick={() => handleCopy(getWhatsAppPitch(), 'whatsapp')}
                  className="px-2.5 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center space-x-1 transition"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedType === 'whatsapp' ? 'Copied!' : 'Copy WhatsApp'}</span>
                </button>
              </div>
              <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {getWhatsAppPitch()}
              </pre>
            </div>

            {/* Email Follow-Up Pitch */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-white/5 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Formal Email Outreach Copy
                </span>
                <button
                  onClick={() => handleCopy(`${getEmailPitch().subject}\n\n${getEmailPitch().body}`, 'email')}
                  className="px-2.5 py-1 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-semibold flex items-center space-x-1 transition"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedType === 'email' ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>
              <div className="text-[11px] text-slate-400 font-semibold mb-1">
                Subject: {getEmailPitch().subject}
              </div>
              <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed max-h-36 overflow-y-auto">
                {getEmailPitch().body}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
