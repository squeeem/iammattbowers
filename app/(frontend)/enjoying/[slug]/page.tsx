import { Metadata } from "next";
import { getPost, getPosts } from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LexicalRenderer } from "@/components/ui/LexicalRenderer";

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
  const post = await getPost(slug);

  if (!post) {
    return { title: "Not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.type === "linkpost") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/enjoying"
          className="inline-flex items-center text-accent-deep hover:underline mb-8"
        >
          ← Back to posts
        </Link>

        <article>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-between text-ink-soft">
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.type === "recipe" && (
                <span className="text-sm text-accent-deep font-semibold">
                  Recipe
                  {post.recipe?.servings && ` • ${post.recipe.servings}`}
                  {post.recipe?.totalTime && ` • ${post.recipe.totalTime}`}
                </span>
              )}
            </div>
          </div>

          {post.coverImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-sand mb-8">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-stone max-w-none mb-8">
            <p className="text-lg text-ink-soft leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {post.body && <LexicalRenderer body={post.body} />}

          {post.type === "recipe" && post.recipe && (
            <div className="bg-sand rounded-lg p-6 mb-8 border border-line">
              <h2 className="text-2xl font-bold text-ink mb-6">Ingredients</h2>
              <ul className="space-y-2">
                {post.recipe.ingredients?.map((ing, idx) => (
                  <li key={idx} className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-3 accent-accent-deep"
                      disabled
                    />
                    <span className="text-ink">{ing.item}</span>
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
