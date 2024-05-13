import PropTypes from 'prop-types';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const RegisterForm = ({ toggleForm , showForm}) => {
  return (
    
    <div className={`w-3/4 min-h-[450px] h-fit transition-transform duration-500 transform mt-20 ml-20 bg-white border-2 ${showForm ? 'translate-x-0' : 'translate-x-full'} xl:bg-transparent xl:border-none`}>
          <form >
            <h1 className=" text-4xl text-center">Register</h1>

              <div className="w-full h-[50px] my-[30px] mx-0 flex items-center border-2 pr-5">
                <input
                  type="text"
                  id="fullanme"
                  placeholder="Full Name"
                  required
                  className="w-full h-full bg-transparent outline-none border-2 border-solid border-white border-opacity-10 rounded-[40px] text-base text-white py-[20px] pr-[45px] pl-[20px]"
                />
                  <div>
                    <FaUser className=' text-[1.5rem]'/>
                  </div>
              </div>

              <div className="w-full h-[50px] my-[30px] mx-0 flex items-center border-2 pr-5">
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  required
                  className="w-full h-full bg-transparent outline-none border-2 border-solid border-white border-opacity-10 rounded-[40px] text-base text-white py-[20px] pr-[45px] pl-[20px]"
                />
                <div>
                  <MdEmail className=' text-[1.5rem]'/>
                </div>
              </div>

              <div className="w-full h-[50px] my-[30px] mx-0 flex items-center border-2 pr-5">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  className="w-full h-full bg-transparent outline-none border-2 border-solid border-white border-opacity-10 rounded-[40px] text-base text-white py-[20px] pr-[45px] pl-[20px]"
                />

                <div>
                  <RiLockPasswordLine className=' text-[1.5rem]'/>
                </div>
              </div>

              <div className="flex justify-between text-[14.5px] mt-[-15px] mb-[15px] mx-0">
                <label>
                  <input
                    type="checkbox"
                    id="password"
                    required
                    className="accent-white mr-[4px]"
                  />
                  I accept terms and conditions
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  id="submitBtn"
                  className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-md ring ring-black ring-opacity-10 cursor-pointer text-black font-bold text-base"
                >
                  Register
                </button>
              </div>

              <div className="text-[14.5px] text-center mt-[20px] mb-[15px] mx-0  ">
                <p>
                  Already have an account?
                  <a
                    href="#"
                    onClick={toggleForm}
                    className="no-underline font-bold hover:underline"
                        >
                    Login
                  </a>
                </p>
              </div>
          </form>

        </div>

  )
}

RegisterForm.propTypes = {
    toggleForm: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired,
  };

export default RegisterForm