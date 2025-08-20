# Extended Gallery Data Structure for Firestore

This document shows the expected structure for the Extended Gallery document used by the full gallery page.

## Document Path

- Collection: `extendedGallery`
- Document ID: `main`

## Type Definition

```ts
export type ExtendedGalleryDoc = {
  pageContent: any;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    category: string;
    title: string;
    description: string;
    size: string; // one of: "small" | "medium" | "large" | "wide" | "tall"
    cloudinaryId?: string;
  }>;
}
```

## Example Document

```json
{
  "pageContent": {
    "title": "Our Complete",
    "highlight": "Gallery Collection",
    "description": "Explore our comprehensive collection of wedding photography, portraits, and special events. Each image tells a unique story of love, joy, and celebration."
  },
  "images": [
    {
      "id": "img_001",
      "url": "https://example.com/wedding1.jpg",
      "alt": "Bride and groom smiling",
      "category": "Wedding",
      "title": "A Joyful Moment",
      "description": "The couple shares a beautiful smile during the ceremony.",
      "size": "large"
    },
    {
      "id": "img_002",
      "url": "https://example.com/portrait1.jpg",
      "alt": "Elegant portrait",
      "category": "Portrait",
      "title": "Grace & Poise",
      "description": "A timeless portrait capturing elegance.",
      "size": "medium"
    }
  ]
}
```

## Notes

- `size` controls the bento grid layout. Valid values: `small`, `medium`, `large`, `wide`, `tall`.
- Categories are derived from the `images` array and used for the filter pills.
- If any of `title` or `description` is missing, the UI will fall back to `alt` text.
- You can use Cloudinary, Firebase Storage, or any CDN for image URLs. 