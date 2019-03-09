import { BehaviorSubject } from 'rxjs';
import { Math as TMath } from 'three';

const hoverColor = 0x808080;

class BaseModel {
  constructor(mesh) {
    this.mesh = mesh;
    this.isInteractive = true;
    this.isHovered = false;

    this.updateSubject$ = new BehaviorSubject({ isHovered: this.isHovered });

    this.isEqual = this.isEqual.bind(this);
    this.setHover = this.setHover.bind(this);
    this.subscribeForChanges$ = this.subscribeForChanges$.bind(this);
  }

  getConfig() {
    return {
      position: {
        x: this.mesh.position.x,
        z: this.mesh.position.z,
      },
      rotation: this.mesh.rotation._y * TMath.RAD2DEG,
    };
  }

  getId() {
    return this.mesh.id;
  }

  getName() {
    return this.mesh.name;
  }

  getType() {
    return this.mesh.type;
  }

  isEqual(model) {
    return model.mesh === this.mesh;
  }

  setHover(isHovered) {
    this.isHovered = isHovered;

    if (isHovered) {
      this.color = this.mesh.material.color.clone();
      this.mesh.material.color.set(hoverColor);
    } else {
      this.mesh.material.color.set(this.color);
    }

    this.updateSubject$.next({ isHovered });
  }

  subscribeForChanges$() {
    return this.updateSubject$.asObservable();
  }
}

export { BaseModel };
