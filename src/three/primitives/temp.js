import { Subscription, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

class Base {
  constructor(mesh, attributes) {
    this.mesh = mesh;
    this.type = 'base_model';
    this.attributes = attributes;

    this.reactiveAttributes$ = new BehaviorSubject(this.attributes);
    this.reactiveAttributeSubscriptions = new Subscription();

    this.handleAttributesChanges(Object.keys(attributes));
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

  updateSubject() {
    this.reactiveAttributes$.next(this.attributes);
  }

  subscribeForChanges$() {
    return this.reactiveAttributes$.asObservable();
  }

  handleAttributesChanges(attributes) {
    attributes.forEach(attribute => {
      this.reactiveAttributeSubscriptions.add(
        this.getAttribute$(attribute).subscribe(/* TODO */)
      );
    });
  }

  destroy() {
    this.reactiveAttributeSubscriptions.unsubscribe();
  }
}

export { BaseModel };
