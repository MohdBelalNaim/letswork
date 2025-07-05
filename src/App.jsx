import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import SavedPage from "./pages/SavedPage";
import VisitedPage from "./pages/VisitedPage";
import MyAccountPage from "./pages/MyAccountPage";
import Footer from "./components/Footer";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Auth /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/visited" element={<VisitedPage />} />
        <Route path="/account" element={<MyAccountPage />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
};

export default App;
