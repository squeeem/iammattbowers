// Client for Payload's local REST API. Runs during SSG/SSR (server-side only).
// See payload/collections/* for collection schemas and fields.

// Construct absolute URL: in production, use the vercel domain from env; in dev, use localhost.
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_PAYLOAD_API_URL) {
    return process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const BASE_URL = getBaseUrl();

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

function emptyResponse<T>(): PayloadResponse<T> {
  return {
    docs: [],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 1,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  };
}

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<PayloadResponse<T>> {
  const url = `${BASE_URL}/api${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      // Cache SSG pages for 1 hour
      next: { revalidate: 3600, ...options?.next },
    });

    if (!res.ok) {
      throw new Error(`Payload API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    // Don't let a transient CMS/DB hiccup take down the whole page. Log it and
    // render an empty state — ISR will recover on the next successful revalidate.
    console.error(`[payload] fetch failed for ${endpoint}:`, err);
    return emptyResponse<T>();
  }
}

// Projects (Building)
export interface Project {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  featured: boolean;
  date: string;
  excerpt: string;
  coverImage?: { url: string; alt: string };
  youtubeUrl?: string;
  body: { root: object }; // lexical JSON
  gallery?: Array<{ image: { url: string; alt: string } }>;
  links?: Array<{ label: string; url: string }>;
  createdAt: string;
  updatedAt: string;
}

export async function getProjects(): Promise<Project[]> {
  const params = new URLSearchParams({
    where: JSON.stringify({
      status: { equals: "published" },
    }),
    limit: "100",
    sort: "-date",
  });
  const data = await fetchAPI<Project>(`/projects?${params.toString()}`);
  return data.docs;
}

export async function getProject(slug: string): Promise<Project | null> {
  const params = new URLSearchParams({
    where: JSON.stringify({
      slug: { equals: slug },
    }),
  });
  const data = await fetchAPI<Project>(`/projects?${params.toString()}`);
  return data.docs[0] || null;
}

// Photos (Tending)
export interface Photo {
  id: string;
  alt: string;
  caption?: string;
  date: string;
  album?: string;
  url: string;
  sizes?: {
    thumb?: { url: string };
    full?: { url: string };
  };
  createdAt: string;
  updatedAt: string;
}

export async function getPhotos(): Promise<Photo[]> {
  const params = new URLSearchParams({
    limit: "100",
    sort: "-date",
  });
  const data = await fetchAPI<Photo>(`/photos?${params.toString()}`);
  return data.docs;
}

// Posts (Enjoying)
export interface LexicalNode {
  type: string;
  text?: string;
  format?: number;
  style?: string;
  tag?: string;
  url?: string;
  target?: string;
  rel?: string;
  children?: LexicalNode[];
  [key: string]: unknown;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  type: "native" | "linkpost" | "recipe";
  status: "draft" | "published";
  featured: boolean;
  date: string;
  excerpt: string;
  coverImage?: { url: string; alt: string };
  body?: { root: LexicalNode }; // lexical JSON (native posts)
  externalUrl?: string; // linkposts point here
  recipe?: {
    servings?: string;
    totalTime?: string;
    ingredients?: Array<{ item: string }>;
  };
  createdAt: string;
  updatedAt: string;
}

export async function getPosts(): Promise<Post[]> {
  const params = new URLSearchParams({
    where: JSON.stringify({
      status: { equals: "published" },
    }),
    limit: "100",
    sort: "-date",
  });
  const data = await fetchAPI<Post>(`/posts?${params.toString()}`);
  return data.docs;
}

export async function getPost(slug: string): Promise<Post | null> {
  const params = new URLSearchParams({
    where: JSON.stringify({
      slug: { equals: slug },
    }),
  });
  const data = await fetchAPI<Post>(`/posts?${params.toString()}`);
  return data.docs[0] || null;
}

// Featured posts for homepage
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const params = new URLSearchParams({
    where: JSON.stringify({
      status: { equals: "published" },
    }),
    limit: limit.toString(),
    sort: "-date",
  });
  const data = await fetchAPI<Post>(`/posts?${params.toString()}`);
  return data.docs;
}
