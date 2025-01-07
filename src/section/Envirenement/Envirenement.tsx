import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import useDimension from "../../hooks/useDimension";
import Wave from "../../components/Wave/Wave";
import "./Envirenement.scss";

function Envirenement() {
    const device = useDimension();

    const frustumSize = device.height;
    const aspect = device.width / device.height;

    return (
        <div className="waveContainer">
            <Canvas
                camera={{
                    left: (-frustumSize * aspect) / 2,
                    right: (frustumSize * aspect) / 2,
                    top: frustumSize / 2,
                    bottom: -frustumSize / 2,
                    near: -10000,
                    far: 10000,
                    position: [0, 0, 2],
                }}
                orthographic
                linear={true}
                gl={{ antialias: false }}
                dpr={window.devicePixelRatio}
                className="scene"
            >

                <Suspense fallback={null}>
                    <Wave />
                </Suspense>
            </Canvas>

            <div className="thanks">
                <span>Ce site est inspiré du design de </span>
                <a href="https://homunculus.jp/" target="_blank" rel="noopener noreferrer">homunculus.jp</a>
            </div>

            <div className="scroll">
                <span>scroll</span>
                <div className="scroll-line"></div>
            </div>
        </div>
    );
}

export default Envirenement;
