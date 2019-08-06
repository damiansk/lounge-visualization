import { Vector3 } from 'three';

// Links:
//  https://joshondesign.com/2013/03/01/improvedEasingEquations
//  https://gist.github.com/gre/1650294
const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
const easeInOutQuint = t =>
  t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t;

class AnimationService {
  constructor() {
    this.animations = [];
    this.timeStamp = 0;

    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
  }

  update(time) {
    this.timeStamp = time;
    this.animations.forEach(
      (
        { startTime, mesh, startPosition, directionalVector, endPosition },
        index
      ) => {
        const percent = (time - startTime) / 1000;

        if (percent <= 1) {
          const { x, y, z } = startPosition
            .clone()
            .add(
              directionalVector.clone().multiplyScalar(easeInOutCubic(percent))
            );
          mesh.position.set(x, y, z);
        } else {
          mesh.position.set(endPosition.x, endPosition.y, endPosition.z);
          this.animations.splice(index, 1);
        }
      }
    );
  }

  animate(mesh, endPosition) {
    const startPosition = mesh.position.clone();
    const directionalVector = new Vector3().subVectors(
      endPosition,
      startPosition
    );

    this.animations.push({
      mesh,
      startPosition,
      endPosition,
      directionalVector,
      startTime: this.timeStamp,
    });
  }
}

export { AnimationService };
