'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteLead } from './actions'

export default function DeleteLeadButton({ leadId }: { leadId: string }) {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm('Are you sure you want to completely delete this lead? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        const result = await deleteLead(leadId)

        if (!result.success) {
            alert(result.error || 'Failed to delete lead')
            setIsDeleting(false)
        }
        // If success, server action revalidates path, so UI should update automatically.
        // We technically don't need to set isDeleting(false) if the row disappears, 
        // but safe to do so if it doesn't immediately.
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
            title="Delete Lead"
            type="button"
        >
            {isDeleting ? (
                <Loader2 size={14} className="animate-spin" />
            ) : (
                <Trash2 size={14} />
            )}
        </button>
    )
}
