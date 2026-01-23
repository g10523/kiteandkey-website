"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FileText,
    Download,
    Search,
    Filter,
    BookOpen,
    Calculator,
    Beaker,
    GraduationCap,
    Lightbulb,
    Users,
    Folder
} from "lucide-react";

interface Resource {
    id: string;
    title: string;
    description: string | null;
    type: string;
    category: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    yearLevel: string | null;
    tags: string[];
    isPublic: boolean;
    isPinned: boolean;
    downloadCount: number;
    createdAt: string;
}

const CATEGORY_ICONS: Record<string, any> = {
    ENGLISH: BookOpen,
    MATHS: Calculator,
    SCIENCE: Beaker,
    SELECTIVE: GraduationCap,
    STUDY_SKILLS: Lightbulb,
    PARENT_RESOURCES: Users,
    GENERAL: Folder,
};

const CATEGORY_LABELS: Record<string, string> = {
    ENGLISH: "English",
    MATHS: "Maths",
    SCIENCE: "Science",
    SELECTIVE: "Selective",
    STUDY_SKILLS: "Study Skills",
    PARENT_RESOURCES: "Parent Resources",
    GENERAL: "General",
};

const CATEGORY_COLORS: Record<string, string> = {
    ENGLISH: "from-purple-500/10 to-purple-600/10 border-purple-300/50",
    MATHS: "from-blue-500/10 to-blue-600/10 border-blue-300/50",
    SCIENCE: "from-green-500/10 to-green-600/10 border-green-300/50",
    SELECTIVE: "from-amber-500/10 to-amber-600/10 border-amber-300/50",
    STUDY_SKILLS: "from-pink-500/10 to-pink-600/10 border-pink-300/50",
    PARENT_RESOURCES: "from-indigo-500/10 to-indigo-600/10 border-indigo-300/50",
    GENERAL: "from-gray-500/10 to-gray-600/10 border-gray-300/50",
};

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await fetch("/api/resources", {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setResources(data);
            }
        } catch (error) {
            console.error("Failed to fetch resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (resourceId: string) => {
        try {
            await fetch(`/api/resources/${resourceId}/download`, {
                method: "POST",
            });
        } catch (error) {
            console.error("Failed to track download:", error);
        }
    };

    const filteredResources = resources.filter((resource) => {
        const matchesSearch =
            searchQuery === "" ||
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

        const matchesCategory =
            !selectedCategory || resource.category === selectedCategory;

        const matchesYear =
            !selectedYear || resource.yearLevel === selectedYear;

        return matchesSearch && matchesCategory && matchesYear;
    });

    const pinnedResources = filteredResources.filter((r) => r.isPinned);
    const regularResources = filteredResources.filter((r) => !r.isPinned);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const categories = Object.keys(CATEGORY_LABELS);
    const yearLevels = ["Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FBFAFF] via-[#F7F5FB] to-[#FBFAFF]">
            {/* Background orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="kk-glass-orb orb-1" />
                <div className="kk-glass-orb orb-2" />
            </div>

            <div className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-[#3F3A52] mb-6">
                            Resource Library
                        </h1>
                        <p className="text-xl text-[#6B647F] max-w-3xl mx-auto">
                            Access our collection of educational resources, study guides, and materials
                            designed to support your learning journey.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="kk-glass mb-12 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="md:col-span-3">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9A95AF]" />
                                    <input
                                        type="text"
                                        placeholder="Search resources..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E6E0F2] bg-white/80 text-[#3F3A52] placeholder:text-[#9A95AF] focus:outline-none focus:ring-2 focus:ring-[#5E5574]/30 focus:border-[#5E5574] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-[#6B647F] mb-2">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCategory || ""}
                                        onChange={(e) =>
                                            setSelectedCategory(e.target.value || null)
                                        }
                                        className="w-full px-4 py-3 pr-10 rounded-xl border border-[#E6E0F2] bg-white/90 backdrop-blur-sm text-[#3F3A52] font-medium focus:outline-none focus:ring-2 focus:ring-[#5E5574]/30 focus:border-[#5E5574] hover:bg-white hover:border-[#D9CFF2] transition-all appearance-none cursor-pointer shadow-sm"
                                        style={{
                                            backgroundImage: 'none',
                                        }}
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {CATEGORY_LABELS[cat]}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="h-5 w-5 text-[#8B7FA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Year Level Filter */}
                            <div>
                                <label className="block text-sm font-medium text-[#6B647F] mb-2">
                                    Year Level
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedYear || ""}
                                        onChange={(e) => setSelectedYear(e.target.value || null)}
                                        className="w-full px-4 py-3 pr-10 rounded-xl border border-[#E6E0F2] bg-white/90 backdrop-blur-sm text-[#3F3A52] font-medium focus:outline-none focus:ring-2 focus:ring-[#5E5574]/30 focus:border-[#5E5574] hover:bg-white hover:border-[#D9CFF2] transition-all appearance-none cursor-pointer shadow-sm"
                                        style={{
                                            backgroundImage: 'none',
                                        }}
                                    >
                                        <option value="">All Years</option>
                                        {yearLevels.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="h-5 w-5 text-[#8B7FA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory(null);
                                        setSelectedYear(null);
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-[#E6E0F2] bg-white/80 text-[#6B647F] hover:bg-[#F7F5FB] hover:text-[#3F3A52] transition-all font-medium"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#5E5574] border-r-transparent"></div>
                            <p className="mt-4 text-[#6B647F]">Loading resources...</p>
                        </div>
                    ) : (
                        <>
                            {/* Pinned Resources */}
                            {pinnedResources.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-[#3F3A52] mb-6 flex items-center gap-2">
                                        <span className="text-amber-500">📌</span>
                                        Featured Resources
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {pinnedResources.map((resource) => (
                                            <ResourceCard
                                                key={resource.id}
                                                resource={resource}
                                                onDownload={handleDownload}
                                                formatFileSize={formatFileSize}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Regular Resources */}
                            {regularResources.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-[#3F3A52] mb-6">
                                        All Resources
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {regularResources.map((resource) => (
                                            <ResourceCard
                                                key={resource.id}
                                                resource={resource}
                                                onDownload={handleDownload}
                                                formatFileSize={formatFileSize}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty State - only show if NO resources at all */}
                            {pinnedResources.length === 0 && regularResources.length === 0 && (
                                <div className="text-center py-20">
                                    <FileText className="h-16 w-16 text-[#9A95AF] mx-auto mb-4" />
                                    <p className="text-xl text-[#6B647F]">
                                        {searchQuery || selectedCategory || selectedYear
                                            ? "No resources found matching your criteria"
                                            : "No resources available yet"}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ResourceCard({
    resource,
    onDownload,
    formatFileSize,
}: {
    resource: Resource;
    onDownload: (id: string) => void;
    formatFileSize: (bytes: number) => string;
}) {
    const Icon = CATEGORY_ICONS[resource.category] || Folder;
    const colorClass = CATEGORY_COLORS[resource.category] || CATEGORY_COLORS.GENERAL;

    return (
        <div className="kk-card kk-hover group p-6 flex flex-col h-full">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
                <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-gradient-to-br ${colorClass}`}
                >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-medium text-[#3F3A52]">
                        {CATEGORY_LABELS[resource.category]}
                    </span>
                </div>
                {resource.yearLevel && (
                    <span className="text-xs font-medium text-[#9A95AF] bg-[#F7F5FB] px-2 py-1 rounded-md">
                        {resource.yearLevel}
                    </span>
                )}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold text-[#3F3A52] mb-2 group-hover:text-[#5E5574] transition-colors">
                {resource.title}
            </h3>
            {resource.description && (
                <p className="text-sm text-[#6B647F] mb-4 line-clamp-2">
                    {resource.description}
                </p>
            )}

            {/* Tags */}
            {resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-md bg-[#E6E0F5] text-[#5E5574]"
                        >
                            {tag}
                        </span>
                    ))}
                    {resource.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-[#E6E0F5] text-[#5E5574]">
                            +{resource.tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-[#E6E0F2]">
                <div className="flex items-center justify-between text-xs text-[#9A95AF] mb-3">
                    <span>{formatFileSize(resource.fileSize)}</span>
                    <span>{resource.downloadCount} downloads</span>
                </div>

                <a
                    href={resource.fileUrl}
                    download
                    onClick={() => onDownload(resource.id)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#5E5574] text-white font-medium hover:bg-[#4F4865] transition-all group-hover:shadow-lg group-hover:shadow-[#5E5574]/25"
                >
                    <Download className="h-4 w-4" />
                    Download
                </a>
            </div>
        </div>
    );
}
