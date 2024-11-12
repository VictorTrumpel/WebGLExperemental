export const vertexShaderSrc = /*glsl*/ `#version 300 es
  in vec3 aPosition;
  in float aPointSize;
  in vec4 aColor;

  out vec4 vColor;

  void main() {
    vColor = aColor;
    gl_PointSize = aPointSize;
    gl_Position = vec4(aPosition, 1.0);
  }
`;
