import Client from "../Components/client";
import Footer from "../Components/footer";
import HeroSection from "../Components/heroSection";
import Navbar from "../Components/navBar";
import Notifications from "../Components/notifications";

function HomePage() {

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