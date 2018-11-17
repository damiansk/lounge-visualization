import * as THREE from 'three';
import OBJLoader  from 'three-obj-loader';
OBJLoader(THREE);

class Barstool {
  constructor(scene, config) {
    this.THREE = THREE;
    const loader = new this.THREE.OBJLoader();
    const { position } = config;
    loader.load('assets/Bar_chair_2.obj', (mesh) => {
      this._mesh = mesh;

            // Position
            const boundingBox = new THREE.Box3().setFromObject(this._mesh);
            this._mesh.position.y = Math.abs(boundingBox.min.y);
            this._mesh.position.x = position.x;
            this._mesh.position.z = position.z;

      mesh.traverse(child => {
        if(child instanceof THREE.Mesh) {
            // TODO Should replace by Box?
            const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });

            child.material = basicMaterial;
            child.userData = { instance: this };
            child.geometry.computeBoundingBox(); 
        }
      });
      scene.add(mesh);
    }, 
    (xhr) => {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    (error) => {
      console.log( 'An error happened' );
    });
  }
}

export { Barstool }