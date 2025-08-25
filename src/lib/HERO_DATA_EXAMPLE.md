# Hero Data Structure for Firestore

This document shows the expected structure for Hero data in your Firestore database.

## Collection: `hero`

The Hero section uses a single document with the following structure:

```json
{
  "_id": "auto-generated",
  "title": "Capturing Love Stories Frame by Frame",
  "subtitle": "Premier Wedding Photography & Cinematography",
  "description": "Premier wedding photography and Cinematography since 2016, specializing in handcrafted weddings that beautifully narrate your unique love story",
  "ctaText": "Book Your Session",
  "backgroundImage": "/src/assets/image/HERO.jpg",
  "footerImage": "/src/assets/image/FOOTER.jpg",
  "cloudinaryId": "optional-cloudinary-id",
  "footerCloudinaryId": "optional-footer-cloudinary-id"
}
```

## Required Fields

- **`title`** (string): Main headline for the hero section
- **`subtitle`** (string): Secondary heading or tagline
- **`description`** (string): Detailed description of your services
- **`ctaText`** (string): Text for the primary call-to-action button
- **`backgroundImage`** (string): URL to the hero background image

## Optional Fields

- **`footerImage`** (string): URL to the footer decoration image (optional)
- **`cloudinaryId`** (string): Cloudinary image ID if using Cloudinary for image management
- **`footerCloudinaryId`** (string): Cloudinary image ID for the footer image if using Cloudinary

## Example Hero Document

```json
{
  "title": "Capturing Love Stories Frame by Frame",
  "subtitle": "Premier Wedding Photography & Cinematography",
  "description": "Premier wedding photography and Cinematography since 2016, specializing in handcrafted weddings that beautifully narrate your unique love story",
  "ctaText": "Book Your Session",
  "backgroundImage": "/src/assets/image/HERO.jpg"
}
```

## Title Formatting

The component automatically formats the title for display:

- **Input**: "Capturing Love Stories Frame by Frame"
- **Display**: 
  - Line 1: "Capturing Love"
  - Line 2: "Stories Frame" (in italic blush color)
  - Line 3: "by Frame"

This creates a visually appealing three-line layout with the middle line highlighted.

## Background Image Requirements

- **Format**: JPG, PNG, WebP recommended
- **Size**: Recommended minimum 1920x1080px for full-screen display
- **Aspect Ratio**: 16:9 or wider for optimal coverage
- **Storage**: Can be stored in:
  - Cloudinary (recommended for production)
  - Local assets folder (`/src/assets/image/`)
  - External CDN
  - Firebase Storage

## Footer Image Requirements

- **Format**: JPG, PNG, WebP recommended
- **Size**: Recommended minimum 1920x128px for footer decoration
- **Aspect Ratio**: Wide format (16:1 or similar) for footer strip
- **Storage**: Can be stored in:
  - Cloudinary (recommended for production)
  - Local assets folder (`/src/assets/image/`)
  - External CDN
  - Firebase Storage
- **Usage**: This image is displayed as a background in the Footer component, not in the Hero section

## Content Guidelines

### Title
- Keep it concise but impactful
- Use action words that convey your expertise
- Consider the three-line formatting for visual appeal
- Example: "Capturing Love Stories Frame by Frame"

### Subtitle
- Brief description of your main service
- Include key differentiators
- Example: "Premier Wedding Photography & Cinematography"

### Description
- Explain what you do and your experience
- Include your founding year or experience
- Mention your unique approach
- Example: "Premier wedding photography and Cinematography since 2016, specializing in handcrafted weddings that beautifully narrate your unique love story"

### CTA Text
- Clear action-oriented text
- Keep it short and compelling
- Example: "Book Your Session", "Get Started", "Contact Us"

## Setting Up in Firestore

1. Go to your Firebase Console
2. Navigate to Firestore Database
3. Create a collection named `hero`
4. Add a document with ID `main`
5. Fill in the required fields with your content

## Features

- **Dynamic Content**: Title, subtitle, description, and CTA text are loaded from Firestore
- **Smart Title Formatting**: Automatically splits title into three lines for visual appeal
- **Dynamic Background**: Background image is loaded from Firestore
- **Optional Footer Image**: Footer decoration image is loaded from Firestore (if provided)
- **Loading States**: Shows skeleton loading while fetching data
- **Error Handling**: Gracefully handles network errors or missing data
- **Fallback Support**: Uses default content if Firestore data is unavailable
- **Responsive Design**: Adapts to different screen sizes

## Component Behavior

- **Title Splitting**: Automatically splits title into three lines for display
- **Background Image**: Dynamically loads background image from Firestore
- **Footer Image**: Dynamically loads footer decoration image from Firestore (used in Footer component)
- **CTA Button**: Primary button text is dynamically loaded
- **Scroll Functionality**: CTA buttons scroll to respective sections
- **Animation**: Fade-in animations with staggered delays

## Notes

- The title is automatically formatted into three lines for visual appeal
- The middle line (words 3-4) is highlighted in blush color and italic style
- Background image should be high quality for full-screen display
- CTA button text should be action-oriented and compelling
- The component includes loading and error states for better UX
- Fallback content ensures the hero section always displays something

## Troubleshooting

### Content Not Displaying
- Check that all required fields are filled in Firestore
- Verify the document ID is exactly `main`
- Clear the component cache using `clearCacheEntry('hero-data')`

### Background Image Not Loading
- Check that the image URL is accessible
- Ensure the image format is supported by the browser
- Verify the image path is correct

### Footer Image Not Loading
- The footerImage field is optional - if not provided, no footer image will be displayed
- If you want a footer image, check that the footerImage field is provided in Firestore
- Verify the footer image URL is accessible
- Ensure the footer image format is supported by the browser
- Check that the footer image path is correct

### Title Formatting Issues
- Ensure the title has at least 4 words for proper formatting
- The component automatically handles title splitting
- Consider the visual impact of your word choice

### CTA Button Not Working
- Verify the CTA text is provided in Firestore
- Check that the target sections exist in your HTML
- Ensure the scroll function is working properly 