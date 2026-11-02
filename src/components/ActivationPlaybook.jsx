import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { activationPlaybookTemplates } from '../data/synergyData';
import { 
  Target, 
  MapPin, 
  Compass, 
  Sparkles, 
  Share2, 
  CheckCircle, 
  Briefcase, 
  HeartHandshake, 
  Award, 
  Flame, 
  ExternalLink,
  Layers,
  ChevronRight,
  TrendingUp,
  RotateCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const sdgList = [
  { num: 1, name: 'No Poverty', color: '#E5243B', ogvProject: 'Microfinance & Community Growth in Brazil', ogtRole: 'Fintech Product Associate in Poland' },
  { num: 4, name: 'Quality Education', color: '#C5192D', ogvProject: 'Youth English & STEM Camp in Turkey', ogtRole: 'K-12 ESL Instructor in Taiwan ($1,800/mo)' },
  { num: 8, name: 'Decent Work & Growth', color: '#A21942', ogvProject: 'Social Entrepreneurship Incubator in Colombia', ogtRole: 'Digital Marketing Specialist in Portugal' },
  { num: 10, name: 'Reduced Inequalities', color: '#DD1367', ogvProject: 'Refugee Integration & Skills in Greece', ogtRole: 'NGO Communications Officer in Belgium' },
  { num: 13, name: 'Climate Action', color: '#3F7E44', ogvProject: 'Marine Eco-Preservation in Sri Lanka', ogtRole: 'Renewable Energy Analyst in Germany' },
];

export const ActivationPlaybook = () => {
  const { playClickSound, playSuccessSound } = useTheme();

  const [activePlaybookId, setActivePlaybookId] = useState('act_opp_fair');
  const [spinningSdg, setSpinningSdg] = useState(false);
  const [selectedSdg, setSelectedSdg] = useState(sdgList[1]);

  const handleSpinSdgWheel = () => {
    if (spinningSdg) return;
    playClickSound();
    setSpinningSdg(true);
    let counter = 0;
    const interval = setInterval(() => {
      setSelectedSdg(sdgList[Math.floor(Math.random() * sdgList.length)]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setSpinningSdg(false);
        playSuccessSound();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Unified Campaign Execution</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              Integrated Marketing & Activation Playbook
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Eliminate campus turf wars. Execute unified physical activations and high-converting co-branded content campaigns that sell both impact and career trajectory simultaneously.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation tabs between playbooks */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2 overflow-x-auto">
        {activationPlaybookTemplates.map((p) => (
          <button
            key={p.id}
            onClick={() => { setActivePlaybookId(p.id); playClickSound(); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activePlaybookId === p.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* SECTION 1: GLOBAL OPPORTUNITIES FAIR BLUEPRINT */}
      {activePlaybookId === 'act_opp_fair' && (
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Physical On-Campus Blueprint
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  The Dual-Zone Campus Presence
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Instead of competing tables, LC hosts a high-gravity branded pavilion divided into distinct visitor zones.
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs bg-slate-900/90 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Recommended Budget</span>
                  <span className="font-bold text-white">$120 – $180 / campus</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Expected Yield</span>
                  <span className="font-bold text-emerald-400">450+ Sign-ups</span>
                </div>
              </div>
            </div>

            {/* Visual Booth Floorplan Map */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Zone A: oGV Impact Hub */}
              <div className="rounded-2xl p-5 border border-[#F85A40]/30 bg-[#F85A40]/[0.04] space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F85A40] text-white flex items-center justify-center font-bold">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Zone A: oGV Impact Hub</h4>
                    <span className="text-[10px] text-[#F85A40] font-semibold uppercase">UN SDGs & Leadership</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-energy atmosphere featuring returned volunteer photos, SDG wheels, and instant iPad quizzes.
                </p>
                <div className="space-y-1.5 text-xs text-slate-200">
                  <div className="flex items-center gap-1.5">• Interactive 17-SDG spinning wheel</div>
                  <div className="flex items-center gap-1.5">• Returned EP Polaroid photo wall</div>
                  <div className="flex items-center gap-1.5">• 2-minute eligibility quiz via iPad</div>
                  <div className="flex items-center gap-1.5">• Instant project discount vouchers</div>
                </div>
              </div>

              {/* Zone B: oGT Career Lounge */}
              <div className="rounded-2xl p-5 border border-[#0CB9C1]/30 bg-[#0CB9C1]/[0.04] space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0CB9C1] text-white flex items-center justify-center font-bold">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Zone B: oGT Career Lounge</h4>
                    <span className="text-[10px] text-[#0CB9C1] font-semibold uppercase">Corporate & Stipends</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Professional executive setup offering career audits and direct live job matching with global partners.
                </p>
                <div className="space-y-1.5 text-xs text-slate-200">
                  <div className="flex items-center gap-1.5">• Free 5-min CV & LinkedIn audits</div>
                  <div className="flex items-center gap-1.5">• Global Job Board with real monthly salaries</div>
                  <div className="flex items-center gap-1.5">• On-the-spot technical English screening</div>
                  <div className="flex items-center gap-1.5">• Direct interview fast-track vouchers</div>
                </div>
              </div>

              {/* Zone C: Synergy Fast-Track Desk */}
              <div className="rounded-2xl p-5 border border-purple-500/30 bg-purple-500/[0.04] space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Zone C: The Synergy Desk</h4>
                    <span className="text-[10px] text-purple-400 font-semibold uppercase">Journey Roadmap</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cross-consultation counselors map a 4-year student pathway (Years 1-2: oGV &rarr; Years 3-4: oGT).
                </p>
                <div className="space-y-1.5 text-xs text-slate-200">
                  <div className="flex items-center gap-1.5">• 4-Year University Journey Mapping</div>
                  <div className="flex items-center gap-1.5">• Cross-program down & up qualification</div>
                  <div className="flex items-center gap-1.5">• Centralized WhatsApp QR booking hub</div>
                  <div className="flex items-center gap-1.5">• Zero lead drop-off guarantee</div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive SDG Wheel Activation Tool */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Interactive Booth Tool: SDG Match Wheel
                </h4>
                <p className="text-xs text-slate-400">
                  Simulate the on-campus spinning wheel to reveal paired oGV volunteer projects & oGT corporate roles.
                </p>
              </div>

              <button
                onClick={handleSpinSdgWheel}
                disabled={spinningSdg}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition transform hover:scale-105 disabled:opacity-50"
              >
                <RotateCw className={`w-4 h-4 ${spinningSdg ? 'animate-spin' : ''}`} />
                <span>{spinningSdg ? 'Spinning SDG Wheel...' : 'Spin Campus Wheel'}</span>
              </button>
            </div>

            {/* Selected SDG Result Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 relative overflow-hidden">
              <div 
                className="w-2 h-full absolute left-0 top-0"
                style={{ backgroundColor: selectedSdg.color }}
              />
              <div className="pl-3">
                <div className="flex items-center space-x-2">
                  <span 
                    className="text-xs font-black px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: selectedSdg.color }}
                  >
                    SDG #{selectedSdg.num}
                  </span>
                  <h4 className="text-base font-bold text-white">{selectedSdg.name}</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Matched oGV Project */}
                  <div className="bg-[#F85A40]/10 border border-[#F85A40]/20 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-[#F85A40] uppercase tracking-wider block mb-1">
                      Matched oGV Impact Project (6-8 wks)
                    </span>
                    <div className="text-xs font-bold text-white">{selectedSdg.ogvProject}</div>
                    <div className="text-[11px] text-slate-300 mt-1">Covered accommodation & leadership certificate</div>
                  </div>

                  {/* Matched oGT Corporate Placement */}
                  <div className="bg-[#0CB9C1]/10 border border-[#0CB9C1]/20 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-[#0CB9C1] uppercase tracking-wider block mb-1">
                      Matched oGT Corporate Placement (6-12 mos)
                    </span>
                    <div className="text-xs font-bold text-white">{selectedSdg.ogtRole}</div>
                    <div className="text-[11px] text-slate-300 mt-1">International work visa & competitive stipend</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: "FROM VOLUNTEER TO PROFESSIONAL" STORY ENGINE */}
      {activePlaybookId === 'act_volunteer_to_pro' && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Co-Branded Digital Content Blueprint
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              "From Volunteer to Professional" Storytelling Formula
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Highlight real EP journeys showing how short-term oGV social projects directly equipped them with the grit and soft skills to land global oGT corporate placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The 5-Step Narrative Structure */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                High-Converting Script Formula
              </h4>
              {[
                { step: '1. The Hook', detail: '"How 6 weeks volunteering in Brazil landed me a $1,500/mo product job in Germany."' },
                { step: '2. The Problem', detail: 'Show original blank university CV — lacking distinction, timid in interviews.' },
                { step: '3. The oGV Catalyst', detail: 'Negotiating in Portuguese, leading team of 8 international youth, solving logistical crises.' },
                { step: '4. The oGT Breakthrough', detail: 'European employer specifically asked about their AIESEC resilience in the final round.' },
                { step: '5. The Split CTA', detail: '"Want your leadership spark? Start with oGV. Ready for your career jump? Choose oGT."' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs">
                  <div className="font-bold text-blue-400 mb-0.5">{s.step}</div>
                  <div className="text-slate-200">{s.detail}</div>
                </div>
              ))}
            </div>

            {/* Live Case Study Preview Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F85A40] to-[#0CB9C1] p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-sm">
                      NE
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Nour El-Din (Cairo LC Alum)</h5>
                    <p className="text-[11px] text-slate-400">oGV Italy (2024) &rarr; oGT Software Engineer Poland (2026)</p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 italic bg-white/5 p-4 rounded-xl border border-white/5 mb-4 leading-relaxed">
                  "Before oGV, I was just another CS student with generic academic projects. Volunteering with refugees in Italy forced me to communicate under pressure. When I interviewed for the tech internship in Krakow via oGT, the CTO spent 20 minutes asking about my AIESEC leadership story. That’s what set me apart from 200 applicants."
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">3.4x Higher Engagement</span>
                <span className="text-blue-400 font-semibold">Ready for Instagram & LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: OPPORTUNITY SPOTLIGHT CAROUSEL BUILDER */}
      {activePlaybookId === 'act_spotlight_carousel' && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Bi-Weekly Opportunity Spotlight (3 + 3 Format)
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Curated Top-Pick Carousel
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Published every alternate Tuesday: 3 verified oGV SDG projects + 3 high-stipend oGT corporate roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* oGV Picks */}
            <div className="p-4 rounded-xl bg-[#F85A40]/10 border border-[#F85A40]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#F85A40] uppercase">oGV Pick 1</span>
              <h5 className="text-sm font-bold text-white">SDG 4 Education in Istanbul, Turkey</h5>
              <p className="text-xs text-slate-300">Teaching children, accommodation provided, international festival.</p>
              <div className="text-[11px] text-[#F85A40] font-semibold pt-1">Duration: 6 Weeks &bull; Summer 2027</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F85A40]/10 border border-[#F85A40]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#F85A40] uppercase">oGV Pick 2</span>
              <h5 className="text-sm font-bold text-white">SDG 13 Climate Action in Sri Lanka</h5>
              <p className="text-xs text-slate-300">Coastal reef restoration & community environmental workshops.</p>
              <div className="text-[11px] text-[#F85A40] font-semibold pt-1">Duration: 6 Weeks &bull; Winter Break</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0CB9C1]/10 border border-[#0CB9C1]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#0CB9C1] uppercase">oGT Pick 1</span>
              <h5 className="text-sm font-bold text-white">Full-Stack Developer in Krakow, Poland</h5>
              <p className="text-xs text-slate-300">Fintech scaleup, React/Node stack, visa sponsorship.</p>
              <div className="text-[11px] text-[#0CB9C1] font-semibold pt-1">Stipend: $1,400/mo &bull; Duration: 1 Year</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0CB9C1]/10 border border-[#0CB9C1]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#0CB9C1] uppercase">oGT Pick 2</span>
              <h5 className="text-sm font-bold text-white">ESL Teacher in Taipei, Taiwan</h5>
              <p className="text-xs text-slate-300">Accredited private high school, round-trip flight allowance.</p>
              <div className="text-[11px] text-[#0CB9C1] font-semibold pt-1">Salary: $1,850/mo &bull; Duration: 1 Year</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F85A40]/10 border border-[#F85A40]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#F85A40] uppercase">oGV Pick 3</span>
              <h5 className="text-sm font-bold text-white">SDG 8 Youth Entrepreneurship in Brazil</h5>
              <p className="text-xs text-slate-300">Consulting grassroots startups in São Paulo.</p>
              <div className="text-[11px] text-[#F85A40] font-semibold pt-1">Duration: 6 Weeks &bull; Summer 2027</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0CB9C1]/10 border border-[#0CB9C1]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#0CB9C1] uppercase">oGT Pick 3</span>
              <h5 className="text-sm font-bold text-white">Growth Marketer in Lisbon, Portugal</h5>
              <p className="text-xs text-slate-300">European e-commerce brand, accommodation subsidy.</p>
              <div className="text-[11px] text-[#0CB9C1] font-semibold pt-1">Stipend: €1,100/mo &bull; Duration: 6 Months</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
