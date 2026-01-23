import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/resources/[id] - Get a specific resource
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const resource = await prisma.resource.findUnique({
            where: { id: params.id },
        });

        if (!resource) {
            return NextResponse.json(
                { error: "Resource not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(resource);
    } catch (error) {
        console.error("Error fetching resource:", error);
        return NextResponse.json(
            { error: "Failed to fetch resource" },
            { status: 500 }
        );
    }
}

// PATCH /api/resources/[id] - Update a resource (admin only)
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const resource = await prisma.resource.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json(resource);
    } catch (error) {
        console.error("Error updating resource:", error);
        return NextResponse.json(
            { error: "Failed to update resource" },
            { status: 500 }
        );
    }
}

// DELETE /api/resources/[id] - Delete a resource (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.resource.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return NextResponse.json(
            { error: "Failed to delete resource" },
            { status: 500 }
        );
    }
}
