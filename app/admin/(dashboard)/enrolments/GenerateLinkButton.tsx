'use client'

import { useState } from 'react'
import { Link as LinkIcon, Check, Copy } from 'lucide-react'
import { generateContinuationToken } from '@/app/enrol/actions-v2'

export default function GenerateLinkButton({ enrolmentId }: { enrolmentId: string }) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [link, setLink] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const handleGenerate = async () => {
        setIsGenerating(true)
        const result = await generateContinuationToken(enrolmentId)

        if (result.success && result.link) {
            setLink(result.link)
        } else {
            alert(result.error || 'Failed to generate link')
        }

        setIsGenerating(false)
    }

    const handleCopy = () => {
        if (link) {
            navigator.clipboard.writeText(link)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    if (link) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors text-xs font-semibold"
                >
                    {copied ? (
                        <>
                            <Check size={14} />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            Copy Link
                        </>
                    )}
                </button>
                <div className="text-xs text-[#6B647F] max-w-[200px] truncate" title={link}>
                    {link}
                </div>
            </div>
        )
    }

    return (
        <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#5E5574] text-white hover:bg-[#4F4865] transition-colors text-xs font-semibold disabled:opacity-50"
        >
            <LinkIcon size={14} />
            {isGenerating ? 'Generating...' : 'Generate Link'}
        </button>
    )
}
