export const vertexShader = /*glsl*/ `#version 300 es
  in vec2 a_position;

  uniform vec2 u_resolution;
  uniform mat3 u_matrix;

  vec2 applyMatrixToPosition(vec2 position, mat3 matrix) {
    vec3 newPosition = matrix * vec3(a_position, 1);
    
    return newPosition.xy;
  }

  void main() {
    vec2 position = applyMatrixToPosition(a_position, u_matrix);

    gl_Position = vec4(position, 0, 1);
  }
`;
