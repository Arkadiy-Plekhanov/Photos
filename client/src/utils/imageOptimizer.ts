// Ultra-optimized image configuration for sub-second loading
export const imageConfig = {
  hero: {
    desktop: {
      width: 1200,
      quality: 45,
      format: 'webp'
    },
    mobile: {
      width: 800,
      quality: 40,
      format: 'webp'
    },
    placeholder: {
      width: 20,
      quality: 10,
      format: 'webp'
    }
  },
  gallery: {
    desktop: {
      width: 800,
      quality: 40,
      format: 'webp'
    },
    mobile: {
      width: 600,
      quality: 35,
      format: 'webp'
    },
    thumbnail: {
      width: 400,
      quality: 30,
      format: 'webp'
    }
  }
};

export function getOptimizedImageUrl(
  originalUrl: string, 
  type: 'hero' | 'gallery' = 'hero',
  device: 'desktop' | 'mobile' = 'desktop'
): string {
  const config = imageConfig[type][device];
  const url = new URL(originalUrl);
  
  // Update parameters for optimal loading
  url.searchParams.set('w', config.width.toString());
  url.searchParams.set('q', config.quality.toString());
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fm', config.format);
  url.searchParams.set('cs', 'srgb');
  
  return url.toString();
}

export function generateSrcSet(baseUrl: string, type: 'hero' | 'gallery' = 'hero'): string {
  const sizes = type === 'hero' 
    ? [400, 800, 1200] 
    : [300, 600, 800];
    
  return sizes.map(size => {
    const url = new URL(baseUrl);
    url.searchParams.set('w', size.toString());
    url.searchParams.set('q', type === 'hero' ? '45' : '40');
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fm', 'webp');
    return `${url.toString()} ${size}w`;
  }).join(', ');
}

export function getPlaceholderUrl(originalUrl: string): string {
  const url = new URL(originalUrl);
  url.searchParams.set('w', '20');
  url.searchParams.set('q', '10');
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('blur', '10');
  return url.toString();
}