  import { useNavigate } from 'react-router-dom';
  import { useAuthContext } from '@/hooks/useAuthContext';
  import { useLogout } from '@/hooks/useLogout';
  import { FaUserCircle } from 'react-icons/fa';
  import { useState } from 'react';
  const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [openMenu, setOpenMenu] = useState(false);

    const handleHomeClick = () => {
      navigate('/');
    };


    const toggleLoginModal = () => {
      navigate('/login')
    };

    const handleBookHire = () => {
      navigate('/requesthire');
    };

    return (
      <div className='fixed top-0 left-0 w-full z-50'>
        <nav className="bg-slate-900 p-4 w-full sticky top-1 ">
          <div className='flex flex-row'>

            <div className='grow'>
              Logo 
            </div>

            <div>
              <div className=" flex items-center justify-between w-full">
                <ul className="hidden md:flex space-x-4 text-white">
                  <li>
                    <button 
                      className="hover:text-gray-300 transition duration-300"
                      onClick={handleHomeClick}
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <a href="#aboutUs" className="hover:text-gray-300 transition duration-300">About Us</a>
                  </li>
                  <li>
                    <a href="#vehicleList" className="hover:text-gray-300 transition duration-300">Vehicle List</a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-gray-300 transition duration-300">FAQ</a>
                  </li>
                </ul>

                <div className='mx-5'>
                    <button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                      onClick={handleBookHire}
                    >
                      Book Hire
                  </button>

                </div>

                <div className='mx-5'>
                  {!user && (
                    <button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                      onClick={toggleLoginModal}
                    >
                      Login
                    </button>
                  )}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu((v) => !v)}
                        className="flex items-center gap-2 text-white"
                      >
                        <FaUserCircle className="text-3xl" />
                        <span className="hidden md:inline">Account</span>
                      </button>
                      {openMenu && (
                        <div
                          className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                          onMouseLeave={() => setOpenMenu(false)}
                        >
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => { setOpenMenu(false); navigate('/clientDash'); }}
                          >
                            Dashboard
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => { setOpenMenu(false); navigate('/profile'); }}
                          >
                            Profile
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                            onClick={() => { setOpenMenu(false); logout(); }}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button className="md:hidden text-white hover:text-gray-300 transition duration-300">
                  Menu
                </button>
              </div>

            </div>
          </div>  
        </nav>
      </div>


    );
  };

  export default Navbar;
