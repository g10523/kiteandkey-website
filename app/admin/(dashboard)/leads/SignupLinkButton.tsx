'use client'

import { useState } from 'react'
import { Link as LinkIcon, Check, Copy, Loader2 } from 'lucide-react'
import { generateSignupLink } from '@/app/admin/actions'

export default function SignupLinkButton({ leadId }: { leadId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const [inviteLink, setInviteLink] = useState('')
    const [copied, setCopied] = useState(false)

    async function handleGenerate() {
        setIsLoading(true)
        const result = await generateSignupLink(leadId)
        if (result.success && result.link) {
            setInviteLink(result.link)
        } else {
            alert('Failed: ' + result.error)
        }
        setIsLoading(false)
    }

    function handleCopy() {
        navigator.clipboard.writeText(inviteLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (inviteLink) {
        return (
            <div className="flex gap-1 items-center">
                <input
                    type="text"
                    readOnly
                    value={inviteLink}
                    className="w-32 rounded-lg border border-[#E6E0F2] px-2 text-xs bg-[#F7F5FB] text-[#6B647F] truncate"
                />
                <button
                    onClick={handleCopy}
                    className="flex items-center justify-center rounded-lg bg-[#5E5574] p-1 text-white hover:bg-[#4F4865]"
                    title="Copy Link"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="rounded-lg bg-[#5E5574] px-3 py-1 text-xs font-bold text-white transition-all hover:bg-[#4F4865] disabled:opacity-70 flex items-center gap-1"
        >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <LinkIcon size={14} />}
            Link
        </button>
    )
}
