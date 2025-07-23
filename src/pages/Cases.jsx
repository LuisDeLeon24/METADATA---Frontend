import React from "react";
import CaseManagerAdmin from "../components/Cases/CaseManagerAdmin";
import Navbar from "../components/common/Navbar";
import Footer from "../components/LandingPage/Footer";

const Cases = () => {
  return (
    <div>
      <Navbar />
      <h1>Gestión de Casos</h1>
      <CaseManagerAdmin />
      <Footer />
    </div>
  )
}

export default Cases;