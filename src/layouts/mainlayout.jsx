import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MusicPlayer from "../components/MusicPlayer";

function MainLayout({ children }) {
    return (
        <div className="site">

            <Navbar />

            <main className="main-content">
                {children}
            </main>

            <Footer />

            <MusicPlayer />

        </div>
    );
}

export default MainLayout;