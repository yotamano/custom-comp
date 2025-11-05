#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy CSV file from last-output-testset to public/last-output-testset
const sourceDir = path.join(__dirname, '..', 'last-output-testset');
const destDir = path.join(__dirname, '..', 'public', 'last-output-testset');
const destFile = path.join(destDir, 'prompt-3-Custom Component (updated)-5.2.0.csv');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Find the latest CSV file in source directory
const sourceFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.csv'));
if (sourceFiles.length === 0) {
  console.log('No CSV files found in last-output-testset folder');
  process.exit(0);
}

// Get the most recently modified CSV file
const csvFiles = sourceFiles.map(file => ({
  name: file,
  path: path.join(sourceDir, file),
  mtime: fs.statSync(path.join(sourceDir, file)).mtime
})).sort((a, b) => b.mtime - a.mtime);

const latestFile = csvFiles[0];

// Copy to destination with the expected filename
fs.copyFileSync(latestFile.path, destFile);
console.log(`Copied ${latestFile.name} to public/last-output-testset/`);

