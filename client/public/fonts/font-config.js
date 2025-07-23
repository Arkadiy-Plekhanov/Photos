
// Font Awesome Configuration
window.FontAwesomeConfig = {
  autoReplaceSvg: false,
  autoAddCss: false,
  observeMutations: false,
  showMissingIcons: false
};

// Preload critical fonts with correct paths
if ('fonts' in document) {
  const fonts = [
    '/fonts/webfonts/fa-solid-900.woff2',
    '/fonts/webfonts/fa-regular-400.woff2',
    '/fonts/webfonts/fa-brands-400.woff2'
  ];
  
  fonts.forEach(font => {
    // Create multiple FontFace objects for different font families
    if (font.includes('solid')) {
      const fontFace = new FontFace('Font Awesome 6 Free', `url(${font})`, { weight: '900' });
      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont);
      }).catch(error => {
        console.warn('Font loading failed:', font, error);
      });
    } else if (font.includes('regular')) {
      const fontFace = new FontFace('Font Awesome 6 Free', `url(${font})`, { weight: '400' });
      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont);
      }).catch(error => {
        console.warn('Font loading failed:', font, error);
      });
    } else if (font.includes('brands')) {
      const fontFace = new FontFace('Font Awesome 6 Brands', `url(${font})`, { weight: '400' });
      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont);
      }).catch(error => {
        console.warn('Font loading failed:', font, error);
      });
    }
  });
}

// Debug font loading
document.addEventListener('DOMContentLoaded', () => {
  console.log('Available fonts:', Array.from(document.fonts).map(f => f.family));
});
