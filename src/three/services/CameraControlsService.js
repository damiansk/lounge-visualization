import OrbitControls from 'orbit-controls-es6';

let controls = null;

class ControlsService {
  static init(camera, domElement) {
    controls = new OrbitControls(camera, domElement);
    controls.enabled = true;

    return controls;
  }

  static disable() {
    controls.enabled = false;
  }

  static enable() {
    controls.enabled = true;
  }
}

export { ControlsService };
