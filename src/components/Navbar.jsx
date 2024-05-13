  import { useNavigate } from 'react-router-dom';
  const Navbar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
      navigate('/');
    };


    const toggleLoginModal = () => {
      navigate('/login')
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

                <div>
                  <button onClick={toggleLoginModal}>
                    Log IN
                  </button>
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
