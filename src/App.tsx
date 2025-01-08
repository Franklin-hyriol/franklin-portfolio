

import Loader from "./components/Loader/Loader";
// import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
// import About from "./section/About/About";
import { lazy, useEffect, useState } from 'react'
const Envirenement = lazy(() => import("./section/Envirenement/Envirenement"));
const Headers = lazy(() => import("./components/Headers/Headers"));


function App() {
  const [componentsReady, setComponentsReady] = useState(false);

  useEffect(() => {
    const loadComponents = async () => {
      await Promise.all([
        import("./section/Envirenement/Envirenement"),
        import("./components/Headers/Headers")
      ]);

      setComponentsReady(true);

    };

    loadComponents();
  }, []);

  if (!componentsReady) {
    return <Loader />;
  }

  return (
    <>
      <Headers />
      <Envirenement />
    </>
  );
}

export default App;
