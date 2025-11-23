/**
 * Font Aliases for Generated Code Compatibility
 * 
 * This script fetches Google Fonts CSS and creates aliased versions
 * so that generated code using 'wix-madefor-display-v2' will
 * automatically use the actual 'Wix Madefor Display' font files.
 */

async function createFontAliases() {
  try {
    // Fetch the Google Fonts CSS
    const response = await fetch('https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@300;400;500;600;700;800&family=Wix+Madefor+Text:wght@300;400;500;600;700;800&display=swap');
    const googleFontsCSS = await response.text();
    
    // Parse the CSS and create aliased versions
    const aliasedCSS = googleFontsCSS
      // Replace Wix Madefor Display with wix-madefor-display-v2
      .replace(/font-family:\s*'Wix Madefor Display'/g, "font-family: 'wix-madefor-display-v2'")
      // Replace Wix Madefor Text with wix-madefor-text-v2
      .replace(/font-family:\s*'Wix Madefor Text'/g, "font-family: 'wix-madefor-text-v2'");
    
    // Inject the aliased CSS
    const style = document.createElement('style');
    style.id = 'font-aliases';
    style.textContent = aliasedCSS;
    document.head.appendChild(style);
    
    console.log('✅ Font aliases loaded: wix-madefor-display-v2 → Wix Madefor Display, wix-madefor-text-v2 → Wix Madefor Text');
  } catch (error) {
    console.error('❌ Failed to load font aliases:', error);
  }
}

// Load aliases immediately
createFontAliases();

