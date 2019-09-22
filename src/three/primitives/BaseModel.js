import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Math as TMath } from 'three';

const hoverColor = 0x808080;

// TODO Use it instead of strings
// const attributes = {
//   isHovered: Symbol('isHovered'),
//   isInteractive: Symbol('isInteractive'),
// };

class BaseModel {
  constructor(mesh, attributes) {
    this.mesh = mesh;
    this.type = 'base_model';

    this.attributes = {
      // isInteractive: true,
      // isHovered: false,
      ...attributes,
    };
    this.reactiveAttributes$ = new BehaviorSubject(this.attributes);

    this.isEqual = this.isEqual.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.subscribeForChanges$ = this.subscribeForChanges$.bind(this);
    this.getAttribute$ = this.getAttribute$.bind(this);
    this.setAttribute$ = this.setAttribute$.bind(this);

    this.handleAttributesChanges();
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

  isEqual(model) {
    return model.mesh === this.mesh;
  }

  updateSubject() {
    this.reactiveAttributes$.next(this.attributes);
  }

  handleAttributesChanges() {
    this.reactiveAttributeSubscriptions = new Subscription();

    this.reactiveAttributeSubscriptions.add(
      this.getAttribute$('isHovered').subscribe(this.handleHover)
    );
  }

  subscribeForChanges$() {
    return this.reactiveAttributes$.asObservable();
  }

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

  handleHover(isHovered) {
    if (isHovered) {
      this.color = this.mesh.material.color.clone();
      this.mesh.material.color.set(hoverColor);
    } else {
      this.mesh.material.color.set(this.color);
    }
  }

  destroy() {
    this.reactiveAttributeSubscriptions.unsubscribe();
  }
}

export { BaseModel };
