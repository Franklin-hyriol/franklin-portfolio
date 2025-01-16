import "./Avatar.scss";
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { OrbitControls } from "@react-three/drei";
import LoadModel from "../LoadModel/LoadModel";

type AvatarProps = {
    setIsCanvasHovered: React.Dispatch<React.SetStateAction<boolean>>;
}


function Avatar({ setIsCanvasHovered }: AvatarProps) {
    return (
        <div className="canvas-avatar-wrapper">
            <Canvas className="canvas-avatar" camera={{ position: [0, 0, 0] }} onPointerOver={() => setIsCanvasHovered(true)} onPointerOut={() => setIsCanvasHovered(false)}>
                {/* Lumières */}
                <Environment preset="city" />
                <ambientLight intensity={1} />
                <directionalLight position={[0, 10, 5]} intensity={1} />

                {/* Chargement du modèle */}

                <LoadModel path="/models/franklin-hyriol.glb" position={[0, 0.1, 0]} />

                {/* Contrôles caméra */}
                {/* <Controls /> */}
                <OrbitControls target={[0, 0, 0]} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} minDistance={0.85} maxDistance={2.3} />

            </Canvas>
        </div>
    )
}

export default Avatar;