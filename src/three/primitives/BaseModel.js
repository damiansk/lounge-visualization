import { BehaviorSubject } from 'rxjs';
import { Math as TMath } from 'three';

const hoverColor = 0x808080;

class BaseModel {
  constructor(mesh) {
    this.mesh = mesh;
    this.isInteractive = true;
    this.isHovered = false;
    this.type = 'base_model';

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

  getHover() {
    return this.updateSubject$.value();
  }

  subscribeForChanges$() {
    return this.updateSubject$.asObservable();
  }
}

export { BaseModel };
