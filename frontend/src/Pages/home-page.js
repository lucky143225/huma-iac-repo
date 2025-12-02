import Client from "../Components/client";
import ExperienceBadge from "../Components/ExperienceBadge";
import Footer from "../Components/footer";
import HeroSection from "../Components/heroSection";
import BodySection from "../Components/bodySection";
import { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";

const MemoizedClient = memo(Client);
const MemoizedBodySection = memo(BodySection);

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // ONLY handle the specific section scroll here.
    // The global ScrollToTop component handles the "else" case.
    
    if (location.state && location.state.targetId) {
      const targetId = location.state.targetId;
      
      // Give the page a moment to render fully
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); 
    }
  }, [location]);

  return (
    <div>
      <HeroSection />
      <MemoizedBodySection />
      <MemoizedClient />
      <Footer />
      <ExperienceBadge />
    </div>
  );
}

export default HomePage;
