
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HireRequestForm from "./components/HireRequestForm";
import LoginRegister from './pages/LoginRegister'

function App() {
  return (
    <Router>
        <Navbar/> 
        

        <Routes >
          <Route path="/" element={<LandingPage />}/>
          <Route path="/requesthire" element={<HireRequestForm />}/>
          <Route path="/login" element={<LoginRegister />}/>
        </Routes>

        <Footer /> 
    </Router>
  );
}

export default App
