import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Search, Filter, Eye, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import SignupLinkButton from './SignupLinkButton'
import DeleteLeadButton from './DeleteLeadButton'

export default async function AdminLeadsPage() {
    const session = await auth()

    if (!session) {
        redirect('/admin/login')
    }

    // Fetch all leads
    const allLeads = await prisma.lead.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            consultation: true,
            signup: true,
        },
    })

    // Separate into Active Students and Leads
    const activeStudents = allLeads.filter(l => l.status === 'SIGNED_UP')
    const potentialLeads = allLeads.filter(l => l.status !== 'SIGNED_UP')

    function parseSubjects(subjectsJson: string) {
        try {
            return JSON.parse(subjectsJson).join(', ')
        } catch {
            return subjectsJson
        }
    }

    const TableRow = ({ lead, isActive }: { lead: any, isActive: boolean }) => (
        <tr className="group hover:bg-white/60 transition-colors border-b border-[#E6E0F2]">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${isActive ? 'bg-green-500' : 'bg-[#5E5574]'}`}>
                        {lead.studentName[0]}
                    </div>
                    <div>
                        <div className="font-semibold text-[#3F3A52] text-sm">{lead.studentName}</div>
                        <div className="text-xs text-[#6B647F]">{lead.yearLevel}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-[#3F3A52]">{lead.parentName}</div>
                <div className="text-xs text-[#6B647F] flex items-center gap-1">
                    {lead.phone}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-xs text-[#6B647F] max-w-[150px] truncate" title={parseSubjects(lead.subjects)}>
                    {parseSubjects(lead.subjects)}
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${lead.status === 'CONSULTATION_BOOKED' ? 'bg-blue-100 text-blue-700' :
                    lead.status === 'SIGNED_UP' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-600'
                    }`}>
                    {lead.status.replace(/_/g, ' ')}
                </span>
                {lead.consultation && (
                    <div className="text-[10px] text-[#6B647F] mt-1">
                        {new Date(lead.consultation.scheduledAt).toLocaleDateString()}
                    </div>
                )}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    {!isActive && <SignupLinkButton leadId={lead.id} />}
                    <Link
                        href={`/admin/leads/${lead.id}`}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                        title="View Full Profile"
                    >
                        <Eye size={14} />
                    </Link>
                    <DeleteLeadButton leadId={lead.id} />
                </div>
            </td>
        </tr>
    )

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Leads Management</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C84A8]" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 rounded-xl border border-[#E6E0F2] bg-white/70 pl-9 pr-4 py-2 text-sm focus:border-[#5E5574] focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Pipeline Leads Table */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-1 bg-[#F4D03F] rounded-full" />
                    <h2 className="text-lg font-bold text-[#3F3A52]">Pipeline ({potentialLeads.length})</h2>
                </div>

                <div className="kk-glass-strong rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F7F5FB]/80 text-[#6B647F] text-xs uppercase font-bold tracking-wider border-b border-[#E6E0F2]">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Parent / Contact</th>
                                <th className="px-6 py-4">Subjects</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {potentialLeads.map(lead => (
                                <TableRow key={lead.id} lead={lead} isActive={false} />
                            ))}
                            {potentialLeads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#6B647F]">No leads in pipeline</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Active Students Table */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-1 bg-green-500 rounded-full" />
                    <h2 className="text-lg font-bold text-[#3F3A52]">Active Students ({activeStudents.length})</h2>
                </div>

                <div className="kk-glass-strong rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F7F5FB]/80 text-[#6B647F] text-xs uppercase font-bold tracking-wider border-b border-[#E6E0F2]">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Parent / Contact</th>
                                <th className="px-6 py-4">Subjects</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeStudents.map(lead => (
                                <TableRow key={lead.id} lead={lead} isActive={true} />
                            ))}
                            {activeStudents.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#6B647F]">No active students</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    )
}
