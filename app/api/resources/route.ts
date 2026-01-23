import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/resources - Fetch all public resources
export async function GET(request: NextRequest) {
    try {
        const resources = await prisma.resource.findMany({
            where: {
                isPublic: true,
            },
            orderBy: [
                { isPinned: "desc" },
                { createdAt: "desc" },
            ],
        });

        return NextResponse.json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        return NextResponse.json(
            { error: "Failed to fetch resources" },
            { status: 500 }
        );
    }
}

// POST /api/resources - Create a new resource (admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            title,
            description,
            type,
            category,
            fileName,
            fileUrl,
            fileSize,
            mimeType,
            yearLevel,
            tags,
            isPublic,
            isPinned,
            uploadedBy,
        } = body;

        // Validate required fields
        if (!title || !type || !category || !fileName || !fileUrl || !fileSize || !mimeType) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const resource = await prisma.resource.create({
            data: {
                title,
                description,
                type,
                category,
                fileName,
                fileUrl,
                fileSize,
                mimeType,
                yearLevel,
                tags: tags || [],
                isPublic: isPublic ?? true,
                isPinned: isPinned ?? false,
                uploadedBy,
            },
        });

        return NextResponse.json(resource, { status: 201 });
    } catch (error) {
        console.error("Error creating resource:", error);
        return NextResponse.json(
            { error: "Failed to create resource" },
            { status: 500 }
        );
    }
}
