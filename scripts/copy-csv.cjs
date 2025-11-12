const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'last-output-testset');
const publicDestDir = path.join(__dirname, '..', 'public', 'last-output-testset');
const distDestDir = path.join(__dirname, '..', 'dist', 'last-output-testset');

// Create destination directories if they don't exist
[publicDestDir, distDestDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy all files from source to both destinations
let csvFiles = [];
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      // Copy to public
      const publicDestPath = path.join(publicDestDir, file);
      fs.copyFileSync(sourcePath, publicDestPath);
      console.log(`Copied ${file} to public/last-output-testset/`);
      
      // Copy to dist
      const distDestPath = path.join(distDestDir, file);
      fs.copyFileSync(sourcePath, distDestPath);
      console.log(`Copied ${file} to dist/last-output-testset/`);
      
      // Track CSV files
      if (file.endsWith('.csv')) {
        const stats = fs.statSync(sourcePath);
        csvFiles.push({
          filename: file,
          lastModified: stats.mtime.toISOString(),
          size: stats.size
        });
      }
    }
  });
  
  // Generate manifest with CSV files info
  if (csvFiles.length > 0) {
    // Sort by modification time, newest first
    csvFiles.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    
    const manifest = {
      files: csvFiles,
      latest: csvFiles[0].filename,
      generatedAt: new Date().toISOString()
    };
    
    // Write manifest to both destinations
    const manifestJson = JSON.stringify(manifest, null, 2);
    fs.writeFileSync(path.join(publicDestDir, 'manifest.json'), manifestJson);
    fs.writeFileSync(path.join(distDestDir, 'manifest.json'), manifestJson);
    console.log(`Generated manifest.json with latest file: ${csvFiles[0].filename}`);
  }
} else {
  console.log('No last-output-testset directory found in root');
}

