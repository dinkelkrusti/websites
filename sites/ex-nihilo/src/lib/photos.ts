import { getCollection, type CollectionEntry } from "astro:content";

export type Photo = CollectionEntry<"photos">;

export async function getPhotos(): Promise<Photo[]> {
  const photos = await getCollection("photos");
  return photos.sort((a, b) => a.data.order - b.data.order);
}
