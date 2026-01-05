import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { ArrowLeft, Mail, Phone, MapPin, School, BookOpen, AlertCircle, Calendar, CreditCard } from 'lucide-react'
import Link from 'next/link'
import SignupLinkButton from '../SignupLinkButton'
import DeleteLeadButton from '../DeleteLeadButton'

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
    const session = await auth()
    if (!session) redirect('/admin/login')

    const lead = await prisma.lead.findUnique({
        where: { id: params.id },
        include: { consultation: true, signup: true }
    })

    if (!lead) return <div>Lead not found</div>

    function parseSubjects(subjectsJson: string) {
        try { return JSON.parse(subjectsJson).join(', ') } catch { return subjectsJson }
    }

    const isActive = lead.status === 'SIGNED_UP'

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/leads" className="p-2 rounded-xl border border-[#E6E0F2] bg-white hover:bg-[#F7F5FB]">
                    <ArrowLeft size={18} className="text-[#5E5574]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#3F3A52] font-serif">{lead.studentName}</h1>
                    <p className="text-[#6B647F] text-sm">Student Profile</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    {!isActive && <SignupLinkButton leadId={lead.id} />}
                    <DeleteLeadButton leadId={lead.id} />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Main Info Card */}
                <div className="kk-glass p-6 rounded-3xl space-y-6">
                    <h2 className="font-bold text-[#3F3A52] border-b border-[#E6E0F2] pb-2">Parent & Contact</h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#F7F5FB] flex items-center justify-center text-[#5E5574] font-bold">
                                {lead.parentName[0]}
                            </div>
                            <div>
                                <div className="font-semibold text-[#3F3A52]">{lead.parentName}</div>
                                <div className="text-xs text-[#6B647F]">Parent / Guardian</div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3 text-[#6B647F]">
                                <Mail size={16} /> {lead.email}
                            </div>
                            <div className="flex items-center gap-3 text-[#6B647F]">
                                <Phone size={16} /> {lead.phone}
                            </div>
                            {lead.address && <div className="flex items-center gap-3 text-[#6B647F]">
                                <MapPin size={16} /> {lead.address}
                            </div>}
                        </div>
                    </div>
                </div>

                {/* Academic Profile */}
                <div className="kk-glass p-6 rounded-3xl space-y-6">
                    <h2 className="font-bold text-[#3F3A52] border-b border-[#E6E0F2] pb-2">Academic Profile</h2>

                    <div className="space-y-4 text-sm mt-4">
                        <div className="flex justify-between items-center py-2 border-b border-[#E6E0F2]/50">
                            <span className="text-[#6B647F] flex items-center gap-2"><School size={16} /> Year Level</span>
                            <span className="font-semibold text-[#3F3A52]">{lead.yearLevel}</span>
                        </div>
                        {lead.studentEmail && (
                            <div className="flex justify-between items-center py-2 border-b border-[#E6E0F2]/50">
                                <span className="text-[#6B647F] flex items-center gap-2"><Mail size={16} /> Student Email</span>
                                <span className="font-semibold text-[#3F3A52]">{lead.studentEmail}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center py-2 border-b border-[#E6E0F2]/50">
                            <span className="text-[#6B647F] flex items-center gap-2"><BookOpen size={16} /> Subjects</span>
                            <span className="font-semibold text-[#3F3A52] text-right">{parseSubjects(lead.subjects)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[#E6E0F2]/50">
                            <span className="text-[#6B647F] flex items-center gap-2"><School size={16} /> School</span>
                            <span className="font-semibold text-[#3F3A52]">{lead.school || 'Not specified'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Package & Finance (Only if Signed Up or formatted as lead) */}
            {lead.signup && (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="kk-glass-strong p-6 rounded-3xl space-y-4">
                        <h2 className="font-bold text-[#3F3A52] flex items-center gap-2">
                            <CreditCard size={18} /> Package Selection
                        </h2>
                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E6E0F2]">
                            <div className="h-12 w-12 rounded-full bg-[#3F3A52] text-white flex items-center justify-center font-bold text-lg">
                                {lead.signup.learningPackage?.[0]}
                            </div>
                            <div>
                                <div className="font-bold text-[#3F3A52] text-lg">{lead.signup.learningPackage}</div>
                                <div className="text-sm text-[#6B647F]">{lead.signup.paymentFrequency} Billing</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-[#F7F5FB] p-3 rounded-xl">
                                <div className="text-[#8C84A8] text-xs uppercase font-bold">Hours</div>
                                <div className="font-bold text-[#3F3A52]">{lead.signup.hours} hrs/week</div>
                            </div>
                            <div className="bg-[#F7F5FB] p-3 rounded-xl">
                                <div className="text-[#8C84A8] text-xs uppercase font-bold">Status</div>
                                <div className="font-bold text-[#3F3A52]">{lead.signup.status}</div>
                            </div>
                        </div>
                    </div>

                    <div className="kk-glass p-6 rounded-3xl space-y-4">
                        <h2 className="font-bold text-[#3F3A52] flex items-center gap-2">
                            <Calendar size={18} /> Schedule Preferences
                        </h2>
                        {lead.signup.preferredDays && (
                            <div className="space-y-2">
                                <div className="text-xs font-bold uppercase text-[#8C84A8]">Preferred Days</div>
                                <div className="flex flex-wrap gap-2">
                                    {JSON.parse(lead.signup.preferredDays).map((day: string) => (
                                        <span key={day} className="px-2 py-1 bg-white border border-[#E6E0F2] rounded-lg text-xs font-medium text-[#5E5574]">{day}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {lead.signup.preferredTimes && (
                            <div className="space-y-2">
                                <div className="text-xs font-bold uppercase text-[#8C84A8]">Preferred Times</div>
                                <div className="flex flex-wrap gap-2">
                                    {JSON.parse(lead.signup.preferredTimes).map((time: string) => (
                                        <span key={time} className="px-2 py-1 bg-white border border-[#E6E0F2] rounded-lg text-xs font-medium text-[#5E5574]">{time}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Notes / Full Details */}
            <div className="kk-glass-strong p-8 rounded-3xl space-y-6">
                <div className="flex items-center gap-2 font-bold text-[#3F3A52]">
                    <AlertCircle size={20} className="text-[#5E5574]" />
                    <span>Detailed Notes & Concerns</span>
                </div>

                {lead.notes ? (
                    <div className="bg-[#FFF9F0] border border-[#FFEeba] p-6 rounded-2xl whitespace-pre-wrap text-[#5E5574] text-sm leading-relaxed">
                        {lead.notes}
                    </div>
                ) : (
                    <p className="text-[#6B647F] italic">No detailed notes available.</p>
                )}
            </div>

            {/* Consultation Status */}
            {lead.consultation && (
                <div className="kk-glass p-6 rounded-3xl flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-[#3F3A52]">Consultation</h3>
                        <p className="text-sm text-[#6B647F]">Scheduled on {new Date(lead.consultation.scheduledAt).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                        {lead.consultation.status}
                    </span>
                </div>
            )}
        </div>
    )
}
