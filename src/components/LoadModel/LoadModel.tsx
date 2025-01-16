import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Group } from 'three';

interface LoadModelProps {
    path: string; // Chemin du modèle GLTF
    [key: string]: unknown; // Autres propriétés passées au composant
}

export default function LoadModel({ path, ...props }: LoadModelProps) {
    const group = useRef<Group>(null);

    const { scene, animations } = useGLTF(path);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actions && actions['Armature|mixamo.com|Layer0']) {
            actions['Armature|mixamo.com|Layer0'].play();
        }
    }, [actions]);

    return (
        <group {...props} ref={group}>
            <primitive object={scene} />
        </group>
    );
}

// Nécessaire pour les types dans TypeScript
useGLTF.preload = (path: string) => useGLTF.preload(path);
