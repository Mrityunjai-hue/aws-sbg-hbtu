export interface GalleryItem {
  id: string;
  title: string;
  category: "workshop" | "hackathon" | "speaker" | "meetup";
  imageSlotId: string;
  imageUrl?: string;
  date: string;
  caption: string;
}

/**
 * Community Photo Gallery Data.
 * Per Rule 7 (Zero Fake Hallucinations), initialized as an empty array [].
 * When real photos are captured and placed in /public/images/gallery/, add items here.
 */
export const GALLERY_DATA: GalleryItem[] = [];
