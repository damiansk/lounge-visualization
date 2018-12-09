import { Mesh, Box3, Math as THREEMath } from 'three';
import { LoaderService } from '../services/ObjectLoaderService';
import {
    Chair,
    Microwave,
    Table,
    Floor,
    BarChair,
    PoolTable,
} from '../primitives';

class ModelsFactory {
    constructor(loadingManager) {
        this.loadingManager = loadingManager;
    }

    createModels(modelsConfig, scene) {
        modelsConfig.forEach(model => {
            const { configs } = model;

            switch(model.type) {
                case 'chair':
                    configs.forEach(config =>
                        this.createChair(config, scene));
                    break;
                case 'microwave':
                    configs.forEach(config =>
                        this.createMicrowave(config, scene));
                    break;
                case 'table':
                    configs.forEach(config =>
                        this.createTable(config, scene));
                    break;
                case 'bar_chair':
                    configs.forEach(config =>
                        this.createBarChair(config, scene));
                    break;
                case 'pool_table':
                    configs.forEach(config =>
                        this.createPoolTable(config, scene));
                    break;
                case 'floor':
                    this.createFloor(scene);
                    break;
                default:
                    break;
            }
        });
    }

    createChair(config, scene) {
        LoaderService.loadObject('chair')
            .then(model => {
                const mesh = findMainMesh(model);
                const chair = new Chair(mesh);
                setConfig(mesh, config);
                scene.add(mesh);
            });
    }

    createMicrowave(config, scene) {
        LoaderService.loadOBJ('microwave')
            .then(model => {
                const mesh = findMainMesh(model);
                const microwave = new Microwave(mesh);
                setConfig(mesh, config);
                scene.add(mesh);
            });
    }

    createTable(config, scene) {
        LoaderService.loadOBJ('table')
            .then(model => {
                const table = new Table(model);
                setConfig(model, config);
                scene.add(model);
            });
    }

    createBarChair(config, scene) {
        LoaderService.loadOBJ('bar_chair')
            .then(model => {
                const mesh = findMainMesh(model);
                const barChair = new BarChair(mesh);
                setConfig(mesh, config);
                scene.add(mesh);
            });
    }

    createPoolTable(config, scene) {
        LoaderService.loadOBJ('pool_table')
            .then(model => {
                const mesh = findMainMesh(model);
                const poolTable = new PoolTable(mesh);
                setConfig(mesh, config);
                scene.add(mesh);
            });
    }

    createFloor(scene) {
        LoaderService.loadOBJ('floor')
            .then(model => {
                setConfig(model);
                const floor = new Floor(model);
                scene.add(model);
            });
    }
}

function findMainMesh(model) {
    let mesh;

    model.traverse(child => {
        if(child instanceof Mesh) {
            mesh = child;
        }
    });

    return mesh;
}

function setConfig(mesh, config = {}) {
    const boundingBox = new Box3().setFromObject(mesh);
    mesh.position.y = Math.abs(boundingBox.min.y);

    if(config.position) {
        mesh.position.x = config.position.x;
        mesh.position.z = config.position.z;
    }

    if(config.rotation) {
        mesh.rotateZ(config.rotation * THREEMath.DEG2RAD);
    }
}

export { ModelsFactory };