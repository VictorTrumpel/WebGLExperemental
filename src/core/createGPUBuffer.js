export const createGPUBuffer = (gl, bufferData) => {
  const arrayBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
  return arrayBuffer;
};
