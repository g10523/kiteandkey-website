import { useState } from 'react';
import { Plus } from 'lucide-react';
import AssessmentSelector from '../components/assessments/AssessmentSelector';
import TestAdministration from '../components/assessments/TestAdministration';
import ScoreEntry from '../components/assessments/ScoreEntry';
import AssessmentReview from '../components/assessments/AssessmentReview';
import AssessmentOverview from '../components/admin/AssessmentOverview';
import { InterventionQuality } from '../components/admin/InterventionQuality';
import { useData } from '../context/DataContext';
import { SessionLogger } from '../components/sessions/SessionLogger';
import type { AssignedIntervention } from '../interventions/interventionEngine';
import type { AssessmentTest, StudentAssessment } from '../assessments/types';

type AssessmentView = 'dashboard' | 'new-assessment' | 'administration' | 'scoring' | 'review' | 'interventions';

export default function Assessments() {
    const [currentView, setCurrentView] = useState<AssessmentView>('dashboard');
    const [selectedTest, setSelectedTest] = useState<AssessmentTest | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [currentAssessment, setCurrentAssessment] = useState<StudentAssessment | null>(null);
    const [selectedIntervention, setSelectedIntervention] = useState<AssignedIntervention | null>(null);

    const { saveAssessment, saveSessionLog } = useData();

    const handleStartTest = (test: AssessmentTest, studentId: string) => {
        setSelectedTest(test);
        setSelectedStudentId(studentId);
        setCurrentView('administration');
    };

    const handleTestComplete = () => {
        setCurrentView('scoring');
    };

    const handleStartSession = (intervention: AssignedIntervention) => {
        setSelectedIntervention(intervention);
        setCurrentView('interventions');
    };

    const handleSaveResults = async (data: any) => {
        if (!selectedTest || !selectedStudentId) return;

        const newAssessment: Omit<StudentAssessment, 'id' | 'createdAt' | 'updatedAt'> = {
            studentId: selectedStudentId,
            administeredBy: 'Tutor', // In real app, get from auth
            testId: selectedTest.id,
            dimensionId: selectedTest.dimensionId,
            rawScores: {
                total: data.rawTotal,
                subtests: {}
            },
            calculatedResults: data.calculated,
            behavioralObservations: data.observations,
            environmentalFactors: data.environmental,
            recommendations: [],
            nextAssessmentDue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString()
        };

        const saved = await saveAssessment(newAssessment);
        setCurrentAssessment(saved);
        setCurrentView('review');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return (
                    <div className="space-y-12">
                        <header className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Assessment Engine</h1>
                                <p className="text-gray-500 mt-1">Manage diagnostic protocols and student cognitive profiles.</p>
                            </div>
                            <button
                                onClick={() => setCurrentView('new-assessment')}
                                className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center gap-2"
                            >
                                <Plus size={20} /> New Assessment
                            </button>
                        </header>

                        {/* Dashboard Widgets */}
                        <div className="grid grid-cols-1 gap-8">
                            <AssessmentOverview />
                            {/* For Admin/Lead Tutor only */}
                            {/* For Admin/Lead Tutor only */}
                            <div className="pt-8 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">Intervention Quality</h2>
                                    {/* Mock way to select an intervention for demo */}
                                    {/* In reality, this would be a list of active interventions */}
                                </div>
                                <InterventionQuality onStartSession={handleStartSession} />
                            </div>
                        </div>
                    </div>
                );

            case 'new-assessment':
                return (
                    <div>
                        <button onClick={() => setCurrentView('dashboard')} className="mb-6 text-sm font-bold text-gray-400 hover:text-gray-800 transition-colors">
                            ← Back to Dashboard
                        </button>
                        <AssessmentSelector onSelect={handleStartTest} />
                    </div>
                );

            case 'administration':
                return selectedTest ? (
                    <TestAdministration test={selectedTest} onNext={handleTestComplete} />
                ) : null;

            case 'scoring':
                return selectedTest && selectedStudentId ? (
                    <ScoreEntry test={selectedTest} studentId={selectedStudentId} onSave={handleSaveResults} />
                ) : null;

            case 'review':
                return currentAssessment && selectedTest ? (
                    <AssessmentReview assessment={currentAssessment} test={selectedTest} onClose={() => setCurrentView('dashboard')} />
                ) : null;

            case 'interventions':
                return selectedIntervention ? (
                    <SessionLogger
                        intervention={selectedIntervention}
                        onComplete={async (log) => {
                            await saveSessionLog(log);
                            setCurrentView('dashboard');
                            setSelectedIntervention(null);
                        }}
                        onCancel={() => {
                            setCurrentView('dashboard');
                            setSelectedIntervention(null);
                        }}
                    />
                ) : <div>No intervention selected</div>;

            default:
                return <div>View not found</div>;
        }
    };

    return (
        <div className="assessments-page max-w-7xl mx-auto animate-fadeIn">
            {/* Sidebar / Navigation could go here if needed, but using main nav for now */}
            {renderContent()}
        </div>
    );
}
