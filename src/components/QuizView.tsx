import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Trophy, RotateCcw } from 'lucide-react';
import type { Quiz, Question, QuizAttempt } from '../types';

interface QuizViewProps {
    quiz: Quiz;
    studentId: string;
    onComplete: (attempt: QuizAttempt) => void;
    onClose: () => void;
}

export default function QuizView({ quiz, studentId, onComplete, onClose }: QuizViewProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | number>>({});
    const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [startTime] = useState(new Date());

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const attemptsRemaining = quiz.maxAttempts
        ? quiz.maxAttempts - (quiz.attempts?.length || 0)
        : null;

    // Timer
    useEffect(() => {
        if (!timeRemaining || isSubmitted) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev === null || prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, isSubmitted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (questionId: string, answer: string | number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        quiz.questions.forEach(q => {
            const userAnswer = answers[q.id];
            if (userAnswer !== undefined) {
                if (q.type === 'short-answer') {
                    // Simple string comparison (in real app, would use more sophisticated matching)
                    const correctLower = String(q.correctAnswer).toLowerCase().trim();
                    const userLower = String(userAnswer).toLowerCase().trim();
                    if (userLower.includes(correctLower) || correctLower.includes(userLower)) {
                        correct++;
                    }
                } else {
                    if (userAnswer === q.correctAnswer) {
                        correct++;
                    }
                }
            }
        });
        return Math.round((correct / quiz.questions.length) * 100);
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setIsSubmitted(true);

        const attempt: QuizAttempt = {
            id: `attempt-${Date.now()}`,
            quizId: quiz.id,
            studentId,
            startedAt: startTime,
            completedAt: new Date(),
            score: finalScore,
            answers,
            timeSpent: quiz.timeLimit ? (quiz.timeLimit * 60 - (timeRemaining || 0)) : 0,
            isPassed: finalScore >= quiz.passingScore
        };

        onComplete(attempt);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const isQuestionAnswered = (questionId: string) => {
        return answers[questionId] !== undefined;
    };

    const isCorrect = (question: Question) => {
        const userAnswer = answers[question.id];
        if (question.type === 'short-answer') {
            const correctLower = String(question.correctAnswer).toLowerCase().trim();
            const userLower = String(userAnswer).toLowerCase().trim();
            return userLower.includes(correctLower) || correctLower.includes(userLower);
        }
        return userAnswer === question.correctAnswer;
    };

    // Results View
    if (isSubmitted) {
        const isPassed = score >= quiz.passingScore;

        return (
            <div className="quiz-results" style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: 'var(--spacing-2xl)'
            }}>
                <div className="results-header text-center mb-8">
                    {isPassed ? (
                        <Trophy size={64} className="mx-auto mb-4 text-yellow-500" />
                    ) : (
                        <AlertCircle size={64} className="mx-auto mb-4 text-orange-500" />
                    )}
                    <h2 className="text-3xl font-bold mb-2">
                        {isPassed ? 'Congratulations!' : 'Keep Practicing!'}
                    </h2>
                    <p className="text-xl text-gray-600">
                        You scored <span className={`font-bold ${isPassed ? 'text-green-600' : 'text-orange-600'}`}>
                            {score}%
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Passing score: {quiz.passingScore}%
                    </p>
                </div>

                {/* Question Review */}
                <div className="questions-review space-y-4">
                    {quiz.questions.map((question, idx) => {
                        const correct = isCorrect(question);
                        return (
                            <div
                                key={question.id}
                                className="question-review-card"
                                style={{
                                    background: 'var(--color-bg-card)',
                                    border: `2px solid ${correct ? 'var(--color-success)' : 'var(--color-warning)'}`,
                                    borderRadius: 'var(--radius-lg)',
                                    padding: 'var(--spacing-lg)'
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    {correct ? (
                                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                                    ) : (
                                        <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-2">
                                            {idx + 1}. {question.question}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Your answer:</span>{' '}
                                            {question.type === 'multiple-choice' && question.options
                                                ? question.options[answers[question.id] as number]
                                                : answers[question.id]}
                                        </p>
                                        {!correct && (
                                            <p className="text-sm text-green-700 mb-2">
                                                <span className="font-medium">Correct answer:</span>{' '}
                                                {question.type === 'multiple-choice' && question.options
                                                    ? question.options[question.correctAnswer as number]
                                                    : question.correctAnswer}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg mt-2">
                                            💡 {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8 justify-center">
                    {!isPassed && attemptsRemaining && attemptsRemaining > 0 && (
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <RotateCcw size={18} />
                            Try Again ({attemptsRemaining} attempts left)
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="btn-primary"
                    >
                        {isPassed ? 'Continue Learning' : 'Review Lesson'}
                    </button>
                </div>
            </div>
        );
    }

    // Quiz Taking View
    return (
        <div className="quiz-view" style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'var(--spacing-2xl)'
        }}>
            {/* Header */}
            <div className="quiz-header mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
                        <p className="text-gray-600">{quiz.description}</p>
                    </div>
                    {timeRemaining !== null && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${timeRemaining < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            <Clock size={20} />
                            <span>{formatTime(timeRemaining)}</span>
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="progress-bar mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                        <span>{Object.keys(answers).length} answered</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Navigator */}
                <div className="flex gap-2 flex-wrap">
                    {quiz.questions.map((q, idx) => (
                        <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`w-10 h-10 rounded-lg font-semibold transition ${idx === currentQuestionIndex
                                ? 'bg-purple-600 text-white'
                                : isQuestionAnswered(q.id)
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Question */}
            <div className="question-card" style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-2xl)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <div className="flex items-start gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {currentQuestion.difficulty}
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentQuestion.question}
                </h3>

                {/* Answer Options */}
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => (
                            <label
                                key={idx}
                                className={`block p-4 border-2 rounded-lg cursor-pointer transition ${answers[currentQuestion.id] === idx
                                    ? 'border-purple-600 bg-purple-50'
                                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={currentQuestion.id}
                                    checked={answers[currentQuestion.id] === idx}
                                    onChange={() => handleAnswer(currentQuestion.id, idx)}
                                    className="mr-3"
                                />
                                <span className="text-gray-900">{option}</span>
                            </label>
                        ))}
                    </div>
                )}

                {currentQuestion.type === 'true-false' && currentQuestion.options && (
                    <div className="flex gap-4">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(currentQuestion.id, idx)}
                                className={`flex-1 p-4 border-2 rounded-lg font-semibold transition ${answers[currentQuestion.id] === idx
                                    ? 'border-purple-600 bg-purple-600 text-white'
                                    : 'border-gray-300 text-gray-700 hover:border-purple-300'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {currentQuestion.type === 'short-answer' && (
                    <textarea
                        value={answers[currentQuestion.id] as string || ''}
                        onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                        placeholder="Type your answer here..."
                        rows={4}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition"
                    />
                )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <button
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                <div className="flex gap-3">
                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(answers).length < quiz.questions.length}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <button
                            onClick={nextQuestion}
                            className="btn-primary"
                        >
                            Next Question
                        </button>
                    )}
                </div>
            </div>

            {/* Warning if not all answered */}
            {Object.keys(answers).length < quiz.questions.length && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
                    <p className="text-sm text-yellow-800">
                        You have {quiz.questions.length - Object.keys(answers).length} unanswered question(s).
                        Make sure to answer all questions before submitting.
                    </p>
                </div>
            )}
        </div>
    );
}
