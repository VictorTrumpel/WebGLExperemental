export const vertexShaderSource = /*glsl*/ `#version 300 es
  in vec4 a_position;
  in vec2 a_texcoord;

  uniform mat4 u_matrix;

  out vec2 v_texcoord;

  void main() {
    gl_Position = a_position;
    v_texcoord = a_texcoord;
  }
`;
