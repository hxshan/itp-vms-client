import React , { useState } from 'react'
import LandingPage from '../pages/LandingPage';
import FAQ from './FAQ';
import VehicleList from './VehiceList';
import AboutUs from './AboutUs';


const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'faq':
        return <FAQ />;
      case 'aboutUs':
        return <AboutUs />;
      case 'vehicleList':
        return <VehicleList />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div >
      <nav className="bg-gray-800 p-4 w-full">
        <div className='flex flex-row'>
        <div className='grow'>
          Logo 
        </div>
        <div>
        <div className=" flex items-center justify-between w-full">
          <ul className="hidden md:flex">
          <li>
            <button
              onClick={() => setCurrentPage('home')}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Home
            </button>
          </li>
            <li>
              <button
                onClick={() => setCurrentPage('faq')}
                className="text-white hover:text-gray-300 transition duration-300 ml-4"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('aboutUs')}
                className="text-white hover:text-gray-300 transition duration-300 ml-4"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('vehicleList')}
                className="text-white hover:text-gray-300 transition duration-300 ml-4"
              >
                Vehicle List
              </button>
            </li>
          </ul>
          <button className="md:hidden text-white hover:text-gray-300 transition duration-300">
            Menu
          </button>
        </div>
        </div>
        </div>  
      </nav>

      {renderPage()}
    </div>
)
}

export default Navbar