import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Target } from 'lucide-react';

const ResultCard = ({ score, total, accuracy, wrongAnswers = [], onReview, onRetry, onNext, isPassed }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 w-full max-w-md mx-auto text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                className="text-6xl mb-4"
            >
                {accuracy >= 70 ? '🎉' : accuracy >= 50 ? '👍' : '💪'}
            </motion.div>

            <h2 className="text-2xl font-extrabold text-slate-800 mb-1">
                {isPassed !== undefined
                    ? (isPassed ? '🏆 PASS' : '❌ FAIL')
                    : 'Round Complete!'}
            </h2>
            <p className="text-slate-500 mb-6 text-sm">
                {isPassed !== undefined
                    ? (isPassed ? 'Congratulations! You cleared the mock exam!' : 'Keep practicing. You can do it!')
                    : 'Great effort! Here are your results:'}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-xl p-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-emerald-600">{score}</p>
                    <p className="text-xs text-emerald-500">Correct</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                    <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-red-600">{total - score}</p>
                    <p className="text-xs text-red-500">Wrong</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                    <Target className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
                    <p className="text-xs text-blue-500">Accuracy</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {onReview && (
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onReview}
                        className="w-full py-3 rounded-xl bg-amber-100 text-amber-700 font-semibold hover:bg-amber-200 transition-all"
                    >
                        📋 Review Answers
                    </motion.button>
                )}
                {onRetry && (
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onRetry}
                        className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all"
                    >
                        🔄 Retry Round
                    </motion.button>
                )}
                {onNext && (
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onNext}
                        className="w-full py-3 rounded-xl btn-gradient font-semibold"
                    >
                        Next Round →
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

export default ResultCard;
