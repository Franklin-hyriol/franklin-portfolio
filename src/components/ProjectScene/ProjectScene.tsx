import { Canvas } from "@react-three/fiber";
import "./ProjectScene.scss";
import ProjectModel from "../ProjectModel/ProjectModel";


type ProjectSceneProps = {
    activeProject: number | null
}

function ProjectScene({ activeProject }: ProjectSceneProps) {
    return (
        <div className="projectScene-wrapper">
            <Canvas>
                <ProjectModel activeProject={activeProject} />
            </Canvas>
        </div>
    )
}

export default ProjectScene