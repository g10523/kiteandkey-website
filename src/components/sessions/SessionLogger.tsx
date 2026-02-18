import { useState, useRef } from 'react';
import { AlertTriangle, Clock, Play, ChevronRight, Save, ClipboardList, PenTool } from 'lucide-react';
import type { AssignedIntervention, SessionLog } from '../../interventions/interventionEngine';

export const SessionLogger: React.FC<{
    intervention: AssignedIntervention;
    onComplete: (log: SessionLog) => void;
    onCancel: () => void;
}> = ({ intervention, onComplete, onCancel }) => {
    const [step, setStep] = useState<'pre' | 'during' | 'post'>('pre');
    const [log, setLog] = useState<Partial<SessionLog>>({
        interventionId: intervention.id,
        scheduledDate: new Date(),
        fidelity: {
            protocolStepsCompleted: [],
            materialsUsed: [],
            scriptAdherence: 'full',
            adaptationsMade: ''
        },
        studentResponse: {
            engagementLevel: 3,
            difficultyRating: 3,
            strategyUse: 'prompted',
            breakthroughMoments: [],
            frustrationPoints: []
        },
        outcomes: {
            objectiveMet: false,
            evidence: '',
            nextSessionAdjustment: ''
        },
        flags: {
            requiresSupervision: false,
            reassessmentRecommended: false,
            protocolChangeNeeded: false
        }
    });

    const updateFidelity = (key: keyof SessionLog['fidelity'], value: any) => {
        setLog(prev => ({ ...prev, fidelity: { ...prev.fidelity!, [key]: value } }));
    };

    const updateResponse = (key: keyof SessionLog['studentResponse'], value: any) => {
        setLog(prev => ({ ...prev, studentResponse: { ...prev.studentResponse!, [key]: value } }));
    };

    const updateOutcomes = (key: keyof SessionLog['outcomes'], value: any) => {
        setLog(prev => ({ ...prev, outcomes: { ...prev.outcomes!, [key]: value } }));
    };

    const updateFlags = (key: keyof SessionLog['flags'], value: any) => {
        setLog(prev => ({ ...prev, flags: { ...prev.flags!, [key]: value } }));
    };

    return (
        <div className="session-logger bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 shrink-0">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Intervention Protocol</div>
                        <h2 className="text-2xl font-bold">{intervention.title}</h2>
                    </div>
                    <button onClick={onCancel} className="text-white/70 hover:text-white font-bold text-sm">Close</button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8">
                {step === 'pre' && (
                    <PreSessionChecklist
                        intervention={intervention}
                        onConfirm={(materials) => {
                            updateFidelity('materialsUsed', materials);
                            setStep('during');
                        }}
                    />
                )}

                {step === 'during' && (
                    <DuringSessionTracker
                        protocolSteps={intervention.implementation.sessionStructure}
                        onStepComplete={(step) => {
                            const completed = log.fidelity!.protocolStepsCompleted || [];
                            updateFidelity('protocolStepsCompleted', [...completed, step]);
                        }}
                        onFinish={(duration) => {
                            setLog(prev => ({ ...prev, durationMinutes: Math.round(duration / 60) }));
                            setStep('post');
                        }}
                    />
                )}

                {step === 'post' && (
                    <PostSessionReflection
                        log={log}
                        updateFidelity={updateFidelity}
                        updateResponse={updateResponse}
                        updateOutcomes={updateOutcomes}
                        updateFlags={updateFlags}
                        onSubmit={() => {
                            onComplete({
                                ...log,
                                id: `log-${Date.now()}`,
                                actualDate: new Date(),
                                studentId: intervention.targetStudentId,
                                tutorId: 'current-tutor-id' // Mock
                            } as SessionLog);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const PreSessionChecklist: React.FC<{
    intervention: AssignedIntervention;
    onConfirm: (materials: string[]) => void;
}> = ({ intervention, onConfirm }) => {
    const [checked, setChecked] = useState<Set<string>>(new Set());

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                <Clock className="text-blue-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-blue-900 mb-1">Session Preparation</h4>
                    <p className="text-sm text-blue-700">Ensure all materials are ready and the environment is free of distractions.</p>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <ClipboardList className="text-purple-500" size={20} /> Required Materials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {intervention.implementation.materialsNeeded.map(material => (
                        <label key={material} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${checked.has(material) ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-purple-200'}`}>
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-purple-600 mr-3"
                                checked={checked.has(material)}
                                onChange={(e) => {
                                    const newChecked = new Set(checked);
                                    e.target.checked ? newChecked.add(material) : newChecked.delete(material);
                                    setChecked(newChecked);
                                }}
                            />
                            <span className={`font-medium ${checked.has(material) ? 'text-purple-900' : 'text-gray-600'}`}>{material}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Opening Script</h5>
                <blockquote className="text-lg font-medium text-gray-700 italic border-l-4 border-purple-400 pl-4 py-1">
                    "{intervention.implementation.tutorScript}"
                </blockquote>
            </div>

            <button
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${checked.size >= intervention.implementation.materialsNeeded.length
                    ? 'bg-purple-600 text-white shadow-lg hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                disabled={checked.size < intervention.implementation.materialsNeeded.length}
                onClick={() => onConfirm(Array.from(checked))}
            >
                <Play size={20} /> Begin Session
            </button>
        </div>
    );
};

const DuringSessionTracker: React.FC<{
    protocolSteps: string[];
    onStepComplete: (step: string) => void;
    onFinish: (duration: number) => void;
}> = ({ protocolSteps, onStepComplete, onFinish }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const startTime = useRef(Date.now());

    // Timer effect
    useState(() => {
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    });

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleNext = () => {
        onStepComplete(protocolSteps[currentStep]);
        if (currentStep < protocolSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onFinish(elapsed);
        }
    };

    return (
        <div className="h-full flex flex-col animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
                <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono font-bold text-gray-700 flex items-center gap-2">
                    <Clock size={16} /> {formatTime(elapsed)}
                </div>
                <div className="text-sm font-bold text-gray-400">
                    Step {currentStep + 1} of {protocolSteps.length}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-purple-50/50 rounded-3xl border border-purple-100 mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{protocolSteps[currentStep]}</h3>

                {/* Visual progress bar */}
                <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                    <div
                        className="h-full bg-purple-500 transition-all duration-500"
                        style={{ width: `${((currentStep) / protocolSteps.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="py-4 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-700 font-bold flex items-center justify-center gap-2 hover:bg-amber-100 transition-colors">
                    <AlertTriangle size={18} /> Flag Issue
                </button>
                <button
                    onClick={handleNext}
                    className="py-4 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-black shadow-lg transition-all"
                >
                    {currentStep === protocolSteps.length - 1 ? 'Finish Protocol' : 'Next Step'} <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

const PostSessionReflection: React.FC<{
    log: Partial<SessionLog>;
    updateFidelity: (key: any, val: any) => void;
    updateResponse: (key: any, val: any) => void;
    updateOutcomes: (key: any, val: any) => void;
    updateFlags: (key: any, val: any) => void;
    onSubmit: () => void;
}> = ({ log, updateFidelity, updateResponse, updateOutcomes, updateFlags, onSubmit }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <PenTool size={20} className="text-purple-500" /> Session Reflection
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Script Adherence</label>
                        <select
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 transition-all outline-none"
                            value={log.fidelity?.scriptAdherence}
                            onChange={(e) => updateFidelity('scriptAdherence', e.target.value)}
                        >
                            <option value="full">Full Adherence</option>
                            <option value="partial">Partial Adherence</option>
                            <option value="adapted">Adapted / Modified</option>
                            <option value="none">Did not follow script</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Student Engagement (1-5)</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                    key={rating}
                                    onClick={() => updateResponse('engagementLevel', rating)}
                                    className={`flex-1 py-2 rounded-lg font-bold border-2 transition-all ${log.studentResponse?.engagementLevel === rating
                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                        : 'border-gray-100 text-gray-400 hover:border-gray-200'
                                        }`}
                                >
                                    {rating}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-full space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Adaptations or Deviations</label>
                        <textarea
                            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 min-h-[100px] outline-none focus:border-purple-500 transition-all"
                            placeholder="Describe any changes made to the protocol..."
                            value={log.fidelity?.adaptationsMade}
                            onChange={(e) => updateFidelity('adaptationsMade', e.target.value)}
                        />
                    </div>

                    <div className="col-span-full space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Evidence of Outcome</label>
                        <textarea
                            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 min-h-[100px] outline-none focus:border-purple-500 transition-all"
                            placeholder="What specific behavior showed progress (or lack thereof)?"
                            value={log.outcomes?.evidence}
                            onChange={(e) => updateOutcomes('evidence', e.target.value)}
                        />
                    </div>

                    <div className="col-span-full flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <input
                            type="checkbox"
                            className="w-5 h-5 accent-amber-600"
                            checked={log.flags?.requiresSupervision}
                            onChange={(e) => updateFlags('requiresSupervision', e.target.checked)}
                        />
                        <span className="font-medium text-amber-800">Flag for Clinical Lead Review</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onSubmit}
                className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
            >
                <Save size={20} /> Complete Session Log
            </button>
        </div>
    );
};
