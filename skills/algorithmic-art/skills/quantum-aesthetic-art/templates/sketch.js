const params = {
  seed: 12345,
  width: 900,
  height: 900,
  palette: ["#171614", "#F2E9D8", "#B88A44", "#6D8E87"],
  backgroundColor: "#171614",
  entityCount: 180,
  fieldScale: 0.008,
  observerInfluence: 0.35,
  evolutionRate: 0.006,
  backgroundAlpha: 14,
  entityWeightMin: 0.35,
  entityWeightMax: 1.25,
  fieldTurns: 2,
  phaseRate: 0.01,
  phaseAmplitude: 0.25,
  observerRange: 0.75,
  strokeAlpha: 110
};

let entities = [];

function initializeSeed(seed) {
  randomSeed(seed);
  noiseSeed(seed);
}

function setup() {
  createCanvas(params.width, params.height).parent("canvas-container");
  pixelDensity(1);
  strokeCap(ROUND);
  initializeSeed(params.seed);
  buildSystem();
  background(paletteValue(0));
  announceSeed();
}

function draw() {
  fadeBackground(params.backgroundAlpha);
  updateSystem();
  renderSystem();
}

function buildSystem() {
  entities = [];

  for (let index = 0; index < params.entityCount; index += 1) {
    entities.push(new Entity(index));
  }
}

function updateSystem() {
  for (const entity of entities) {
    entity.update();
  }
}

function renderSystem() {
  for (const entity of entities) {
    entity.display();
  }
}

class Entity {
  constructor(index) {
    const lowerWeight = min(params.entityWeightMin, params.entityWeightMax);
    const upperWeight = max(params.entityWeightMin, params.entityWeightMax);
    const palette = paletteValues();

    this.index = index;
    this.position = createVector(random(width), random(height));
    this.previousPosition = this.position.copy();
    this.phase = random(TWO_PI);
    this.weight = random(lowerWeight, upperWeight);
    this.paletteIndex = palette.length > 1 ? floor(random(1, palette.length)) : 0;
  }

  update() {
    this.previousPosition = this.position.copy();

    const field = noise(
      this.position.x * params.fieldScale,
      this.position.y * params.fieldScale,
      frameCount * params.evolutionRate
    );
    const observer = createVector(mouseX - this.position.x, mouseY - this.position.y);
    const distanceToObserver = max(observer.mag(), 1);
    const maximumInfluence = constrain(params.observerInfluence, 0, 1);
    const observerRadius = max(width * constrain(params.observerRange, 0, 1), 1);

    if (observer.magSq() > 0) {
      observer.normalize();
    }

    const observerWeight = constrain(
      map(distanceToObserver, 0, observerRadius, maximumInfluence, 0),
      0,
      maximumInfluence
    );
    const angle = field * TWO_PI * params.fieldTurns
      + sin(this.phase + frameCount * params.phaseRate) * params.phaseAmplitude;
    const direction = p5.Vector.fromAngle(angle).mult(1 - observerWeight);

    direction.add(observer.mult(observerWeight));
    direction.setMag(this.weight);
    this.position.add(direction);
    this.wrap();
  }

  display() {
    const tone = color(paletteValue(this.paletteIndex));

    tone.setAlpha(constrain(params.strokeAlpha, 0, 255));
    stroke(tone);
    strokeWeight(this.weight);
    line(
      this.previousPosition.x,
      this.previousPosition.y,
      this.position.x,
      this.position.y
    );
  }

  wrap() {
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
  }
}

function paletteValues() {
  if (Array.isArray(params.palette) && params.palette.length > 0) {
    return params.palette;
  }

  return [params.backgroundColor];
}

function paletteValue(index) {
  const palette = paletteValues();
  const requestedIndex = Number.isFinite(index) ? floor(index) : 0;
  const safeIndex = constrain(requestedIndex, 0, palette.length - 1);

  return palette[safeIndex] || params.backgroundColor;
}

function fadeBackground(opacity) {
  const base = color(paletteValue(0));
  const safeOpacity = Number.isFinite(opacity) ? opacity : 0;

  base.setAlpha(constrain(safeOpacity, 0, 255));
  noStroke();
  fill(base);
  rect(0, 0, width, height);
}

function updateSeedReadout() {
  const readout = document.querySelector("#seed-readout");

  if (readout) {
    readout.textContent = `Seed: ${params.seed}`;
  }
}

function announceSeed() {
  updateSeedReadout();
  console.info(`Quantum Aesthetic seed: ${params.seed}`);
}

function regenerate() {
  initializeSeed(params.seed);
  background(paletteValue(0));
  buildSystem();
  announceSeed();
}

function exportImage() {
  saveCanvas(`quantum-aesthetic-${params.seed}`, "png");
}

function keyPressed() {
  if (key === "r" || key === "R") {
    params.seed = floor(random(1, 1_000_000_000));
    regenerate();
  }

  if (key === "s" || key === "S") {
    exportImage();
  }
}
