#!/usr/bin/env node
// =============================================================================
// Ottoman Seat Cover — FAL AI Image Generator (GPT Image 2)
// =============================================================================
// Generates photorealistic product/lifestyle images using OpenAI GPT Image 2
// via FAL AI. All prompts follow the anti-fake "Less Is More" architecture.
//
// Usage:
//   FAL_KEY=fal-... node generate-images.js [--dry-run] [--category=hero] [--size=landscape]
//
// Output:
//   generated-images/  — all downloaded images
//   generated-images/manifest.json — mapping of slot → filename
// =============================================================================

const fs = require("fs");
const path = require("path");

// ── Config ──────────────────────────────────────────────────────────────────
const FAL_KEY = process.env.FAL_KEY;
const FAL_API  = "https://fal.run/fal-ai/gpt-image-2";
const OUT_DIR  = path.join(__dirname, "generated-images");
const MANIFEST = path.join(OUT_DIR, "manifest.json");
const CONCURRENCY = 2;
const DRY_RUN  = process.argv.includes("--dry-run");

// GPT Image 2 presets + custom sizes (must be multiples of 16, max 3:1 ratio)
const SIZES = {
  square:     "square_hd",                    // 1024×1024
  portrait:   { width: 768,  height: 1024 },  // 3:4
  landscape:  { width: 1280, height: 720  },  // 16:9
  wide:       { width: 1440, height: 608  },  // ~2.4:1
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

// ── Anti-Fake Prompts ───────────────────────────────────────────────────────
// Architecture: RAW photo | Subject → Action → Environment → Lighting → Camera → Style → Quality (max 2)
// Key anti-fake rules:
//   1. "RAW photo" as the SINGLE realism anchor — never stack hyperrealistic/photorealistic/8K
//   2. Camera + lens = strongest realism signal
//   3. Specific lighting type = second strongest
//   4. Max 2 quality tags (sharp focus, professional photography)
//   5. Imperfection cues: natural shadows, film grain, minor lens distortion, unretouched
//   6. GPT Image 2 does NOT support negative_prompt — prompts must stand alone

const PROMPTS = {

  // ── Hero (split layout) ─────────────────────────────────────────────────
  "hero-split": {
    prompt: "RAW photo, premium Cocoa Brown Nappa leatherette car seat cover with diamond stitching and tan leather piping, neatly installed on driver and passenger seats of a modern Malaysian sedan, door open revealing full interior, centered composition on the seat, luxury car interior with clean dashboard, leather upholstery visible, dusk outdoor setting visible through side window, golden hour natural sunlight streaming through side window creating soft rim light on seat edges, natural shadows falling across leather surface, 85mm portrait lens f/1.8, shot on Sony A7R IV, automotive advertising photography, warm golden tones, sharp focus, professional photography",
    size: "portrait"
  },

  "hero-full": {
    prompt: "RAW photo, wide cinematic interior shot of a luxury car at night, dashboard ambient lighting only, premium Cocoa Brown Nappa leatherette seat covers with diamond stitching fully installed on all seats, steering wheel visible in foreground, shallow depth of field, luxury car interior at night, clean modern dashboard, leather-wrapped steering wheel, ambient blue dashboard glow, Malaysian urban skyline visible through windows, natural light falloff from dashboard instruments, subtle rim light on leather surfaces, 35mm lens f/2.0, shot on Canon EOS R5, cinematic automotive photography, rich dark tones, sharp focus, professional photography",
    size: "landscape"
  },

  // ── Hero Gallery (5 sub-shots) ──────────────────────────────────────────
  "hero-gallery-main": {
    prompt: "RAW photo, driver point-of-view shot looking down at premium Cocoa Brown Nappa leatherette car seat with tan piping and diamond stitching, hands resting naturally on leather-wrapped steering wheel, relaxed driving posture, modern car dashboard visible, outdoor dusk visible through windshield, golden hour light streaming through windshield creating natural lens flare, soft dashboard reflection, 35mm lens f/2.0, POV perspective, shot on Sony A7R IV, lifestyle automotive photography, warm and inviting mood, sharp focus, natural grain",
    size: "landscape"
  },

  "hero-gallery-macro": {
    prompt: "RAW photo, extreme close-up macro shot of diamond stitching pattern on premium Nappa leatherette car seat cover, natural leather grain texture fully visible with slight imperfections, tan contrast thread weaving through cocoa brown leather, studio environment with clean neutral background, 45-degree angled studio lighting raking across surface to emphasize texture, natural shadows in stitch crevices, 100mm macro lens f/2.8, shot on Canon EOS R5, commercial product photography, clean and minimalist mood, sharp focus, professional photography",
    size: "square"
  },

  "hero-gallery-solo": {
    prompt: "RAW photo, single driver seat in maroon and cream Nappa leatherette with diamond stitching, neatly installed in a Honda HR-V, solo hero shot with centered composition, clean car interior with dark subdued background, dramatic side lighting from left window, natural shadows on right side of seat, 85mm portrait lens f/1.8, shot on Sony A7R IV, automotive advertising photography, bold and dynamic mood, sharp focus, professional photography",
    size: "portrait"
  },

  "hero-gallery-wide": {
    prompt: "RAW photo, wide interior shot of a 5-seater Malaysian sedan fully installed with premium Nappa leatherette seat covers in Cocoa Brown, all seats visible with diamond stitching pattern, clean organized interior with no clutter, top-down 3/4 angle, soft diffused natural daylight through all windows, even exposure throughout cabin, slight natural shadows under seats, 24mm wide angle lens f/4.0, shot on Canon EOS R5, commercial automotive photography, clean and minimalist mood, sharp focus, professional photography",
    size: "landscape"
  },

  "hero-gallery-glitter": {
    prompt: "RAW photo, Eleven series navy blue galaxy glitter seat cover installed in car interior at night, thousands of tiny metallic flakes sparkling under ambient blue dashboard light, stars-like effect on black seat surface, dark car interior with subtle ambient blue light, Malaysian city lights subtly visible through windows, blue dashboard glow as key light, pinpoint sparkles catching light naturally, 50mm standard lens f/2.0, shot on Sony A7R IV, automotive photography, moody and cinematic mood, sharp focus, professional photography",
    size: "landscape"
  },

  // ── Painpoints (5 problem shots) ────────────────────────────────────────
  "painpoint-spill": {
    prompt: "RAW photo, top-down overhead shot of a young child accidentally spilling a baby bottle of milk onto a beige fabric car seat, milk spreading across the seat fabric creating a wet stain, liquid pooling on the surface, child's small hands holding tipped bottle, spilling action frozen mid-motion, natural family car interior with toys visible in background, natural overhead lighting from car dome light, cinematic shadows adding drama, 50mm standard lens f/2.8, top-down perspective, shot on Canon EOS R5, documentary photography, warm tones, sharp focus, professional photography",
    size: "landscape"
  },

  "painpoint-sweat": {
    prompt: "RAW photo, extreme close-up of a beige fabric car seat showing yellow sweat stains on the backrest and thigh area, discolored patches contrasting with clean fabric surrounding, static documentation shot showing problem evidence, car interior focusing on driver seat, harsh Malaysian midday environment visible through window, harsh midday sunlight emphasizing stain contrast, unflattering direct light, 100mm macro lens f/2.8, shot on Sony A7R IV, documentary photography, raw and unfiltered mood, neutral color grading, sharp focus, professional photography",
    size: "landscape"
  },

  "painpoint-upholstery": {
    prompt: "RAW photo, wide shot of a car upholstery workshop in Malaysia, a car with all seats removed and scattered on the floor, mechanic in blue work uniform actively working on removing upholstery, tools and spare materials everywhere, messy industrial garage setting with tools on wall, harsh fluorescent overhead workshop lighting, some natural light from open garage door, 24mm wide angle lens f/4.0, shot on Canon EOS R5, documentary photography, raw and authentic mood, sharp focus, professional photography",
    size: "landscape"
  },

  "painpoint-cheap": {
    prompt: "RAW photo, side-by-side comparison shot inside a car interior, left side shows a loose wrinkled universal car seat cover with poor fit and sagging fabric, right side shows a perfectly fitted premium custom seat cover with clean diamond stitching and tight fit, both seats visible in same frame with split composition, clean neutral car environment, even soft diffused lighting, consistent exposure across both seats, 50mm standard lens f/4.0, straight-on perspective, shot on Sony A7R IV, commercial comparison photography, clean and informative mood, sharp focus, professional photography",
    size: "landscape"
  },

  "painpoint-cracks": {
    prompt: "RAW photo, extreme close-up of an old cracked and peeling leather car seat, cracks running across the surface with sponge foam visible through deep tears, deteriorated leather texture showing years of sun damage, old car interior, dramatic side lighting raking across surface to emphasize cracks and texture, deep natural shadows in crevices, 100mm macro lens f/2.8, shot on Canon EOS R5, documentary photography, dramatic and raw mood, sharp focus, professional photography",
    size: "landscape"
  },

  // ── Solution (5-layer exploded view) ────────────────────────────────────
  "solution-layers": {
    prompt: "RAW photo, exploded view of a premium car seat cover showing 5 distinct layers separated and floating vertically with small gaps between each, top easy-clean fabric coating layer, Nappa leatherette layer with visible grain texture, waterproofing film with subtle sheen, anti-slip grip backing with rubberized texture pattern, and impact-absorbing foam padding at bottom, clean white studio background, technical product presentation, soft diffused studio lighting with even illumination across all layers, natural soft shadows between floating layers, 100mm macro lens f/4.0, top-down angle, shot on Hasselblad X2D, commercial product photography, clean and minimalist mood, sharp focus, professional photography",
    size: "square"
  },

  // ── Wow Gallery (6 items) ──────────────────────────────────────────────
  "wow-before-after": {
    prompt: "RAW photo, split-screen before-after transformation inside a car interior, left half shows dirty stained beige fabric car seat in an older car, right half shows the same car interior with premium Cocoa Brown Nappa leatherette seat cover perfectly installed with diamond stitching, dramatic improvement visible in same frame, consistent angle and lighting across both halves for fair comparison, Malaysian car context, even natural daylight through windows, golden hour warmth on the after side, 35mm lens f/4.0, straight-on interior shot, shot on Sony A7R IV, commercial transformation photography, warm golden tones, sharp focus, professional photography",
    size: "landscape"
  },

  "wow-interior": {
    prompt: "RAW photo, Honda HR-V 2022 interior with maroon and cream Nappa leatherette seat covers fully installed on all 5 seats, diamond stitching pattern visible across all seats, tan piping accents along edges, clean organized cabin, modern dashboard with ambient display glow, outdoor Malaysian residential area visible through windows, soft natural daylight through windows and sunroof, even interior illumination with natural shadows, 24mm wide angle lens f/4.0, interior wide shot, shot on Canon EOS R5, automotive interior photography, warm and inviting mood, sharp focus, professional photography",
    size: "landscape"
  },

  "wow-galaxy": {
    prompt: "RAW photo, Eleven series navy blue galaxy glitter seat cover installed in car interior at night, thousands of tiny metallic flakes sparkling under ambient blue dashboard light, stars-like cosmic effect on black seat surface, dark car interior with subtle blue ambient glow from dashboard instruments, Malaysian city lights visible through windows, blue dashboard glow as key light, subtle neon reflections from outside, 50mm standard lens f/2.0, shot on Sony A7R IV, automotive photography, moody and cinematic mood, rich dark tones with natural blue accents, sharp focus, professional photography",
    size: "landscape"
  },

  "wow-macro-stitch": {
    prompt: "RAW photo, extreme macro close-up of Adamas series diamond stitching pattern on premium Nappa leatherette seat cover, every natural leather grain and pore visible, contrast tan thread weaving through rich cocoa brown leather, 45-degree studio lighting raking across surface to emphasize leather grain depth and stitch texture, soft fill from opposite side, natural shadows in leather grain, clean dark background, 100mm macro lens f/2.8, shot on Hasselblad X2D, commercial product photography, warm earthy tones, sharp focus, professional photography",
    size: "square"
  },

  "wow-installTL": {
    prompt: "RAW photo, professional Malaysian car installer in dark work uniform wrapping a car seat with premium Ottoman seat cover, hands working methodically with installation tools, seat mid-transformation from bare fabric to partially covered, multiple installation stages visible, clean car interior workshop setting with organized tools nearby, consistent even workshop lighting, no harsh flash, balanced exposure, 35mm lens f/4.0, fixed tripod perspective, shot on Canon EOS R5, documentary process photography, informative and professional mood, sharp focus, professional photography",
    size: "landscape"
  },

  "wow-showroom": {
    prompt: "RAW photo, wide elevated angle shot of Ottoman showroom interior in Klang Malaysia, three different series seat covers displayed side by side on display seats showing Origin charcoal grey, Adamas cocoa brown diamond stitch, and Titan graphite black carbon texture, modern retail showroom interior with Ottoman brand signage on wall, clean polished floor with natural reflections, bright even showroom lighting from overhead track lights combined with natural daylight from storefront windows, 24mm wide angle lens f/5.6, shot on Canon EOS R5, commercial retail photography, professional and clean mood, sharp focus, professional photography",
    size: "wide"
  },

  // ── Testimonial (generic customer lifestyle) ────────────────────────────
  "testimonial-generic": {
    prompt: "RAW photo, happy Malaysian person in their early 30s standing next to their car in an outdoor Malaysian residential setting, slight genuine natural smile showing teeth, casual smart everyday outfit, hand resting naturally on car door, premium Ottoman seat covers subtly visible through car window, authentic candid moment not posed studio shot, late afternoon golden hour in Malaysian suburb, golden hour natural sunlight creating warm flattering light on face, soft natural shadows, authentic skin texture with minor imperfections, 50mm standard lens f/2.8, environmental portrait, shot on Sony A7R IV, lifestyle photography, warm and inviting mood, warm golden tones, sharp focus, professional photography",
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

// ── FAL AI GPT Image 2 API Call ──────────────────────────────────────────────

async function generateImage(slotKey, prompt, sizeKey = "landscape") {
  const imageSize = SIZES[sizeKey] || SIZES.landscape;

  // GPT Image 2 does NOT support negative_prompt
  const body = {
    prompt: prompt.prompt,
    image_size: imageSize,
    quality: "high",
    num_images: 1,
    output_format: "jpeg",
  };

  if (DRY_RUN) {
    const dims = typeof imageSize === "string" ? imageSize : `${imageSize.width}×${imageSize.height}`;
    console.log(`  [DRY-RUN] Would generate: ${slotKey} (${dims})`);
    return { slotKey, url: null, dryRun: true };
  }

  const dims = typeof imageSize === "string" ? imageSize : `${imageSize.width}×${imageSize.height}`;
  console.log(`  Generating: ${slotKey} (${dims})...`);

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
  console.log("║  Ottoman — FAL AI GPT Image 2 Generator               ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log(DRY_RUN ? "  MODE: DRY RUN (no API calls)" : `  MODE: LIVE (${CONCURRENCY} concurrent)`);
  console.log(`  Model: GPT Image 2 (high quality)`);
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
  slots.forEach(s => console.log(`    - ${s.key} [${typeof s.size === "string" ? s.size : JSON.stringify(s.size)}]`));
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
      batch.map(s => generateImage(s.key, { prompt: s.prompt }, typeof s.size === "string" ? s.size : "landscape"))
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
      await sleep(3000);
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
  console.log(`  Copy generated-images/ to public/generated-images/ for Next.js\n`);
}

main().catch(err => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
