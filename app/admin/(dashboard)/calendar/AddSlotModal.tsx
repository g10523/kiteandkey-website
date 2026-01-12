"use client";

import { useState } from "react";
import { Plus, X, Loader2, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createAvailabilitySlot } from "./actions";

export default function AddSlotModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState(30);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !time) return;

        setIsSubmitting(true);

        try {
            // Send the date and time as separate values to the server
            // The server will handle timezone conversion to Sydney time
            const result = await createAvailabilitySlot(date, time, Number(duration));

            if (result.success) {
                setIsOpen(false);
                // Reset form defaults
                setDate("");
                setTime("");
                setDuration(30);
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-4 right-4 bg-green-50 border-2 border-green-500 text-green-800 px-6 py-3 rounded-xl shadow-lg z-50 font-semibold';
                successMsg.textContent = '✓ Slot added successfully';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
            } else {
                console.error('Slot creation failed:', result.error);
                alert(`Failed to create slot: ${result.error || "Unknown error"}\n\nCheck the server console for details.`);
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
                className="flex items-center gap-2 rounded-xl bg-[#5E5574] px-3 py-2 text-xs font-bold text-white transition-all hover:shadow-lg hover:scale-105"
            >
                <Plus size={14} />
                Add Slots
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-[#3F3A52]/20 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[#E6E0F2] bg-white p-8 shadow-2xl"
                        >
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-[#3F3A52]">Add Availability Slot</h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-full p-2 text-[#8C84A8] hover:bg-[#F7F5FB] transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <p className="text-xs text-[#8C84A8]">
                                    Time zone: Australia/Sydney (AEDT/AEST)
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Date Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-[#8C84A8] tracking-wider">
                                            Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C84A8]" size={16} />
                                            <input
                                                type="date"
                                                required
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] py-3 pl-10 pr-4 text-sm font-medium text-[#3F3A52] focus:border-[#D9CFF2] focus:outline-none focus:ring-4 focus:ring-[#E6E0F2]/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Time Input */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-[#8C84A8] tracking-wider">
                                                Start Time
                                            </label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C84A8]" size={16} />
                                                <input
                                                    type="time"
                                                    required
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                    className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] py-3 pl-10 pr-4 text-sm font-medium text-[#3F3A52] focus:border-[#D9CFF2] focus:outline-none focus:ring-4 focus:ring-[#E6E0F2]/50"
                                                />
                                            </div>
                                        </div>

                                        {/* Duration Input */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-[#8C84A8] tracking-wider">
                                                Duration
                                            </label>
                                            <select
                                                value={duration}
                                                onChange={(e) => setDuration(Number(e.target.value))}
                                                className="w-full rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] py-3 px-4 text-sm font-medium text-[#3F3A52] appearance-none focus:border-[#D9CFF2] focus:outline-none focus:ring-4 focus:ring-[#E6E0F2]/50"
                                            >
                                                <option value={15}>15 mins</option>
                                                <option value={30}>30 mins</option>
                                                <option value={45}>45 mins</option>
                                                <option value={60}>60 mins</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5E5574] py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Adding...
                                            </>
                                        ) : (
                                            "Add Slot"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
