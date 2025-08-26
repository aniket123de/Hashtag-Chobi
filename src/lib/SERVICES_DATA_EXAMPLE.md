# Services Data Structure for Firestore

This document shows the expected structure for services data in your Firestore database.

## Collection: `services`

Each service document should have the following structure:

```json
{
  "_id": "auto-generated",
  "title": "Wedding Photography",
  "description": "Complete wedding photography coverage from getting ready to reception, capturing every precious moment of your special day.",
  "image": "https://your-image-url.com/wedding-photography.jpg",
  "price": "Starting from $2,500",
  "order": 1,
  "category": "Photography",
  "cloudinaryId": "optional-cloudinary-id"
}
```

## Required Fields

- **`title`** (string): The name of the service
- **`description`** (string): Detailed description of the service
- **`image`** (string): URL to the service image (can be Cloudinary URL, local path, or external URL)
- **`price`** (string): Price information (e.g., "Starting from $2,500", "Contact for pricing")
- **`order`** (number): Display order (1, 2, 3, etc.) - services will be sorted by this field

## Optional Fields

- **`category`** (string): Service category (e.g., "Photography", "Cinematography", "Consultation")
- **`cloudinaryId`** (string): Cloudinary image ID if using Cloudinary for image management

## Example Services

### 1. Wedding Photography
```json
{
  "title": "Wedding Photography",
  "description": "Complete wedding photography coverage from getting ready to reception, capturing every precious moment of your special day.",
  "image": "/src/assets/image/SERVICE1.jpg",
  "price": "Starting from $2,500",
  "order": 1,
  "category": "Photography"
}
```

### 2. Wedding Cinematography
```json
{
  "title": "Wedding Cinematography",
  "description": "Cinematic wedding films that tell your love story, preserving the emotions and memories for generations to come.",
  "image": "/src/assets/image/SERVICE2.jpg",
  "price": "Starting from $3,500",
  "order": 2,
  "category": "Cinematography"
}
```

### 3. Engagement Sessions
```json
{
  "title": "Engagement Sessions",
  "description": "Pre-wedding photo sessions that capture your love story and personality, perfect for save-the-dates and wedding websites.",
  "image": "/src/assets/image/SERVICE3.jpg",
  "price": "Starting from $500",
  "order": 3,
  "category": "Photography"
}
```

### 4. Destination Weddings
```json
{
  "title": "Destination Weddings",
  "description": "Exotic locations and dreamy destinations captured with seamless coordination and local expertise.",
  "image": "/src/assets/image/SERVICE4.jpg",
  "price": "Contact for pricing",
  "order": 4,
  "category": "Photography"
}
```

### 5. Wedding Consultation
```json
{
  "title": "Wedding Consultation",
  "description": "Expert guidance and personalized advice to help you plan the perfect photography package within your budget.",
  "image": "/src/assets/image/SERVICE5.jpg",
  "price": "Free consultation",
  "order": 5,
  "category": "Consultation"
}
```

### 6. Portrait Sessions
```json
{
  "title": "Portrait Sessions",
  "description": "Professional portrait photography for couples, families, and individuals, creating timeless memories to treasure.",
  "image": "/src/assets/image/SERVICE6.jpg",
  "price": "Starting from $300",
  "order": 6,
  "category": "Photography"
}
```

## Image Requirements

- **Format**: JPG, PNG, WebP recommended
- **Size**: Recommended minimum 800x600px for good quality
- **Storage**: Can be stored in:
  - Cloudinary (recommended for production)
  - Local assets folder (`/src/assets/image/`)
  - External CDN
  - Firebase Storage

## Setting Up in Firestore

1. Go to your Firebase Console
2. Navigate to Firestore Database
3. Create a collection named `services`
4. Add documents with the structure above
5. Make sure to set the `order` field for proper sorting

## Notes

- Services will be automatically sorted by the `order` field (ascending)
- If no `category` is provided, it will default to "Photography"
- The component will automatically handle loading states and errors
- Images should be accessible URLs that can be loaded in the browser 