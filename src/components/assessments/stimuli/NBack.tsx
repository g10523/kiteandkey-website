import { useState, useEffect } from 'react';

interface NBackProps {
    n: number;
    stimulus: number;
    onComplete: (isMatch: boolean, rt: number) => void;
}

export const NBack: React.FC<NBackProps> = ({
    n,
    stimulus,
    onComplete
}) => {
    const [startTime] = useState(Date.now());
    const [hasResponded, setHasResponded] = useState(false);

    const handleResponse = (isMatch: boolean) => {
        if (!hasResponded) {
            setHasResponded(true);
            const rt = Date.now() - startTime;
            onComplete(isMatch, rt);
        }
    };

    // Auto-complete if no response within window
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasResponded) {
                handleResponse(false); // Omission is treated as 'no match'
            }
        }, 2000); // 2 second response window

        return () => clearTimeout(timer);
    }, [hasResponded]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full py-8 space-y-12">
            <div className="text-center mb-4">
                <span className="inline-block px-4 py-1 bg-[#5E5574]/10 rounded-full text-xs font-semibold text-[#5E5574]/60 uppercase tracking-widest">
                    {n}-Back Challenge
                </span>
            </div>

            <div className="w-56 h-56 glassmorphism rounded-[3rem] flex items-center justify-center text-8xl font-light text-[#5E5574] shadow-2xl border-2 border-white/80 animate-in zoom-in-95 duration-200">
                {stimulus}
            </div>

            <div className="flex gap-6 w-full max-w-sm pt-8">
                <button
                    onClick={() => handleResponse(true)}
                    disabled={hasResponded}
                    className={`flex-1 py-5 rounded-3xl font-bold text-lg transition-all flex flex-col items-center justify-center gap-1 shadow-md
                        ${hasResponded
                            ? 'bg-[#5E5574]/05 text-[#5E5574]/20 cursor-not-allowed'
                            : 'bg-[#5E5574] text-white hover:bg-[#4A445C] hover:shadow-xl active:scale-95'
                        }
                    `}
                >
                    MATCH
                    <span className="text-[10px] font-normal opacity-60 uppercase tracking-widest">Spacebar</span>
                </button>
            </div>

            <p className="text-xs text-[#5E5574]/40 font-medium max-w-xs text-center leading-relaxed">
                Respond ONLY if this number matches the one shown <strong>{n} steps</strong> ago.
            </p>
        </div>
    );
};
