import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { evaluateRound } from '../utils/examEngine';
import { updateRoundResult, getProgress } from '../utils/storage';
import { getTotalRounds } from '../utils/examEngine';
import ResultCard from '../components/ResultCard';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const TOTAL_ROUNDS = getTotalRounds();

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { roundId, questions = [], userAnswers = {}, isReviewMode = false } = location.state || {};

    const [reviewMode, setReviewMode] = useState(false);

    if (!questions.length || !roundId) {
        navigate('/dashboard');
        return null;
    }

    const { score, total, accuracy, wrongAnswers } = evaluateRound(questions, userAnswers);

    // Save the result (idempotent – only saves on first completion)
    if (!isReviewMode) {
        updateRoundResult(roundId, score, userAnswers);
    }

    const allRoundsCompleted = getProgress().completedRounds.length >= TOTAL_ROUNDS;
    const nextRoundId = roundId + 1;

    const handleNext = () => {
        if (allRoundsCompleted) {
            navigate('/dashboard');
        } else if (nextRoundId <= TOTAL_ROUNDS) {
            navigate(`/round/${nextRoundId}`);
        } else {
            navigate('/dashboard');
        }
    };

    const handleRetry = () => {
        navigate(`/round/${roundId}`);
    };

    if (reviewMode) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-600 p-4">
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
                                    transition={{ delay: idx * 0.05 }}
                                    className="glass-card rounded-2xl p-4"
                                >
                                    <div className="flex items-start gap-2 mb-3">
                                        {isCorrect
                                            ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                                        <p className="text-slate-800 font-semibold text-sm">{q.question}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {q.options.map((opt, i) => {
                                            let cls = 'text-xs px-3 py-2 rounded-lg ';
                                            if (i === q.correctAnswerIndex) cls += 'bg-emerald-100 text-emerald-700 font-semibold border border-emerald-300';
                                            else if (i === chosen && !isCorrect) cls += 'bg-red-100 text-red-700 border border-red-300';
                                            else cls += 'bg-slate-50 text-slate-500';
                                            return <div key={i} className={cls}>{opt}</div>;
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-600 p-4 flex items-center justify-center">
            <div className="w-full max-w-md">
                <AnimatePresence>
                    <ResultCard
                        score={score}
                        total={total}
                        accuracy={accuracy}
                        wrongAnswers={wrongAnswers}
                        onReview={() => setReviewMode(true)}
                        onRetry={handleRetry}
                        onNext={handleNext}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Result;
