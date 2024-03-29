let walls = [];
let particle;
let xoff = 0;
let yoff = 10000;
const sceneW = 400;
const sceneH = 400;
let sliderFOV;

function setup() {
  createCanvas(800, 400);
  for (var i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));

  particle = new Particle();
  sliderFOV = createSlider(0, 360, 45);
  sliderFOV.input(changeFOV);
}

function changeFOV() {
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}

function draw() {
  background(0);

  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.1);
  } else if (keyIsDown(UP_ARROW)) {
    particle.move(1);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-1);
  }

  for (let wall of walls) {
    wall.show();
  }

  //particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH);
  //particle.update(mouseX, mouseY);
  particle.show();
  //xoff += 0.01;
  //yoff += 0.01;

  const scene = particle.look(walls);
  push();
  translate(sceneW, 0);
  let w = sceneW / scene.length;
  for (var i = 0; i < scene.length; i++) {
    noStroke();
    let sq = scene[i] * scene[i];
    let wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w, h);
  }
  pop();
  //let pt = ray.cast(wall);
  //if (pt) {
  //fill(255);
  //ellipse(pt.x, pt.y, 6, 6);
  //}
  //ray.lookAt(mouseX, mouseY);
}
