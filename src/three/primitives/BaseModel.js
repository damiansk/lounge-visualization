import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Math as TMath } from 'three';
import { updateMeshOrGroup } from '../utils/model';

const hoverColor = 0x808080;

const type = 'Base model';

class BaseModel {
  constructor(mesh, attributes = {}) {
    this.mesh = mesh;
    this.type = type;

    this.cache = {};
    this.attributes = attributes;
    this.reactiveAttributeSubscriptions = new Subscription();
    this.reactiveAttributes$ = new BehaviorSubject(this.attributes);

    this.subscribeForChanges$ = this.subscribeForChanges$.bind(this);
    this.getAttribute$ = this.getAttribute$.bind(this);
    this.setAttribute$ = this.setAttribute$.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);

    this.isEqual = this.isEqual.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.getId = this.getId.bind(this);
    this.getName = this.getName.bind(this);
    this.getType = this.getType.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  updateSubject() {
    this.reactiveAttributes$.next(this.attributes);
  }

  subscribeForChanges$() {
    return this.reactiveAttributes$.asObservable();
  }

  // TODO will be usefull to have `getter` for static attribute value
  getAttribute$(key) {
    return this.reactiveAttributes$.pipe(
      map(reactiveAttributes => reactiveAttributes[key]),
      distinctUntilChanged()
    );
  }

  setAttribute$(key, value) {
    this.attributes[key] = value;
    this.updateSubject();
  }

  handleAttributesChange(handlers) {
    Object.entries(handlers).forEach(([attribute, handler]) =>
      this.reactiveAttributeSubscriptions.add(
        this.getAttribute$(attribute).subscribe(handler)
      )
    );
  }

  isEqual(model) {
    return model.mesh === this.mesh;
  }

  handleHover(isHovered) {
    updateMeshOrGroup(this.mesh, mesh => {
      if (isHovered) {
        // TODO Handle cache better
        mesh.userData.color = mesh.material.color.clone();
        mesh.material.color.set(hoverColor);
      } else {
        mesh.material.color.set(mesh.userData.color);
      }
    });
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
    return this.type;
  }

  destroy() {
    this.reactiveAttributeSubscriptions.unsubscribe();
  }
}

export { BaseModel };
