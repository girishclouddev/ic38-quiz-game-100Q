import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const Timer = ({ initialSeconds, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft(t => t - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const pct = timeLeft / initialSeconds;
    const isUrgent = pct < 0.2;

    return (
        <motion.div
            animate={{ scale: isUrgent ? [1, 1.05, 1] : 1 }}
            transition={{ repeat: isUrgent ? Infinity : 0, duration: 0.8 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg shadow-md
        ${isUrgent ? 'bg-red-100 text-red-600 border-2 border-red-400' : 'bg-white text-slate-700 border border-slate-200'}`}
        >
            <Clock className="w-5 h-5" />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </motion.div>
    );
};

export default Timer;
