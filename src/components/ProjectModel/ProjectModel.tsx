/* eslint-disable react-hooks/rules-of-hooks */
import { animate, useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import useDimension from "../../hooks/useDimension";
import { useFrame, useThree } from "@react-three/fiber";
import useMouseMotion from "../../hooks/useMouseMotion";
import { lerp } from "../../helpers/lerp";
import { vertexShader } from "./vertex";
import { fragmentShader } from "./fragment";
import { useAspect, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { ShaderMaterial } from "three";
import { projectData } from "./projectData";

projectData.map((project) => useTexture.preload(project.image));

type ProjectSceneProps = {
    activeProject: number | null;
}

function ProjectModel({ activeProject }: ProjectSceneProps) {
    const material = useRef<ShaderMaterial>(null);
    const mouseMotion = useMouseMotion();
    const dimension = useDimension();
    const { viewport } = useThree();
    const opacity = useMotionValue(0)


    const textures = projectData.map((project) => useTexture(project.image));
    const scale = useAspect(textures[0].image.width, textures[0].image.height, 0.15);

    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const uniforms = useRef({
        uTexture: { value: textures[0] },
        uDelta: { value: { x: 1, y: 1 } },
        uOpacity: { value: 1 }
    });

    useEffect(() => {
        if (activeProject !== null) {
            animate(opacity, 1, {
                duration: 0.5, onUpdate: (progress) => {
                    uniforms.current.uOpacity.value = progress;
                }
            });

            uniforms.current.uTexture.value = textures[activeProject];

        } else {
            animate(opacity, 0, {
                duration: 0.5, onUpdate: (progress) => {
                    uniforms.current.uOpacity.value = progress;
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeProject]);


    useFrame(() => {
        const { x, y } = mouseMotion;
        smoothMouse.x.set(lerp(smoothMouse.x.get(), x.get(), 0.1));
        smoothMouse.y.set(lerp(smoothMouse.y.get(), y.get(), 0.1));


        if (material.current) {
            material.current.uniforms.uDelta.value = {
                x: x.get() - smoothMouse.x.get(),
                y: -(y.get() - smoothMouse.y.get())
            };
        }
    });


    const x = useTransform(smoothMouse.x, [0, dimension.width], [-viewport.width / 2, viewport.width / 2]);
    const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -viewport.height / 2]);



    return (
        <motion.mesh scale={scale} position-x={x} position-y={y}>
            <planeGeometry args={[1, 1, 15, 15]} />
            {/* <meshBasicMaterial wireframe color="white" /> */}
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                ref={material}
                transparent={true}
            />

        </motion.mesh>
    )
}

export default ProjectModel;