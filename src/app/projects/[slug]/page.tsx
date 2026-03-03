// src/app/projects/[slug]/page.tsx

import { projects } from "@/lib/project-data";
import ProjectPage from "@/components/common/ProjectPage";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;   // ⭐ THIS IS THE FIX

  console.log("slug:", slug);

  const project = projects.find((p) => p.slug === slug);

  console.log("project found:", !!project);

  if (!project) return notFound();

  return <ProjectPage project={project}  />;
}