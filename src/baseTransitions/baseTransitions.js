import { fragmentShader } from "./fragmentShader.glsl";
import { vertexShader } from "./vertexShader.glsl";
import { createGLContext } from "../core/createGLContext";
import { createShaderProgram } from "../core/createShaderProgram";
import { createGPUBuffer } from "../core/createGPUBuffer";

const gl = createGLContext();
const program = createShaderProgram(gl, vertexShader, fragmentShader);

const F_SHAPE = new Float32Array([
  // вертикальный столб
  0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150,

  // верхняя перекладина
  30, 0, 100, 0, 30, 30, 30, 30, 100, 0, 100, 30,

  // перекладина посередине
  30, 60, 67, 60, 30, 90, 30, 90, 67, 60, 67, 90,
]);

createGPUBuffer(gl, F_SHAPE);

const positionLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionLocation);
const size = 2; // 2 components per iteration
const type = gl.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0; // start at the beginning of the buffer
gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

// Setup a ui.
webglLessonsUI.setupSlider("#x", {
  slide: updatePosition(0),
  max: gl.canvas.width,
});
webglLessonsUI.setupSlider("#y", {
  slide: updatePosition(1),
  max: gl.canvas.height,
});

$("#rotation").gmanUnitCircle({
  width: 200,
  height: 200,
  value: 0,
  slide: function (e, u) {
    rotation[0] = u.x;
    rotation[1] = u.y;
    updateScene();
  },
});

webglLessonsUI.setupSlider("#angle", { slide: updateAngle, max: 360 });

function updatePosition(index) {
  return function (_, ui) {
    translation[index] = ui.value;
    updateScene();
  };
}

function updateAngle(event, ui) {
  const angleInDegrees = 360 - ui.value;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  rotation[0] = Math.sin(angleInRadians);
  rotation[1] = Math.cos(angleInRadians);
  updateScene();
}

function updateScale(index) {
  return function (event, ui) {
    scale[index] = ui.value;
    updateScene();
  };
}

const translation = [0, 0];
const rotation = [0, 1];
const color = [Math.random(), Math.random(), Math.random(), 1];
const scale = [1, 1];

const translationLocation = gl.getUniformLocation(program, "u_translation");
const colorLocation = gl.getUniformLocation(program, "u_color");
const rotationLocation = gl.getUniformLocation(program, "u_rotation");
const scaleLocation = gl.getUniformLocation(program, "u_scale");
webglLessonsUI.setupSlider("#scaleX", {
  value: scale[0],
  slide: updateScale(0),
  min: -5,
  max: 5,
  step: 0.01,
  precision: 2,
});
webglLessonsUI.setupSlider("#scaleY", {
  value: scale[1],
  slide: updateScale(1),
  min: -5,
  max: 5,
  step: 0.01,
  precision: 2,
});

updateScene();

function updateScene() {
  // gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2fv(translationLocation, translation);
  gl.uniform4fv(colorLocation, color);
  gl.uniform2fv(rotationLocation, rotation);
  gl.uniform2fv(scaleLocation, scale);

  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 18; // 6 triangles in the 'F', 3 points per triangle
  gl.drawArrays(primitiveType, offset, count);
}
