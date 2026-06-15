import { Metadata } from "next";
import { getProject, getProjects } from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Revalidate static pages every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  // Skip static generation during build (no server running).
  // Pages are generated on-demand and cached (ISR at revalidate interval).
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Not found" };
  }

  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/building"
          className="inline-flex items-center text-accent-deep hover:underline mb-8"
        >
          ← Back to projects
        </Link>

        <article>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              {project.title}
            </h1>
            <div className="flex items-center justify-between text-ink-soft">
              <time>
                {new Date(project.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {project.coverImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-sand mb-8">
              <Image
                src={project.coverImage.url}
                alt={project.coverImage.alt || project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-stone max-w-none mb-8">
            <p className="text-lg text-ink-soft leading-relaxed">
              {project.excerpt}
            </p>
          </div>

          {project.youtubeUrl && (
            <div className="mb-8 rounded-lg overflow-hidden bg-sand aspect-video">
              <iframe
                src={project.youtubeUrl.replace("watch?v=", "embed/")}
                title={project.title}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-ink mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden bg-sand"
                  >
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || `${project.title} gallery image`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="mb-8 border-t border-line pt-8">
              <h3 className="text-lg font-semibold text-ink mb-4">Resources</h3>
              <ul className="space-y-2">
                {project.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-deep hover:underline"
                    >
                      {link.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
