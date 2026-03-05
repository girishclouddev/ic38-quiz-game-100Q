import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
    const percentage = Math.min((current / total) * 100, 100);

    return (
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                animate={{ width: percentage + '%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        </div>
    );
};

export default ProgressBar;
