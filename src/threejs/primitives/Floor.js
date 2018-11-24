import { LoaderService } from '../services/ObjectLoaderService';

class Floor {
    constructor(scene) {
        LoaderService.loadOBJ('floor')
            .then(mesh => {
                mesh.scale.set(3, 3, 3);
                this._mesh = mesh;
                scene.add(mesh);
            });

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    update(time) {}

    onMouseEnter() {
        this._mesh.material.color.setHex(0xd3d3d3);
    }
    
    onMouseLeave() {
        this._mesh.material.color.setHex(0xffff00);
    }
}

export { Floor };