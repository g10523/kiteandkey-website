import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DigitSpanProps {
    mode: 'forward' | 'backward';
    sequence: number[];
    onComplete: (response: number[], responseTime: number) => void;
    onCancel: () => void;
}

export const DigitSpan: React.FC<DigitSpanProps> = ({
    mode,
    sequence,
    onComplete,
    onCancel
}) => {
    const [phase, setPhase] = useState<'instructions' | 'showing' | 'recall' | 'feedback'>('instructions');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [response, setResponse] = useState<string[]>([]);
    const [startTime, setStartTime] = useState(0);
    const [showingComplete, setShowingComplete] = useState(false);

    // Sequential digit display
    useEffect(() => {
        if (phase === 'showing') {
            const interval = setInterval(() => {
                if (currentIndex < sequence.length) {
                    setCurrentIndex(i => i + 1);
                } else {
                    clearInterval(interval);
                    setShowingComplete(true);
                    setTimeout(() => {
                        setPhase('recall');
                        setStartTime(Date.now());
                    }, 500);
                }
            }, 1000); // 1 second per digit

            return () => clearInterval(interval);
        }
    }, [phase, currentIndex, sequence.length]);

    const handleStart = () => {
        setPhase('showing');
        setCurrentIndex(0);
        setResponse([]);
        setShowingComplete(false);
    };

    const handleDigitInput = useCallback((digit: string) => {
        if (response.length < sequence.length) {
            const newResponse = [...response, digit];
            setResponse(newResponse);

            // Auto-submit when complete
            if (newResponse.length === sequence.length) {
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                const numericResponse = newResponse.map(n => parseInt(n));

                setPhase('feedback');

                setTimeout(() => {
                    onComplete(numericResponse, responseTime);
                }, 800);
            }
        }
    }, [response, sequence.length, startTime, onComplete]);

    const handleBackspace = () => {
        if (response.length > 0) {
            setResponse(prev => prev.slice(0, -1));
        }
    };

    const handleReplay = () => {
        setResponse([]);
        setPhase('showing');
        setCurrentIndex(0);
        setShowingComplete(false);
    };

    // Instructions phase
    if (phase === 'instructions') {
        return (
            <div className="text-center space-y-6 p-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-br from-[#5E5574]/10 to-[#5E5574]/5 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                    <span className="text-4xl">🧠</span>
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl text-[#5E5574] font-light"
                >
                    {mode === 'forward' ? 'Remember the Order' : 'Reverse the Order'}
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#5E5574]/70 max-w-md mx-auto leading-relaxed"
                >
                    {mode === 'forward'
                        ? 'Numbers will appear one at a time. Enter them in the SAME order you see them.'
                        : 'Numbers will appear one at a time. Enter them in REVERSE order (backwards).'}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#5E5574]/5 border border-[#5E5574]/20 rounded-xl p-4 max-w-sm mx-auto"
                >
                    <p className="text-sm text-[#5E5574]/60">
                        Example: {mode === 'forward' ? '3 → 7 → 2' : '5 → 9'}<br />
                        You enter: {mode === 'forward' ? '3, 7, 2' : '9, 5'}
                    </p>
                </motion.div>

                <div className="flex gap-4 justify-center pt-4">
                    <button
                        onClick={handleStart}
                        className="px-8 py-3 bg-[#5E5574] text-white rounded-full hover:bg-[#4A445C] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Start
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-8 py-3 border-2 border-[#5E5574]/30 text-[#5E5574] rounded-full hover:bg-[#5E5574]/5 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    // Showing digits phase
    if (phase === 'showing') {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <AnimatePresence mode="wait">
                    {currentIndex < sequence.length ? (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut"
                            }}
                            className="text-9xl font-light text-[#5E5574] select-none"
                        >
                            {sequence[currentIndex]}
                        </motion.div>
                    ) : showingComplete ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#5E5574]/60 text-xl font-light"
                        >
                            Get ready to recall...
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                {/* Progress dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {sequence.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i < currentIndex ? 'bg-[#5E5574]' : 'bg-[#D9CFF2]'
                                }`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Recall phase
    if (phase === 'recall') {
        return (
            <div className="text-center space-y-6 p-4">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#5E5574]/70 mb-4"
                >
                    {mode === 'forward' ? 'Enter the numbers in order:' : 'Enter the numbers in REVERSE order:'}
                </motion.p>

                {/* Response boxes */}
                <div className="flex justify-center gap-2 mb-6">
                    {sequence.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-medium transition-all ${i < response.length
                                    ? 'border-[#5E5574] bg-[#5E5574]/10 text-[#5E5574] scale-105'
                                    : i === response.length
                                        ? 'border-[#F59E0B] bg-[#F59E0B]/5 animate-pulse'
                                        : 'border-[#D9CFF2] bg-white/50 text-transparent'
                                }`}
                        >
                            {response[i] || ''}
                        </motion.div>
                    ))}
                </div>

                {/* Number pad */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-3 gap-3 max-w-xs mx-auto"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button
                            key={num}
                            onClick={() => handleDigitInput(num.toString())}
                            disabled={response.length >= sequence.length}
                            className="h-14 rounded-xl bg-white border-2 border-[#D9CFF2] text-[#5E5574] text-xl font-medium hover:bg-[#5E5574]/10 hover:border-[#5E5574] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm hover:shadow-md"
                        >
                            {num}
                        </button>
                    ))}

                    {/* Backspace */}
                    <button
                        onClick={handleBackspace}
                        disabled={response.length === 0}
                        className="h-14 rounded-xl bg-[#FB7185]/10 border-2 border-[#FB7185]/30 text-[#FB7185] hover:bg-[#FB7185]/20 hover:border-[#FB7185] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        ⌫
                    </button>

                    {/* Zero */}
                    <button
                        onClick={() => handleDigitInput('0')}
                        disabled={response.length >= sequence.length}
                        className="h-14 rounded-xl bg-white border-2 border-[#D9CFF2] text-[#5E5574] text-xl font-medium hover:bg-[#5E5574]/10 hover:border-[#5E5574] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                    >
                        0
                    </button>

                    {/* Replay */}
                    <button
                        onClick={handleReplay}
                        className="h-14 rounded-xl bg-[#F59E0B]/10 border-2 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/20 hover:border-[#F59E0B] hover:scale-105 active:scale-95 transition-all text-sm font-medium"
                    >
                        🔄 Replay
                    </button>
                </motion.div>
            </div>
        );
    }

    // Feedback phase (brief)
    if (phase === 'feedback') {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-8xl"
                >
                    ✓
                </motion.div>
            </div>
        );
    }

    return null;
};
