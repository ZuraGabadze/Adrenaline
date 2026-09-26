import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, pixelFn) {
  // 4 channels RGBA
  const rowSize = width * 4 + 1; // 1 filter byte per row
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = pixelFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c >>> 1) ^ (-(c & 1) & 0xedb88320);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const combined = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(combined), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: 6 (RGBA)
  ihdrData[10] = 0; // Compression: 0 (deflate)
  ihdrData[11] = 0; // Filter: 0
  ihdrData[12] = 0; // Interlace: 0

  const ihdr = chunk('IHDR', ihdrData);
  const idat = chunk('IDAT', compressed);
  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

const outDir = path.resolve('public/assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const ranksDir = path.resolve('public/assets/ranks');
if (!fs.existsSync(ranksDir)) {
  fs.mkdirSync(ranksDir, { recursive: true });
}

// 1. Logo (64x64 or 128x128) - Adrenaline "A" with Pink & Gold Minecraft aesthetic
const logoPNG = createPNG(128, 128, (x, y, w, h) => {
  const dx = x - 64;
  const dy = y - 64;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Background circular badge
  if (dist > 58) return [0, 0, 0, 0];
  if (dist > 54) return [239, 0, 126, 255]; // #EF007E border
  if (dist > 51) return [255, 223, 0, 255]; // #FFDF00 inner border
  
  // Dark inside
  let r = 15, g = 15, b = 20, a = 255;
  
  // Stylized "A" letter in Minecraft geometric style
  // Apex
  if (y >= 26 && y <= 98) {
    const leftSlope = 64 - (y - 26) * 0.45;
    const rightSlope = 64 + (y - 26) * 0.45;
    const thickness = 9;
    
    const isLeftStem = Math.abs(x - leftSlope) < thickness;
    const isRightStem = Math.abs(x - rightSlope) < thickness;
    const isCrossbar = y >= 64 && y <= 74 && x >= leftSlope && x <= rightSlope;
    
    if (isLeftStem || isRightStem || isCrossbar) {
      if (y < 46) {
        // Gold apex tip
        r = 255; g = 223; b = 0;
      } else {
        // Neon pink body
        r = 239; g = 0; b = 126;
      }
    }
  }
  return [r, g, b, a];
});
fs.writeFileSync(path.join(outDir, 'logo.png'), logoPNG);

// 2. Ender Pearl (64x64) - Teal / Dark Cyan with pixelated Minecraft shading & Pink/Gold shimmer
const pearlPNG = createPNG(64, 64, (x, y, w, h) => {
  const dx = x - 32;
  const dy = y - 32;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > 26) return [0, 0, 0, 0];
  if (dist > 24) return [5, 20, 25, 255]; // Dark outer contour

  // Pixelated cell shading
  const px = Math.floor(x / 3);
  const py = Math.floor(y / 3);
  const noise = (Math.sin(px * 1.5) * Math.cos(py * 1.5) + 1) * 0.5;

  let r = 10, g = 60 + noise * 40, b = 65 + noise * 45, a = 255;
  // Center glow
  const innerDist = Math.sqrt((x - 26) * (x - 26) + (y - 24) * (y - 24));
  if (innerDist < 12) {
    r = Math.min(255, 30 + Math.floor((12 - innerDist) * 12));
    g = Math.min(255, 160 + Math.floor((12 - innerDist) * 7));
    b = Math.min(255, 170 + Math.floor((12 - innerDist) * 7));
  }
  // Pink resonance spark in the core
  if (innerDist < 5) {
    r = 239; g = 30; b = 150;
  }
  return [Math.floor(r), Math.floor(g), Math.floor(b), a];
});
fs.writeFileSync(path.join(outDir, 'ender_pearl.png'), pearlPNG);

// 3. Eye of Ender (64x64) - Orange / Fiery Golden center with Emerald-Teal iris
const eyePNG = createPNG(64, 64, (x, y, w, h) => {
  const dx = x - 32;
  const dy = y - 32;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > 26) return [0, 0, 0, 0];
  if (dist > 24) return [20, 10, 5, 255];

  let r = 20, g = 70, b = 60, a = 255;
  // Golden ring
  if (dist < 20 && dist >= 8) {
    r = 255; g = 190; b = 10;
    if (dist < 14) {
      r = 255; g = 130; b = 0;
    }
  }
  // Pupil
  if (dist < 8) {
    r = 239; g = 0; b = 126; // Adrenaline pink eye slit
    if (Math.abs(dx) > 3) {
      r = 20; g = 5; b = 15;
    }
  }
  return [r, g, b, a];
});
fs.writeFileSync(path.join(outDir, 'eye_of_ender.png'), eyePNG);

// 4. Profile Skin (800x800) - High res Minecraft character skin avatar in pink/gold hoodie
const skinPNG = createPNG(800, 800, (x, y, w, h) => {
  // Center-top circular / square avatar
  const dx = x - 400;
  const dy = y - 400;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > 390) return [0, 0, 0, 0];
  if (dist > 375) return [239, 0, 126, 255]; // Pink border
  if (dist > 365) return [255, 223, 0, 255]; // Gold inner border

  // Background gradient
  const bgGrad = Math.floor(10 + (y / 800) * 20);
  let r = bgGrad, g = bgGrad, b = bgGrad + 8, a = 255;

  // Head block (Minecraft proportions 280x280)
  const headLeft = 260, headRight = 540, headTop = 200, headBottom = 480;
  if (x >= headLeft && x <= headRight && y >= headTop && y <= headBottom) {
    // Skin tone
    r = 245; g = 205; b = 175;
    // Hair / Hood
    if (y < headTop + 90 || x < headLeft + 40 || x > headRight - 40) {
      // Pink Adrenaline Hood
      r = 239; g = 0; b = 126;
      if (y < headTop + 30) {
        // Gold trim
        r = 255; g = 223; b = 0;
      }
    }
    // Eyes
    const eyeY = headTop + 140;
    const isLeftEye = (x >= 320 && x <= 360 && y >= eyeY && y <= eyeY + 30);
    const isRightEye = (x >= 440 && x <= 480 && y >= eyeY && y <= eyeY + 30);
    if (isLeftEye || isRightEye) {
      r = 20; g = 20; b = 25;
      if (x % 20 < 10) {
        r = 255; g = 255; b = 255;
      }
    }
    // Crown on head
    if (y >= headTop - 40 && y < headTop + 20 && x >= 300 && x <= 500) {
      r = 255; g = 223; b = 0;
    }
  }

  // Torso / Shoulders
  if (y > headBottom && y < 760 && x >= 180 && x <= 620) {
    // Cyber Pink Hoodie with Gold SMP Crest
    r = 200; g = 10; b = 100;
    if (Math.abs(x - 400) < 40 && y < 650) {
      r = 255; g = 223; b = 0;
    }
  }

  return [r, g, b, a];
});
fs.writeFileSync(path.join(outDir, 'profile_skin.png'), skinPNG);

// 5. Rank icons (VIP, VIP+, MVP, MVP+, SPONSOR)
const ranks = [
  { name: 'vip.png', primary: [34, 197, 94], secondary: [255, 223, 0], symbol: 'V' },
  { name: 'vip_plus.png', primary: [16, 185, 129], secondary: [239, 0, 126], symbol: 'V+' },
  { name: 'mvp.png', primary: [6, 182, 212], secondary: [255, 223, 0], symbol: 'M' },
  { name: 'mvp_plus.png', primary: [239, 0, 126], secondary: [255, 223, 0], symbol: 'M+' },
  { name: 'sponsor.png', primary: [255, 223, 0], secondary: [239, 0, 126], symbol: 'S' }
];

ranks.forEach(rank => {
  const buf = createPNG(120, 120, (x, y, w, h) => {
    const dx = x - 60;
    const dy = y - 60;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 54) return [0, 0, 0, 0];
    if (dist > 48) return [rank.secondary[0], rank.secondary[1], rank.secondary[2], 255];
    if (dist > 42) return [rank.primary[0], rank.primary[1], rank.primary[2], 255];
    
    // Minecraft diamond or crown shape inside
    const isDiamond = Math.abs(dx) + Math.abs(dy) < 32;
    if (isDiamond) {
      return [rank.primary[0], rank.primary[1], rank.primary[2], 255];
    }
    return [15, 15, 20, 255];
  });
  fs.writeFileSync(path.join(ranksDir, rank.name), buf);
});

console.log('Successfully created all local assets in public/assets!');
