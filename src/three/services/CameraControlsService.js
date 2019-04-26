import { Math as TMath } from 'three';
import { OrbitControls } from '../libs/orbit-controls';

let controls = null;

class CameraControlsService {
  static init(camera, domElement) {
    controls = new OrbitControls(camera, domElement);

    controls.enabled = true;
    controls.minDistance = 10;
    controls.maxDistance = 30;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2 - 2 * TMath.DEG2RAD;
    controls.panningMode = Math.PI / 2;

    return controls;
  }

  static disable() {
    controls.enabled = false;
  }

  static enable() {
    controls.enabled = true;
  }
}

export { CameraControlsService };