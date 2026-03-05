import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getQuestionsForMockTest } from '../utils/examEngine';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import { ArrowLeft } from 'lucide-react';

const MOCK_DURATION = 60 * 60; // 60 minutes in seconds

const MockTest = () => {
    const navigate = useNavigate();
    const [questions] = useState(() => getQuestionsForMockTest());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback((answers) => {
        if (submitted) return;
        setSubmitted(true);
        navigate('/mock-result', { state: { questions, userAnswers: answers } });
    }, [submitted, navigate, questions]);

    const handleAnswer = useCallback((selectedIdx) => {
        const question = questions[currentIndex];
        const newAnswers = { ...userAnswers, [question.id]: selectedIdx };
        setUserAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1);
        } else {
            handleSubmit(newAnswers);
        }
    }, [currentIndex, questions, userAnswers, handleSubmit]);

    const handleTimeUp = useCallback(() => {
        handleSubmit(userAnswers);
    }, [handleSubmit, userAnswers]);

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <p className="text-lg text-slate-600">Could not load mock test questions.</p>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500 p-4">
            <div className="max-w-lg mx-auto pt-4">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-white/70 hover:text-white flex items-center gap-1 text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Exit
                    </button>
                    <div className="text-white font-bold text-sm bg-white/20 px-3 py-1 rounded-full">
                        🏆 Mock Exam
                    </div>
                    <Timer initialSeconds={MOCK_DURATION} onTimeUp={handleTimeUp} />
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

                {/* Submit early button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSubmit(userAnswers)}
                    className="w-full py-3 rounded-xl bg-white/20 border border-white/30 text-white font-semibold hover:bg-white/30 transition-all"
                >
                    Submit Exam
                </motion.button>
            </div>
        </div>
    );
};

export default MockTest;
