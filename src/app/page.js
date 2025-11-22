import Image from "next/image";
import Link from "next/link";
import MyHero from "@/components/my-hero-section";
import ProjectPreviewCard from "@/components/project-preview-card";
import ContactMe from "@/components/contact-me";
import GitHubCalendar from "@/components/github-calendar";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <MyHero />
      <ProjectPreviewCard numberOfProjects={3} />
      <GitHubCalendar username="imananoosheh" />
      <ContactMe />
    </div>
  );
}
