class BarChair {
  isInteractive = true;

  constructor(mesh) {
    this.mesh = mesh;
    mesh.scale.set(0.25, 0.25, 0.25);
  }
}

export { BarChair };
