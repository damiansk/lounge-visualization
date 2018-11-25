import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';
import { ControlsService } from '../services/CameraControlsService';
import { InteractionService } from '../services/InteractionService';

// window.addEventListener('mousedown', InteractionService.onMouseDown);
// window.addEventListener('mouseup', InteractionService.onMouseUp);
// window.addEventListener('mousemove', InteractionService.onMouseMove);

class Chair {
    constructor(scene, config) {
        // TODO create service for fetching models
        const { position } = config;

        LoaderService.loadObject('chair')
            .then(mesh => {
                // Position
                // const boundingBox = new THREE.Box3().setFromObject(mesh);
                // mesh.position.y = Math.abs(boundingBox.min.y);
                // mesh.position.x = position.x;
                // mesh.position.z = position.z;
    
                // scene.add(mesh);
                // // Color
                mesh.traverse(child => {
                    if(child instanceof THREE.Mesh) {
                        this._mesh = child;
                        // TODO Should replace by Box?
                        // const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });
                        
                        // child.material = basicMaterial;
                        child.userData = { instance: this };
                        child.geometry.computeBoundingBox(); 
                        
                        InteractionService.register(child);
                        
                        var axesHelper = new THREE.AxesHelper( 50 );
                        child.add( axesHelper );
                        child.scale.set(0.01, 0.01, 0.01);
                        child.rotateX(-90 * THREE.Math.DEG2RAD);

                        const boundingBox = new THREE.Box3().setFromObject(this._mesh);
                        this._mesh.position.y = Math.abs(boundingBox.min.y);
                        // this._mesh.position.y = 10;
                        this._mesh.position.x = position.x;
                        this._mesh.position.z = position.z;
                        debugger;
                        
                        // child.updateMatrixWorld();
                        // child.updateMatrixWorld();
                        scene.add(child);
                        // child.updateMatrix(mesh.matrixWorld)
                    }
                });

                

            });

        this.onMouseEnter = this.onMouseEnter.bind(this);
    }

    update(time) { }

    setColor(hex) {
        this._mesh.traverse(child => {
            if(child instanceof THREE.Mesh) {
                child.material.color.setHex(hex);
            }
        });
    }

    onMouseEnter() {
        this._isHovered = true;
        this.setColor(0xd3d3d3);
        console.log(this._mesh);
    }

    onMouseLeave() {
        this._isHovered = false;
        this.setColor(0x000000);
    }

    onMouseDown() {
        this._isSelected = this._isHovered;
        if(this._isSelected) {
            console.log('selected');
            ControlsService.disable();
        }
    }

    onMouseUp() {
        if(this._isSelected) {
            console.log('unselected');
            ControlsService.enable();
        }
        this._isSelected = false;
    }

    onMouseMove() {
        if(this._isSelected) {
            console.log('moved');
        }
        // TODO calculate mouse position to new object position
    }
}

export { Chair };