import { Metadata } from "next";
import { getProjects } from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building",
  description: "Home projects, documented one at a time.",
};

export default async function BuildingPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            Building
          </h1>
          <p className="text-lg text-ink-soft">
            How we're building our dream home, one project at a time — the
            garden, the beds, and whatever I'm figuring out next.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-ink-soft py-16">
            No projects yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/building/${project.slug}`}
                className="group block"
              >
                <article className="border border-line rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {project.coverImage && (
                    <div className="relative aspect-video overflow-hidden bg-sand">
                      <Image
                        src={project.coverImage.url}
                        alt={project.coverImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-xl font-bold text-ink group-hover:text-accent-deep transition-colors">
                        {project.title}
                      </h2>
                      <span className="text-sm text-ink-soft">
                        {new Date(project.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <p className="text-ink-soft">{project.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
