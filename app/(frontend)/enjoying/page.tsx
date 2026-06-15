import { Metadata } from "next";
import { getPosts } from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";

// Fetch data on-demand (not prerendered during build)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Enjoying",
  description:
    "The point of all of it — slow mornings, shared meals, and actually being here.",
};

export default async function EnjoyingPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            Enjoying
          </h1>
          <p className="text-lg text-ink-soft">
            The point of all of it — slow mornings, shared meals, and actually
            being here for what we built.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-ink-soft py-16">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-line pb-8 last:border-0">
                {post.type === "linkpost" ? (
                  // Linkpost: click out to external URL
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold text-accent-deep group-hover:underline">
                        {post.title}
                        <span className="text-lg ml-2">↗</span>
                      </h2>
                      <time className="text-sm text-ink-soft shrink-0 ml-4">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </time>
                    </div>
                    <p className="text-ink-soft">{post.excerpt}</p>
                  </a>
                ) : (
                  // Native post or recipe: link to detail page
                  <Link href={`/enjoying/${post.slug}`} className="group block">
                    {post.coverImage && (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-sand mb-4">
                        <Image
                          src={post.coverImage.url}
                          alt={post.coverImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold text-ink group-hover:text-accent-deep transition-colors">
                        {post.title}
                      </h2>
                      <time className="text-sm text-ink-soft shrink-0 ml-4">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </time>
                    </div>
                    <p className="text-ink-soft">{post.excerpt}</p>
                    {post.type === "recipe" && (
                      <div className="text-sm text-accent-deep mt-2">
                        Recipe
                        {post.recipe?.servings && ` • ${post.recipe.servings}`}
                        {post.recipe?.totalTime && ` • ${post.recipe.totalTime}`}
                      </div>
                    )}
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
