import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import { getProjects } from "@/lib/db";

export default async function ProjectPreviewCard({ numberOfProjects = 3 } = {}) {
    const projects = await getProjects().catch(() => []);
    return (
        <div className="flex flex-wrap items-center justify-center bg-stone-50 font-sans dark:bg-black my-4">
            {projects.slice(0, numberOfProjects).map((project, index) => (
                <Card key={index} className="m-2 py-2 w-80 gap-2 hover:scale-105 transition-transform bg-stone-500">
                    <Image width={300} height={300} src={project.img} alt={project.title} className="h-[300px] w-[300px] object-contain rounded self-center" />
                    <h3 className="px-2 text-lg font-bold text-stone-50">{project.title}</h3>
                    <p className="px-2 leading-relaxed h-12 text-sm text-stone-300 dark:text-stone-600 line-clamp-2">{project.description}</p>
                    <Button variant="outline" className="m-2">
                        <Link href={`/projects/${project.id}`} rel="noopener noreferrer">
                            View Project
                        </Link>
                    </Button>
                </Card>
            ))}
        </div>
    );
}   
