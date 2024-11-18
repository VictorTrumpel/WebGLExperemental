import { createGLContext, createShaderProgram } from "../core";
import { fragmentShaderSource } from "./fragmentShader.glsl";
import { vertexShaderSource } from "./vertexShader.glsl";

import { SquareGeometry } from "./SquareGeometry";
import { TextureCoords } from "./TextureCoords";

const image = new Image();
image.src = "./texture.png";
image.addEventListener("load", function () {
  const gl = createGLContext();
  const program = createShaderProgram(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  );

  gl.useProgram(program);

  /* --- Настройка геометрии --- */
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, SquareGeometry, gl.STATIC_DRAW);

  const aPositionLoc = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPositionLoc);
  /* --- */

  /* *** */

  /* --- Настройка текстуры --- */
  const texcoorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, TextureCoords, gl.STATIC_DRAW);

  const aTexcoordLoc = gl.getAttribLocation(program, "a_texcoord");
  gl.enableVertexAttribArray(aTexcoordLoc);
  gl.vertexAttribPointer(aTexcoordLoc, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // Для уменьшения
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // Для увеличения
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // Для оси X
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // Для оси Y

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  const textureLocation = gl.getUniformLocation(program, "u_texture");
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(textureLocation, 0);
  /* --- */

  gl.drawArrays(gl.TRIANGLES, 0, 24);
});
