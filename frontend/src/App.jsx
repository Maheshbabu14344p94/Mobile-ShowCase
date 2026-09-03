import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import HowEmiWorksModal from "./components/HowEmiWorksModal.jsx";
import SupportModal from "./components/SupportModal.jsx";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";

export default function App() {
  const [modal, setModal] = useState(null); // null | "emi" | "support"

  return (
    <div className="min-h-screen">
      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar onOpenEmi={() => setModal("emi")} onOpenSupport={() => setModal("support")} />

      <Routes>
        <Route path="/" element={<Home onOpenEmi={() => setModal("emi")} />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route
          path="*"
          element={
            <div className="mx-auto max-w-md py-24 text-center text-muted">
              <p className="font-display text-xl text-ink">Page not found</p>
              <p className="mt-2 text-sm">That product link doesn't exist.</p>
            </div>
          }
        />
      </Routes>

      <HowEmiWorksModal open={modal === "emi"} onClose={() => setModal(null)} />
      <SupportModal open={modal === "support"} onClose={() => setModal(null)} />
    </div>
  );
}
