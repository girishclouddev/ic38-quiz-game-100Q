import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logoutUser } from '../utils/auth';
import { getProgress, resetProgress } from '../utils/storage';
import { getTotalRounds } from '../utils/examEngine';
import {
    LogOut, Trash2, Trophy, BookOpen, RefreshCcw, ChevronRight, ArrowLeft, BookMarked, Sparkles
} from 'lucide-react';

const TOTAL_ROUNDS = getTotalRounds();

const Settings = () => {
    const navigate = useNavigate();
    const progress = getProgress();
    const { completedRounds = [], scores = {} } = progress;
    const allRoundsCompleted = completedRounds.length >= TOTAL_ROUNDS;

    const [confirmReset, setConfirmReset] = useState(false);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const handleReset = () => {
        if (confirmReset) {
            resetProgress();
            navigate('/dashboard');
        } else {
            setConfirmReset(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-600 p-4">
            <div className="max-w-lg mx-auto pt-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-white/80 hover:text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-extrabold text-white">Settings</h1>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Mock Exam */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-2xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-slate-100">
                            <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Exam</h2>
                        </div>
                        <button
                            onClick={() => allRoundsCompleted ? navigate('/mock-test') : null}
                            className={`w-full flex items-center justify-between p-4 transition-all
                ${allRoundsCompleted ? 'hover:bg-primary-50 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-amber-100 p-2 rounded-xl">
                                    <Trophy className="w-5 h-5 text-amber-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-slate-700">Start Mock Exam</p>
                                    <p className="text-xs text-slate-400">
                                        {allRoundsCompleted ? '50 questions · 60 min' : 'Complete all rounds to unlock'}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                    </motion.div>

                    {/* Review Rounds */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-2xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-slate-100">
                            <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Review Completed Rounds</h2>
                        </div>
                        {completedRounds.length === 0 ? (
                            <div className="p-4 text-slate-400 text-sm">No rounds completed yet.</div>
                        ) : (
                            completedRounds.map(rId => (
                                <button
                                    key={rId}
                                    onClick={() => navigate(`/round/${rId}`)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-primary-50 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-emerald-100 p-2 rounded-xl">
                                            <BookOpen className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-slate-700">Round {rId}</p>
                                            <p className="text-xs text-slate-400">Score: {scores[rId] ?? '--'}/10</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </button>
                            ))
                        )}
                    </motion.div>

                    {/* Quick Notes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-2xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Study Material</h2>
                        </div>
                        <button
                            onClick={() => navigate('/quick-notes')}
                            className="w-full flex items-center justify-between p-4 hover:bg-amber-50 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                                    <BookMarked className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-700">Quick Notes 📖</p>
                                    <p className="text-xs text-slate-400">LIC IC-38 Short Revision · Gujarati</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">NEW</span>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                        </button>
                    </motion.div>

                    {/* Danger Zone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-2xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-slate-100">
                            <h2 className="font-bold text-red-500 text-sm uppercase tracking-wide">Danger Zone</h2>
                        </div>
                        <button
                            onClick={handleReset}
                            className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 p-2 rounded-xl">
                                    <RefreshCcw className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-red-600">
                                        {confirmReset ? '⚠️ Tap again to confirm reset' : 'Reset All Progress'}
                                    </p>
                                    <p className="text-xs text-slate-400">This will erase all your progress</p>
                                </div>
                            </div>
                            <Trash2 className="w-4 h-4 text-red-400" />
                        </button>

                        <div className="border-t border-slate-100" />

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 p-2 rounded-xl">
                                    <LogOut className="w-5 h-5 text-slate-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-slate-700">Logout</p>
                                    <p className="text-xs text-slate-400">Return to login screen</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
