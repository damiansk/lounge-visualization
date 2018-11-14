import OrbitControls from 'orbit-controls-es6';

let controls = null;

class ControlsService {
    static init(camera, domElement) {
        controls = new OrbitControls(camera, domElement);
        controls.enabled = true;

        return controls;
    }

    static disable() {
        debugger;
        controls.enabled = false;
        // controls.saveState();
    }

    static enable() {
        // controls.reset();
        controls.enabled = true;
    }
}

export { ControlsService };