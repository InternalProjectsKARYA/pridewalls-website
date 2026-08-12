'use client';

import ProjectsBrowser from './ProjectsBrowser';

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-muted/30 py-16 lg:py-24">
      <div className="section-shell">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow mb-4">
            Our Projects
          </span>

          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
            Discover Your Dream Property
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our portfolio of premium residential and commercial properties across prime locations.
          </p>
        </div>

        <ProjectsBrowser />
      </div>
    </section>
  );
}
