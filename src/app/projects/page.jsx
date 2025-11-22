"use client"

import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import ProjectCard from "@/components/project-card";



const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ProjectsPage() {
    const { user } = useUser();
    const { data: projectData, error } = useSWR("/api/projects", fetcher);

    if (!projectData) return <p>Loading…</p>;
    if (error) return <p>Failed to load projects.</p>;

    return (
        <div className="flex flex-wrap items-center justify-center bg-stone-50 font-sans dark:bg-black my-4">
            {projectData.map((project) => (
                <ProjectCard key={project.id} project={project} session={user} />
            ))}
        </div>
    );
}