import Client from "../Components/client";
import Footer from "../Components/footer";
import HeroSection from "../Components/heroSection";
import Navbar from "../Components/navBar";
import Notifications from "../Components/notifications";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {

    const location = useLocation();
    
    useEffect(() => {
        const handleScroll = () => {
            console.log(location.state);
            
          if (location.state?.targetId) {
            // If a targetId is provided, scroll to that element
            const targetElement = document.getElementById(location.state.targetId);
            if (targetElement) {
              const elementPosition = targetElement.offsetTop; // Element's top position
              const offset = -80; // Adjust for headers
              window.scrollTo({
                top: elementPosition + offset,
                behavior: "smooth",
              });
            }
          } else {
            // If no targetId, scroll to the top
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          const { state, ...locationWithoutState } = location; // Remove state
          window.history.replaceState(
            null, // No state
            "", // Title (can remain empty)
            locationWithoutState.pathname + locationWithoutState.search // Keep path and query params
          );
    
        };

        
    
        handleScroll();
      }, [location]);
    



return (
    <div>
        {/* <Navbar /> */}
        <HeroSection />
        <Notifications />
        <Client />
        <Footer />
    </div>
)
}

export default HomePage;