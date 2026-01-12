import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { ArrowLeft, User, Mail, Phone, Calendar, BookOpen, Target, Package } from 'lucide-react'
import Link from 'next/link'
import GenerateLinkButton from '../GenerateLinkButton'

export default async function EnrolmentDetailPage({ params }: { params: { id: string } }) {
    const session = await auth()

    if (!session) {
        redirect('/admin/login')
    }

    const enrolment = await prisma.enrolment.findUnique({
        where: { id: params.id },
        include: {
            students: true,
            consultationSlot: true,
        },
    })

    if (!enrolment) {
        notFound()
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/enrolments"
                    className="p-2 rounded-lg bg-white border-2 border-[#E6E0F2] hover:border-[#D9CFF2] transition-colors"
                >
                    <ArrowLeft size={20} className="text-[#5E5574]" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">
                        {enrolment.parentFirstName} {enrolment.parentLastName}
                    </h1>
                    <p className="text-sm text-[#6B647F] mt-1">
                        Enrolment ID: {enrolment.id}
                    </p>
                </div>
                {enrolment.status === 'CONSULTATION_COMPLETED' && !enrolment.tokenUsed && (
                    <GenerateLinkButton enrolmentId={enrolment.id} />
                )}
            </div>

            {/* Status Badge */}
            <div className="rounded-2xl bg-gradient-to-br from-[#F7F5FB] to-white border-2 border-[#E6E0F2] p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-semibold text-[#6B647F] mb-2">Current Status</div>
                        <div className="text-2xl font-bold text-[#3F3A52]">
                            {enrolment.status.replace(/_/g, ' ')}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-semibold text-[#6B647F] mb-2">Stage</div>
                        <div className="text-2xl font-bold text-[#5E5574]">
                            {enrolment.stage}
                        </div>
                    </div>
                </div>
            </div>

            {/* Parent Information */}
            <section className="rounded-2xl bg-white border-2 border-[#E6E0F2] p-6">
                <h2 className="text-xl font-bold text-[#3F3A52] mb-4 flex items-center gap-2">
                    <User size={20} className="text-[#5E5574]" />
                    Parent/Guardian Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm font-semibold text-[#6B647F]">Name</div>
                        <div className="text-[#3F3A52] mt-1">
                            {enrolment.parentFirstName} {enrolment.parentLastName}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-[#6B647F]">Email</div>
                        <div className="text-[#3F3A52] mt-1 flex items-center gap-2">
                            <Mail size={14} />
                            {enrolment.parentEmail}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-[#6B647F]">Phone</div>
                        <div className="text-[#3F3A52] mt-1 flex items-center gap-2">
                            <Phone size={14} />
                            {enrolment.parentPhone}
                        </div>
                    </div>
                    {enrolment.howDidYouHear && (
                        <div>
                            <div className="text-sm font-semibold text-[#6B647F]">How They Heard</div>
                            <div className="text-[#3F3A52] mt-1">{enrolment.howDidYouHear}</div>
                        </div>
                    )}
                </div>
            </section>

            {/* Students */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-[#3F3A52] flex items-center gap-2">
                    <BookOpen size={20} className="text-[#5E5574]" />
                    Students ({enrolment.students.length})
                </h2>

                {enrolment.students.map((student) => (
                    <div key={student.id} className="rounded-2xl bg-white border-2 border-[#E6E0F2] p-6">
                        <h3 className="text-lg font-bold text-[#3F3A52] mb-4">
                            {student.firstName} {student.lastName}
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm font-semibold text-[#6B647F]">Grade in 2026</div>
                                <div className="text-[#3F3A52] mt-1">{student.gradeIn2026}</div>
                            </div>
                            {student.school && (
                                <div>
                                    <div className="text-sm font-semibold text-[#6B647F]">School</div>
                                    <div className="text-[#3F3A52] mt-1">{student.school}</div>
                                </div>
                            )}
                            {student.email && (
                                <div>
                                    <div className="text-sm font-semibold text-[#6B647F]">Email</div>
                                    <div className="text-[#3F3A52] mt-1">{student.email}</div>
                                </div>
                            )}
                        </div>

                        {student.package && (
                            <div className="mt-6 pt-6 border-t-2 border-[#E6E0F2]">
                                <h4 className="text-sm font-bold text-[#5E5574] mb-3 flex items-center gap-2">
                                    <Package size={16} />
                                    Package Configuration
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm font-semibold text-[#6B647F]">Package</div>
                                        <div className="text-[#3F3A52] mt-1 font-bold">{student.package}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-[#6B647F]">Weekly Hours</div>
                                        <div className="text-[#3F3A52] mt-1">{student.weeklyHours} hrs</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-[#6B647F]">Subjects</div>
                                        <div className="text-[#3F3A52] mt-1">
                                            {student.subjects.join(', ')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-[#6B647F]">Weekly Cost</div>
                                        <div className="text-[#3F3A52] mt-1 font-bold">
                                            ${student.weeklyTotal}
                                        </div>
                                    </div>
                                </div>

                                {student.hourAllocation && (
                                    <div className="mt-4">
                                        <div className="text-sm font-semibold text-[#6B647F] mb-2">Hour Allocation</div>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(student.hourAllocation as Record<string, number>).map(([subject, hours]) => (
                                                <span key={subject} className="px-3 py-1 rounded-lg bg-[#F7F5FB] text-[#5E5574] text-sm font-medium">
                                                    {subject}: {hours}h
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {student.preferredDays.length > 0 && (
                                    <div className="mt-4">
                                        <div className="text-sm font-semibold text-[#6B647F] mb-2">Preferred Days</div>
                                        <div className="flex flex-wrap gap-2">
                                            {student.preferredDays.map(day => (
                                                <span key={day} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm">
                                                    {day}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {student.preferredTimes.length > 0 && (
                                    <div className="mt-4">
                                        <div className="text-sm font-semibold text-[#6B647F] mb-2">Preferred Times</div>
                                        <div className="flex flex-wrap gap-2">
                                            {student.preferredTimes.map(time => (
                                                <span key={time} className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-sm">
                                                    {time}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* Goals */}
            <section className="rounded-2xl bg-white border-2 border-[#E6E0F2] p-6">
                <h2 className="text-xl font-bold text-[#3F3A52] mb-4 flex items-center gap-2">
                    <Target size={20} className="text-[#5E5574]" />
                    Learning Goals
                </h2>

                <div className="space-y-4">
                    {enrolment.academicGoals.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-[#5E5574] mb-2">Academic Performance</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {enrolment.academicGoals.map((goal, i) => (
                                    <li key={i} className="text-sm text-[#3F3A52]">{goal}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {enrolment.learningGoals.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-[#5E5574] mb-2">Learning & Study Skills</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {enrolment.learningGoals.map((goal, i) => (
                                    <li key={i} className="text-sm text-[#3F3A52]">{goal}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {enrolment.personalGoals.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-[#5E5574] mb-2">Personal & Social Development</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {enrolment.personalGoals.map((goal, i) => (
                                    <li key={i} className="text-sm text-[#3F3A52]">{goal}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Consultation Details */}
            {enrolment.consultationSlot && (
                <section className="rounded-2xl bg-white border-2 border-[#E6E0F2] p-6">
                    <h2 className="text-xl font-bold text-[#3F3A52] mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-[#5E5574]" />
                        Consultation Details
                    </h2>
                    <div className="text-sm text-[#3F3A52]">
                        Scheduled: {new Date(enrolment.consultationSlot.startTime).toLocaleString()}
                    </div>
                </section>
            )}

            {/* Token Info */}
            {enrolment.continuationToken && (
                <section className="rounded-2xl bg-yellow-50 border-2 border-yellow-200 p-6">
                    <h2 className="text-lg font-bold text-yellow-900 mb-2">Continuation Link</h2>
                    <div className="text-sm text-yellow-800">
                        {enrolment.tokenUsed ? (
                            <span className="font-semibold">✓ Link has been used</span>
                        ) : (
                            <>
                                <div className="mb-2">Link generated and ready to send</div>
                                {enrolment.tokenExpiresAt && (
                                    <div className="text-xs">
                                        Expires: {new Date(enrolment.tokenExpiresAt).toLocaleString()}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            )}
        </div>
    )
}
