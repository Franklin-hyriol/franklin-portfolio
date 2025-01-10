import { useEffect, useState } from "react";
// import { MdMenu, MdClose } from "react-icons/md";
import "./Headers.scss";
import Project from "../Project/Project";
import ProjectScene from "../ProjectScene/ProjectScene";

function Headers() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeProject, setActiveProject] = useState<number | null>(null);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [menuOpen]);


    return (
        <>
            <nav className='header'>
                <div className="wrapper">
                    <div className="left">
                        <div className="logo">
                            <span className="f">F</span>
                            <span className="h">H</span>
                        </div>
                    </div>

                    <div className="center">
                        <ul>
                            <li>CONTACT</li>
                            <li>/</li>
                            <li>FR</li>
                            <li>/</li>
                            <li>EN</li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="menuToggle">
                <div className={`menuButton ${menuOpen ? "on" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                    {/* {menuOpen ? <MdClose /> : <MdMenu />} */}
                    <div className="one"></div>
                    <div className="two"></div>
                </div>
            </div>

            <div>
                <div className={`menu-mobile ${menuOpen ? "on" : ""}`}>
                    <Project setActiveProject={setActiveProject} />
                    <ProjectScene activeProject={activeProject} />
                </div>
            </div>

            <div className="copiright">
                © Franklin Hyriol Inc
            </div>
        </>
    )
}

export default Headers;