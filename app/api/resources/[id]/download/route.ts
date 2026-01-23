import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/resources/[id]/download - Track download count
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const resource = await prisma.resource.update({
            where: { id: params.id },
            data: {
                downloadCount: {
                    increment: 1,
                },
            },
        });

        return NextResponse.json({ success: true, downloadCount: resource.downloadCount });
    } catch (error) {
        console.error("Error tracking download:", error);
        return NextResponse.json(
            { error: "Failed to track download" },
            { status: 500 }
        );
    }
}
