import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransporterDashboard from './pages/transporter_dashboard';
// import Home from './pages/home'; // You can create this as a landing page
import CarrierRegistration from './pages/signup/transporter_registration'; 
import ShipperRegistration from './pages/signup/shipper_registration'; 
import Shipments from './pages/dashboard/shipments' // Assuming you have this component
import Consignment from './pages/dashboard/consignment'; // Assuming you have this component
// import AboutPage from './pages/aboutUs';
// import CareersPage from './pages/Join_us';
import ClientDashboard from './pages/client_dashboard';
import AvailableTransporters from './pages/transporter_list'; // Assuming you have this component
import ShipmentRegistration from './pages/shipment_registration';
// import AboutPage from './pages/aboutUs';
// import CareersPage from './pages/Join_us';
import SignInPage from './pages/sign_in'; // Assuming you have this component
import Footer from './components/ui/footer';  
import Navbar from './components/ui/navBar';
import LandingPage from './pages/landing_page';
import AboutUs from './pages/about_us';
import Careers from './pages/career';

import SignupFormPage from './pages/signup_otp';

import VehicleRegistration from './pages/vehicle_registration';
import DriverRegistration from './pages/driver_registration';
import Dashboard from './pages/Dashboardtest';
import InquiryForm from './pages/inquiry_form';
import NotFound from './pages/404';

function App() {
  return (
    <Router>
      <Navbar />
      {/* Main Routes */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/landing" element={<LandingPage />} />


        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/join-us" element={<Careers />} />
        <Route path="/careers" element={<Careers />} />


        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/signup-otp" element={<SignupFormPage />} />
        <Route path="/carrier-registration" element={<CarrierRegistration />} />
        <Route path="/shipper-registration" element={<ShipperRegistration />} />


        <Route path="/transporter-dashboard" element={<TransporterDashboard />} />        
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/consignment" element={<Consignment />} />
        <Route path="/vehicle-registration" element={<VehicleRegistration />} />
        <Route path="/driver-registration" element={<DriverRegistration />} />
        <Route path="/carrier-registration" element={<CarrierRegistration />} />
        <Route path="/shipper-registration" element={<ShipperRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/available-transporter" element={<AvailableTransporters />} />
        <Route path="/shipment-registration" element={<ShipmentRegistration />} />        
        <Route path="/inquiry-form" element={<InquiryForm />} />        
        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
