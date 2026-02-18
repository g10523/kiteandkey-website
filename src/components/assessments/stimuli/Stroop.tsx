import { useState } from 'react';

interface StroopProps {
    text: string;
    color: string;
    choices: string[];
    onComplete: (response: string, rt: number) => void;
}

export const Stroop: React.FC<StroopProps> = ({
    text,
    color,
    choices,
    onComplete
}) => {
    const [startTime] = useState(Date.now());
    const [hasResponded, setHasResponded] = useState(false);

    const handleResponse = (choice: string) => {
        if (!hasResponded) {
            setHasResponded(true);
            const rt = Date.now() - startTime;
            onComplete(choice, rt);
        }
    };

    return (
        <div className="flex flex-col items-center justify-between h-full w-full py-8 space-y-12">
            <div className="text-center mb-4">
                <span className="inline-block px-4 py-1 bg-[#5E5574]/10 rounded-full text-xs font-semibold text-[#5E5574]/60 uppercase tracking-widest">
                    Inhibition Test
                </span>
            </div>

            <div
                className="text-7xl font-bold transition-all duration-300 transform animate-in slide-in-from-top-4"
                style={{ color: color.toLowerCase() }}
            >
                {text.toUpperCase()}
            </div>

            <div className="w-full max-w-md pt-8">
                <p className="text-sm text-[#5E5574]/40 uppercase tracking-widest mb-6 font-medium text-center">Name the text color</p>
                <div className="grid grid-cols-2 gap-4">
                    {choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleResponse(choice)}
                            disabled={hasResponded}
                            className={`py-4 rounded-2xl font-semibold text-lg transition-all shadow-sm border border-[#5E5574]/10
                                ${hasResponded
                                    ? 'bg-[#5E5574]/05 text-[#5E5574]/20 cursor-not-allowed'
                                    : 'bg-white text-[#5E5574] hover:bg-[#5E5574] hover:text-white hover:shadow-lg active:scale-95'
                                }
                            `}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-xs text-[#5E5574]/40 font-medium max-w-xs text-center leading-relaxed italic">
                Ignore the word itself. Quickly select the actual <strong>color</strong> of the text.
            </p>
        </div>
    );
};
