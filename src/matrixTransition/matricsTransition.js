import { fragmenShader } from "./fragmentShader.glsl";
import { vertexShader } from "./vertexShader.glsl";
import { createGLContext } from "../core/createGLContext";
import { createShaderProgram } from "../core/createShaderProgram";
import { createGPUBuffer } from "../core/createGPUBuffer";
import { Matrix3 } from "../core/Matrix3";
import { BaseTransitionUI } from "../core/BaseTransitionUI";

const gl = createGLContext();
const program = createShaderProgram(gl, vertexShader, fragmenShader);

createGPUBuffer(
  gl,
  new Float32Array([
    // left column
    0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150,
    // top rung
    30, 0, 100, 0, 30, 30, 30, 30, 100, 0, 100, 30,
    // middle rung
    30, 60, 67, 60, 30, 90, 30, 90, 67, 60, 67, 90,
  ])
);

const aPositionLoc = gl.getAttribLocation(program, "a_position");

const matrixLocation = gl.getUniformLocation(program, "u_matrix");

gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(aPositionLoc);

const baseUi = new BaseTransitionUI(gl.canvas.width, gl.canvas.height);

baseUi.onUiChange((translation, _, angle, scale) => {
  updateScene(translation, angle, scale);
});

updateScene([0, 0], 0, [1, 1]);

function updateScene(translation, angle, scale) {
  const angleInRadians = (angle * Math.PI) / 180;

  const translationMatrix = Matrix3.translation(...translation);
  const rotationMatrix = Matrix3.rotation(angleInRadians);
  const scaleMatrix = Matrix3.scaling(...scale);

  let matrix = Matrix3.multiply(translationMatrix, rotationMatrix);
  matrix = Matrix3.multiply(matrix, scaleMatrix);

  console.log("matrix :>> ", matrix);

  gl.uniformMatrix3fv(matrixLocation, false, matrix);

  gl.drawArrays(gl.TRIANGLES, 0, 18);
}
