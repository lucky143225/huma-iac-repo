import {BrowserRouter, Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import HomePage from './Pages/home-page';
import SigninScreen from './Pages/Auth/loginpage';
import SignupScreen from './Pages/Auth/signuppage';
import Services from './Pages/services';
import "react-toastify/dist/ReactToastify.css";
import MyAccountPage from './Pages/Auth/myAccountPage';
import DashboardPage from './Pages/Auth/dashboardPage';
import ContactUsPage from './Components/contactUs';
import AboutUsPage from './Components/aboutUs';
import ScrollToTop from './Components/ScrollToTop';



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
       <Route path="/" element={<Navigate to="/home" />} />
        <Route path='/home' element={<HomePage />} />
        {/* <Route path='/login' element={<SigninScreen />}/>
        <Route path='/signup' element={<SignupScreen />}/> */}
        <Route path='/services' element={<Services />} />
        {/* <Route path='/my-account' element={<MyAccountPage />} />
        <Route path='/dashboard' element={<DashboardPage />} /> */}
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='/about' element={<AboutUsPage />} />
      </Routes>
    
    </BrowserRouter>

  );
}

export default App;

{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */}