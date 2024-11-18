export const SquareGeometry = new Float32Array([
  ...point(0, 0, 0),
  ...point(0.5, 0, 0),
  ...point(0.5, 0.5, 0),

  ...point(0, 0, 0),
  ...point(0, 0.5, 0),
  ...point(0.5, 0.5, 0),

  ...point(0, 0, 0),
  ...point(-0.5, 0, 0),
  ...point(0, 0.5, 0),

  ...point(-0.5, 0, 0),
  ...point(-0.5, 0.5, 0),
  ...point(0, 0.5, 0),

  ...point(0, 0, 0),
  ...point(-0.5, 0, 0),
  ...point(0, -0.5, 0),

  ...point(-0.5, 0, 0),
  ...point(-0.5, -0.5, 0),
  ...point(0, -0.5, 0),

  ...point(0, 0, 0),
  ...point(0.5, 0, 0),
  ...point(0, -0.5, 0),

  ...point(0.5, 0, 0),
  ...point(0.5, -0.5, 0),
  ...point(0, -0.5, 0),
]);

function point(x, y, z) {
  return [x, y, z];
}
