# Gallery Data Structure for Firestore

This document shows the expected structure for gallery data in your Firestore database.

## Collection: `gallery`

Each gallery item document should have the following structure:

```json
{
  "_id": "auto-generated",
  "url": "https://your-image-url.com/wedding-photo.jpg",
  "alt": "Beautiful outdoor wedding ceremony",
  "category": "Wedding",
  "title": "Outdoor Wedding Ceremony",
  "description": "A stunning outdoor wedding ceremony captured in golden hour light",
  "cloudinaryId": "optional-cloudinary-id",
  "createdAt": "firestore-timestamp"
}
```

## Required Fields

- **`url`** (string): URL to the image (can be Cloudinary URL, local path, or external URL)
- **`alt`** (string): Alt text for accessibility and SEO
- **`category`** (string): Image category for filtering (e.g., "Wedding", "Portrait", "Event")

## Optional Fields

- **`title`** (string): Display title for the image (falls back to alt text if not provided)
- **`description`** (string): Detailed description of the image (falls back to alt text if not provided)
- **`cloudinaryId`** (string): Cloudinary image ID if using Cloudinary for image management
- **`createdAt`** (timestamp): Firestore timestamp for sorting (automatically ordered by this field descending)

## Example Gallery Items

### 1. Wedding Photography
```json
{
  "url": "/src/assets/image/WEDDING.jpg",
  "alt": "Elegant wedding setup",
  "category": "Wedding",
  "title": "Elegant Wedding Ceremony",
  "description": "A beautiful outdoor wedding ceremony captured in golden hour light"
}
```

### 2. Corporate Event
```json
{
  "url": "/src/assets/image/CORPORATE.jpg",
  "alt": "Corporate event",
  "category": "Corporate",
  "title": "Corporate Gala Event",
  "description": "Professional corporate event with elegant lighting and decor"
}
```

### 3. Social Celebration
```json
{
  "url": "/src/assets/image/SOCIAL.jpg",
  "alt": "Birthday celebration",
  "category": "Social",
  "title": "Birthday Celebration",
  "description": "Joyful social gathering with friends and family"
}
```

### 4. Destination Wedding
```json
{
  "url": "/src/assets/image/DESTINATION.jpg",
  "alt": "Destination wedding",
  "category": "Destination",
  "title": "Destination Wedding",
  "description": "Romantic destination wedding by the ocean"
}
```

### 5. Behind the Scenes
```json
{
  "url": "/src/assets/image/BTS.jpg",
  "alt": "Behind the scenes",
  "category": "Behind the Scenes",
  "title": "Behind the Magic",
  "description": "Capturing the moments behind the perfect shot"
}
```

### 6. Wedding Reception
```json
{
  "url": "/src/assets/image/RECEPTION.jpg",
  "alt": "Wedding reception",
  "category": "Reception",
  "title": "Reception Celebration",
  "description": "Dancing and celebration at the wedding reception"
}
```

## Image Requirements

- **Format**: JPG, PNG, WebP recommended
- **Size**: Recommended minimum 800x800px for good quality
- **Storage**: Can be stored in:
  - Cloudinary (recommended for production)
  - Local assets folder (`/src/assets/image/`)
  - External CDN
  - Firebase Storage

## Categories

The gallery supports dynamic categories. Common categories include:

- **Wedding**: Wedding ceremonies, receptions, engagement sessions
- **Portrait**: Individual and family portraits
- **Corporate**: Business events, corporate functions
- **Social**: Birthdays, anniversaries, celebrations
- **Destination**: Travel photography, destination weddings
- **Behind the Scenes**: BTS shots, setup photos
- **Reception**: Wedding receptions, party photography
- **Event**: General event photography

## Setting Up in Firestore

1. Go to your Firebase Console
2. Navigate to Firestore Database
3. Create a collection named `gallery`
4. Add documents with the structure above
5. The `createdAt` field will automatically sort items by newest first

## Features

- **Automatic Sorting**: Gallery items are automatically ordered by `createdAt` descending (newest first)
- **Category Filtering**: Users can filter images by category
- **Responsive Grid**: Automatically adjusts grid layout based on image count
- **Loading States**: Shows skeleton loading while fetching data
- **Error Handling**: Gracefully handles network errors or missing data
- **Fallback Text**: Uses alt text as fallback for missing title/description

## Notes

- Gallery items are automatically sorted by creation date (newest first)
- The main gallery shows the first 6 items as a preview
- The extended gallery page shows all items with category filtering
- Images should be accessible URLs that can be loaded in the browser
- Categories are dynamically generated from the data
- The component handles missing optional fields gracefully 