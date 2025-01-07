import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO, useTexture } from "@react-three/drei";
import { Material, Mesh, Scene, Texture, Vector2 } from "three";
import useMouse from "../../hooks/useMouse";
import useDimension from "../../hooks/useDimension";
import { useBackground } from "../../hooks/useBackground";
import { vertexShader } from "../../shaders/vertex";
import { fragmentShader } from "../../shaders/fragmentRipple";


function Wave() {
    const texture = useTexture("/wave.png");
    const meshRefs = useRef<(Mesh | null)[]>([]);
    const [meshes, setMeshes] = useState<JSX.Element[]>([]);
    const mouse = useMouse();
    const device = useDimension();
    const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
    const [currentWave, setCurrentWave] = useState(0);
    const { camera } = useThree();

    const scene = new Scene();
    const max = 50;

    const uniforms = useRef({
        uDisplacement: { value: null as Texture | null },
        uTexture: { value: null as Texture | null },
        winResolution: {
            value: new Vector2(0, 0),
        },
    });

    const fboBase = useFBO(device.width, device.height);
    const fboTexture = useFBO(device.width, device.height);

    const { scene: imageScene, camera: imageCamera, uniforms: imageUniforms } = useBackground(0);

    useEffect(() => {
        const generatedMeshes = Array.from({ length: max }).map((_, i) => (
            <mesh
                key={i}
                position={[0, 0, 0]}
                ref={(el) => (meshRefs.current[i] = el)}
                rotation={[0, 0, Math.random()]}
                visible={false}
            >
                <planeGeometry args={[60, 60, 1, 1]} />
                <meshBasicMaterial transparent={true} map={texture} />
            </mesh>
        ));
        setMeshes(generatedMeshes);
    }, [texture]);

    function setNewWave(x: number, y: number, currentWave: number): void {
        const mesh = meshRefs.current[currentWave];
        if (mesh) {
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.visible = true;

            // Vérification du type du matériau
            if (mesh.material instanceof Material) {
                mesh.material.opacity = 1;
            }

            mesh.scale.x = 1.75;
            mesh.scale.y = 1.75;
        }
    }

    function trackMousePos(x: number, y: number): void {
        if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
            setCurrentWave((currentWave + 1) % max);
            setNewWave(x, y, currentWave);
        }
        setPrevMouse({ x: x, y: y });
    }

    useFrame(({ gl, scene: finalScene, clock }) => {
        const x = mouse.x - device.width / 2;
        const y = -mouse.y + device.height / 2;
        trackMousePos(x, y);
        meshRefs.current.forEach((mesh) => {
            if (mesh && mesh.visible) {
                mesh.rotation.z += 0.025;
                if (mesh.material instanceof Material) {
                    mesh.material.opacity *= 0.95;
                }
                mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
                mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
            }
        });

        if (imageUniforms) {
            imageUniforms.u_time.value = clock.getElapsedTime();
        }

        if (device.width > 0 && device.height > 0) {
            // uniforms.current.uTexture.value = imageTexture;

            // Render to base texture with meshes
            gl.setRenderTarget(fboBase);
            gl.clear();
            meshRefs.current.forEach((mesh) => {
                if (mesh && mesh.visible) {
                    scene.add(mesh);
                }
            });
            gl.render(scene, camera);
            meshRefs.current.forEach((mesh) => {
                if (mesh && mesh.visible) {
                    scene.remove(mesh);
                }
            });
            uniforms.current.uTexture.value = fboTexture.texture;

            gl.setRenderTarget(fboTexture);
            gl.render(imageScene, imageCamera);
            uniforms.current.uDisplacement.value = fboBase.texture;

            gl.setRenderTarget(null);
            gl.render(finalScene, camera);

            uniforms.current.winResolution.value = new Vector2(device.width, device.height).multiplyScalar(
                device.pixelRatio
            );
        }
    }, 1);


    return (
        <group>
            {meshes}
            <mesh>
                <planeGeometry args={[device.width, device.height, 1, 1]} />
                <shaderMaterial
                    // args={[device.width, device.height, 1]}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent={true}
                    uniforms={uniforms.current}
                ></shaderMaterial>
            </mesh>
        </group>
    );
}

export default Wave;
