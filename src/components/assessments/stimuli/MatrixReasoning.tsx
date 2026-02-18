import { useState } from 'react';

interface MatrixReasoningProps {
    matrixConfig: any;
    onComplete: (response: number, rt: number) => void;
}

export const MatrixReasoning: React.FC<MatrixReasoningProps> = ({
    matrixConfig,
    onComplete
}) => {
    const [startTime] = useState(Date.now());
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

    const handleChoiceClick = (index: number) => {
        setSelectedChoice(index);
    };

    const handleSubmit = () => {
        if (selectedChoice !== null) {
            const rt = Date.now() - startTime;
            onComplete(selectedChoice, rt);
        }
    };

    return (
        <div className="flex flex-col items-center justify-between h-full w-full py-4 space-y-8 animate-in fade-in duration-500">
            {/* The 3x3 Grid */}
            <div className="bg-white/60 p-6 rounded-3xl border border-white/80 shadow-inner">
                <div className="grid grid-cols-3 gap-2 bg-[#5E5574]/5 p-2 rounded-xl">
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-28 h-28 rounded-lg flex items-center justify-center text-3xl
                                ${idx === 8 ? 'bg-white/80 border-2 border-dashed border-[#5E5574]/20' : 'bg-white border border-[#5E5574]/10 shadow-sm'}
                            `}
                        >
                            {idx === 8 ? (
                                <span className="text-4xl font-light text-[#5E5574]/10">?</span>
                            ) : (
                                <div className="text-[#5E5574]/70">
                                    {/* Placeholder for actual patterns */}
                                    {matrixConfig.type === 'quantity' ? (
                                        <div className="grid grid-cols-2 gap-1">
                                            {Array.from({ length: idx + 1 }).map((__, s) => (
                                                <div key={s} className="w-4 h-4 rounded-full bg-current" />
                                            ))}
                                        </div>
                                    ) : (
                                        <span>◈</span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[1px] w-full max-w-xl bg-[#5E5574]/10" />

            {/* Answer Choices */}
            <div className="w-full text-center">
                <p className="text-sm text-[#5E5574]/40 uppercase tracking-widest mb-6 font-medium">Select the best fit</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-2xl mx-auto">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoiceClick(idx)}
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl transition-all
                                ${selectedChoice === idx
                                    ? 'bg-[#5E5574] text-white ring-4 ring-[#5E5574]/20 scale-105 shadow-xl'
                                    : 'bg-white/80 text-[#5E5574]/40 border border-[#5E5574]/10 hover:bg-white hover:border-[#5E5574]/30'
                                }
                            `}
                        >
                            <div className="opacity-80">
                                {matrixConfig.type === 'quantity' ? (
                                    <div className="grid grid-cols-2 gap-1 scale-75">
                                        {Array.from({ length: 9 }).map((__, s) => (
                                            <div key={s} className="w-3 h-3 rounded-full bg-current" />
                                        ))}
                                    </div>
                                ) : (
                                    <span>◈</span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={handleSubmit}
                    disabled={selectedChoice === null}
                    className={`px-12 py-3 rounded-full font-medium transition-all shadow-lg
                        ${selectedChoice !== null
                            ? 'bg-[#5E5574] text-white hover:bg-[#4A445C] hover:translate-y-[-2px] active:scale-95'
                            : 'bg-[#5E5574]/10 text-[#5E5574]/30 cursor-not-allowed'
                        }
                    `}
                >
                    Submit Answer
                </button>
            </div>
        </div>
    );
};
