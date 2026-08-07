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

let entities = [];

function initializeSeed(seed) {
  randomSeed(seed);
  noiseSeed(seed);
}

function setup() {
  const canvas = createCanvas(params.width, params.height);
  canvas.parent("canvas-container");
  pixelDensity(1);
  strokeCap(ROUND);
  initializeSeed(params.seed);
  buildSystem();
  updateSeedReadout();
  background(params.palette);
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
    this.index = index;
    this.position = createVector(random(width), random(height));
    this.previousPosition = this.position.copy();
    this.phase = random(TWO_PI);
    this.weight = random(0.35, 1.25);
    this.paletteIndex = floor(random(1, params.palette.length));
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
    observer.normalize();

    const observerWeight = constrain(
      map(distanceToObserver, 0, width * 0.75, params.observerInfluence, 0),
      0,
      params.observerInfluence
    );

    const angle = field * TWO_PI * 2 + sin(this.phase + frameCount * 0.01) * 0.25;
    const direction = p5.Vector.fromAngle(angle).mult(1 - observerWeight);
    direction.add(observer.mult(observerWeight));
    direction.setMag(this.weight);

    this.position.add(direction);
    this.wrap();
  }

  display() {
    const tone = color(params.palette[this.paletteIndex]);
    tone.setAlpha(110);

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

function fadeBackground(opacity) {
  const base = color(params.palette);
  base.setAlpha(opacity);
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

function regenerate() {
  initializeSeed(params.seed);
  background(params.palette);
  buildSystem();
  updateSeedReadout();
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
