import { vertexShader } from "./vertexShader.glsl";
import { fragmentShader } from "./fragmentShader.glsl";
import { createGLContext } from "../createGLContext";
import { createShaderProgram } from "../createShaderProgram";
import { createGPUBuffer } from "../createGPUBuffer";

const gl = createGLContext();

const program = createShaderProgram(gl, vertexShader, fragmentShader);

const SQUARE_SIZE = 60;

const positionsOfVertex = new Float32Array([
  0,
  0,
  SQUARE_SIZE,
  0,
  SQUARE_SIZE,
  SQUARE_SIZE,
  0,
  0,
  0,
  SQUARE_SIZE,
  SQUARE_SIZE,
  SQUARE_SIZE,
]);

createGPUBuffer(gl, positionsOfVertex);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

const size = 2; // 2 components per iteration
const type = gl.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0; // start at the beginning of the buffer
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);
gl.enableVertexAttribArray(positionAttributeLocation);

const colorUniformLocation = gl.getUniformLocation(program, "u_color");

for (var ii = 0; ii < 50; ++ii) {
  setRectangle(
    gl,
    randomInt(300),
    randomInt(300),
    randomInt(300),
    randomInt(300)
  );

  gl.uniform4f(
    colorUniformLocation,
    Math.random(),
    Math.random(),
    Math.random(),
    1
  );

  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function randomInt(range) {
  return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
}
