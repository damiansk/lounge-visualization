import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";

class A {
  constructor(model) {
    this.model = model;
    this.attribues = {
      isInteractive: true,
      isHovered: false,
    };

    this.updateSubject$ = new BehaviorSubject(this.attribues);

    this.updateSubject$.subscribe(newReactiveAttributes =>
        this.reactiveAttribues = newReactiveAttributes);
  }

  attributesSubscribe$() {
    return this.updateSubject$.asObservable();
  }

  setAttribute(name, value) {
    switch(name) {
      case 'isHovered': updateIsHovered(value)
    }
    this.updateSubject$.next({ ...this.attribues, [name]: value });
  }
}


class Base {
  constructor() {
    this.behavSub$ = new BehaviorSubject(this.attribues);
    this.handleAttributesChanges()
    this.subscriptions = new Subscription()
  }

  handleAttributesChanges() {
    this.subscriptions.add(this.getAttribute$('isHovered').subscribe(this.handleIsHoveredChanged))
    this.subscriptions.add(this.getAttribute$('isInteractive').subscribe())
  }

  updateSubject() {
    // zbiera wszystkie atrybuty
    const newAttributes = this.attribues;
    this.behavSub$.next(newAttributes);
  }

  // distinct until change
  getAttribute$(name) {
    return this.behavSub$.pipe(
      map(attributes => attributes[name]),
      // distinctUntilKeyChanged
      distinctUntilChanged()
    )
  }



  // if name === isHovered
  // this.mesh.material.color.set(hoverColor);

  // isInteractive
  setAttribute(name, value) {
    this.attribues[name] = value;
    this.updateSubject();
  }
  
  unsubscribe() {
    this.subscription.unsubscribe();
  }
}