import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransporterDashboard from './pages/TransporterDashboard';
import Home from './pages/Home'; // You can create this as a landing page
import CarrierRegistration from './pages/signup/CarrierRegistration'; 
import ShipperRegistration from './pages/signup/ShipperRegistration'; 
import Shipments from './pages/dashboard/Shipments'; // Assuming you have this component
import Consignment from './pages/dashboard/consignment'; // Assuming you have this component
// import AboutPage from './pages/aboutUs';
// import CareersPage from './pages/Join_us';
import ClientDashboard from './pages/ClientDashboard';
import AvailableTransporters from './pages/transporterList'; // Assuming you have this component
import ShipmentRegistration from './pages/ShipmentRegistration';
// import AboutPage from './pages/aboutUs';
// import CareersPage from './pages/Join_us';
import SignInPage from './pages/sign_in'; // Assuming you have this component
import Footer from './components/ui/footer';  
import Navbar from './components/ui/navBar';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/aboutUs';
import Careers from './pages/career';
import SignUpPage from './pages/signup/sign_up';
import SignupFormPage from './pages/signupOTP';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
        {/* <Route path="/carrier-registration" element={<CarrierRegistration />} /> */}
        {/* <Route path="/shipper-registration" element={<ShipperRegistration />} /> */}
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/consignment" element={<Consignment />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/join-us" element={<Careers />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/available-transporter" element={<AvailableTransporters />} />
        <Route path="/shipment-registration" element={<ShipmentRegistration />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/signup-otp" element={<SignupFormPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
