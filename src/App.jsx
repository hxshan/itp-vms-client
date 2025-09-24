
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import HireRequestForm from "./pages/HireRequest";
import ClientDash from "./pages/ClientDash";
import ClientLogin from "./pages/ClientLogin";
import OAuthCallback from "./pages/OAuthCallback";




function App() {
  return (
    
      <>

        <Navbar/> 

        <Routes >
          <Route path="/" element={<LandingPage />}/>
          <Route path="/requesthire" element={<HireRequestForm />}/>
          <Route path="/clientDash" element={<ClientDash/>} />
          {/* <Route path="/login" element={<LoginRegister />}/> */}
          <Route path="/login" element={<ClientLogin/>}/>
          <Route path="/auth/google/callback" element={<OAuthCallback/>}/>
          <Route path="/login/callback" element={<OAuthCallback/>}/>
        </Routes>

      </>
        
    
  );
}

export default App
