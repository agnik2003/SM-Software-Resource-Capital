import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname, 'public', 'industries');

async function optimizeImages() {
  const files = await fs.readdir(directory);
  
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const inputPath = path.join(directory, file);
      const filename = path.parse(file).name;
      const outputPath = path.join(directory, `${filename}.webp`);
      
      console.log(`Optimizing: ${file}...`);
      
      await sharp(inputPath)
        .resize({ width: 800 }) // Resize for cards
        .webp({ quality: 60 }) // High compression
        .toFile(outputPath);
        
      console.log(`Created: ${filename}.webp`);
      
      // Delete original to save space
      await fs.unlink(inputPath);
    }
  }
  console.log('All images optimized instantly!');
}

optimizeImages().catch(console.error);
