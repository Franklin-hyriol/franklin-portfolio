export const vertexShader = /*glsl*/ `
    varying vec2 vUv;
    float PI = 3.141592653589793238;
    uniform vec2 uDelta;

    void main() {
        vUv = uv;
        vec3 transformed = vec3(position);

        transformed.x += sin(uv.y * PI) * uDelta.x * 0.001;
        transformed.y += sin(uv.x * PI) * uDelta.y * 0.001;


        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
`;