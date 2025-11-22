import { getProjectById } from "@/lib/db";
import EditProjectForm from "@/components/edit-project-form";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { uuid } = await params;
    const project = await getProjectById(uuid);
    if (!project) notFound();
    return <EditProjectForm project={project} uuid={uuid} />;
}
