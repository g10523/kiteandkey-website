'use client';

import { Plus, MoreHorizontal, Clock, Calendar, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function StudyPlannerPage() {
    // Mock Data
    const [tasks, setTasks] = useState([
        { id: 1, title: "Read Chapter 4: Calculus", subject: "Maths", priority: "High", time: "30m", status: "todo", date: "Today" },
        { id: 2, title: "English Essay Draft", subject: "English", priority: "Medium", time: "1h", status: "in-progress", date: "Tomorrow" },
        { id: 3, title: "Physics Practice Quiz", subject: "Physics", priority: "Low", time: "45m", status: "done", date: "Yesterday" },
        { id: 4, title: "History Research", subject: "History", priority: "High", time: "2h", status: "todo", date: "Fri" },
        { id: 5, title: "Chemistry Lab Report", subject: "Chemistry", priority: "Medium", time: "1.5h", status: "in-progress", date: "Mon" },
    ]);

    const moveTask = (id: number, newStatus: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-100 border-red-200';
            case 'Medium': return 'text-orange-600 bg-orange-100 border-orange-200';
            case 'Low': return 'text-green-600 bg-green-100 border-green-200';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const TaskCard = ({ task }: { task: any }) => (
        <div className="bg-white p-4 rounded-2xl border border-[#E6E0F2] shadow-sm hover:shadow-md transition-all cursor-move group">
            <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
                <button className="text-[#8C84A8] hover:text-[#5E5574]">
                    <MoreHorizontal size={16} />
                </button>
            </div>

            <h4 className="font-bold text-[#3F3A52] text-sm mb-2">{task.title}</h4>

            <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-[#8C84A8] bg-[#F7F5FB] px-2 py-0.5 rounded-md">
                    {task.subject}
                </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8C84A8] border-t border-[#F7F5FB] pt-2">
                <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {task.time}
                </div>
                <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {task.date}
                </div>
            </div>

            {/* Quick Move Buttons (Mobile/Mock DND) */}
            <div className="mt-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                {task.status !== 'todo' && (
                    <button onClick={() => moveTask(task.id, 'todo')} className="w-6 h-6 rounded-full bg-[#F7F5FB] hover:bg-[#E6E0F2] flex items-center justify-center text-xs" title="Move to To Do">←</button>
                )}
                {task.status !== 'done' && (
                    <button onClick={() => moveTask(task.id, task.status === 'todo' ? 'in-progress' : 'done')} className="w-6 h-6 rounded-full bg-[#F7F5FB] hover:bg-[#E6E0F2] flex items-center justify-center text-xs" title="Advance">→</button>
                )}
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh-140px)] min-h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Study Planner</h1>
                    <p className="text-[#6B647F] mt-1">Organize your tasks and stay on track.</p>
                </div>
                <button className="px-4 py-2 bg-[#5E5574] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#4F4865] transition-all flex items-center gap-2">
                    <Plus size={18} />
                    Add Task
                </button>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 grid md:grid-cols-3 gap-6 overflow-hidden">
                {/* To Do Column */}
                <div className="flex flex-col h-full bg-[#E6E0F2]/30 rounded-3xl p-4 border border-[#E6E0F2]">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <Circle size={18} className="text-[#8C84A8]" />
                            <h3 className="font-bold text-[#3F3A52]">To Do</h3>
                            <span className="bg-[#E6E0F2] text-[#5E5574] text-xs font-bold px-2 py-0.5 rounded-full">
                                {tasks.filter(t => t.status === 'todo').length}
                            </span>
                        </div>
                        <button className="hover:bg-[#E6E0F2] p-1 rounded-lg transition-colors">
                            <Plus size={16} className="text-[#5E5574]" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                        {tasks.filter(t => t.status === 'todo').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        {tasks.filter(t => t.status === 'todo').length === 0 && (
                            <div className="h-32 border-2 border-dashed border-[#E6E0F2] rounded-2xl flex items-center justify-center text-[#8C84A8] text-sm">
                                No tasks
                            </div>
                        )}
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col h-full bg-[#E6E0F2]/30 rounded-3xl p-4 border border-[#E6E0F2]">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-blue-500" />
                            <h3 className="font-bold text-[#3F3A52]">In Progress</h3>
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                {tasks.filter(t => t.status === 'in-progress').length}
                            </span>
                        </div>
                        <button className="hover:bg-[#E6E0F2] p-1 rounded-lg transition-colors">
                            <Plus size={16} className="text-[#5E5574]" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                        {tasks.filter(t => t.status === 'in-progress').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>

                {/* Done Column */}
                <div className="flex flex-col h-full bg-[#E6E0F2]/30 rounded-3xl p-4 border border-[#E6E0F2]">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <h3 className="font-bold text-[#3F3A52]">Done</h3>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                {tasks.filter(t => t.status === 'done').length}
                            </span>
                        </div>
                        <button className="text-[#8C84A8] hover:text-[#5E5574]">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                        {tasks.filter(t => t.status === 'done').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
