import "./Project.scss";

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
                    <li className="project-item" onMouseOver={() => setActiveProject(index)} key={index}><span>{item}</span></li>
                ))}

            </ul>


        </div>
    )
}

export default Project;