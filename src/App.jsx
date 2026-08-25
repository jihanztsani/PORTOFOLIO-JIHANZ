import React, { useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import MainLayout from "./layouts/mainlayout";

import Home from "./pages/home";
import About from "./pages/about";
import Activities from "./pages/activities";
import Projects from "./pages/projects";
import Certificates from "./pages/certificates";

// Main continuous single-page portfolio layout in the exact requested order:
// 1. Home -> 2. About -> 3. Activities -> 4. Projects -> 5. Certificates
function SinglePagePortfolio() {
    const location = useLocation();

    // Auto-scroll to section if path or hash is present on load/route change
    useEffect(() => {
        const path = location.pathname.replace("/", "");
        const targetId = location.hash ? location.hash.replace("#", "") : path;

        if (targetId && ["about", "activities", "projects", "certificates", "home"].includes(targetId)) {
            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    const navbarHeight = 80;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            }, 100);
        }
    }, [location]);

    return (
        <div className="single-page-wrapper">
            <Home />
            <About />
            <Activities />
            <Projects />
            <Certificates />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<SinglePagePortfolio />} />
                    <Route path="/about" element={<SinglePagePortfolio />} />
                    <Route path="/activities" element={<SinglePagePortfolio />} />
                    <Route path="/projects" element={<SinglePagePortfolio />} />
                    <Route path="/certificates" element={<SinglePagePortfolio />} />
                    <Route path="*" element={<SinglePagePortfolio />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;