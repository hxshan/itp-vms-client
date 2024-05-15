
import { BrowserRouter , Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HireRequestForm from "./pages/HireRequest";
import LoginRegister from './pages/LoginRegister'
import ClientDash from "./pages/ClientDash";
import ClientLogin from "./pages/ClientLogin";




function App() {
  return (
    
      <>

        <Navbar/> 

        <Routes >
          <Route path="/" element={<LandingPage />}/>
          <Route path="/requesthire" element={<HireRequestForm />}/>
          <Route path="/clientDash/:id" element={<ClientDash/>} />
          <Route path="/login" element={<LoginRegister />}/>
          <Route path="/clientLogin" element={<ClientLogin/>}/>
        </Routes>

      </>
        
    
  );
}

export default App
