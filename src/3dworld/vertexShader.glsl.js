export const vertexShader = /*glsl*/ `#version 300 es
  attribute vec4 a_position;
  
  uniform mat4 u_matrix;
  
  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;
  }
`;
