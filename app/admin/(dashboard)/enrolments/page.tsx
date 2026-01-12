import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Search, Eye, Mail, Copy, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import GenerateLinkButton from './GenerateLinkButton'

export default async function AdminEnrolmentsPage() {
    const session = await auth()

    if (!session) {
        redirect('/admin/login')
    }

    // Fetch all enrolments
    let allEnrolments: any[] = []
    try {
        allEnrolments = await prisma.enrolment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                students: true,
                consultationSlot: true,
            },
        })
    } catch (error) {
        console.error('Failed to fetch enrolments:', error)
    }

    // Separate by stage
    const consultations = allEnrolments.filter(e => e.stage === 'CONSULTATION')
    const signups = allEnrolments.filter(e => e.stage === 'SIGNUP')
    const active = allEnrolments.filter(e => e.stage === 'ACTIVE')

    // Status badge helper
    const StatusBadge = ({ status }: { status: string }) => {
        const colors: Record<string, string> = {
            CONSULTATION_REQUESTED: 'bg-gray-100 text-gray-700',
            CONSULTATION_SCHEDULED: 'bg-blue-100 text-blue-700',
            CONSULTATION_COMPLETED: 'bg-purple-100 text-purple-700',
            PENDING_SIGNUP: 'bg-yellow-100 text-yellow-700',
            SIGNUP_STARTED: 'bg-orange-100 text-orange-700',
            SIGNUP_COMPLETED: 'bg-green-100 text-green-700',
            ENROLLED: 'bg-emerald-100 text-emerald-700',
            CANCELLED: 'bg-red-100 text-red-700',
        }

        return (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
                {status.replace(/_/g, ' ')}
            </span>
        )
    }

    const TableRow = ({ enrolment }: { enrolment: any }) => {
        const studentNames = enrolment.students.map((s: any) => `${s.firstName} ${s.lastName}`).join(', ')
        const studentCount = enrolment.students.length
        const packages = [...new Set(enrolment.students.map((s: any) => s.package).filter(Boolean))]
        const subjects = [...new Set(enrolment.students.flatMap((s: any) => s.subjects || []))]

        return (
            <tr className="group hover:bg-white/60 transition-colors border-b border-[#E6E0F2]">
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white bg-[#5E5574]">
                            {enrolment.parentFirstName[0]}
                        </div>
                        <div>
                            <div className="font-semibold text-[#3F3A52] text-sm">
                                {enrolment.parentFirstName} {enrolment.parentLastName}
                            </div>
                            <div className="text-xs text-[#6B647F]">{enrolment.parentEmail}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-sm text-[#3F3A52]">
                        {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
                    </div>
                    <div className="text-xs text-[#6B647F] truncate max-w-[200px]" title={studentNames}>
                        {studentNames}
                    </div>
                </td>
                <td className="px-6 py-4">
                    {packages.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {packages.map((pkg: string) => (
                                <span key={pkg} className="px-2 py-0.5 rounded-md bg-[#F7F5FB] text-[#5E5574] text-[10px] font-semibold">
                                    {pkg}
                                </span>
                            ))}
                        </div>
                    )}
                    {subjects.length > 0 && (
                        <div className="text-xs text-[#6B647F] mt-1">
                            {subjects.join(', ')}
                        </div>
                    )}
                </td>
                <td className="px-6 py-4">
                    <StatusBadge status={enrolment.status} />
                    {enrolment.consultationSlot && (
                        <div className="text-[10px] text-[#6B647F] mt-1 flex items-center gap-1">
                            <Clock size={10} />
                            {new Date(enrolment.consultationSlot.startTime).toLocaleDateString()}
                        </div>
                    )}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        {enrolment.status === 'CONSULTATION_COMPLETED' && !enrolment.tokenUsed && (
                            <GenerateLinkButton enrolmentId={enrolment.id} />
                        )}
                        <Link
                            href={`/admin/enrolments/${enrolment.id}`}
                            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            title="View Details"
                        >
                            <Eye size={14} />
                        </Link>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Enrolments</h1>
                    <p className="text-sm text-[#6B647F] mt-1">
                        Manage consultations, sign-ups, and active students
                    </p>
                </div>
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 border-2 border-blue-200">
                    <div className="text-3xl font-bold text-blue-700">{consultations.length}</div>
                    <div className="text-sm font-semibold text-blue-600 mt-1">Consultations</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 border-2 border-yellow-200">
                    <div className="text-3xl font-bold text-yellow-700">
                        {allEnrolments.filter(e => e.status === 'PENDING_SIGNUP').length}
                    </div>
                    <div className="text-sm font-semibold text-yellow-600 mt-1">Pending Sign-Up</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 border-2 border-green-200">
                    <div className="text-3xl font-bold text-green-700">{signups.length}</div>
                    <div className="text-sm font-semibold text-green-600 mt-1">Sign-Ups</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 border-2 border-purple-200">
                    <div className="text-3xl font-bold text-purple-700">{active.length}</div>
                    <div className="text-sm font-semibold text-purple-600 mt-1">Active Students</div>
                </div>
            </div>

            {/* Consultations Table */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-1 bg-blue-500 rounded-full" />
                    <h2 className="text-lg font-bold text-[#3F3A52]">Consultations ({consultations.length})</h2>
                </div>

                <div className="kk-glass-strong rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F7F5FB]/80 text-[#6B647F] text-xs uppercase font-bold tracking-wider border-b border-[#E6E0F2]">
                            <tr>
                                <th className="px-6 py-4">Parent</th>
                                <th className="px-6 py-4">Students</th>
                                <th className="px-6 py-4">Package/Subjects</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultations.map(enrolment => (
                                <TableRow key={enrolment.id} enrolment={enrolment} />
                            ))}
                            {consultations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#6B647F]">
                                        No consultations
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Sign-Ups Table */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-1 bg-green-500 rounded-full" />
                    <h2 className="text-lg font-bold text-[#3F3A52]">Sign-Ups ({signups.length})</h2>
                </div>

                <div className="kk-glass-strong rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F7F5FB]/80 text-[#6B647F] text-xs uppercase font-bold tracking-wider border-b border-[#E6E0F2]">
                            <tr>
                                <th className="px-6 py-4">Parent</th>
                                <th className="px-6 py-4">Students</th>
                                <th className="px-6 py-4">Package/Subjects</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {signups.map(enrolment => (
                                <TableRow key={enrolment.id} enrolment={enrolment} />
                            ))}
                            {signups.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#6B647F]">
                                        No sign-ups yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
