import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import MainLayout from "./layouts/mainlayout";
import LaunchingPage from "./components/LaunchingPage";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/home";
import About from "./pages/about";
import Activities from "./pages/activities";
import Projects from "./pages/projects";
import Certificates from "./pages/certificates";
import HomePreviews from "./components/HomePreviews";

// Homepage: Only renders Hero, About, Sections Highlights/Previews, and Contact Us (via MainLayout Footer)
function HomePage() {
    return (
        <div className="home-page-wrapper">
            <Home />
            <About />
            <HomePreviews />
        </div>
    );
}

function App() {
    const [isLaunched, setIsLaunched] = useState(false);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <CustomCursor />
            {!isLaunched && <LaunchingPage onFinish={() => setIsLaunched(true)} />}
            <MainLayout>
                <Routes>
                    {/* Halaman Utama: Hero + About + Ringkasan Bagian Lainnya + Contact Us */}
                    <Route path="/" element={<HomePage />} />

                    {/* Halaman-halaman Terpisah */}
                    <Route path="/about" element={<About />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/certificates" element={<Certificates />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;