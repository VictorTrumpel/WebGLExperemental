export const TextureCoords = new Float32Array([
  ...point(0.5, 0.5),
  ...point(1, 0.5),
  ...point(1, 1),

  ...point(0.5, 0.5),
  ...point(0.5, 1),
  ...point(1, 1),

  ...point(0.5, 0.5),
  ...point(0, 0.5),
  ...point(0.5, 1),

  ...point(0, 0.5),
  ...point(0, 1.0),
  ...point(0.5, 1),

  ...point(0.5, 0.5),
  ...point(0, 0.5),
  ...point(0.5, 0),

  ...point(0, 0.5),
  ...point(0, 0),
  ...point(0.5, 0),

  ...point(0.5, 0.5),
  ...point(1, 0.5),
  ...point(0.5, 0),

  ...point(1, 0.5),
  ...point(1, 0),
  ...point(0.5, 0),
]);

function point(x, y) {
  return [x, y];
}
