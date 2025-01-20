import { slideLink } from "../../pages/Home/anim";
import "./Project.scss";
import { motion } from "framer-motion";

const fakedata = [
    "Richard Gaston",
    "KangHee Kim",
    "Inka and Niclas",
    "Arch McLeish",
    "Nadir Bucan",
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