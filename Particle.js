class Particle {
  constructor() {
    this.fov = 45;
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.heading = 0;
    for (var a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for (var a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a) + this.heading));
    }
  }

  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (var a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }

  move(amt) {
    const vel = p5.Vector.fromAngle(this.heading);

    vel.setMag(amt);
    this.pos.add(vel);
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    const scene = [];
    for (var i = 0; i < this.rays.length; i++) {
      let ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          let a = ray.dir.heading() - this.heading;
          d *= cos(a);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 1, 1);

    for (let ray of this.rays) {
      ray.show();
    }
  }
}
