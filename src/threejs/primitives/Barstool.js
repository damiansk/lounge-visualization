import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class Barstool {
  constructor(scene, config) {
    
    const { position } = config;
    LoaderService.loadOBJ('assets/Bar_chair_2.obj', (mesh) => {
      this._mesh = mesh;

      this._mesh.scale.set(0.25, 0.25, 0.25)

      // Position
      const boundingBox = new THREE.Box3().setFromObject(this._mesh);
      this._mesh.position.y = Math.abs(boundingBox.min.y);
      this._mesh.position.x = position.x;
      this._mesh.position.z = position.z;

      mesh.traverse(child => {
        if (child instanceof THREE.Mesh) {
          // TODO Should replace by Box?
          const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });

          child.material = basicMaterial;
          child.userData = { instance: this };
          child.geometry.computeBoundingBox();
        }
      });
      scene.add(mesh);
    });
  }
}

export { Barstool }