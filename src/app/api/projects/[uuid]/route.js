
import { getProjectById, deleteProject, updateProject } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateProjectSchema = z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    img: z.string().trim().min(1).optional(),
    link: z.string().trim().min(1).optional(),
    keywords: z.array(z.string().trim()).optional(),
});

export async function GET(request, { params }) {
    const { uuid } = await params;
    const project = await getProjectById(uuid);
    return Response.json(project);
}

export async function DELETE(request, { params }) {
    const { uuid } = await params;
    const project = await deleteProject(uuid);
    console.log('project delete response back from db:', project);
    return Response.json({ message: "Project deleted" }, { status: 200 });
}

export async function PUT(request, { params }) {
    const { uuid } = await params;
    const formData = await request.formData();
    const payload = updateProjectSchema.parse({
        title: formData.get("title") ?? undefined,
        description: formData.get("description") ?? undefined,
        img: formData.get("img") ?? undefined,
        link: formData.get("link") ?? undefined,
        keywords: formData.getAll("keywords[]"),
    });
    const updatedProject = await updateProject(uuid, payload);
    if (!updatedProject) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated"}, { status: 200 });
}
