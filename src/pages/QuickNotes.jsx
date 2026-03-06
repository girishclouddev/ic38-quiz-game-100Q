import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Shield,
    Heart,
    Building2,
    Scale,
    FileText,
    BookOpen,
    Users,
    Calendar,
    AlertCircle,
    Star,
    Zap,
    ChevronDown,
    ChevronUp,
    Info,
    Award,
    Briefcase,
} from 'lucide-react';

const sections = [
    {
        id: 1,
        icon: Shield,
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-100',
        gradFrom: 'from-blue-500',
        gradTo: 'to-cyan-400',
        title: 'વીમા (Insurance) શું છે?',
        subtitle: 'What is Insurance?',
        content: [
            { type: 'text', value: 'વીમા એટલે જોખમ સામે આર્થિક સુરક્ષા આપવાની પદ્ધતિ.' },
            { type: 'text', value: 'જો કોઈ અનિચ્છનીય ઘટના થાય (મૃત્યુ, અકસ્માત વગેરે) તો વીમા કંપની નક્કી રકમ આપે છે.' },
            {
                type: 'chips', label: 'મુખ્ય તત્વો', items: [
                    { icon: '⚠️', label: 'Risk (જોખમ)' },
                    { icon: '💰', label: 'Premium (પ્રીમિયમ)' },
                    { icon: '🛡️', label: 'Sum Assured (વીમાની રકમ)' },
                ]
            },
        ],
    },
    {
        id: 2,
        icon: Heart,
        iconColor: 'text-rose-500',
        iconBg: 'bg-rose-100',
        gradFrom: 'from-rose-500',
        gradTo: 'to-pink-400',
        title: 'જીવન વીમા (Life Insurance)',
        subtitle: 'Life Insurance Contract',
        content: [
            { type: 'text', value: 'જીવન વીમા એ એવો કરાર છે જેમાં:' },
            {
                type: 'list', items: [
                    '✅ વ્યક્તિ પ્રીમિયમ ચૂકવે છે',
                    '✅ વીમા કંપની જોખમ કવર કરે છે',
                    '✅ મૃત્યુ અથવા maturity સમયે રકમ મળે છે',
                ]
            },
        ],
    },
    {
        id: 3,
        icon: Building2,
        iconColor: 'text-amber-500',
        iconBg: 'bg-amber-100',
        gradFrom: 'from-amber-500',
        gradTo: 'to-yellow-400',
        title: 'LIC (Life Insurance Corporation)',
        subtitle: 'LIC at a Glance',
        content: [
            {
                type: 'infoGrid', items: [
                    { label: 'સ્થાપના', value: '1956', icon: '📅' },
                    { label: 'મુખ્ય મથક', value: 'મુંબઈ', icon: '🏙️' },
                    { label: 'પ્રકાર', value: 'સરકારી', icon: '🏛️' },
                    { label: 'કાર્ય', value: 'જીવન વીમા', icon: '💼' },
                ]
            },
        ],
    },
    {
        id: 4,
        icon: Scale,
        iconColor: 'text-violet-500',
        iconBg: 'bg-violet-100',
        gradFrom: 'from-violet-500',
        gradTo: 'to-purple-400',
        title: 'વીમા ક્ષેત્રનું નિયંત્રણ',
        subtitle: 'IRDAI — Regulator of Insurance',
        content: [
            { type: 'highlight', value: 'IRDAI — Insurance Regulatory and Development Authority of India' },
            {
                type: 'list', items: [
                    '📋 વીમા કંપનીઓનું નિયમન',
                    '🛡️ ગ્રાહકોની સુરક્ષા',
                    '📜 નિયમો બનાવવું',
                ]
            },
        ],
    },
    {
        id: 5,
        icon: FileText,
        iconColor: 'text-teal-500',
        iconBg: 'bg-teal-100',
        gradFrom: 'from-teal-500',
        gradTo: 'to-emerald-400',
        title: 'વીમા કરાર (Insurance Contract)',
        subtitle: 'Key Principles',
        content: [
            { type: 'text', value: 'વીમા એક Legal Contract છે.' },
            {
                type: 'principles', items: [
                    { term: 'Utmost Good Faith', meaning: 'બંને પક્ષે સાચી માહિતી આપવી' },
                    { term: 'Insurable Interest', meaning: 'વીમા માટે સંબંધ હોવો' },
                    { term: 'Indemnity', meaning: 'નુકસાનની ભરપાઈ' },
                    { term: 'Subrogation', meaning: 'નુકસાનની વસૂલાતનો અધિકાર' },
                ]
            },
        ],
    },
    {
        id: 6,
        icon: BookOpen,
        iconColor: 'text-indigo-500',
        iconBg: 'bg-indigo-100',
        gradFrom: 'from-indigo-500',
        gradTo: 'to-blue-400',
        title: 'મહત્વના શબ્દો (Important Terms)',
        subtitle: 'Glossary',
        content: [
            {
                type: 'table', rows: [
                    { term: 'Premium', meaning: 'પોલિસી માટે ચૂકવાતી રકમ' },
                    { term: 'Sum Assured', meaning: 'વીમા હેઠળ મળતી રકમ' },
                    { term: 'Nominee', meaning: 'લાભ મેળવનાર' },
                    { term: 'Claim', meaning: 'વીમાની રકમ માંગવી' },
                    { term: 'Bonus', meaning: 'વધારાનો લાભ' },
                ]
            },
        ],
    },
    {
        id: 7,
        icon: Users,
        iconColor: 'text-cyan-500',
        iconBg: 'bg-cyan-100',
        gradFrom: 'from-cyan-500',
        gradTo: 'to-sky-400',
        title: 'પોલિસી સંબંધિત શબ્દો',
        subtitle: 'Policy Parties',
        content: [
            {
                type: 'personCards', items: [
                    { role: 'Policyholder', gujarati: 'પોલિસી ખરીદનાર', emoji: '🧑' },
                    { role: 'Insurer', gujarati: 'વીમા કંપની', emoji: '🏢' },
                    { role: 'Insured', gujarati: 'વીમા કરાવનાર', emoji: '🙋' },
                ]
            },
        ],
    },
    {
        id: 8,
        icon: Calendar,
        iconColor: 'text-orange-500',
        iconBg: 'bg-orange-100',
        gradFrom: 'from-orange-500',
        gradTo: 'to-amber-400',
        title: 'પોલિસી સમયગાળો',
        subtitle: 'Policy Timeline',
        content: [
            {
                type: 'timeline', items: [
                    { label: 'Commencement Date', desc: 'પોલિસી શરૂ થવાની તારીખ' },
                    { label: 'Policy Term', desc: 'પોલિસીનો સમયગાળો' },
                    { label: 'Maturity', desc: 'પોલિસી પૂર્ણ થવી' },
                ]
            },
        ],
    },
    {
        id: 9,
        icon: AlertCircle,
        iconColor: 'text-red-500',
        iconBg: 'bg-red-100',
        gradFrom: 'from-red-500',
        gradTo: 'to-rose-400',
        title: 'પોલિસી સ્થિતિ',
        subtitle: 'Policy Status Terms',
        content: [
            {
                type: 'statusCards', items: [
                    { status: 'Grace Period', desc: 'પ્રીમિયમ ભરવા માટે વધારાનો સમય', color: 'bg-amber-50 border-amber-300', badge: '⏳' },
                    { status: 'Lapse', desc: 'પ્રીમિયમ ન ભરવાથી પોલિસી બંધ થવી', color: 'bg-red-50 border-red-300', badge: '❌' },
                    { status: 'Surrender', desc: 'પોલિસી પહેલા બંધ કરવી', color: 'bg-orange-50 border-orange-300', badge: '🚫' },
                    { status: 'Surrender Value', desc: 'પોલિસી બંધ કરતી વખતે મળતી રકમ', color: 'bg-blue-50 border-blue-300', badge: '💵' },
                ]
            },
        ],
    },
    {
        id: 10,
        icon: Briefcase,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-100',
        gradFrom: 'from-emerald-500',
        gradTo: 'to-teal-400',
        title: 'LIC Agent નું કાર્ય',
        subtitle: 'Role of an LIC Agent',
        content: [
            {
                type: 'list', items: [
                    '📢 ગ્રાહકોને વીમાની માહિતી આપવી',
                    '💼 પોલિસી વેચવી',
                    '🤝 ગ્રાહકોને મદદ કરવી',
                    '📋 ક્લેમ પ્રક્રિયામાં માર્ગદર્શન આપવું',
                ]
            },
            { type: 'highlight', value: '👉 એજન્ટની કમાણી: Commission' },
        ],
    },
];

const top15Points = [
    { num: '1️⃣', label: 'LIC સ્થાપના', value: '1956' },
    { num: '2️⃣', label: 'મુખ્ય મથક', value: 'મુંબઈ' },
    { num: '3️⃣', label: 'વીમા નિયમન', value: 'IRDAI' },
    { num: '4️⃣', label: 'Premium', value: 'પોલિસી રકમ' },
    { num: '5️⃣', label: 'Nominee', value: 'લાભ મેળવનાર' },
    { num: '6️⃣', label: 'Claim', value: 'વીમાની માંગ' },
    { num: '7️⃣', label: 'Bonus', value: 'વધારાનો લાભ' },
    { num: '8️⃣', label: 'Policy Term', value: 'સમયગાળો' },
    { num: '9️⃣', label: 'Maturity', value: 'પોલિસી પૂર્ણ' },
    { num: '🔟', label: 'Lapse', value: 'પોલિસી બંધ' },
    { num: '1️⃣1️⃣', label: 'Grace Period', value: 'વધારાનો સમય' },
    { num: '1️⃣2️⃣', label: 'Surrender', value: 'પોલિસી બંધ કરવી' },
    { num: '1️⃣3️⃣', label: 'Commission', value: 'એજન્ટ કમાણી' },
    { num: '1️⃣4️⃣', label: 'Insurer', value: 'વીમા કંપની' },
    { num: '1️⃣5️⃣', label: 'Insured', value: 'વીમા કરાવનાર' },
];

const SectionCard = ({ section, index }) => {
    const [open, setOpen] = useState(true);
    const Icon = section.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, type: 'spring', stiffness: 120 }}
            className="rounded-2xl overflow-hidden shadow-lg mb-4"
            style={{ background: 'white' }}
        >
            {/* Card Header */}
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full text-left"
            >
                <div className={`bg-gradient-to-r ${section.gradFrom} ${section.gradTo} p-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-base leading-tight">{section.title}</p>
                            <p className="text-white/80 text-xs">{section.subtitle}</p>
                        </div>
                    </div>
                    <div className="bg-white/20 rounded-full p-1">
                        {open
                            ? <ChevronUp className="w-4 h-4 text-white" />
                            : <ChevronDown className="w-4 h-4 text-white" />
                        }
                    </div>
                </div>
            </button>

            {/* Card Body */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-3">
                            {section.content.map((block, bi) => renderBlock(block, bi))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const renderBlock = (block, key) => {
    switch (block.type) {
        case 'text':
            return (
                <p key={key} className="text-slate-600 text-sm leading-relaxed">{block.value}</p>
            );
        case 'highlight':
            return (
                <div key={key} className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl px-4 py-3">
                    <p className="text-amber-800 font-semibold text-sm">{block.value}</p>
                </div>
            );
        case 'list':
            return (
                <ul key={key} className="flex flex-col gap-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="text-slate-600 text-sm bg-slate-50 rounded-xl px-3 py-2">{item}</li>
                    ))}
                </ul>
            );
        case 'chips':
            return (
                <div key={key}>
                    {block.label && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{block.label}</p>}
                    <div className="flex flex-wrap gap-2">
                        {block.items.map((chip, i) => (
                            <span key={i} className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                                {chip.icon} {chip.label}
                            </span>
                        ))}
                    </div>
                </div>
            );
        case 'infoGrid':
            return (
                <div key={key} className="grid grid-cols-2 gap-2">
                    {block.items.map((item, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                            <div className="text-2xl mb-1">{item.icon}</div>
                            <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                            <p className="text-sm font-bold text-slate-700">{item.value}</p>
                        </div>
                    ))}
                </div>
            );
        case 'principles':
            return (
                <div key={key} className="flex flex-col gap-2">
                    {block.items.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div className="bg-violet-100 text-violet-600 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5">{i + 1}</div>
                            <div>
                                <p className="text-sm font-bold text-slate-700">{p.term}</p>
                                <p className="text-xs text-slate-500">{p.meaning}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        case 'table':
            return (
                <div key={key} className="rounded-xl overflow-hidden border border-slate-200">
                    <div className="grid grid-cols-2 bg-slate-100 px-3 py-2">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">શબ્દ</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">અર્થ</p>
                    </div>
                    {block.rows.map((row, i) => (
                        <div key={i} className={`grid grid-cols-2 px-3 py-2.5 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                            <p className="text-sm font-semibold text-indigo-600">{row.term}</p>
                            <p className="text-sm text-slate-600">{row.meaning}</p>
                        </div>
                    ))}
                </div>
            );
        case 'personCards':
            return (
                <div key={key} className="flex flex-col gap-2">
                    {block.items.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                            <div className="text-2xl">{p.emoji}</div>
                            <div>
                                <p className="text-sm font-bold text-slate-700">{p.role}</p>
                                <p className="text-xs text-slate-500">{p.gujarati}</p>
                            </div>
                            <div className="ml-auto text-xs text-cyan-500 font-semibold">→</div>
                        </div>
                    ))}
                </div>
            );
        case 'timeline':
            return (
                <div key={key} className="relative flex flex-col gap-0 pl-4">
                    {block.items.map((item, i) => (
                        <div key={i} className="relative flex items-start gap-3 pb-4 last:pb-0">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white shadow mt-1 shrink-0" />
                                {i < block.items.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-gradient-to-b from-orange-300 to-amber-200 mt-1" style={{ minHeight: 24 }} />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-700">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        case 'statusCards':
            return (
                <div key={key} className="flex flex-col gap-2">
                    {block.items.map((s, i) => (
                        <div key={i} className={`flex items-start gap-3 rounded-xl px-3 py-3 border ${s.color}`}>
                            <div className="text-xl shrink-0">{s.badge}</div>
                            <div>
                                <p className="text-sm font-bold text-slate-700">{s.status}</p>
                                <p className="text-xs text-slate-500 leading-snug">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
};

const QuickNotes = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'top15'

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-600">
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
                <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
                    <button
                        onClick={() => navigate('/settings')}
                        className="bg-white/20 text-white p-2 rounded-xl hover:bg-white/30 transition-all shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-lg font-extrabold text-white leading-tight">📖 Quick Notes</h1>
                        <p className="text-white/70 text-xs">LIC IC-38 Agent Exam – Short Revision</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-white text-xs font-bold">10 Topics</span>
                    </div>
                </div>

                {/* Tab Bar */}
                <div className="max-w-lg mx-auto px-4 pb-3 flex gap-2">
                    {[
                        { key: 'notes', label: '📚 Notes', icon: BookOpen },
                        { key: 'top15', label: '⚡ Top 15', icon: Zap },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key
                                ? 'bg-white text-primary-600 shadow-lg'
                                : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-lg mx-auto px-4 py-5 pb-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'notes' && (
                        <motion.div
                            key="notes"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {sections.map((section, idx) => (
                                <SectionCard key={section.id} section={section} index={idx} />
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'top15' && (
                        <motion.div
                            key="top15"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Top 15 Header Banner */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-r from-amber-500 to-orange-400 rounded-2xl p-4 mb-4 flex items-center gap-3 shadow-lg"
                            >
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Award className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-extrabold text-lg leading-tight">LIC Exam</p>
                                    <p className="text-white/80 text-sm">Top 15 Quick Points for Revision</p>
                                </div>
                                <Star className="w-6 h-6 text-yellow-200 ml-auto" />
                            </motion.div>

                            {/* Top 15 List */}
                            <div className="flex flex-col gap-2">
                                {top15Points.map((pt, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04, type: 'spring', stiffness: 150 }}
                                        className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md"
                                    >
                                        <div className="text-xl shrink-0 w-10 text-center">{pt.num}</div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-700">{pt.label}</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full border border-primary-200">
                                            {pt.value}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Motivational Footer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl p-4 text-center shadow-lg"
                            >
                                <div className="text-3xl mb-2">🎯</div>
                                <p className="text-white font-extrabold text-base">All the Best!</p>
                                <p className="text-white/80 text-sm mt-1">LIC IC-38 Exam માટે શુભ કામના 🙏</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuickNotes;
