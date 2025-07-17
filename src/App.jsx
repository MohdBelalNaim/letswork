import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import SavedPage from "./pages/SavedPage";
import VisitedPage from "./pages/VisitedPage";
import MyAccountPage from "./pages/MyAccountPage";
import Footer from "./components/Footer";
import Terms from "./pages/Terms";
import TermsOfUse from "./pages/TermsOfUse";
import CampusPage from "./pages/CampusPage";
import CampusPeople from "./pages/CampusPeople";
import Searched from "./pages/Searched";
import CampusJobsPage from "./pages/CampusJobsPage";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Auth /> */}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/saved" element={<SavedPage />} />
        {/* <Route path="/visited" element={<VisitedPage />} /> */}
        <Route path="/account" element={<MyAccountPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/use" element={<TermsOfUse />} />
        {/* <Route path="/campus" element={<CampusPage />} /> */}
        {/* <Route path="/campus/people" element={<CampusPeople/>}/> */}
        {/* <Route path="/campus/jobs" element={<CampusJobsPage />} /> */}
        <Route path="/search/:query" element={<Searched />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
