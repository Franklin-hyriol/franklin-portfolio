import { slideLink } from "../Headers/anim";
import "./Project.scss";
import { motion } from "framer-motion";

const fakedata = [
    "Project Alpha",
    "Project Beta",
    "Project Gamma",
    "Project Delta",
    "Project Epsilon",
]

type ProjectProps = {
    setActiveProject: React.Dispatch<React.SetStateAction<number | null>>;
}

function Project({ setActiveProject }: ProjectProps) {
    return (
        <div className="project-wrapper">

            <ul className="project-liste" onMouseLeave={() => setActiveProject(null)}>

                {fakedata.map((item, index) => (
                    <motion.li variants={slideLink} initial='initial' animate='enter' exit='exit' className="project-item" onMouseOver={() => setActiveProject(index)} key={index}><span>{item}</span></motion.li>
                ))}

            </ul>


        </div>
    )
}

export default Project;