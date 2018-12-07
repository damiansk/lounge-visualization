import { LoaderService } from '../services/ObjectLoaderService';

class Floor {
    constructor(scene) {
        LoaderService.loadOBJ('floor')
            .then(mesh => {
                mesh.scale.set(3.5, 3.5, 3.5);
                this.mesh = mesh;
                scene.add(mesh);
            });
    }
}

export { Floor };