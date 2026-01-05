'use client'

import { useState } from 'react'
import { MoreHorizontal, XCircle, Calendar, Check, Loader2, X, Clock } from 'lucide-react'
import { cancelConsultation, rescheduleConsultation } from './actions'

interface Slot {
    id: string
    startTime: Date | string
    endTime: Date | string
}

export default function ConsultationActions({
    consultationId,
    availableSlots
}: {
    consultationId: string
    availableSlots: Slot[]
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isCancelling, setIsCancelling] = useState(false)
    const [isRescheduling, setIsRescheduling] = useState(false)
    const [showRescheduleModal, setShowRescheduleModal] = useState(false)
    const [selectedSlotId, setSelectedSlotId] = useState<string>('')

    async function handleCancel() {
        if (!confirm('Are you sure you want to cancel this consultation?')) return

        setIsCancelling(true)
        const result = await cancelConsultation(consultationId)
        setIsCancelling(false)
        setIsOpen(false)

        if (!result.success) {
            alert('Failed to cancel: ' + (result.error || 'Unknown error'))
        }
    }

    async function handleReschedule() {
        if (!selectedSlotId) return

        setIsRescheduling(true)
        const result = await rescheduleConsultation(consultationId, selectedSlotId)
        setIsRescheduling(false)

        if (result.success) {
            setShowRescheduleModal(false)
            setIsOpen(false)
            setSelectedSlotId('')
        } else {
            alert('Failed to reschedule: ' + (result.error || 'Unknown error'))
        }
    }

    // specific formatter for the modal
    const formatSlotTime = (start: Date | string) => {
        const d = new Date(start)
        return d.toLocaleString('en-AU', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        })
    }

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                >
                    <MoreHorizontal size={16} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden">
                        <button
                            onClick={() => {
                                setShowRescheduleModal(true)
                                setIsOpen(false)
                            }}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 text-[#3F3A52]"
                        >
                            <Calendar size={14} /> Reschedule
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isCancelling}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                        >
                            {isCancelling ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                            Cancel Booking
                        </button>
                    </div>
                )}
            </div>

            {/* Reschedule Modal */}
            {showRescheduleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-[#3F3A52]">Reschedule Consultation</h3>
                            <button
                                onClick={() => setShowRescheduleModal(false)}
                                className="rounded-full p-1 hover:bg-gray-100"
                            >
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <p className="mb-4 text-sm text-[#6B647F]">Select a new time slot for this consultation.</p>

                        <div className="mb-6 max-h-[300px] space-y-2 overflow-y-auto pr-2">
                            {availableSlots.length === 0 ? (
                                <div className="text-center text-sm text-gray-500 py-4">
                                    No available slots found. Please add more slots in the calendar.
                                </div>
                            ) : (
                                availableSlots.map(slot => (
                                    <button
                                        key={slot.id}
                                        onClick={() => setSelectedSlotId(slot.id)}
                                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-sm transition-all ${selectedSlotId === slot.id
                                                ? 'border-[#5E5574] bg-[#5E5574] text-white shadow-md'
                                                : 'border-[#E6E0F2] hover:border-[#5E5574] hover:bg-[#F7F5FB] text-[#3F3A52]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>{formatSlotTime(slot.startTime)}</span>
                                        </div>
                                        {selectedSlotId === slot.id && <Check size={16} />}
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowRescheduleModal(false)}
                                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReschedule}
                                disabled={!selectedSlotId || isRescheduling}
                                className="flex items-center gap-2 rounded-xl bg-[#5E5574] px-4 py-2 text-sm font-bold text-white hover:bg-[#4F4865] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRescheduling && <Loader2 size={14} className="animate-spin" />}
                                Confirm Reschedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
