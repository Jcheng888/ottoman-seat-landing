#!/usr/bin/env node
// =============================================================================
// Ottoman Seat Cover — FAL AI Image Generator
// =============================================================================
// Generates responsive product/lifestyle images for the landing page using
// FAL AI flux-pro. Reads prompts from fal-ai-prompts.js (in-browser) or
// a local prompts.json mirror.
//
// Usage:
//   node generate-images.js [--dry-run] [--category=hero] [--size=landscape]
//
// Environment:
//   FAL_KEY — your FAL AI API key (required)
//
// Output:
//   generated-images/  — all downloaded images
//   generated-images/manifest.json — mapping of slot → filename
// =============================================================================

const fs = require("fs");
const path = require("path");

// ── Config ──────────────────────────────────────────────────────────────────
const FAL_KEY = process.env.FAL_KEY;
const FAL_API  = "https://fal.run/fal-ai/flux-pro";         // flux-pro (fast, high quality)
const OUT_DIR  = path.join(__dirname, "generated-images");
const MANIFEST = path.join(OUT_DIR, "manifest.json");
const CONCURRENCY = 2;                                      // parallel requests
const DRY_RUN  = process.argv.includes("--dry-run");

// Image sizes for different contexts (width × height for FAL AI)
const SIZES = {
  square:     { width: 1024, height: 1024 },   // 1:1  — macro, product solo
  portrait:   { width: 864,  height: 1080 },   // 4:5  — hero, mobile-first
  landscape:  { width: 1280, height: 720  },   // 16:9 — wide interior, showroom
  wide:       { width: 1440, height: 600  },   // 2.4:1 — group shots
};

// Parse CLI args
const args = Object.fromEntries(
  process.argv.slice(2).filter(a => a.startsWith("--")).map(a => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v || true];
  })
);
const SIZE_FILTER = args.size || null;
const CATEGORY    = args.category || null;

// ── Prompts (mirrored from fal-ai-prompts.js for Node.js) ──────────────────

const PROMPTS = {
  // — Hero (split layout)
  "hero-split": {
    positive: "Premium Cocoa Brown Nappa leatherette car seat cover with diamond stitching and tan leather piping, neatly installed on driver and passenger seats of a modern Malaysian sedan, hero display, centered composition, subject fills frame, door open revealing full interior, luxury car interior, clean dashboard with ambient glow, leather upholstery visible, dusk outdoor setting visible through windows, golden hour natural sunlight streaming through side window, soft interior ambient fill, rim light on seat edges, 85mm portrait lens, f/1.8, shallow depth of field, shot on Sony A7R IV, automotive advertising photography, aspirational and premium mood, warm golden tones, hyperrealistic, 8K resolution, ultra-detailed, sharp focus, professional photography, high dynamic range",
    negative: "cartoon, illustration, painting, drawing, anime, 3D render, CGI, watermark, text, logo, blurry, out of focus, overexposed, underexposed, low quality, low resolution, pixelated, grainy, distorted, deformed, ugly, amateur photography, stock photo look, plastic, fake, unrealistic, wrinkled fabric, misaligned seat cover, dirty interior, wrong car model, floating objects, incorrect proportions",
    size: "portrait"
  },

  "hero-full": {
    positive: "Wide cinematic interior shot of a luxury car at night, dashboard ambient lighting only, premium Cocoa Brown Nappa leatherette seat covers with diamond stitching fully installed on all seats, steering wheel visible in foreground, camera slowly drifting focus from steering wheel to driver seat, shallow depth of field shift, luxury car interior at night, clean modern dashboard, leather-wrapped steering wheel, ambient blue dashboard glow, Malaysian urban skyline visible through windows, ambient dashboard lighting only, soft blue instrument panel glow, subtle rim light on leather surfaces, night mood, 35mm lens, f/2.0, wide establishing shot, shot on Canon EOS R5, cinematic automotive photography, moody and cinematic mood, rich dark tones, hyperrealistic, 8K resolution, ultra-detailed, sharp focus, professional photography, high dynamic range",
    negative: "cartoon, illustration, painting, drawing, anime, 3D render, CGI, watermark, text, logo, blurry, out of focus, overexposed, underexposed, low quality, pixelated, daylight, bright interior, people visible, damaged vehicle, dirty car, wrong car model, wrinkled fabric, misaligned seat cover, floating objects, incorrect proportions",
    size: "landscape"
  },

  // — Painpoints
  "painpoint-spill": {
    positive: "Top-down overhead shot of a young child accidentally spilling a baby bottle of milk onto a fabric car seat, milk spreading across the seat fabric, liquid pooling on the surface, spilling action frozen in time, milk splashing mid-air, dynamic moment, car interior, fabric seat surface visible, child's small hands holding tipped bottle, natural family car environment, natural overhead lighting from car dome light, cinematic mood with dramatic shadows, slight warm tone, 50mm standard lens, f/2.8, top-down perspective, shot on Canon EOS R5, lifestyle photography, cinematic and dramatic mood, warm tones, photorealistic, 8K resolution, ultra-detailed, sharp focus on liquid spill, high dynamic range",
    negative: "cartoon, illustration, 3D render, CGI, watermark, text, logo, blurry, overexposed, low quality, stock photo look, wrong car interior, happy mood, clean seat, absent child",
    size: "landscape"
  },
  "painpoint-sweat": {
    positive: "Extreme close-up of a fabric car seat showing yellow sweat stains on the backrest and thigh area, discolored patches on beige fabric, contrast with clean fabric surrounding the stains, static close-up documentation shot, problem evidence, car interior, driver seat focus, harsh Malaysian midday environment visible through window, harsh midday sunlight, unflattering direct light to emphasize the stain problem, high contrast, 100mm macro lens, f/2.8, extreme detail close-up, shot on Sony A7R IV, documentary photography, raw and unfiltered mood, neutral color grading, photorealistic, 8K resolution, ultra-detailed texture, sharp focus on fabric stains, high dynamic range",
    negative: "cartoon, illustration, 3D render, CGI, watermark, blurry, low quality, clean seat, flattering lighting, beauty shot, stock photo look",
    size: "landscape"
  },
  "painpoint-upholstery": {
    positive: "Wide shot of a car upholstery workshop in Malaysia: a car with all seats removed, seats scattered on the floor, mechanic in work uniform working on removing upholstery, tools and materials everywhere, workshop in progress, mechanic actively working, disassembly state, messy car upholstery workshop, industrial garage setting, tools on wall, spare seat covers stacked, fluorescent lighting, Malaysian shop environment, harsh fluorescent overhead workshop lighting, unflattering industrial light, some natural light from open garage door, 24mm wide angle lens, f/4.0, environmental shot, shot on Canon EOS R5, documentary photography, raw and messy mood, neutral color grading, photorealistic, 8K resolution, ultra-detailed, sharp focus, high dynamic range",
    negative: "cartoon, illustration, 3D render, CGI, watermark, blurry, low quality, clean workshop, organized environment, luxury showroom, stock photo look",
    size: "landscape"
  },
  "painpoint-cheap": {
    positive: "Side-by-side comparison shot: left side shows a loose wrinkled universal car seat cover from Shopee with poor fit and sagging fabric; right side shows a perfectly fitted premium Ottoman custom seat cover with clean diamond stitching and tight fit, comparison display, both seats visible in same frame, split composition, car interior, two front seats side by side, clean neutral car environment, even soft diffused studio lighting, consistent exposure across both seats, no shadows obscuring details, 50mm standard lens, f/4.0, straight-on perspective, shot on Sony A7R IV, commercial comparison photography, clean and informative mood, neutral color grading, photorealistic, 8K resolution, ultra-detailed, sharp focus, high dynamic range",
    negative: "cartoon, illustration, 3D render, CGI, watermark, blurry, low quality, biased lighting, different angles, inconsistent comparison, stock photo look",
    size: "landscape"
  },
  "painpoint-cracks": {
    positive: "Extreme close-up of an old cracked and peeling leather car seat, cracks running across the surface, sponge foam visible through tears, deteriorated leather texture, years of sun damage evident, static close-up, damage documentation, texture detail, old car interior, aged leather seat, Malaysian sun-damaged vehicle, dramatic side lighting, raking light across surface to emphasize cracks and texture, deep shadows in crevices, 100mm macro lens, f/2.8, extreme texture close-up, shot on Canon EOS R5, documentary photography, dramatic and raw mood, rich dark tones, photorealistic, 8K resolution, ultra-detailed texture, sharp focus on cracks, high dynamic range",
    negative: "cartoon, illustration, 3D render, CGI, watermark, blurry, low quality, new seat, clean leather, beauty shot, flattering lighting, stock photo look",
    size: "landscape"
  },

  // — Solution
  "solution-layers": {
    positive: "Exploded view diagram of a premium car seat cover showing 5 distinct layers separated and floating: top easy-clean coating, Nappa leather layer, waterproofing film, anti-slip grip backing, and impact-absorbing padding, layers separated vertically with small gaps between each, arrow labels pointing to each layer, technical presentation, clean white studio background, premium product display setting, technical diagram aesthetic, soft diffused studio lighting, even illumination across all layers, no harsh shadows, product photography lighting, 100mm macro lens, f/4.0, top-down angle, shot on Hasselblad X2D, commercial product photography, clean and minimalist mood, premium hi-tech aesthetic, hyperrealistic, 8K resolution, ultra-detailed, sharp focus, high dynamic range",
    negative: "cartoon, illustration, painting, drawing, anime, 3D render, CGI, watermark, text, logo, blurry, out of focus, overexposed, underexposed, low quality, pixelated, messy background, wrinkled fabric, uneven lighting, harsh shadows, cluttered environment",
    size: "square"
  },

  // — Wow Gallery
  "wow-before-after": {
    positive: "Split-screen before-after transformation: left half shows dirty stained fabric car seat in an old car, right half shows the same car interior with premium Cocoa Brown Nappa leatherette Ottoman seat cover perfectly installed, dramatic improvement visible, before-after comparison, wipe transition effect, transformation reveal, same car interior, consistent angle and lighting for fair comparison, Malaysian car context, even natural daylight, consistent exposure across both halves, golden hour warmth on after side, 35mm lens, f/4.0, straight-on interior shot, shot on Sony A7R IV, commercial transformation photography, aspirational and premium mood, warm golden tones, hyperrealistic, 8K resolution, ultra-detailed, sharp focus, high dynamic range",
    negative: "cartoon, illustration, 3D render, CGI, watermark, blurry, low quality, different cars, inconsistent lighting, misleading comparison, stock photo look",
    size: "landscape"
  },
  "wow-macro-stitch": {
    positive: "Extreme macro close-up of Adamas series diamond stitching pattern on premium Nappa leatherette seat cover, every leather grain visible, contrast tan thread weaving through cocoa brown leather, 45-degree lighting raking across texture, macro texture study, static extreme close-up, studio setting, clean dark background, focus entirely on leather and stitching, 45-degree angled studio light, raking across surface to emphasize leather grain and stitch texture, soft fill from opposite side, 100mm macro lens, f/2.8, extreme close-up, shot on Hasselblad X2D, commercial product photography, clean and minimalist mood, warm earthy tones, hyperrealistic, 8K resolution, ultra-detailed texture, sharp focus on every stitch, high dynamic range",
    negative: "cartoon, 3D render, CGI, watermark, blurry, out of focus, low quality, wrinkled fabric, uneven lighting, harsh shadows, messy background",
    size: "square"
  },

  // — Series
  "series-adamas": {
    positive: "Single driver seat with Ottoman Adamas series seat cover in rich Cocoa Brown Nappa leatherette, elegant diamond stitching, tan contrast piping, 6mm premium padding, installed in a Honda City, luxury appearance, solo product hero shot, premium display, Honda City 2023 interior, clean modern dashboard, premium Malaysian sedan context, golden hour sunlight streaming through side window, warm amber glow on leather, soft shadows for depth, 85mm portrait lens, f/1.8, shallow depth of field, shot on Sony A7R IV, luxury automotive photography, aspirational and premium mood, warm golden tones, hyperrealistic, 8K resolution, ultra-detailed leather texture, sharp focus, high dynamic range",
    negative: "cartoon, 3D render, CGI, watermark, blurry, overexposed, low quality, dirty interior, wrinkled fabric, wrong car model, floating objects",
    size: "landscape"
  },
  "series-titan": {
    positive: "Single driver seat with Ottoman Titan series heavy-duty seat cover in carbon fibre texture pattern, graphite black color, 8mm thick padding, rugged premium look, installed in a Toyota Hilux, ready for tough conditions, solo rugged product display, heavy-duty aesthetic, Toyota Hilux interior, utilitarian premium truck cabin, outdoor construction site visible through windows, harsh natural daylight, high contrast, shadow and light defining rugged texture, dramatic outdoor light, 50mm standard lens, f/2.8, seat-focused with context, shot on Canon EOS R5, automotive product photography, bold and dynamic mood, cool desaturated tones, hyperrealistic, 8K resolution, ultra-detailed carbon texture, sharp focus, high dynamic range",
    negative: "cartoon, 3D render, CGI, watermark, blurry, overexposed, low quality, luxury sedan interior, soft lighting, elegant styling, wrong car model",
    size: "landscape"
  },

  // — Testimonial (generic)
  "testimonial-generic": {
    positive: "Happy Malaysian person in their early 30s, standing next to their car, slight genuine smile, casual smart everyday outfit, premium Ottoman seat covers visible through car window, authentic customer photo, outdoor Malaysian setting, standing relaxed next to car, slight smile, natural pose, hand on car door or roof, looking at camera, outdoor Malaysian residential area or parking lot, clean natural environment, late afternoon golden hour, golden hour natural sunlight, warm flattering light on face, soft shadows, natural Malaysian sky, 50mm standard lens, f/2.8, environmental portrait, shot on Sony A7R IV, lifestyle photography, warm and inviting mood, warm golden tones, photorealistic, authentic not stock, 8K resolution, ultra-detailed, sharp focus on person and car, high dynamic range",
    negative: "extra fingers, deformed hands, bad anatomy, multiple heads, skin blemishes, unnatural skin tone, cartoon, 3D render, CGI, watermark, blurry, overexposed, stock photo look, fake smile, studio background",
    size: "landscape"
  },

  // — Branch
  "branch-selangor": {
    positive: "Flagship Ottoman showroom exterior in Bandar Botanik, Klang, Selangor, large modern commercial building with prominent Ottoman brand signage, multiple customer cars parked, busy daytime operation, premium flagship presence, flagship storefront, active daytime operation, cars and customers visible, welcoming entrance, Bandar Botanik commercial district, Klang, modern Malaysian shop lot architecture, clean streets, tropical environment, Malaysian golden hour daylight, warm natural light on building, slight angle creating depth, clear blue sky, 24mm wide angle lens, f/8.0, flagship architectural shot, shot on Canon EOS R5, commercial architecture photography, aspirational and premium mood, vibrant saturated tones, photorealistic, 8K resolution, ultra-detailed, sharp focus, high dynamic range",
    negative: "cartoon, 3D render, CGI, watermark, blurry, overexposed, low quality, wrong signage, empty parking, night shot, rainy day, stock photo look",
    size: "landscape"
  }
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ── FAL AI API Call ─────────────────────────────────────────────────────────

async function generateImage(slotKey, prompt, sizeKey = "landscape") {
  const dimensions = SIZES[sizeKey] || SIZES.landscape;
  // flux-pro does not support negative_prompt — only prompt is used
  const body = {
    prompt: prompt.positive,
    image_size: dimensions,
    num_inference_steps: 28,
    guidance_scale: 3.5,
    num_images: 1,
    enable_safety_checker: false,
  };

  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Would generate: ${slotKey} (${dimensions.width}×${dimensions.height})`);
    return { slotKey, url: null, dryRun: true };
  }

  console.log(`  Generating: ${slotKey} (${dimensions.width}×${dimensions.height})...`);

  const res = await fetch(FAL_API, {
    method: "POST",
    headers: {
      "Authorization": `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`FAL API error for ${slotKey}: ${res.status} — ${err}`);
  }

  const data = await res.json();
  const imageUrl = data.images?.[0]?.url || data.image?.url;

  if (!imageUrl) {
    throw new Error(`No image URL in response for ${slotKey}: ${JSON.stringify(data).slice(0, 300)}`);
  }

  return { slotKey, url: imageUrl };
}

async function downloadImage(url, filepath) {
  if (DRY_RUN) return;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filepath, buf);
  console.log(`    Saved: ${path.basename(filepath)} (${(buf.length / 1024).toFixed(1)} KB)`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!FAL_KEY && !DRY_RUN) {
    console.error("ERROR: FAL_KEY environment variable is required.");
    console.error("  Usage: FAL_KEY=fal-... node generate-images.js [--dry-run]");
    process.exit(1);
  }

  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║  Ottoman — FAL AI Image Generator                     ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log(DRY_RUN ? "  MODE: DRY RUN (no API calls)" : `  MODE: LIVE (${CONCURRENCY} concurrent)`);
  console.log(`  Output: ${OUT_DIR}`);
  if (CATEGORY) console.log(`  Filter: category=${CATEGORY}`);
  if (SIZE_FILTER) console.log(`  Filter: size=${SIZE_FILTER}`);
  console.log("");

  // Filter slots
  let slots = Object.entries(PROMPTS).map(([key, prompt]) => ({ key, ...prompt }));
  if (CATEGORY) {
    slots = slots.filter(s => s.key.startsWith(CATEGORY));
  }
  if (SIZE_FILTER) {
    slots = slots.filter(s => s.size === SIZE_FILTER);
  }

  console.log(`  ${slots.length} image(s) to generate:\n`);
  slots.forEach(s => console.log(`    - ${s.key} [${s.size}]`));
  console.log("");

  if (slots.length === 0) {
    console.log("  No slots matched. Done.");
    return;
  }

  // Create output directory
  if (!DRY_RUN) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  // Generate images with concurrency limit
  const results = [];
  for (let i = 0; i < slots.length; i += CONCURRENCY) {
    const batch = slots.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(s => generateImage(s.key, { positive: s.positive, negative: s.negative }, s.size))
    );
    results.push(...batchResults);

    // Download images as they complete
    for (const r of batchResults) {
      if (r.url) {
        const ext = ".jpg";
        const filename = `${slugify(r.slotKey)}${ext}`;
        const filepath = path.join(OUT_DIR, filename);
        await downloadImage(r.url, filepath);
        r.filename = filename;
      }
    }

    // Small delay between batches to avoid rate limiting
    if (i + CONCURRENCY < slots.length) {
      await sleep(2000);
    }
  }

  // Write manifest
  const manifest = results.map(r => ({
    slot: r.slotKey,
    filename: r.filename || null,
    url: r.url || null,
    generated: !r.dryRun,
  }));

  if (!DRY_RUN) {
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
    console.log(`\n  Manifest: ${MANIFEST}`);
  }

  console.log(`\n  Done. ${results.filter(r => r.url).length} images generated.`);
  console.log(`  Add images to your project and reference them via manifest.json\n`);
}

main().catch(err => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
