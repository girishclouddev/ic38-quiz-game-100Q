import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { evaluateRound, isPass } from '../utils/examEngine';
import { CheckCircle, XCircle, ArrowLeft, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

const MockResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions = [], userAnswers = {} } = location.state || {};
    const [reviewMode, setReviewMode] = useState(false);
    const confettiFired = useRef(false);

    if (!questions.length) {
        navigate('/dashboard');
        return null;
    }

    const { score, total, accuracy, wrongAnswers } = evaluateRound(questions, userAnswers);
    const passed = isPass(score);

    useEffect(() => {
        if (passed && !confettiFired.current) {
            confettiFired.current = true;
            confetti({
                particleCount: 200,
                spread: 80,
                origin: { y: 0.5 },
                colors: ['#14b8a6', '#8b5cf6', '#f59e0b', '#ec4899'],
            });
            setTimeout(() => confetti({ particleCount: 100, spread: 60, origin: { y: 0.4 } }), 800);
        }
    }, [passed]);

    if (reviewMode) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500 p-4">
                <div className="max-w-lg mx-auto pt-4">
                    <button
                        onClick={() => setReviewMode(false)}
                        className="text-white/80 hover:text-white flex items-center gap-1 text-sm font-semibold mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Results
                    </button>
                    <h2 className="text-white text-xl font-bold mb-4">Answer Review</h2>
                    <div className="flex flex-col gap-4 pb-6">
                        {questions.map((q, idx) => {
                            const chosen = userAnswers[q.id];
                            const isCorrect = chosen === q.correctAnswerIndex;
                            return (
                                <motion.div
                                    key={q.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="glass-card rounded-2xl p-4"
                                >
                                    <div className="flex items-start gap-2 mb-3">
                                        {isCorrect
                                            ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                                        <p className="text-slate-800 font-semibold text-sm">{q.question}</p>
                                    </div>
                                    {q.options.map((opt, i) => {
                                        let cls = 'text-xs px-3 py-2 rounded-lg mb-1 ';
                                        if (i === q.correctAnswerIndex) cls += 'bg-emerald-100 text-emerald-700 font-semibold border border-emerald-300';
                                        else if (i === chosen && !isCorrect) cls += 'bg-red-100 text-red-700 border border-red-300';
                                        else cls += 'bg-slate-50 text-slate-500';
                                        return <div key={i} className={cls}>{opt}</div>;
                                    })}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="glass-card rounded-3xl p-8 text-center"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
                        className={`text-7xl mb-4 ${passed ? '' : 'grayscale'}`}
                    >
                        {passed ? '🏆' : '📚'}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`text-4xl font-extrabold mb-1 ${passed ? 'text-emerald-600' : 'text-red-500'}`}
                    >
                        {passed ? 'PASS' : 'FAIL'}
                    </motion.h2>
                    <p className="text-slate-500 text-sm mb-6">
                        {passed ? '🎉 Excellent! You passed the mock exam!' : 'You need 35/50 to pass. Keep practicing!'}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-emerald-50 rounded-xl p-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                            <p className="text-2xl font-bold text-emerald-600">{score}</p>
                            <p className="text-xs text-emerald-500">Correct</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3">
                            <XCircle className="w-5 h-5 text-red-500 mx-auto mb-1" />
                            <p className="text-2xl font-bold text-red-600">{total - score}</p>
                            <p className="text-xs text-red-500">Wrong</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-3">
                            <span className="text-blue-500 text-lg block text-center">🎯</span>
                            <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
                            <p className="text-xs text-blue-500">Accuracy</p>
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm mb-4">
                        Pass mark: 35 / 50 &nbsp;|&nbsp; You scored: <strong className="text-slate-700">{score} / {total}</strong>
                    </p>

                    <div className="flex flex-col gap-3">
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={() => setReviewMode(true)}
                            className="w-full py-3 rounded-xl bg-amber-100 text-amber-700 font-semibold hover:bg-amber-200 transition-all"
                        >
                            📋 Review All Answers
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/mock-test')}
                            className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all"
                        >
                            🔄 Retry Mock Exam
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-3 rounded-xl btn-gradient font-semibold flex items-center justify-center gap-2"
                        >
                            <Home className="w-4 h-4" /> Back to Dashboard
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MockResult;
