'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projects } from '../../lib/project-data'; // ← your data file

export default function CompletedProjectsPage() {
  const completedProjects = projects.filter(
    (project) => project.status === 'completed'
  );

  return (
    <div className="container mx-auto px-4 py-12">

      {/* PAGE HEADING */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Completed Projects
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our successfully delivered residential communities built with
          quality, trust, and excellence.
        </p>
      </div>

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {completedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="group rounded-xl overflow-hidden border hover:shadow-lg transition cursor-pointer">

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* STATUS BADGE */}
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    Completed
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[#c12730] transition">
                    {project.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.tagline}
                  </p>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{project.location}</span>
                    <span>{project.projectSize}</span>
                  </div>
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {completedProjects.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No completed projects found.
        </div>
      )}
    </div>
  );
}