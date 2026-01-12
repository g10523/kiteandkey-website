'use client'

import { Check } from 'lucide-react'

interface GoalCheckboxGroupProps {
    title: string
    description: string
    options: readonly string[]
    selected: string[]
    onChange: (goals: string[]) => void
    maxSelections?: number
    error?: string
}

export default function GoalCheckboxGroup({
    title,
    description,
    options,
    selected,
    onChange,
    maxSelections = 3,
    error
}: GoalCheckboxGroupProps) {

    const toggleGoal = (goal: string) => {
        if (selected.includes(goal)) {
            // Remove
            onChange(selected.filter(g => g !== goal))
        } else {
            // Add if under limit
            if (selected.length < maxSelections) {
                onChange([...selected, goal])
            }
        }
    }

    const isDisabled = (goal: string) => {
        return !selected.includes(goal) && selected.length >= maxSelections
    }

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-bold text-[#3F3A52]">{title}</h3>
                <p className="text-sm text-[#8C84A8] mt-1">
                    {description} <span className="font-semibold">(Select up to {maxSelections})</span>
                </p>
                <div className="mt-2 text-xs text-[#5E5574] font-medium">
                    {selected.length} / {maxSelections} selected
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((goal) => {
                    const isSelected = selected.includes(goal)
                    const disabled = isDisabled(goal)

                    return (
                        <button
                            key={goal}
                            type="button"
                            onClick={() => toggleGoal(goal)}
                            disabled={disabled}
                            className={`
                relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all
                ${isSelected
                                    ? 'border-[#5E5574] bg-gradient-to-br from-[#F7F5FB] to-[#FAFBFF] shadow-md'
                                    : disabled
                                        ? 'border-[#E6E1F2] bg-gray-50 opacity-50 cursor-not-allowed'
                                        : 'border-[#E6E1F2] bg-white hover:border-[#D9CFF2] hover:bg-[#FAFBFF]'
                                }
              `}
                        >
                            <div className={`
                flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                ${isSelected
                                    ? 'bg-[#5E5574] border-[#5E5574]'
                                    : 'border-[#D9CFF2] bg-white'
                                }
              `}>
                                {isSelected && <Check size={14} className="text-white" />}
                            </div>
                            <span className={`text-sm font-medium leading-tight ${isSelected ? 'text-[#3F3A52]' : disabled ? 'text-[#8C84A8]' : 'text-[#3F3A52]'
                                }`}>
                                {goal}
                            </span>
                        </button>
                    )
                })}
            </div>

            {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
        </div>
    )
}
