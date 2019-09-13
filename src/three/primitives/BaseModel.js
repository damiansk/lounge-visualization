import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Math as TMath } from 'three';

const hoverColor = 0x808080;

// TODO Use it instead of strings
const attributes = {
  isHovered: Symbol('isHovered'),
  isInteractive: Symbol('isInteractive'),
};


class BaseModel {
  constructor(mesh) {
    this.isInteractive = true;
    this.isHovered = false;

    this.updateSubject$ = new BehaviorSubject({ isHovered: this.isHovered });

    this.isEqual = this.isEqual.bind(this);
    this.setHover = this.setHover.bind(this);
    this.subscribeForChanges$ = this.subscribeForChanges$.bind(this);


    this.mesh = mesh;
    this.type = 'base_model';
    this.attributes = {
      isInteractive: false,
      isHovered: false,
    };

    this.getAttribute$ = this.getAttribute$.bind(this);
    this.setAttribute$ = this.setAttribute$.bind(this);

    this.reactiveAttributes$ = new BehaviorSubject(this.attributes);
    this.handleAttributesChanges();
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

  handleAttributesChanges() {
    this.reactiveAttributeSubscriptions = new Subscription();

    // Subscriptions for side effects
    this.reactiveAttributeSubscriptions.add(
      this.getAttribute$('isHovered').subscribe(this.setHover)
    );
  }

  updateSubject() {
    this.reactiveAttributes$.next(this.attributes);
  }

  getAttribute$(key) {
    return this.reactiveAttributes$.pipe(
      map(reactiveAttributes => reactiveAttributes[key]),
      distinctUntilChanged()
    );
  }

  setAttribute$(key, value) {
    this.attribues[key] = value;
    this.updateSubject();
  }

  subscribeForChanges$() {
    return this.reactiveAttributes$.asObservable();
  }

  destroy() {
    this.reactiveAttributeSubscriptions.unsubscribe();
  }
}

export { BaseModel };
