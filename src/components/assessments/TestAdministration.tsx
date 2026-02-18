import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, BookOpen, AlertCircle, Info } from 'lucide-react';
import type { AssessmentTest } from '../../assessments/types';

interface TestAdministrationProps {
    test: AssessmentTest;
    onNext: () => void;
}

export default function TestAdministration({ test, onNext }: TestAdministrationProps) {
    const [seconds, setSeconds] = useState(test.durationMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        let interval: any = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setSeconds(test.durationMinutes * 60);
    };

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="test-admin grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            {/* Protocol Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                <div className="glass-card p-6">
                    <label className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-4 block">Timer Control</label>
                    <div className="text-5xl font-mono font-light text-gray-800 mb-6 flex justify-center tracking-tighter">
                        {formatTime(seconds)}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleTimer}
                            className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isActive ? 'bg-amber-100 text-amber-700' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                                }`}
                        >
                            {isActive ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start Test</>}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-colors"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Test Materials</label>
                    <ul className="space-y-3">
                        {test.materials.map((m, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                {m}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-6">
                    <div className="flex gap-3">
                        <Info size={20} className="text-blue-500 shrink-0" />
                        <div>
                            <h5 className="font-bold text-blue-900 text-sm mb-1">Standardization Note</h5>
                            <p className="text-xs text-blue-700 leading-relaxed italic">
                                "Ensure the student has clear line of sight. Maintain a neutral tone during administration. Follow word-for-word instructions."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Instructions Area */}
            <div className="lg:col-span-8">
                <div className="glass-card h-full flex flex-col">
                    <div className="p-8 flex-1 overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-semibold text-gray-800">Administration Protocol</h3>
                            <div className="flex gap-1">
                                {test.instructions.map((_, i) => (
                                    <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i === currentStep ? 'bg-purple-600' : (i < currentStep ? 'bg-purple-200' : 'bg-gray-100')}`} />
                                ))}
                            </div>
                        </div>

                        <div className="min-h-[300px] flex items-center justify-center">
                            <div className="max-w-xl w-full">
                                <div className="bg-purple-50 text-purple-600 rounded-2xl p-4 inline-flex items-center gap-2 font-bold text-xs uppercase mb-6">
                                    <BookOpen size={14} /> Step {currentStep + 1} of {test.instructions.length}
                                </div>
                                <div className="text-2xl font-medium text-gray-700 leading-snug mb-8">
                                    {test.instructions[currentStep]}
                                </div>

                                {currentStep === 0 && (
                                    <div className="flex gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                                        <AlertCircle className="text-amber-500 shrink-0" size={20} />
                                        <p className="text-sm text-amber-800 leading-relaxed">
                                            Ensure the student is comfortable and seated in a quiet environment before proceeding. Check that no visual aids are present.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-gray-100 flex justify-between bg-white/30 rounded-b-[32px]">
                        <button
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className={`px-6 py-3 rounded-2xl font-bold transition-all ${currentStep === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>

                        {currentStep < test.instructions.length - 1 ? (
                            <button
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                className="bg-gray-800 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2"
                            >
                                Next Step <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={onNext}
                                className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center gap-2"
                            >
                                Go to Scoring <ChevronRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
        }
      `}</style>
        </div>
    );
}
