'use client';

import { Award, Trophy, Star, Target, Zap, TrendingUp, Medal, Crown, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AchievementsPage() {
    const achievements = [
        {
            id: 1,
            title: "Perfect Score",
            description: "Scored 100% on an Algebra Quiz",
            icon: "🏆",
            color: "from-yellow-400 to-orange-500",
            earned: true,
            earnedDate: "Jan 3, 2026",
            points: 50,
        },
        {
            id: 2,
            title: "5 Day Streak",
            description: "Maintained consistent learning for 5 days",
            icon: "🔥",
            color: "from-red-400 to-pink-500",
            earned: true,
            earnedDate: "Jan 4, 2026",
            points: 30,
        },
        {
            id: 3,
            title: "Fast Learner",
            description: "Completed 10 lessons this month",
            icon: "⚡",
            color: "from-blue-400 to-purple-500",
            earned: true,
            earnedDate: "Jan 2, 2026",
            points: 40,
        },
        {
            id: 4,
            title: "Top Performer",
            description: "Ranked in top 10% of your class",
            icon: "⭐",
            color: "from-green-400 to-teal-500",
            earned: true,
            earnedDate: "Dec 28, 2025",
            points: 100,
        },
        {
            id: 5,
            title: "Early Bird",
            description: "Complete 5 morning sessions",
            icon: "🌅",
            color: "from-orange-400 to-yellow-500",
            earned: false,
            progress: 3,
            total: 5,
            points: 25,
        },
        {
            id: 6,
            title: "Master Mind",
            description: "Complete your MindPrint assessment",
            icon: "🧠",
            color: "from-purple-400 to-pink-500",
            earned: true,
            earnedDate: "Dec 15, 2025",
            points: 75,
        },
        {
            id: 7,
            title: "Homework Hero",
            description: "Submit 20 assignments on time",
            icon: "📚",
            color: "from-indigo-400 to-blue-500",
            earned: false,
            progress: 15,
            total: 20,
            points: 50,
        },
        {
            id: 8,
            title: "Social Scholar",
            description: "Help 5 classmates with questions",
            icon: "🤝",
            color: "from-teal-400 to-green-500",
            earned: false,
            progress: 2,
            total: 5,
            points: 60,
        },
    ];

    const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
    const earnedCount = achievements.filter(a => a.earned).length;
    const totalAchievements = achievements.length;

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-[#3F3A52] font-serif">Achievements</h1>
                    <p className="text-[#6B647F] mt-2 text-lg">
                        Track your progress and celebrate your milestones
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="kk-card-strong p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Trophy size={60} className="text-[#D9CFF2]" />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm text-[#8C84A8] font-bold uppercase tracking-wide mb-2">Total Points</div>
                        <div className="text-4xl font-bold text-[#3F3A52]">{totalPoints}</div>
                    </div>
                </div>

                <div className="kk-card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Award size={24} className="text-green-600" />
                        <span className="text-3xl font-bold text-green-600">{earnedCount}</span>
                    </div>
                    <div className="text-sm text-[#8C84A8]">Achievements Earned</div>
                </div>

                <div className="kk-card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Target size={24} className="text-blue-600" />
                        <span className="text-3xl font-bold text-blue-600">{totalAchievements - earnedCount}</span>
                    </div>
                    <div className="text-sm text-[#8C84A8]">In Progress</div>
                </div>

                <div className="kk-card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={24} className="text-purple-600" />
                        <span className="text-3xl font-bold text-purple-600">{Math.round((earnedCount / totalAchievements) * 100)}%</span>
                    </div>
                    <div className="text-sm text-[#8C84A8]">Completion Rate</div>
                </div>
            </div>

            {/* Achievements Grid */}
            <section>
                <h2 className="text-2xl font-bold text-[#3F3A52] mb-6 font-serif">Your Achievements</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`kk-card p-6 hover:shadow-lg transition-all cursor-pointer group ${!achievement.earned ? 'opacity-75' : ''
                                }`}
                        >
                            {/* Icon */}
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform ${!achievement.earned ? 'grayscale' : ''
                                }`}>
                                {achievement.icon}
                            </div>

                            {/* Title & Description */}
                            <h3 className="font-bold text-[#3F3A52] mb-2">{achievement.title}</h3>
                            <p className="text-sm text-[#6B647F] mb-4 line-clamp-2">{achievement.description}</p>

                            {/* Progress or Earned Date */}
                            {achievement.earned ? (
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                        <Star size={12} className="fill-green-600" />
                                        Earned
                                    </span>
                                    <span className="text-xs text-[#8C84A8]">{achievement.earnedDate}</span>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-center justify-between text-xs text-[#8C84A8] mb-2">
                                        <span>Progress</span>
                                        <span className="font-bold">{achievement.progress}/{achievement.total}</span>
                                    </div>
                                    <div className="w-full bg-[#E6E0F2] rounded-full h-2">
                                        <div
                                            className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${((achievement.progress || 0) / (achievement.total || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Points */}
                            <div className="mt-4 pt-4 border-t border-[#E6E0F2]">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#8C84A8]">Points</span>
                                    <span className="text-lg font-bold text-[#5E5574]">{achievement.points}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Leaderboard Teaser */}
            <div className="kk-card-strong p-8 bg-gradient-to-br from-[#F7F5FB] to-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl">
                            👑
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-[#3F3A52] mb-1 font-serif">Class Leaderboard</h3>
                            <p className="text-[#6B647F]">
                                You're currently ranked <span className="font-bold text-[#5E5574]">#3</span> in your class!
                            </p>
                        </div>
                    </div>
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                        View Leaderboard
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
