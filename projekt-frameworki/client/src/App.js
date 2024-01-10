import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Kontakt from "./components/Kontakt";
import Logowanie from "./components/Logowanie";
import Formularz from "./components/Formularz";
import Historia from "./components/Historia";
import Szczegoly from "./components/Szczegoly";
import FormularzEdycja from "./components/FormularzEdycja";
import Lista from "./components/Lista";
import SzczegolyZamowien from "./components/SzczegolyZamowien";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Logowanie />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/formularz" element={<Formularz />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/szczegoly/:id" element={<Szczegoly />} />
        <Route path="/formularz/:id" element={<FormularzEdycja />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/szczegolyZamowien/:id" element={<SzczegolyZamowien />} />
      </Routes>
    </Router>
  );
}

export default App;
