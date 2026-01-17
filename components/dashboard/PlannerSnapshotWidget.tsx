'use client';

import { ListTodo, CheckCircle2, Circle, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PlannerSnapshotWidget() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Read Chapter 4: Calculus", completed: true, time: "30m" },
        { id: 2, title: "English Essay Draft", completed: false, time: "1h" },
        { id: 3, title: "Physics Practice Quiz", completed: false, time: "45m" },
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="dark-card p-6 rounded-3xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                        <ListTodo size={20} className="text-[#14B8A6]" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Today's Focus</h3>
                </div>
                <div className="text-xs font-bold text-[#64748B] bg-[#151925] px-2.5 py-1 rounded-md border border-[#2A2F45]">
                    {tasks.filter(t => t.completed).length}/{tasks.length}
                </div>
            </div>

            <div className="flex-1 space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`
                            flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group
                            ${task.completed
                                ? 'bg-[#151925] border-[#2A2F45] opacity-60'
                                : 'bg-[#151925] border-[#2A2F45] hover:border-[#14B8A6]/30'
                            }
                        `}
                    >
                        <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center border transition-colors
                            ${task.completed
                                ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                                : 'border-[#2A2F45] group-hover:border-[#14B8A6]'
                            }
                        `}>
                            {task.completed && <CheckCircle2 size={12} strokeWidth={3} />}
                        </div>
                        <div className="flex-1">
                            <p className={`
                                text-sm font-medium transition-colors
                                ${task.completed ? 'text-[#64748B] line-through' : 'text-white'}
                            `}>
                                {task.title}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#64748B]">
                            <Clock size={10} />
                            {task.time}
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/dashboard/student/planner" className="mt-6 text-center text-xs font-bold text-[#14B8A6] hover:text-[#00D9FF] uppercase tracking-wider block py-2 border-t border-[#2A2F45] transition-colors">
                View Full Planner
            </Link>
        </div>
    )
}
