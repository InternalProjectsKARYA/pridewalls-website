import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '@/components/common/ProjectPage';
import { projects } from '@/lib/project-data';

interface ProjectRouteProps {
  params: Promise<{ slug: string }>;
}

function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Pride Walls',
      description: 'The requested project page could not be found.',
    };
  }

  return {
    title: `${project.name} | Pride Walls`,
    description: project.tagline,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | Pride Walls`,
      description: project.tagline,
      images: [
        {
          url: project.coverImage,
          alt: project.name,
        },
      ],
    },
  };
}

export default async function Page({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
