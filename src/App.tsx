import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";

function App() {


  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
