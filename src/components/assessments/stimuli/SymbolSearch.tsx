import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface SymbolSearchProps {
    targets: string[];
    searchArray: string[];
    onComplete: (response: boolean, rt: number) => void;
}

export const SymbolSearch: React.FC<SymbolSearchProps> = ({
    targets,
    searchArray,
    onComplete
}) => {
    const [startTime] = useState(Date.now());

    const handleResponse = (exists: boolean) => {
        const rt = Date.now() - startTime;
        onComplete(exists, rt);
    };

    return (
        <div className="flex flex-col items-center justify-between h-full w-full py-8 space-y-12">
            <div className="text-center">
                <p className="text-sm text-[#5E5574]/40 uppercase tracking-widest mb-6 font-medium">Target Symbols</p>
                <div className="flex gap-8">
                    {targets.map((target, idx) => (
                        <div
                            key={idx}
                            className="w-24 h-24 glassmorphism rounded-2xl flex items-center justify-center text-5xl text-[#5E5574] shadow-sm animate-in zoom-in-75 duration-300"
                        >
                            {target}
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[2px] w-full max-w-lg bg-gradient-to-r from-transparent via-[#5E5574]/10 to-transparent" />

            <div className="text-center">
                <p className="text-sm text-[#5E5574]/40 uppercase tracking-widest mb-6 font-medium">Search Group</p>
                <div className="flex flex-wrap justify-center gap-4 max-w-xl">
                    {searchArray.map((symbol, idx) => (
                        <div
                            key={idx}
                            className="w-20 h-20 bg-white/40 border border-white/60 rounded-xl flex items-center justify-center text-4xl text-[#5E5574]/80 shadow-sm transition-transform hover:scale-105"
                        >
                            {symbol}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-8 w-full max-w-md pt-8">
                <button
                    onClick={() => handleResponse(true)}
                    className="flex-1 py-6 bg-[#10B981] text-white rounded-3xl flex flex-col items-center justify-center gap-2 transition-all hover:bg-[#059669] hover:shadow-lg active:scale-95 shadow-md"
                >
                    <Check size={32} />
                    <span className="font-semibold text-lg">YES</span>
                    <span className="text-[10px] opacity-60 uppercase tracking-wider">Present</span>
                </button>

                <button
                    onClick={() => handleResponse(false)}
                    className="flex-1 py-6 bg-[#FB7185] text-white rounded-3xl flex flex-col items-center justify-center gap-2 transition-all hover:bg-[#E11D48] hover:shadow-lg active:scale-95 shadow-md"
                >
                    <X size={32} />
                    <span className="font-semibold text-lg">NO</span>
                    <span className="text-[10px] opacity-60 uppercase tracking-wider">Absent</span>
                </button>
            </div>

            <p className="text-xs text-[#5E5574]/40 font-medium">
                Does either target symbol appear in the search group?
            </p>
        </div>
    );
};
