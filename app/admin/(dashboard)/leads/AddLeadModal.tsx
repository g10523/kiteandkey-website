"use client";

import { useState } from "react";
import { Plus, X, Loader2, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createManualLead } from "./actions";

const SUBJECTS = ["Maths", "English", "Science"];
const YEAR_LEVELS = ["Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12"];

export default function AddLeadModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [type, setType] = useState<"NEW" | "SIGNED_UP">("NEW"); // Lead vs Active
    const [studentName, setStudentName] = useState("");
    const [parentName, setParentName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [yearLevel, setYearLevel] = useState(YEAR_LEVELS[0]);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [notes, setNotes] = useState("");

    const toggleSubject = (subject: string) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(prev => prev.filter(s => s !== subject));
        } else {
            setSelectedSubjects(prev => [...prev, subject]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await createManualLead({
                studentName,
                parentName,
                email,
                phone,
                yearLevel,
                subjects: selectedSubjects,
                status: type,
                notes
            });

            if (result.success) {
                setIsOpen(false);
                // Reset form
                setStudentName("");
                setParentName("");
                setEmail("");
                setPhone("");
                setSelectedSubjects([]);
                setNotes("");
                setType("NEW");
            } else {
                alert(result.error || "Failed to create entry");
            }
        } catch (err) {
            console.error(err);
            alert("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-[#5E5574] px-4 py-2 text-sm font-bold text-white transition-all hover:shadow-lg hover:bg-[#4F4865]"
            >
                <UserPlus size={16} />
                Add Manually
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-[#3F3A52]/40 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl rounded-3xl border border-[#E6E0F2] bg-white p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-[#3F3A52] font-serif">Add New Profile</h3>
                                <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-[#F7F5FB] transition-colors">
                                    <X size={20} className="text-[#8C84A8]" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Type Selection */}
                                <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#F7F5FB] p-1.5 border border-[#E6E0F2]">
                                    <button
                                        type="button"
                                        onClick={() => setType("NEW")}
                                        className={`rounded-lg py-2.5 text-sm font-bold transition-all ${type === "NEW"
                                            ? "bg-white text-[#3F3A52] shadow-sm"
                                            : "text-[#8C84A8] hover:text-[#5E5574]"
                                            }`}
                                    >
                                        Start as Lead
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setType("SIGNED_UP")}
                                        className={`rounded-lg py-2.5 text-sm font-bold transition-all ${type === "SIGNED_UP"
                                            ? "bg-green-500 text-white shadow-sm"
                                            : "text-[#8C84A8] hover:text-green-600"
                                            }`}
                                    >
                                        Add Active Student
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Student Details */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase text-[#8C84A8] tracking-wider border-b border-[#E6E0F2] pb-2">Student Details</h4>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-[#5E5574]">Full Name</label>
                                            <input
                                                required
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] px-4 py-2.5 text-sm focus:border-[#5E5574] focus:outline-none"
                                                placeholder="e.g. Leo Das"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-[#5E5574]">Year Level</label>
                                            <select
                                                value={yearLevel}
                                                onChange={(e) => setYearLevel(e.target.value)}
                                                className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] px-4 py-2.5 text-sm focus:border-[#5E5574] focus:outline-none"
                                            >
                                                {YEAR_LEVELS.map(y => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-[#5E5574]">Subjects</label>
                                            <div className="flex flex-wrap gap-2">
                                                {SUBJECTS.map(subject => (
                                                    <button
                                                        key={subject}
                                                        type="button"
                                                        onClick={() => toggleSubject(subject)}
                                                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${selectedSubjects.includes(subject)
                                                            ? "border-[#5E5574] bg-[#5E5574] text-white"
                                                            : "border-[#E6E0F2] bg-white text-[#6B647F] hover:border-[#D9CFF2]"
                                                            }`}
                                                    >
                                                        {subject}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parent Details */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase text-[#8C84A8] tracking-wider border-b border-[#E6E0F2] pb-2">Parent Details</h4>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-[#5E5574]">Parent Name</label>
                                            <input
                                                required
                                                value={parentName}
                                                onChange={(e) => setParentName(e.target.value)}
                                                className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] px-4 py-2.5 text-sm focus:border-[#5E5574] focus:outline-none"
                                                placeholder="e.g. Sarah Das"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-[#5E5574]">Email</label>
                                            <input
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] px-4 py-2.5 text-sm focus:border-[#5E5574] focus:outline-none"
                                                placeholder="parent@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-[#5E5574]">Phone</label>
                                            <input
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] px-4 py-2.5 text-sm focus:border-[#5E5574] focus:outline-none"
                                                placeholder="0400 000 000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-[#5E5574]">Notes (Optional)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] px-4 py-3 text-sm focus:border-[#5E5574] focus:outline-none min-h-[80px]"
                                        placeholder="Any additional details..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-[#5E5574] py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#4F4865] hover:shadow-xl disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 size={16} className="animate-spin" />
                                            Creating Profile...
                                        </div>
                                    ) : (
                                        "Create Profile"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
