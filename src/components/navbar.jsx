import { NavLink, Link } from "react-router-dom";

function Navbar() {

    const navItems = [
        {
            label: "PROJECTS",
            path: "/projects",
        },
        {
            label: "CERTIFICATES",
            path: "/certificates",
        },
        {
            label: "ACTIVITIES",
            path: "/activities",
        },
        {
            label: "ABOUT",
            path: "/about",
        },
    ];

    return (
        <header className="navbar">

            <div className="navbar-left">
                <Link
                    to="/"
                    className="navbar-logo"
                >
                    JIHANZ
                </Link>
            </div>

            <nav className="navbar-links">

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

            </nav>

            <div className="navbar-year">
                2026
            </div>

        </header>
    );
}

export default Navbar;