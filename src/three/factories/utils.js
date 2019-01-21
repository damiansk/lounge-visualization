import { Mesh, Box3, Math as TMath } from 'three';

const findRoot = model => {
    let mesh;

    model.traverse(child => {
        if (child instanceof Mesh) {
            mesh = child;
        }
    });

    return mesh;
}

const fixPosition = mesh => {
    const boundingBox = new Box3().setFromObject(mesh)
    const boundingBoxSize = boundingBox.max.sub(boundingBox.min);
    const height = boundingBoxSize.y;
    mesh.position.y = height / 2;
  
    return mesh;
}

const applyConfig = config =>
    mesh => {
        if (config.position) {
        mesh.position.x = config.position.x;
        mesh.position.z = config.position.z;
        }
    
        if (config.rotation) {
        mesh.rotateZ(config.rotation * TMath.DEG2RAD);
        }
    
        return mesh;
    }

export { findRoot, fixPosition, applyConfig };