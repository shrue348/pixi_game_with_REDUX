precision highp float;

varying vec2 vTextureCoord;

uniform vec2 mouse;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform float time;


void main() {
  vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;

  gl_FragColor = vec4( abs(sin(time)), (mouse.xy - outputFrame.xy) / outputFrame.zw, cos(time)) * 0.5; // blend with underlying image, alpha=0.5

  if (length(mouse - screenPos) < 25.0) {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * 0.7; //yellow circle, alpha=0.7
  }
}

