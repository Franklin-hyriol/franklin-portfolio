
export const fragmentShader = /*glsl*/ `

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uOpacity;

    void main() {
        vec3 texture = texture2D(uTexture, vUv).rgb;
        gl_FragColor = vec4(texture, uOpacity);
    }
`;