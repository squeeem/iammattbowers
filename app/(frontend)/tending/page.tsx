import { Metadata } from "next";
import { getPhotos } from "@/lib/payload";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tending",
  description: "A photo record of our family and the space we're making.",
};

export default async function TendingPage() {
  const photos = await getPhotos();

  // Group by album if present
  const grouped = photos.reduce(
    (acc, photo) => {
      const album = photo.album || "Unsorted";
      if (!acc[album]) acc[album] = [];
      acc[album].push(photo);
      return acc;
    },
    {} as Record<string, typeof photos>,
  );

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            Tending
          </h1>
          <p className="text-lg text-ink-soft">
            A photo record of our family and the space we're making. The
            unhurried version, not the highlight reel.
          </p>
        </div>

        {photos.length === 0 ? (
          <p className="text-center text-ink-soft py-16">
            No photos yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-16">
            {Object.entries(grouped).map(([album, albumPhotos]) => (
              <section key={album}>
                {album !== "Unsorted" && (
                  <h2 className="text-2xl font-bold text-ink mb-6">{album}</h2>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {albumPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative aspect-square rounded-lg overflow-hidden bg-sand"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {photo.caption && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-sm text-white">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
