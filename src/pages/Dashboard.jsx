import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCurrentUser } from '../utils/auth';
import { getProgress } from '../utils/storage';
import { getTotalRounds } from '../utils/examEngine';
import { Settings, Flame, Trophy, BookOpen, Lock, CheckCircle, PlayCircle } from 'lucide-react';

const TOTAL_ROUNDS = getTotalRounds();

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const progress = getProgress();
    const { completedRounds = [], scores = {}, streak = 0 } = progress;

    const totalScore = useMemo(() => {
        return completedRounds.reduce((sum, r) => sum + (scores[r] || 0), 0);
    }, [completedRounds, scores]);

    const allRoundsCompleted = completedRounds.length >= TOTAL_ROUNDS;
    const nextRound = completedRounds.length + 1;

    const rounds = Array.from({ length: TOTAL_ROUNDS }, (_, i) => i + 1);

    const getRoundState = (roundId) => {
        if (completedRounds.includes(roundId)) return 'completed';
        if (roundId === nextRound || (completedRounds.length === 0 && roundId === 1)) return 'available';
        return 'locked';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-600 p-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between py-4 mb-6"
                >
                    <div>
                        <h1 className="text-2xl font-extrabold text-white">Hello, {user}! 👋</h1>
                        <p className="text-white/70 text-sm">Keep up the great work!</p>
                    </div>
                    <button
                        onClick={() => navigate('/settings')}
                        className="bg-white/20 text-white p-2 rounded-xl hover:bg-white/30 transition-all"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-3 gap-3 mb-6"
                >
                    <motion.div variants={itemVariants} className="glass-card rounded-2xl p-4 text-center">
                        <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                        <p className="text-2xl font-extrabold text-slate-800">{totalScore}</p>
                        <p className="text-xs text-slate-500">Total Score</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="glass-card rounded-2xl p-4 text-center">
                        <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                        <p className="text-2xl font-extrabold text-slate-800">{completedRounds.length}/{TOTAL_ROUNDS}</p>
                        <p className="text-xs text-slate-500">Rounds Done</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="glass-card rounded-2xl p-4 text-center">
                        <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                        <p className="text-2xl font-extrabold text-slate-800">{streak}</p>
                        <p className="text-xs text-slate-500">Day Streak</p>
                    </motion.div>
                </motion.div>

                {/* Overall Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card rounded-2xl p-4 mb-6"
                >
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
                        <span className="text-sm font-bold text-primary-600">{completedRounds.length * 10} / 100 Qs</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedRounds.length / TOTAL_ROUNDS) * 100}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>

                {/* Mock Exam Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                >
                    {allRoundsCompleted ? (
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/mock-test')}
                            className="w-full py-4 rounded-2xl btn-gradient font-bold text-lg flex items-center justify-center gap-3 shadow-xl"
                        >
                            <Trophy className="w-6 h-6" />
                            Start Mock Exam 🏆
                        </motion.button>
                    ) : (
                        <div className="w-full py-4 rounded-2xl bg-white/30 border border-white/30 text-white/60 font-bold text-lg flex items-center justify-center gap-3 cursor-not-allowed">
                            <Lock className="w-5 h-5" />
                            Mock Exam — Locked (Complete all rounds)
                        </div>
                    )}
                </motion.div>

                {/* Rounds Grid */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white font-bold text-lg mb-3"
                >
                    Practice Rounds
                </motion.h2>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-3 pb-6"
                >
                    {rounds.map((roundId) => {
                        const state = getRoundState(roundId);
                        const roundScore = scores[roundId];

                        return (
                            <motion.div
                                key={roundId}
                                variants={itemVariants}
                                whileHover={state !== 'locked' ? { scale: 1.03 } : {}}
                                whileTap={state !== 'locked' ? { scale: 0.97 } : {}}
                                onClick={() => state !== 'locked' && navigate(`/round/${roundId}`)}
                                className={`glass-card rounded-2xl p-4 cursor-pointer transition-all
                  ${state === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
                  ${state === 'completed' ? 'border-2 border-emerald-400' : ''}
                  ${state === 'available' ? 'border-2 border-primary-400 ring-2 ring-primary-200' : ''}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Round</span>
                                    {state === 'completed' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                    {state === 'available' && <PlayCircle className="w-5 h-5 text-primary-500" />}
                                    {state === 'locked' && <Lock className="w-4 h-4 text-slate-400" />}
                                </div>
                                <p className="text-3xl font-extrabold text-slate-800">{roundId}</p>
                                <p className="text-xs text-slate-500 mt-1">10 Questions</p>
                                {state === 'completed' && (
                                    <p className="text-sm font-bold text-emerald-600 mt-1">{roundScore}/10</p>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
