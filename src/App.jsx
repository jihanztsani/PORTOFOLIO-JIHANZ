import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "./layouts/mainlayout";

import Home from "./pages/home";
import Projects from "./pages/projects";
import Certificates from "./pages/certificates";
import Activities from "./pages/activities";
import About from "./pages/about";


function App() {
    return (
        <BrowserRouter>

            <MainLayout>

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/projects"
                        element={<Projects />}
                    />

                    <Route
                        path="/certificates"
                        element={<Certificates />}
                    />

                    <Route
                        path="/activities"
                        element={<Activities />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                </Routes>

            </MainLayout>

        </BrowserRouter>
    );
}

export default App;