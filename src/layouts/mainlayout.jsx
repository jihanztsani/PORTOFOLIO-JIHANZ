import Navbar from "../components/navbar";
import Footer from "../components/footer";

function MainLayout({ children }) {
    return (
        <div className="site">
            <Navbar />

            <main className="main-content">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;