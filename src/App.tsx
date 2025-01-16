

import Lenis from "lenis";
import Loader from "./components/Loader/Loader";
// import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
// import About from "./section/About/About";
import { lazy, useEffect, useState } from 'react'
const Headers = lazy(() => import("./components/Headers/Headers"));
const Envirenement = lazy(() => import("./section/Envirenement/Envirenement"));
const Footer = lazy(() => import("./components/Footer/Footer"));


function App() {
  const [componentsReady, setComponentsReady] = useState(false);
  const [preloader, setPreloader] = useState(true);

  const [isCanvasHovered, setIsCanvasHovered] = useState(false);

  useEffect(() => {


    const loadComponents = async () => {
      await Promise.all([
        import("./components/Headers/Headers"),
        import("./section/Envirenement/Envirenement"),
        import("./components/Footer/Footer"),
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


  if (!componentsReady) {
    return <Loader />;
  }

  return (
    <>
      {preloader && <Loader fade={true} />}
      <div className="fadeOnLoad">
        <Headers />
        <Envirenement />
      </div>
      <Footer setIsCanvasHovered={setIsCanvasHovered} />
    </>
  );
}

export default App;
