import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
// Sharp is optional for image optimization. Commented out because Vercel Blob
// handles CDN + optimization, and Sharp's native bindings aren't available in
// Vercel's build environment (linux-x64 libvips). Admin image uploads still work.
// import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Projects } from "./payload/collections/Projects";
import { Photos } from "./payload/collections/Photos";
import { Posts } from "./payload/collections/Posts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Supabase URLs carry ?sslmode=require, which overrides the pool's ssl options
// and triggers "self-signed certificate in chain". Strip it so our ssl config
// (rejectUnauthorized: false) applies — the connection stays TLS-encrypted.
function cleanConnectionString(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.delete("sslmode");
    return u.toString();
  } catch {
    return url;
  }
}

const connectionString = cleanConnectionString(
  process.env.DATABASE_URI ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    "",
);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Matt Bowers CMS",
    },
  },
  collections: [Projects, Photos, Posts, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      // Uses the NON-POOLING (direct) Supabase URL — the transaction pooler
      // breaks Payload's prepared statements + migrations. See cleanup above.
      connectionString,
      // Supabase serves a cert chain Node doesn't trust by default. The
      // connection stays TLS-encrypted; we just skip chain verification.
      ssl: { rejectUnauthorized: false },
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
        photos: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
