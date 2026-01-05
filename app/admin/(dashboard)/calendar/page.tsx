import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Plus, Calendar as CalendarIcon, Clock } from 'lucide-react'
import ConsultationActions from './ConsultationActions'

export default async function AdminCalendarPage() {
    const session = await auth()

    if (!session) {
        redirect('/admin/login')
    }

    // Fetch availability slots and consultations
    const [slots, consultations] = await Promise.all([
        prisma.availabilitySlot.findMany({
            where: {
                startTime: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startTime: 'asc',
            },
            take: 50,
        }),
        prisma.consultation.findMany({
            where: {
                scheduledAt: {
                    gte: new Date(),
                },
                status: 'SCHEDULED',
            },
            include: {
                lead: true,
            },
            orderBy: {
                scheduledAt: 'asc',
            },
        }),
    ])

    function formatDate(date: Date) {
        return new Date(date).toLocaleDateString('en-AU', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        })
    }

    function formatTime(date: Date) {
        return new Date(date).toLocaleTimeString('en-AU', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Group slots by date
    const slotsByDate = slots.reduce((acc, slot) => {
        const dateKey = new Date(slot.startTime).toDateString()
        if (!acc[dateKey]) {
            acc[dateKey] = []
        }
        acc[dateKey].push(slot)
        return acc
    }, {} as Record<string, typeof slots>)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Calendar & Availability</h1>
                    <p className="text-[#6B647F] mt-2">
                        Manage your upcoming schedule and consultation slots
                    </p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Upcoming Consultations (Left Column - Larger) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#3F3A52]">Upcoming Consultations</h2>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                            {consultations.length} Scheduled
                        </span>
                    </div>

                    <div className="space-y-3">
                        {consultations.length === 0 ? (
                            <div className="kk-glass-soft p-12 text-center text-[#6B647F]">
                                <CalendarIcon size={48} className="mx-auto mb-4 text-[#E6E0F2]" />
                                No upcoming consultations
                            </div>
                        ) : (
                            consultations.map((consultation) => (
                                <div
                                    key={consultation.id}
                                    className="kk-glass flex items-start justify-between p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
                                >

                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-[#F7F5FB] border border-[#E6E0F2] text-[#5E5574]">
                                            <span className="text-xs font-bold uppercase">{new Date(consultation.scheduledAt).toLocaleDateString('en-AU', { weekday: 'short' })}</span>
                                            <span className="text-lg font-bold">{new Date(consultation.scheduledAt).getDate()}</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#3F3A52] text-lg">
                                                {consultation.lead.studentName}
                                            </div>
                                            <div className="text-sm text-[#6B647F]">
                                                Parent: {consultation.lead.parentName}
                                            </div>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1 text-xs text-[#8C84A8] bg-[#F7F5FB] px-2 py-1 rounded-md">
                                                    <Clock size={12} />
                                                    {formatTime(consultation.scheduledAt)}
                                                </div>
                                                <div className="text-xs text-[#8C84A8]">
                                                    {consultation.lead.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ConsultationActions
                                        consultationId={consultation.id}
                                        availableSlots={slots.filter(s => !s.isBooked && s.isEnabled)}
                                    />
                                </div>

                            ))
                        )}
                    </div>
                </div>

                {/* Available Slots (Right Column) */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#3F3A52]">Available Slots</h2>
                        <button className="flex items-center gap-2 rounded-xl bg-[#5E5574] px-3 py-2 text-xs font-bold text-white transition-all hover:shadow-lg hover:scale-105">
                            <Plus size={14} />
                            Add Slots
                        </button>
                    </div>

                    <div className="kk-glass-strong p-6 rounded-3xl space-y-6 max-h-[600px] overflow-y-auto">
                        {Object.keys(slotsByDate).length === 0 ? (
                            <div className="text-center py-8 text-[#6B647F]">
                                No slots configured
                            </div>
                        ) : (
                            Object.entries(slotsByDate).map(([dateKey, dateSlots]) => (
                                <div key={dateKey}>
                                    <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#6B647F] border-b border-[#E6E0F2]">
                                        {formatDate(new Date(dateKey))}
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {dateSlots.map((slot) => (
                                            <div
                                                key={slot.id}
                                                className={`flex items-center justify-between rounded-xl border p-3 text-sm transition-all ${slot.isBooked
                                                    ? 'border-[#E6E0F2] bg-gray-50 text-gray-400'
                                                    : slot.isEnabled
                                                        ? 'border-green-100 bg-green-50/50 text-green-800 hover:border-green-300'
                                                        : 'border-[#E6E0F2] bg-white text-[#8C84A8]'
                                                    }`}
                                            >
                                                <div className="font-semibold">
                                                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                                </div>
                                                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slot.isBooked ? 'bg-gray-200' : 'bg-green-200 text-green-800'
                                                    }`}>
                                                    {slot.isBooked ? 'BOOKED' : 'OPEN'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="kk-glass p-4 text-center">
                            <div className="text-2xl font-bold text-[#3F3A52]">
                                {slots.filter(s => !s.isBooked && s.isEnabled).length}
                            </div>
                            <div className="text-xs text-[#6B647F]">Open Slots</div>
                        </div>
                        <div className="kk-glass p-4 text-center">
                            <div className="text-2xl font-bold text-[#3F3A52]">
                                {slots.filter(s => s.isBooked).length}
                            </div>
                            <div className="text-xs text-[#6B647F]">Booked</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
