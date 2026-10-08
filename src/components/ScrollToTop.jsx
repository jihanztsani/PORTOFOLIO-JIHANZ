import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace("#", "");
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
            }, 60);
        } else {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        }
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop;
