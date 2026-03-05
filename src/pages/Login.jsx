import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../utils/auth';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const success = loginUser(username.trim(), password);
            if (success) {
                navigate('/dashboard');
            } else {
                setError('Invalid username or password.');
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-600 p-4">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="glass-card rounded-3xl p-8 w-full max-w-sm"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
                        className="inline-flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-2xl w-16 h-16 shadow-lg mb-4"
                    >
                        <BookOpen className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-extrabold text-slate-800">LIC IC-38</h1>
                    <p className="text-slate-500 text-sm mt-1">Exam Practice Portal</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. admin1"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-700"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-700 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(p => !p)}
                            className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm text-center font-medium"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="btn-gradient py-3 rounded-xl font-bold text-lg mt-2 disabled:opacity-60"
                    >
                        {loading ? 'Logging in…' : 'Login →'}
                    </motion.button>
                </form>

                <p className="text-center text-slate-400 text-xs mt-6">
                    Use: admin1 / admin1 &nbsp;|&nbsp; admin2 / admin2 &nbsp;|&nbsp; admin3 / admin3
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
