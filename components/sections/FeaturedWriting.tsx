import Link from "next/link";
import { getPosts } from "@/lib/payload";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export async function FeaturedWriting() {
  const posts = await getPosts();
  const featured = posts.slice(0, 3);

  return (
    <section className="mx-auto max-w-hub px-5 py-20 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl text-ink md:text-3xl">Latest from enjoying</h2>
          <Link
            href="/enjoying"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-accent-deep hover:underline"
          >
            All posts
            <span className="nudge" aria-hidden>
              &rarr;
            </span>
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {featured.map((post, i) => (
          <Reveal key={post.id} delay={i * 80}>
            <Link
              href={
                post.type === "linkpost"
                  ? post.externalUrl || "#"
                  : `/enjoying/${post.slug}`
              }
              target={post.type === "linkpost" ? "_blank" : undefined}
              rel={post.type === "linkpost" ? "noopener noreferrer" : undefined}
              className="group flex flex-col h-full"
            >
              <article className="flex flex-col h-full border border-line rounded-lg overflow-hidden hover:shadow-lg hover:border-accent-deep transition-all">
                {post.coverImage && (
                  <div className="relative aspect-video overflow-hidden bg-sand">
                    <Image
                      src={post.coverImage.url}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="font-bold text-lg text-ink group-hover:text-accent-deep transition-colors line-clamp-2">
                    {post.title}
                    {post.type === "linkpost" && (
                      <span className="text-lg ml-1">↗</span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs text-ink-soft">
                    <time>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    {post.type === "recipe" && (
                      <span className="text-accent-deep">Recipe</span>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
