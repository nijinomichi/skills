---
name: quantum-aesthetic-art
description: Create original p5.js generative art from quantum-aesthetic concepts, including superposition, observer participation, indeterminacy, trust, dark matter, and poetic metadata. Use when users request quantum aesthetics, CoPhelia³-inspired generative art, reproducible p5.js artworks, interactive aesthetic parameters, or machine-readable artwork provenance.
---

# Quantum Aesthetic Art

Create original, reproducible generative artworks in p5.js through a quantum-aesthetic framework.

This skill treats artistic meaning as a field of potential interpretations. Do not mechanically illustrate concepts or imitate identifiable living artists. Translate an artistic philosophy into computational behavior, then make the behavior visible through original form, motion, color, interaction, and metadata.

## Core principles

- **Superposition:** Multiple visual states may coexist before selection, convergence, or user interaction.
- **Observer participation:** Pointer movement, clicks, time, viewport, or declared parameters may influence the final composition.
- **Aesthetic uncertainty:** Preserve ambiguity. Do not force every variable into a single literal symbolic meaning.
- **Entanglement:** Let distant parts of the composition influence one another through shared seeds, fields, constraints, or state.
- **Trust and provenance:** Make every artwork reproducible through an explicit seed and a documented parameter set.
- **Originality:** Create a new visual system for each request. Never reproduce a named artist's style or a supplied artwork's distinctive composition.

## Required outputs

Create these files unless the user explicitly requests a smaller scope:

```text
output/
├── philosophy.md
├── viewer.html
├── sketch.js
└── artwork-metadata.yaml
```

- `philosophy.md`: A concise, original account of the work's computational aesthetic philosophy.
- `viewer.html`: A self-contained browser viewer that loads p5.js and `sketch.js`.
- `sketch.js`: The generative artwork.
- `artwork-metadata.yaml`: Machine-readable provenance, concepts, parameters, and reproducibility data.


## Workflow

### 1. Interpret the request

Identify:

- The conceptual field: for example, longing, conflict, transcendence, trust, memory, invisibility, or emergence
- The medium behavior: static composition, evolving animation, interactive observation, or user-triggered regeneration
- The material vocabulary: particles, fields, grids, branching systems, agents, typography, geometric traces, or layered transparency
- The intended emotional temperature: restrained, volatile, contemplative, ecstatic, sparse, or dense

If a request includes references to existing artists or artworks, use only high-level non-protectable characteristics such as historical context, broad themes, or medium. Do not imitate signature motifs, compositions, palettes, or recognizable visual style.

### 2. Write the philosophy

Before implementing, write `philosophy.md` with:

- A title
- A 100–250 word conceptual statement
- The operative system: what entities exist and how they behave
- The role of the observer
- The meaning of the seed and reproducibility

Make the philosophy specific to the work. Avoid generic statements about “unlocking creativity” or “exploring infinite possibilities.”

### 3. Design the parameter field

Use one top-level `params` object in `sketch.js`.

Every parameter must have a clear role and must be serializable. Include at minimum:

```js
const params = {
  seed: 12345,
  width: 900,
  height: 900,
  palette: ["#171614", "#F2E9D8", "#B88A44", "#6D8E87"],
  entityCount: 180,
  fieldScale: 0.008,
  observerInfluence: 0.35,
  evolutionRate: 0.006,
  backgroundAlpha: 14
};
```

- Use a numeric seed.
- Do not reference `params.colorPalette` unless that property exists.
- Keep colors, scale, quantity, probabilities, and timing in `params`.
- Define stateful arrays and generated entities outside `draw()` where possible.


### 4. Guarantee reproducibility

Call both `randomSeed()` and `noiseSeed()` before generating any random state.

```js
function initializeSeed(seed) {
  randomSeed(seed);
  noiseSeed(seed);
}
```

Run `initializeSeed(params.seed)` at the beginning of `setup()` and again inside every full regeneration function.

For static works:

```js
function setup() {
  createCanvas(params.width, params.height);
  pixelDensity(1);
  initializeSeed(params.seed);
  buildSystem();
  renderArtwork();
  noLoop();
}
```

For animated works:

```js
function setup() {
  createCanvas(params.width, params.height);
  pixelDensity(1);
  initializeSeed(params.seed);
  buildSystem();
}

function draw() {
  updateSystem();
  renderSystem();
}
```


### 5. Separate responsibilities

Use these functions when relevant:

```js
function buildSystem() {}
function updateSystem() {}
function renderSystem() {}
function regenerate() {}
function exportImage() {}
```

Use classes only when an artwork contains many stateful entities such as particles, agents, branches, or cells.

Each class should separate:

```js
class Entity {
  constructor() {}
  update() {}
  display() {}
}
```


### 6. Build observer participation

Use interaction with restraint. The observer should alter the system’s interpretation rather than merely trigger decorative effects.

Possible mechanisms:

- Pointer position changes local force-field direction
- A click collapses a probabilistic state into one visual branch
- Pressing `R` produces a new seeded configuration
- Pressing `S` exports the canvas
- Parameter controls alter density, entropy, or observer influence
- Time progressively reveals latent visual structures

Always provide keyboard controls:

```js
function keyPressed() {
  if (key === "r" || key === "R") {
    params.seed = floor(random(1, 1_000_000_000));
    regenerate();
  }

  if (key === "s" || key === "S") {
    exportImage();
  }
}
```

When assigning a fresh seed through `random()`, record it visibly in the interface or console so the work can be reproduced.

### 7. Check performance

- Start at a moderate entity count, then increase only if the frame rate remains stable.
- Avoid creating large arrays, images, graphics buffers, or object instances every frame.
- Cache static structures in `setup()` or `buildSystem()`.
- Use `pixelDensity(1)` for dense animated systems when appropriate.
- For static renderings, call `noLoop()`.
- Avoid costly per-frame nested loops unless the visual effect requires them.


### 8. Create the viewer

`viewer.html` must:

- Load p5.js from an official CDN
- Load `sketch.js` with `defer`
- Explain the artwork in a short caption
- Display the current seed
- State controls: `R` regenerates, `S` saves PNG
- Be responsive and usable on mobile
- Avoid external assets unless essential

Use this minimum structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quantum Aesthetic Artwork</title>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.3/lib/p5.min.js"></script>
  <script src="./sketch.js" defer></script>
</head>
<body>
  <main>
    <h1>Quantum Aesthetic Artwork</h1>
    <p id="seed-readout">Seed: loading…</p>
    <p>R: regenerate · S: save PNG</p>
    <div id="canvas-container"></div>
  </main>
</body>
</html>
```

When using `#canvas-container`, create the canvas with:

```js
createCanvas(params.width, params.height).parent("canvas-container");
```


### 9. Write metadata

Create `artwork-metadata.yaml` using the schema in `references/quantum-aesthetic-schema.yaml`.

Validate the YAML mentally before output:

- Use two spaces for indentation.
- Write mappings as `key: value`, including a space after `:`.
- Use `-` only for actual list items.
- Use `|` for multiline strings, with indented contents.
- Do not place Markdown fences such as ```yaml inside the `.yaml` file.
- Quote strings containing `:`, `#`, braces, or potentially ambiguous special characters.


## Code requirements

- Use p5.js global mode unless instance mode is specifically needed.
- Use `const` by default; use `let` only for values reassigned later.
- Do not declare `params` with `let` unless replacement of the whole object is required.
- Ensure all referenced parameter properties exist.
- Keep utility functions defensive: prevent division by zero and protect empty palettes.
- Use `constrain()` when variables must remain in a finite range.
- Do not call `saveCanvas()` automatically on page load.
- Do not use copyrighted images, copied source code, or identifiable artist-style imitation.


## Delivery checklist

Before delivering, verify:

- `viewer.html` loads without JavaScript syntax errors.
- Every `params.*` reference has a defined property.
- `randomSeed()` and `noiseSeed()` use the same declared seed.
- `R` generates and exposes a new reproducible seed.
- `S` exports a PNG.
- Canvas dimensions follow the parameter object.
- The artwork works at desktop and mobile widths.
- YAML is syntactically valid and contains no Markdown code fences.
- The result is conceptually specific and visually original.


## Reference material

- Read `references/quantum-aesthetic-schema.yaml` when creating metadata.
- Start from `templates/sketch.js` and `templates/viewer.html` when a project needs a minimal p5.js baseline.

