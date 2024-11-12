"use strict";

import { createShaderProgram } from "./createShaderProgram";
import { createGLContext } from "./createGLContext";

const vertexShader = /*glsl*/ `#version 300 es
  in vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0, 1);
    gl_PointSize = 100.0;
  }
`;

const fragmentShader = /*glsl*/ `#version 300 es
  precision mediump float;

  out vec4 fragColor;

  void main() {
    fragColor = vec4(0.5849, 0.76, 0.4662, 1.0);
  }
`;

const gl = createGLContext();

const bufferData = new Float32Array();
const webGLBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, webGLBuffer);
gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

const program = createShaderProgram(gl, vertexShader, fragmentShader);

var positionLoc = gl.getAttribLocation(program, "a_position");

gl.vertexAttrib2f(positionLoc, 0.5, 0.5);

gl.useProgram(program);

gl.drawArrays(gl.POINTS, 0, 10);
