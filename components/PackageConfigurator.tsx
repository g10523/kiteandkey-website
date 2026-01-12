'use client'

import { useState } from 'react'
import { Check, Info } from 'lucide-react'
import { getValidAllocations, getPackageLimits, SUBJECTS } from '@/lib/enrolment-schemas'

interface PackageConfig {
    package: 'ELEVATE' | 'GLIDE' | 'SOAR' | null
    subjects: string[]
    hourAllocation: Record<string, number>
    weeklyHours: number
    hourlyRate: number
    weeklyTotal: number
    preferredDays: string[]
    preferredTimes: string[]
}

interface PackageConfiguratorProps {
    studentName: string
    config: PackageConfig
    onChange: (config: PackageConfig) => void
}

const PACKAGES = [
    { id: 'ELEVATE' as const, name: 'Elevate', hours: 1, rate: 70, color: 'from-blue-500 to-blue-600' },
    { id: 'GLIDE' as const, name: 'Glide', hours: 2, rate: 70, color: 'from-purple-500 to-purple-600', popular: true },
    { id: 'SOAR' as const, name: 'Soar', hours: 3, rate: 70, color: 'from-pink-500 to-pink-600' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TIME_SLOTS = ['3:30 PM', '4:30 PM', '5:30 PM', '6:30 PM', 'Saturday AM']

export default function PackageConfigurator({ studentName, config, onChange }: PackageConfiguratorProps) {
    const [selectedAllocation, setSelectedAllocation] = useState<string>('')

    const handlePackageSelect = (packageId: 'ELEVATE' | 'GLIDE' | 'SOAR') => {
        const pkg = PACKAGES.find(p => p.id === packageId)!
        onChange({
            ...config,
            package: packageId,
            subjects: [],
            hourAllocation: {},
            weeklyHours: pkg.hours,
            hourlyRate: pkg.rate,
            weeklyTotal: pkg.rate * pkg.hours,
        })
    }

    const handleSubjectToggle = (subject: string) => {
        if (!config.package) return

        const limits = getPackageLimits(config.package)
        let newSubjects = [...config.subjects]

        if (newSubjects.includes(subject)) {
            newSubjects = newSubjects.filter(s => s !== subject)
        } else {
            if (newSubjects.length < limits.maxSubjects) {
                newSubjects.push(subject)
            }
        }

        onChange({
            ...config,
            subjects: newSubjects,
            hourAllocation: {}, // Reset allocation when subjects change
        })
    }

    const handleAllocationSelect = (allocation: Record<string, number>) => {
        onChange({
            ...config,
            hourAllocation: allocation,
        })
    }

    const toggleDay = (day: string) => {
        const newDays = config.preferredDays.includes(day)
            ? config.preferredDays.filter(d => d !== day)
            : [...config.preferredDays, day]
        onChange({ ...config, preferredDays: newDays })
    }

    const toggleTime = (time: string) => {
        const newTimes = config.preferredTimes.includes(time)
            ? config.preferredTimes.filter(t => t !== time)
            : [...config.preferredTimes, time]
        onChange({ ...config, preferredTimes: newTimes })
    }

    const validAllocations = config.package && config.subjects.length > 0
        ? getValidAllocations(config.package, config.subjects)
        : []

    const isComplete = config.package && config.subjects.length > 0 && Object.keys(config.hourAllocation).length > 0

    return (
        <div className="space-y-6 rounded-2xl border-2 border-[#E6E0F2] bg-gradient-to-br from-white to-[#FAFBFF] p-6">
            {/* Student Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#3F3A52]">{studentName}</h3>
                {isComplete && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                        <Check size={16} />
                        Configured
                    </div>
                )}
            </div>

            {/* Package Selection */}
            <div>
                <label className="block text-sm font-bold text-[#3F3A52] mb-3">
                    Select Package <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {PACKAGES.map((pkg) => (
                        <button
                            key={pkg.id}
                            type="button"
                            onClick={() => handlePackageSelect(pkg.id)}
                            className={`relative rounded-xl border-2 p-4 text-center transition-all ${config.package === pkg.id
                                    ? 'border-[#5E5574] bg-gradient-to-br from-[#F7F5FB] to-[#FAFBFF] shadow-lg ring-2 ring-[#5E5574] ring-offset-2'
                                    : 'border-[#E6E0F2] bg-white hover:border-[#D9CFF2]'
                                }`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
                                    POPULAR
                                </div>
                            )}
                            <div className="text-lg font-bold text-[#3F3A52]">{pkg.name}</div>
                            <div className="text-xs text-[#8C84A8] mt-1">{pkg.hours} hr/week</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Subject Selection */}
            {config.package && (
                <div>
                    <label className="block text-sm font-bold text-[#3F3A52] mb-2">
                        Select Subjects <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-[#8C84A8] mb-3">
                        Max {getPackageLimits(config.package).maxSubjects} subject(s) for {config.package}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {SUBJECTS.map((subject) => {
                            const isSelected = config.subjects.includes(subject)
                            const limits = getPackageLimits(config.package!)
                            const isDisabled = !isSelected && config.subjects.length >= limits.maxSubjects

                            return (
                                <button
                                    key={subject}
                                    type="button"
                                    onClick={() => handleSubjectToggle(subject)}
                                    disabled={isDisabled}
                                    className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${isSelected
                                            ? 'border-[#5E5574] bg-[#5E5574] text-white shadow-md'
                                            : isDisabled
                                                ? 'border-[#E6E1F2] bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'border-[#E6E0F2] bg-white text-[#5E5574] hover:border-[#D9CFF2]'
                                        }`}
                                >
                                    {subject}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Hour Allocation */}
            {config.package && config.subjects.length > 0 && validAllocations.length > 0 && (
                <div>
                    <label className="block text-sm font-bold text-[#3F3A52] mb-2">
                        Hour Allocation <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-[#8C84A8] mb-3">
                        Total: {config.weeklyHours} hours per week
                    </p>
                    <div className="space-y-2">
                        {validAllocations.map((option, index) => {
                            const isSelected = JSON.stringify(config.hourAllocation) === JSON.stringify(option.allocation)

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAllocationSelect(option.allocation)}
                                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${isSelected
                                            ? 'border-[#5E5574] bg-gradient-to-r from-[#F7F5FB] to-[#FAFBFF] shadow-md'
                                            : 'border-[#E6E0F2] bg-white hover:border-[#D9CFF2]'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-[#3F3A52]">{option.label}</span>
                                        {isSelected && <Check size={16} className="text-[#5E5574]" />}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Pricing Display */}
            {config.package && (
                <div className="rounded-xl bg-gradient-to-br from-[#5E5574] to-[#7C6B94] p-4 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs opacity-90">Weekly Cost</div>
                            <div className="text-2xl font-bold">${config.weeklyTotal}</div>
                            <div className="text-xs opacity-75 mt-1">
                                ${config.hourlyRate}/hr × {config.weeklyHours} hrs
                            </div>
                        </div>
                        <Info size={20} className="opacity-75" />
                    </div>
                </div>
            )}

            {/* Scheduling Preferences */}
            {config.package && (
                <div className="space-y-4 pt-4 border-t-2 border-[#E6E0F2]">
                    <div>
                        <label className="block text-sm font-bold text-[#3F3A52] mb-3">
                            Preferred Days
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {DAYS.map(day => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${config.preferredDays.includes(day)
                                            ? 'bg-[#5E5574] text-white border-[#5E5574]'
                                            : 'bg-white border-[#E6E0F2] text-[#6B647F] hover:border-[#D9CFF2]'
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#3F3A52] mb-3">
                            Preferred Times
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {TIME_SLOTS.map(time => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => toggleTime(time)}
                                    className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${config.preferredTimes.includes(time)
                                            ? 'bg-[#5E5574] text-white border-[#5E5574]'
                                            : 'bg-white border-[#E6E0F2] text-[#6B647F] hover:border-[#D9CFF2]'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
