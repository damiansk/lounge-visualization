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
    this.attributes = {
      [attributes.isInteractive]: false,
      [attributes.isHovered]: false,
    };

    this.reactiveAttributes$ = new BehaviorSubject(this.attributes);
    this.handleAttributesChanges();
  }

  // TODO make methods private
  handleAttributesChanges() {
    this.reactiveAttributeSubscriptions = new Subscription();

    // Subscriptions for side effects
    this.subscriptions.add(
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
