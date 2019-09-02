import { Vector3 } from 'three';
import { easeInOutCubic } from './utils/easing-functions';

const animationTime = 10000;

class AnimationService {
  constructor() {
    this.animations = [];
    this.timeStamp = 0;

    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
    this.updateAnimation = this.updateAnimation.bind(this);
  }

  update(time) {
    this.timeStamp = time;
    this.animations.forEach(this.updateAnimation);
  }

  updateAnimation(animation, index) {
    const {
      mesh,
      startTime,
      startPosition,
      displacementVector,
      easingFunction,
    } = animation;
    const percent = (this.timeStamp - startTime) / animationTime;

    if (percent < 1) {
      const easedPercent = easingFunction(percent);
      const displacement = displacementVector
        .clone()
        .multiplyScalar(easedPercent);
      mesh.position.copy(displacement.add(startPosition));
    } else {
      mesh.position.copy(displacementVector.add(startPosition));
      this.animations.splice(index, 1);
    }
  }

  animate(mesh, endPosition, easingFunction = easeInOutCubic) {
    const startTime = this.timeStamp;
    const startPosition = mesh.position.clone();
    const displacementVector = new Vector3().subVectors(
      endPosition,
      startPosition
    );

    this.animations.push({
      mesh,
      startPosition,
      displacementVector,
      startTime,
      easingFunction,
    });
  }
}

export { AnimationService };
