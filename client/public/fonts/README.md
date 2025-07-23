# Font Awesome Installation Guide
# Font Awesome Local Installation

## Implementation Details

This folder contains locally hosted Font Awesome files to avoid external dependencies and improve performance.

### File Structure

```
/fonts/
  /css/
    all.min.css       - Minified CSS for all Font Awesome styles
  /webfonts/
    fa-brands-400.woff2  - Brand icons font file (Facebook, Twitter, etc.)
    fa-regular-400.woff2 - Regular weight icons font file
    fa-solid-900.woff2   - Solid weight icons font file
```

### Usage

The Font Awesome files are referenced in the `index.html` file:

```html
<link rel="stylesheet" href="/fonts/css/all.min.css" />
```

### Important Note

In this implementation, we've included a subset of the most commonly used icons for the photography website. For the complete Font Awesome library, download the full package from [Font Awesome's website](https://fontawesome.com/download).

### Icon Usage Examples

```html
<!-- Using solid style -->
<i class="fas fa-camera"></i>

<!-- Using regular style -->
<i class="far fa-heart"></i>

<!-- Using brand icons -->
<i class="fab fa-instagram"></i>
```

### Benefits of Local Hosting

1. Faster loading times
2. Works offline
3. No reliance on external CDNs
4. Better privacy for users
5. No "missed locally stored library" warnings

### Common Icons for Photography Website

- `fa-camera` - Camera icon
- `fa-image` or `fa-images` - Image/gallery icons
- `fa-instagram`, `fa-facebook`, etc. - Social media icons
- `fa-envelope`, `fa-phone` - Contact icons
- `fa-map-marker-alt` - Location icon
- `fa-calendar` - Booking/calendar icon
To properly host Font Awesome locally and fix the warning in your project, follow these steps:

## Step 1: Download Font Awesome

1. Go to [Font Awesome's download page](https://fontawesome.com/download)
2. Download the Free version (or Pro if you have a license)
3. Extract the downloaded ZIP file

## Step 2: Copy Files to Your Project

1. Inside the extracted folder, you'll find:
   - `/css` folder
   - `/webfonts` folder

2. Copy these files to your project structure:
   - Copy the contents of the `/css` folder to `/client/public/fonts/css/`
   - Copy the contents of the `/webfonts` folder to `/client/public/fonts/webfonts/`

## Step 3: Update Your HTML

In your `index.html`, update the Font Awesome reference to:

```html
<link rel="stylesheet" href="/fonts/css/all.min.css" />
```

## Notes

- Make sure the file paths are correct relative to your project's root
- Font Awesome Free includes solid, regular, and brand icons
- If using Font Awesome Pro, you'll have additional styles like light and duotone
- The current placeholder CSS file with @import will be replaced once you complete these steps
