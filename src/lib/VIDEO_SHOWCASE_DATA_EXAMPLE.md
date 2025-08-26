# VideoShowcase Data Structure for Firestore

This document shows the expected structure for VideoShowcase data in your Firestore database.

## Collection: `videoShowcase`

The VideoShowcase section uses a single document with the following structure:

```json
{
  "_id": "auto-generated",
  "title": "Our Story in Motion",
  "subtitle": "Cinematic Wedding Stories",
  "description": "Experience the magic of our wedding photography and videography through this cinematic showcase. Watch how we capture the essence of love, joy, and celebration in every frame.",
  "videoUrl": "https://www.youtube.com/watch?v=XDp_YjH62B4",
  "thumbnailUrl": "/src/assets/image/VIDEO_THUMBNAIL.jpg",
  "cloudinaryId": "optional-cloudinary-id"
}
```

## Required Fields

- **`title`** (string): Main heading for the video showcase section
- **`subtitle`** (string): Secondary heading or tagline
- **`description`** (string): Detailed description of the video content
- **`videoUrl`** (string): Full YouTube URL of the video to showcase

## Optional Fields

- **`thumbnailUrl`** (string): URL to a thumbnail image (can be Cloudinary URL, local path, or external URL)
- **`cloudinaryId`** (string): Cloudinary image ID if using Cloudinary for thumbnail management

## Example VideoShowcase Document

```json
{
  "title": "Our Story in Motion",
  "subtitle": "Cinematic Wedding Stories",
  "description": "Experience the magic of our wedding photography and videography through this cinematic showcase. Watch how we capture the essence of love, joy, and celebration in every frame.",
  "videoUrl": "https://www.youtube.com/watch?v=XDp_YjH62B4",
  "thumbnailUrl": "/src/assets/image/VIDEO_THUMBNAIL.jpg"
}
```

## Supported Video URLs

The component automatically extracts YouTube video IDs from various URL formats:

- **Standard YouTube URLs**: `https://www.youtube.com/watch?v=VIDEO_ID`
- **Short YouTube URLs**: `https://youtu.be/VIDEO_ID`
- **Embed URLs**: `https://www.youtube.com/embed/VIDEO_ID`
- **Mobile URLs**: `https://m.youtube.com/watch?v=VIDEO_ID`

## Video Requirements

- **Platform**: Currently supports YouTube videos only
- **Format**: Any YouTube video format (the player handles quality selection)
- **Length**: No specific length requirements
- **Content**: Should be relevant to your photography/videography services

## Thumbnail Requirements

- **Format**: JPG, PNG, WebP recommended
- **Size**: Recommended minimum 1280x720px for good quality
- **Storage**: Can be stored in:
  - Cloudinary (recommended for production)
  - Local assets folder (`/src/assets/image/`)
  - External CDN
  - Firebase Storage

## Setting Up in Firestore

1. Go to your Firebase Console
2. Navigate to Firestore Database
3. Create a collection named `videoShowcase`
4. Add a document with ID `main`
5. Fill in the required fields with your content

## Features

- **Dynamic Content**: Title, subtitle, and description are loaded from Firestore
- **YouTube Integration**: Automatically extracts video ID from YouTube URLs
- **Fallback Support**: Uses default content if Firestore data is unavailable
- **Loading States**: Shows skeleton loading while fetching data
- **Error Handling**: Gracefully handles network errors or missing data
- **Auto-play**: Video automatically plays when section comes into view
- **Responsive Controls**: Custom video controls with play/pause, mute, and fullscreen

## YouTube Player Configuration

The component automatically configures the YouTube player with:

- **Autoplay**: Disabled by default (respects user preferences)
- **Mute**: Enabled by default (required for autoplay in most browsers)
- **Controls**: Custom controls overlay
- **Modest Branding**: YouTube branding minimized
- **Related Videos**: Disabled
- **Video Info**: Hidden

## Notes

- The video player automatically reinitializes when the video URL changes
- The component includes intersection observer for automatic play/pause
- Custom controls provide a seamless user experience
- Fallback content ensures the section always displays something
- The video ID extraction handles various YouTube URL formats
- Statistics section remains hardcoded (can be made dynamic in future updates)

## Troubleshooting

### Video Not Loading
- Check that the YouTube URL is valid and accessible
- Ensure the video is not private or restricted
- Verify the video ID extraction is working correctly

### Thumbnail Not Displaying
- Check the thumbnail URL is accessible
- Ensure the image format is supported by the browser
- Verify the image path is correct

### Content Not Updating
- Clear the component cache using `clearCacheEntry('video-showcase-data')`
- Check Firestore permissions and data structure
- Verify the document ID is exactly `main` 