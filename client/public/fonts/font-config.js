
// Font Awesome Configuration
window.FontAwesomeConfig = {
  autoReplaceSvg: false,
  autoAddCss: false,
  observeMutations: false,
  showMissingIcons: false
};

// Preload critical fonts
if ('fonts' in document) {
  const fonts = [
    '/fonts/webfonts/fa-solid-900.woff2',
    '/fonts/webfonts/fa-regular-400.woff2',
    '/fonts/webfonts/fa-brands-400.woff2'
  ];
  
  fonts.forEach(font => {
    const fontFace = new FontFace('Font Awesome 6 Free', `url(${font})`);
    fontFace.load().then(loadedFont => {
      document.fonts.add(loadedFont);
    }).catch(error => {
      console.warn('Font loading failed:', font, error);
    });
  });
}
