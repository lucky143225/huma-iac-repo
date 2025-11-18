import Client from "../Components/client";
import ExperienceBadge from "../Components/ExperienceBadge";
import Footer from "../Components/footer";
import HeroSection from "../Components/heroSection";
import Notifications from "../Components/notifications";
import { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";

const MemoizedClient = memo(Client);
const MemoizedNotifications = memo(Notifications);

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        if (location.state?.targetId) {
          const targetElement = document.getElementById(location.state.targetId);
          if (targetElement) {
            const elementPosition = targetElement.offsetTop;
            const offset = -80;
            window.scrollTo({
              top: elementPosition + offset,
              behavior: "smooth",
            });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        const { state, ...locationWithoutState } = location;
        window.history.replaceState(
          null,
          "",
          locationWithoutState.pathname + locationWithoutState.search
        );
      }, 100);
    };

    handleScroll();
  }, [location]);

  return (
    <div>
      <HeroSection />
      <MemoizedNotifications />
      <MemoizedClient />
      <Footer />
      <ExperienceBadge />
    </div>
  );
}

export default HomePage;
