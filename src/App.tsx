

import Loader from "./components/Loader/Loader";
// import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
// import About from "./section/About/About";
import { lazy, useEffect, useState } from 'react'
const Envirenement = lazy(() => import("./section/Envirenement/Envirenement"));
const Headers = lazy(() => import("./components/Headers/Headers"));


function App() {
  const [componentsReady, setComponentsReady] = useState(false);
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    const loadComponents = async () => {
      await Promise.all([
        import("./section/Envirenement/Envirenement"),
        import("./components/Headers/Headers")
      ]);

      setComponentsReady(true);

      setTimeout(() => {
        setPreloader(false);
      }, 1500);

    };

    loadComponents();
  }, []);

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
    </>
  );
}

export default App;
