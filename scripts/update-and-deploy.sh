#!/bin/bash

echo "🚀 Starting update and deploy process..."
echo ""

# Step 1: Add and commit the CSV
echo "📦 Adding last-output-testset to git..."
git add last-output-testset/

echo "💾 Committing changes..."
git commit -m "Update test results CSV - $(date +%Y-%m-%d)" || echo "No changes to commit"

echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "📋 Copying CSV to public folder..."
node scripts/copy-csv.cjs

echo ""
echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d dist

echo ""
echo "✅ All done! Your CSV is now updated on GitHub Pages!"

