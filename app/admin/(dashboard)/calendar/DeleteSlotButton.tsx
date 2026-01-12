"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAvailabilitySlot } from "./actions";

interface DeleteSlotButtonProps {
    slotId: string;
    isBooked: boolean;
}

export default function DeleteSlotButton({ slotId, isBooked }: DeleteSlotButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    const handleDelete = async () => {
        if (isBooked) return;
        if (!confirm("Are you sure you want to delete this slot?")) return;

        setIsDeleting(true);
        try {
            const result = await deleteAvailabilitySlot(slotId);
            if (result.success) {
                router.refresh();
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert("Failed to delete slot");
        } finally {
            setIsDeleting(false);
        }
    };

    if (isBooked) return null; // Or return a disabled button if preferred, but usually cleaner to hide delete on booked slots or show disabled

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg p-1.5 text-red-400 opacity-60 hover:bg-red-50 hover:text-red-600 hover:opacity-100 transition-all disabled:opacity-30"
            title="Delete Slot"
        >
            {isDeleting ? (
                <Loader2 size={14} className="animate-spin" />
            ) : (
                <Trash2 size={14} />
            )}
        </button>
    );
}
