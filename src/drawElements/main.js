import { fragmentShaderSrc } from "./fragmentShader.glsl";
import { vertexShaderSrc } from "./vertexShader.glsl";
import { createGLContext } from "../createGLContext";
import { createShaderProgram } from "../createShaderProgram";
import eyesJson from "./eyes_pose.json";

const pointsLength = eyesJson.length;

const gl = createGLContext();

const program = createShaderProgram(gl, vertexShaderSrc, fragmentShaderSrc);

gl.useProgram(program);

const buffer = eyesJson.map((p) => {
  return [...p.slice(0, 3), 0.0, 0.0, 0.0, 2];
});

const vertData = new Float32Array([0.5, 0.5, 0.5, 0.0, 0.0, 0.0, 20]);

const arrayVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, arrayVertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertData, gl.STATIC_DRAW);

const aPositionLoc = gl.getAttribLocation(program, "aPosition");
const aColorLoc = gl.getAttribLocation(program, "aColor");
const aPointSizeLoc = gl.getAttribLocation(program, "aPointSize");

gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 4 * 7, 0);
gl.vertexAttribPointer(aColorLoc, 3, gl.FLOAT, false, 4 * 7, 3 * 4);
gl.vertexAttribPointer(aPointSizeLoc, 1, gl.FLOAT, false, 4 * 7, 6 * 4);

gl.enableVertexAttribArray(aPositionLoc);
gl.enableVertexAttribArray(aColorLoc);
gl.enableVertexAttribArray(aPointSizeLoc);

gl.drawArrays(gl.POINTS, 0, 1);
