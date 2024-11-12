export const vertexShader = /*glsl*/ `#version 300 es
  in vec2 a_position;

  uniform vec2 u_resolution;
  uniform mat3 u_matrix;

  vec2 convertToCanvasPosition(vec2 position, vec2 u_resolution) {
    vec2 zeroToOne = position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    return clipSpace * vec2(1, -1);
  }

  vec2 applyMatrixToPosition(vec2 position, mat3 matrix) {
    vec3 newPosition = matrix * vec3(a_position, 1);
    
    return newPosition.xy;
  }

  void main() {
    vec2 position = applyMatrixToPosition(a_position, u_matrix);

    vec2 canvasPosition = convertToCanvasPosition(position, u_resolution);

    gl_Position = vec4(canvasPosition, 0, 1);
  }
`;
