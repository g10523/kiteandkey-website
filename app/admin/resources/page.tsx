"use client";

import { useState, useEffect } from "react";
import {
    FileText,
    Upload,
    Trash2,
    Edit,
    Pin,
    PinOff,
    Eye,
    EyeOff,
    Download,
    Plus,
    X,
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
    mimeType: string;
    yearLevel: string | null;
    tags: string[];
    isPublic: boolean;
    isPinned: boolean;
    downloadCount: number;
    createdAt: string;
}

const RESOURCE_TYPES = ["PDF", "GUIDE", "WORKSHEET", "TEMPLATE", "OTHER"];
const CATEGORIES = [
    "ENGLISH",
    "MATHS",
    "SCIENCE",
    "SELECTIVE",
    "STUDY_SKILLS",
    "PARENT_RESOURCES",
    "GENERAL",
];
const YEAR_LEVELS = ["Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];

export default function AdminResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            // Fetch all resources (including non-public for admin)
            const response = await fetch("/api/resources");
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

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resource?")) return;

        try {
            const response = await fetch(`/api/resources/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setResources(resources.filter((r) => r.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete resource:", error);
            alert("Failed to delete resource");
        }
    };

    const handleTogglePin = async (resource: Resource) => {
        try {
            const response = await fetch(`/api/resources/${resource.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPinned: !resource.isPinned }),
            });

            if (response.ok) {
                const updated = await response.json();
                setResources(
                    resources.map((r) => (r.id === resource.id ? updated : r))
                );
            }
        } catch (error) {
            console.error("Failed to toggle pin:", error);
        }
    };

    const handleTogglePublic = async (resource: Resource) => {
        try {
            const response = await fetch(`/api/resources/${resource.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPublic: !resource.isPublic }),
            });

            if (response.ok) {
                const updated = await response.json();
                setResources(
                    resources.map((r) => (r.id === resource.id ? updated : r))
                );
            }
        } catch (error) {
            console.error("Failed to toggle public:", error);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="min-h-screen bg-[#0A0E27] text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Resource Management</h1>
                        <p className="text-gray-400">
                            Upload and manage educational resources
                        </p>
                    </div>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#5E5574] hover:bg-[#4F4865] rounded-xl font-medium transition-all"
                    >
                        <Plus className="h-5 w-5" />
                        Upload Resource
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        label="Total Resources"
                        value={resources.length}
                        icon={<FileText className="h-6 w-6" />}
                    />
                    <StatCard
                        label="Public"
                        value={resources.filter((r) => r.isPublic).length}
                        icon={<Eye className="h-6 w-6" />}
                    />
                    <StatCard
                        label="Pinned"
                        value={resources.filter((r) => r.isPinned).length}
                        icon={<Pin className="h-6 w-6" />}
                    />
                    <StatCard
                        label="Total Downloads"
                        value={resources.reduce((sum, r) => sum + r.downloadCount, 0)}
                        icon={<Download className="h-6 w-6" />}
                    />
                </div>

                {/* Resources Table */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#5E5574] border-r-transparent"></div>
                    </div>
                ) : resources.length === 0 ? (
                    <div className="text-center py-20 bg-[#1A1D2E] rounded-2xl">
                        <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-xl text-gray-400 mb-4">No resources yet</p>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="px-6 py-3 bg-[#5E5574] hover:bg-[#4F4865] rounded-xl font-medium transition-all"
                        >
                            Upload Your First Resource
                        </button>
                    </div>
                ) : (
                    <div className="bg-[#1A1D2E] rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#151925] border-b border-[#2A2F45]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Type
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Size
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Downloads
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2A2F45]">
                                    {resources.map((resource) => (
                                        <tr
                                            key={resource.id}
                                            className="hover:bg-[#151925] transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium">{resource.title}</div>
                                                    {resource.description && (
                                                        <div className="text-sm text-gray-400 line-clamp-1">
                                                            {resource.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-md bg-[#5E5574]/20 text-[#D9CFF2] text-sm">
                                                    {resource.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {resource.type}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {formatFileSize(resource.fileSize)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {resource.downloadCount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {resource.isPinned && (
                                                        <span className="text-amber-500" title="Pinned">
                                                            📌
                                                        </span>
                                                    )}
                                                    {resource.isPublic ? (
                                                        <span
                                                            className="text-green-500"
                                                            title="Public"
                                                        >
                                                            ✓
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500" title="Private">
                                                            🔒
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleTogglePin(resource)}
                                                        className="p-2 hover:bg-[#2A2F45] rounded-lg transition-colors"
                                                        title={
                                                            resource.isPinned ? "Unpin" : "Pin"
                                                        }
                                                    >
                                                        {resource.isPinned ? (
                                                            <PinOff className="h-4 w-4" />
                                                        ) : (
                                                            <Pin className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleTogglePublic(resource)}
                                                        className="p-2 hover:bg-[#2A2F45] rounded-lg transition-colors"
                                                        title={
                                                            resource.isPublic
                                                                ? "Make Private"
                                                                : "Make Public"
                                                        }
                                                    >
                                                        {resource.isPublic ? (
                                                            <Eye className="h-4 w-4" />
                                                        ) : (
                                                            <EyeOff className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                    <a
                                                        href={resource.fileUrl}
                                                        download
                                                        className="p-2 hover:bg-[#2A2F45] rounded-lg transition-colors"
                                                        title="Download"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(resource.id)}
                                                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <UploadModal
                    onClose={() => setShowUploadModal(false)}
                    onSuccess={() => {
                        setShowUploadModal(false);
                        fetchResources();
                    }}
                />
            )}
        </div>
    );
}

function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
}) {
    return (
        <div className="bg-[#1A1D2E] rounded-xl p-6 border border-[#2A2F45]">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{label}</span>
                <div className="text-[#5E5574]">{icon}</div>
            </div>
            <div className="text-3xl font-bold">{value}</div>
        </div>
    );
}

function UploadModal({
    onClose,
    onSuccess,
}: {
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "PDF",
        category: "GENERAL",
        yearLevel: "",
        tags: "",
        isPublic: true,
        isPinned: false,
    });
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file");
            return;
        }

        setUploading(true);

        try {
            // In a real implementation, you would upload the file to a storage service
            // For now, we'll create a mock file URL
            const mockFileUrl = `/uploads/${file.name}`;

            const resourceData = {
                title: formData.title,
                description: formData.description || null,
                type: formData.type,
                category: formData.category,
                fileName: file.name,
                fileUrl: mockFileUrl,
                fileSize: file.size,
                mimeType: file.type,
                yearLevel: formData.yearLevel || null,
                tags: formData.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
                isPublic: formData.isPublic,
                isPinned: formData.isPinned,
            };

            const response = await fetch("/api/resources", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resourceData),
            });

            if (response.ok) {
                onSuccess();
            } else {
                alert("Failed to upload resource");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload resource");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1D2E] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-[#2A2F45] flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Upload Resource</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#2A2F45] rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            File <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                            required
                            className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F45] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E5574]"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required
                            className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F45] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E5574]"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            rows={3}
                            className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F45] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E5574]"
                        />
                    </div>

                    {/* Type and Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Type <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({ ...formData, type: e.target.value })
                                }
                                required
                                className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F45] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E5574]"
                            >
                                {RESOURCE_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Category <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                required
                                className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F45] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E5574]"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.replace(/_/g, " ")}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Year Level */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Year Level (Optional)
                        </label>
                        <select
                            value={formData.yearLevel}
                            onChange={(e) =>
                                setFormData({ ...formData, yearLevel: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F45] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E5574]"
                        >
                            <option value="">All Years</option>
                            {YEAR_LEVELS.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value })
                            }
                            placeholder="e.g. grammar, essay writing, comprehension"
                            className="w-full px-4 py-3 bg-[#0A0E27] border border-[#2A2F45] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E5574]"
                        />
                    </div>

                    {/* Toggles */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPublic}
                                onChange={(e) =>
                                    setFormData({ ...formData, isPublic: e.target.checked })
                                }
                                className="w-5 h-5 rounded border-[#2A2F45] bg-[#0A0E27] text-[#5E5574] focus:ring-2 focus:ring-[#5E5574]"
                            />
                            <span className="text-sm">Make this resource public</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPinned}
                                onChange={(e) =>
                                    setFormData({ ...formData, isPinned: e.target.checked })
                                }
                                className="w-5 h-5 rounded border-[#2A2F45] bg-[#0A0E27] text-[#5E5574] focus:ring-2 focus:ring-[#5E5574]"
                            />
                            <span className="text-sm">Pin to featured resources</span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-[#2A2F45] rounded-xl font-medium hover:bg-[#2A2F45] transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="flex-1 px-6 py-3 bg-[#5E5574] hover:bg-[#4F4865] rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? "Uploading..." : "Upload Resource"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
