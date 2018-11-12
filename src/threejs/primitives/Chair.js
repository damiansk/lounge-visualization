import * as THREE from 'three';
import { RaycasterService } from '../services/RaycasterService';
import { ControlsService } from '../services/ControlsService';

const meshes = [];
class InteractionService {

    static register(mesh) {
        RaycasterService.register(mesh);
        meshes.push(mesh);
    }

    static onMouseDown(evt) {
        console.log('down');
        meshes.forEach(mesh => mesh.userData.instance.onMouseDown(evt));
    }

    static onMouseUp(evt) {
        meshes.forEach(mesh => mesh.userData.instance.onMouseUp(evt));
    }

    static onMouseMove(evt) {
        meshes.forEach(mesh => mesh.userData.instance.onMouseMove(evt));
    }
}

window.addEventListener('mousedown', InteractionService.onMouseDown);
window.addEventListener('mouseup', InteractionService.onMouseUp);
window.addEventListener('mousemove', InteractionService.onMouseMove);

class Chair {
    constructor(scene) {
        // TODO create service for fetching models
        const loader = new THREE.ObjectLoader();

        loader.load('assets/chair.json', mesh => {
            this._mesh = mesh;
            
            const boundingBox = new THREE.Box3().setFromObject(mesh);
            mesh.position.y = Math.abs(boundingBox.min.y);

            mesh.traverse(child => {
                if(child instanceof THREE.Mesh) {
                    // TODO Should replace by Box?
                    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });

                    child.material = basicMaterial;
                    child.userData = { instance: this };
                    child.geometry.computeBoundingBox(); 

                    InteractionService.register(child);
                }
            });

            scene.add(mesh);
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