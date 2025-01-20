
import "./Home.scss";
import Lenis from "lenis";
import Loader from "../../components/Loader/Loader";
// import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
// import About from "./section/About/About";
import { lazy, useEffect, useState } from 'react'
const Headers = lazy(() => import("../../components/Headers/Headers"));
const Envirenement = lazy(() => import("../../section/Envirenement/Envirenement"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

import { AnimatePresence, motion } from "framer-motion";
import { menuSlide } from "./anim";
import Project from "../../components/Project/Project";
import ProjectScene from "../../components/ProjectScene/ProjectScene";


function Home() {
    const [componentsReady, setComponentsReady] = useState(false);
    const [preloader, setPreloader] = useState(true);

    const [isCanvasHovered, setIsCanvasHovered] = useState(false);
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {


        const loadComponents = async () => {
            await Promise.all([
                import("../../components/Headers/Headers"),
                import("../../section/Envirenement/Envirenement"),
                import("../../components/Footer/Footer"),
            ]);

            setComponentsReady(true);

            setTimeout(() => {
                setPreloader(false);
            }, 1500);

        };

        loadComponents();

    }, []);


    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number): void {
            if (!isCanvasHovered) {
                lenis.raf(time);
            }
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup pour éviter des fuites de mémoire
        return () => {
            lenis.destroy();
        };
    }, [isCanvasHovered]);


    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [menuOpen]);


    if (!componentsReady) {
        return <Loader />;
    }

    return (
        <>
            {preloader && <Loader fade={true} />}
            <div className="fadeOnLoad">
                <Headers />

                <AnimatePresence mode="wait">
                    {menuOpen &&
                        <motion.div variants={menuSlide} animate="enter" exit="exit" initial="initial" className="menu-mobile">
                            <Project setActiveProject={setActiveProject} />
                            <ProjectScene activeProject={activeProject} />
                        </motion.div>
                    }

                </AnimatePresence>

                <div className="menuToggle">
                    <div className={`menuButton ${menuOpen ? "on" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                        {/* {menuOpen ? <MdClose /> : <MdMenu />} */}
                        <div className="one"></div>
                        <div className="two"></div>
                    </div>
                </div>

                <Envirenement />
            </div>
            <Footer setIsCanvasHovered={setIsCanvasHovered} />
        </>
    );
}

export default Home;
