import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getQuestionsForRound } from '../utils/examEngine';
import { getProgress } from '../utils/storage';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { ArrowLeft } from 'lucide-react';

const Round = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const roundId = parseInt(id, 10);

    const progress = getProgress();
    const { completedRounds = [] } = progress;

    // Guard: only allow access if round is unlocked
    const nextAvailable = completedRounds.length + 1;
    const isReviewMode = completedRounds.includes(roundId);
    const isAvailable = roundId <= nextAvailable;

    const questions = getQuestionsForRound(roundId);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (!isAvailable) {
            navigate('/dashboard');
        }
    }, [isAvailable, navigate]);

    const handleAnswer = useCallback((selectedIdx) => {
        const question = questions[currentIndex];
        const newAnswers = { ...userAnswers, [question.id]: selectedIdx };
        setUserAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setDirection(1);
            setCurrentIndex(i => i + 1);
        } else {
            // Navigate to result
            navigate('/result', {
                state: {
                    roundId,
                    questions,
                    userAnswers: newAnswers,
                    isReviewMode,
                },
            });
        }
    }, [currentIndex, questions, userAnswers, roundId, navigate, isReviewMode]);

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-600 text-lg">No questions found for this round.</p>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-600 p-4">
            <div className="max-w-lg mx-auto pt-4">
                {/* Nav */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-white/80 hover:text-white flex items-center gap-1 text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Dashboard
                    </button>
                    <div className="text-white font-bold text-sm bg-white/20 px-3 py-1 rounded-full">
                        Round {roundId}
                    </div>
                </div>

                {/* Progress */}
                <div className="glass-card rounded-2xl p-4 mb-4">
                    <div className="flex justify-between text-sm font-semibold text-slate-600 mb-2">
                        <span>Question {currentIndex + 1} of {questions.length}</span>
                        <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
                    </div>
                    <ProgressBar current={currentIndex + 1} total={questions.length} />
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                    <QuestionCard
                        key={currentQuestion.id}
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        onAnswer={handleAnswer}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Round;
