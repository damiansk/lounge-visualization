import { Math as TMath } from 'three';
import { Subscription, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

const attributes = {
  isHovered: Symbol('isHovered'),
  isInteractive: Symbol('isInteractive'),
};

class BaseModel {
  constructor(mesh) {
    this.mesh = mesh;
    this.type = 'base_model';
    this.attributes = {};

    this.reactiveAttributes$ = new BehaviorSubject(this.attributes);
    this.reactiveAttributeSubscriptions = new Subscription();
  }

  // TODO make methods private
  handleAttributesChanges() {
    // Subscriptions for side effects
    this.reactiveAttributeSubscriptions.add(
      this.getAttribute$('isHovered').subscribe(this.handleIsHoveredChanged)
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

  setAttribute(key, value) {
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

class ReactiveIsHovered {

}

export { BaseModel };

