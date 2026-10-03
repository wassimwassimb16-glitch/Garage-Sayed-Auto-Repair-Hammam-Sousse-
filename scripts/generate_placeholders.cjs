// Generates lightweight standalone SVG/JPG image placeholders for Hair Style By Oussama
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// A minimal valid base64 1x1 warm dark JPEG
const minimalJpgBase64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
const jpgBuffer = Buffer.from(minimalJpgBase64, 'base64');

const files = [
  'hero-poster.jpg',
  'og.jpg',
  'shop-1.jpg',
  'shop-2.jpg',
  'shop-3.jpg',
  'shop-4.jpg',
  'shop-5.jpg',
  'shop-6.jpg'
];

files.forEach(f => {
  const filePath = path.join(targetDir, f);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, jpgBuffer);
  }
});

console.log('Generated placeholder image files in public/images/');
