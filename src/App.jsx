import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Dettaglio from "./pages/Dettaglio";
import Confronta from "./pages/Confronta";
import ErrorPage from "./pages/ErrorPage";
import Preferiti from "./pages/Preferiti";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dettaglio/:id" element={<Dettaglio />} />
        <Route path="/confronta" element={<Confronta />} />
        <Route path="/preferiti" element={<Preferiti />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}
