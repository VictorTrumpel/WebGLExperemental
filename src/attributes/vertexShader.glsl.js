export const vertexShader = /*glsl*/ `#version 300 es
  in float aPointSize;
  in vec2 aPointPosition;
  in vec3 aColor;

  out vec3 vColor;

  void main() {
    vColor = aColor;

    gl_PointSize = aPointSize;
    gl_Position = vec4(aPointPosition, 0.0, 1.0);
  }
`;
