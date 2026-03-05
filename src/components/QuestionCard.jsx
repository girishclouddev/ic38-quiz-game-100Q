import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuestionCard = ({ question, options, onAnswer }) => {
    const [selectedIdx, setSelectedIdx] = useState(null);

    const handleSelect = (idx) => {
        if (selectedIdx !== null) return; // prevent double click
        setSelectedIdx(idx);
        setTimeout(() => {
            onAnswer(idx);
            setSelectedIdx(null);
        }, 400);
    };

    return (
        <motion.div
            className="glass-card p-6 rounded-2xl shadow-lg w-full max-w-lg mb-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            <h2 className="text-xl font-bold mb-6 text-slate-800">{question}</h2>
            <div className="flex flex-col gap-3">
                {options.map((option, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelect(idx)}
                            className={
                                'p-4 rounded-xl text-left font-medium transition-all shadow-sm border ' +
                                (isSelected
                                    ? 'bg-primary-500 text-white border-primary-600 shadow-md'
                                    : 'bg-white text-slate-700 hover:bg-primary-50 hover:border-primary-200 border-slate-200')
                            }
                        >
                            {option}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default QuestionCard;
