import { useState, useEffect } from 'react';
import { Brain, Search, ChevronRight, Activity, Target, Shield } from 'lucide-react';
import { cognitiveDimensions } from '../../assessments/cognitiveDimensions';
import { testBattery } from '../../assessments/testBattery';
import type { CognitiveDimensionId, AssessmentLevel, AssessmentTest } from '../../assessments/types';

interface AssessmentSelectorProps {
    onSelect: (test: AssessmentTest, studentId: string) => void;
}

export default function AssessmentSelector({ onSelect }: AssessmentSelectorProps) {
    const [students, setStudents] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<string>('');
    const [selectedDimension, setSelectedDimension] = useState<CognitiveDimensionId | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<AssessmentLevel>('standard');

    useEffect(() => {
        // In a real app, this would be filtered by current tutor's students
        const loadStudents = async () => {
            // For demo, we'll try to find any registered students or use mockData
            // setStudents([{ id: 'student-001', firstName: 'Joshua', lastName: 'Helvadjian', grade: 8 }]);
            const mockStudents = [{ id: 'student-001', firstName: 'Joshua', lastName: 'Helvadjian', grade: 8 }];
            setStudents(mockStudents);
        };
        loadStudents();
    }, []);

    const availableTests = testBattery.filter(t =>
        (!selectedDimension || t.dimensionId === selectedDimension) &&
        t.level === selectedLevel
    );

    return (
        <div className="assessment-selector space-y-8 animate-fadeIn">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">New Assessment</h2>
                    <p className="text-gray-500">Select a student and diagnostic protocol to begin.</p>
                </div>
                <div className="flex gap-2">
                    {(['screener', 'standard', 'diagnostic'] as AssessmentLevel[]).map(level => (
                        <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedLevel === level
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                    : 'bg-white text-gray-400 border border-gray-100 hover:border-purple-200'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Student Selection */}
                <div className="glass-card p-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <Search size={14} /> 1. Select Student
                    </label>
                    <div className="space-y-3">
                        {students.map(s => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedStudent(s.id)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${selectedStudent === s.id
                                        ? 'border-purple-500 bg-purple-50/50 shadow-sm'
                                        : 'border-gray-100 bg-white hover:border-purple-200'
                                    }`}
                            >
                                <div>
                                    <div className="font-semibold text-gray-800">{s.firstName} {s.lastName}</div>
                                    <div className="text-xs text-gray-500">Year {s.grade} Academy Member</div>
                                </div>
                                {selectedStudent === s.id && <ChevronRight size={18} className="text-purple-500" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dimension Selection */}
                <div className="glass-card p-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <Activity size={14} /> 2. Focus Area
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        {cognitiveDimensions.map(dim => (
                            <button
                                key={dim.id}
                                onClick={() => setSelectedDimension(dim.id)}
                                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${selectedDimension === dim.id
                                        ? 'border-purple-500 bg-purple-50/50'
                                        : 'border-gray-100 bg-white hover:border-purple-200'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${selectedDimension === dim.id ? 'bg-purple-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                    <Brain size={16} />
                                </div>
                                <span className={`text-sm font-medium ${selectedDimension === dim.id ? 'text-purple-700' : 'text-gray-600'}`}>
                                    {dim.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Protocol Selection */}
                <div className="glass-card p-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <Target size={14} /> 3. Select Protocol
                    </label>
                    <div className="space-y-4">
                        {availableTests.length > 0 ? (
                            availableTests.map(test => (
                                <button
                                    key={test.id}
                                    disabled={!selectedStudent}
                                    onClick={() => onSelect(test, selectedStudent)}
                                    className={`w-full text-left p-5 rounded-2xl border bg-white shadow-sm transition-all group ${!selectedStudent ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-400 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-800 group-hover:text-purple-700">{test.name}</h4>
                                        <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-1 rounded-md font-bold uppercase">
                                            {test.durationMinutes}m
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                        {test.instructions?.[0] || 'Standardized psychometric test protocol.'}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                            <Shield size={10} />
                                            Reliability: {test.reliability}
                                        </div>
                                        <div className="text-purple-600 font-bold text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Begin <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-100 rounded-3xl">
                                <Brain size={40} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-sm text-gray-400 font-medium">No tests found for this criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
      `}</style>
        </div>
    );
}
