import HireRequestForm from '../components/HireRequestForm'
import {validateFormFirstPage, validateFormSecondPage, validateFormtthirddPage} from '../validations/HireValidation'

import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const HireRequest = () => {
  const [step, setStep] = useState(1);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [passengerCount, setPassengerCount] = useState(0);
  const [airCondition, setAirCondition] = useState(false);
  const [vehicle, setVehicle] = useState('')
  const [driver, setDriver] = useState('')
  const [startPointNo, setStartPointNo] = useState('')
  const [startPointStreet, setStartPointSteet] = useState('')
  const [startPointCity, setStartPointCity] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [startTime, setStartTime] = useState('')
  const [tripType, setTripType] = useState(false)
  const [estimatedDistance, setEstimatedDistance] = useState('')
  const [cusName, setCusName] = useState('')
  const [cusEmail, setCusEmail] = useState('')
  const [cusMobile, setCusMobile] = useState('')
  const [cusNic, setCusNic] = useState('')
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  const [advancedPayment, setAdvancedPayment] = useState(0)

  const [vehicleNo, setVehicleNo] = useState('');
  const [driverName, setDriverName] = useState('');

  const formData = {
    startDate,
    endDate,
    vehicleType,
    airCondition,
    passengerCount,
    vehicle,
    driver,
    startPointNo,
    startPointStreet,
    startPointCity,
    endPoint,
    startTime,
    tripType,
    estimatedDistance,
    cusName, cusEmail, cusMobile, cusNic,
    estimatedTotal,
    finalTotal: null,
    advancedPayment,
    vehicleNo,
    driverName
  }

  //Get Vehicles
  const [vehicleData, setVehicleData] = useState([])

  const fetchVehicles = async (retries = 3) => {
    try {
      const response = await fetch('http://localhost:3000/api/hire/vehicles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setVehicleData(data);
        console.log('vehicleData', data);
      } else {
        console.error('Error fetching vehicle details:', response.status);
        if (retries > 0) {
          setTimeout(() => fetchVehicles(retries - 1), 2000); // Retry after 2 seconds
        }
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      if (retries > 0) {
        setTimeout(() => fetchVehicles(retries - 1), 2000); // Retry after 2 seconds
      }
    }
  };

  //Filter Vehicles
  const [filteredVehicles , setFilteredVehicles] = useState([])

  const filterVehicles = async() => {
    console.log("Filter Vehicles");
    console.log("Selected Vehicle : " + vehicleType);
    const selectedVehicles = vehicleData.filter(vehicle => vehicle.category.toLowerCase() === vehicleType.toLowerCase());
    console.log('select', selectedVehicles);

    const filterByPassengerCount = selectedVehicles.filter(vehicle => vehicle.numOfSeats >= passengerCount)
    const filteredByAvailability = filterByPassengerCount.filter(vehicle => {
      return !vehicle.availability.some(availability => {
        return (
          (availability.unavailableStartDate <= startDate && availability.unavailableEndDate >= endDate) ||
          (availability.unavailableStartDate >= startDate && availability.unavailableStartDate <= endDate) ||
          (availability.unavailableEndDate >= startDate && availability.unavailableEndDate <= endDate)
        );
      });
    });
    console.log('fitlet1', filteredByAvailability)
    setFilteredVehicles(filteredByAvailability); 

    if (filteredVehicles.length === 0) {
      console.log("No vehicles Available");
      toast.error("No vehicles Available");
  }else {

    console.log('handleSelectedVehicle called');
  
    if (filteredVehicles.length > 0) {
      console.log('inside if');
      const randomIndex = Math.floor(Math.random() * filteredVehicles.length);
      const randomVehicle = filteredVehicles[randomIndex];
  
      setVehicle(randomVehicle._id);
      setVehicleNo(randomVehicle.vehicleRegister);

      console.log('Vehicle No : ' , vehicleNo)
      
    } else {
      console.log('inside else');
      setVehicle('');
      setVehicleNo('');
    }
  }
  };

  useEffect(() => {
    console.log('filteredVehicles updated:', filteredVehicles);
  }, [filteredVehicles]);

  
  useEffect(() => {
    fetchVehicles();
    fetchVehicleRates();
    fetchDrivers()
  }, []);


  //Get Drivers
  const [driverData, setDriverData] = useState([])

  const fetchDrivers = async (retries = 3) => {
    try {
      const response = await fetch('http://localhost:3000/api/user/drivers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setDriverData(data);
        console.log('Driver Data', data);
      } else {
        console.error('Error fetching vehicle details:', response.status);
        if (retries > 0) {
          setTimeout(() => fetchVehicles(retries - 1), 2000); // Retry after 2 seconds
        }
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      if (retries > 0) {
        setTimeout(() => fetchVehicles(retries - 1), 2000); // Retry after 2 seconds
      }
    }
  };

  //Assign driver
  const assignDriver = () => {

    if (driverData.length > 0) {
      const randomIndex = Math.floor(Math.random() * driverData.length);
      const randomDriver = driverData[randomIndex];
  
      setDriver(randomDriver._id);
      setDriverName(randomDriver.firstName);

      console.log("DriverName" , randomDriver.firstName)
      
    } else {
      setDriver('');
      setDriverName('');
    }
  }

  //Fare Calculation
  //Calculate Distence
  const calculateDistence = async() => {
    if (!startPointCity || !endPoint) {
      console.error('Start point city or end point is not set.');
      return;
    }

    const startCity = startPointCity
    const endCity = endPoint


    const options = {
      method: 'POST',
      url: 'https://distanceto.p.rapidapi.com/distance/route',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '465b76b003msh9a1a7889f79a491p156653jsn80a4488b0093',
        'X-RapidAPI-Host': 'distanceto.p.rapidapi.com'
      },
      data: {
        route: [
          {
            country: 'SriLanka',
            name: startCity
          },
          {
            country: 'SriLanka',
            name: endCity
          }
        ]
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const distance = response.data.route.car.distance
      setEstimatedDistance(Math.round(distance))
    } catch (error) {
      console.error(error);
    }
  }

  //Fetch Rates
  const [vehicleRates, setVehicleRates] = useState([])

  const fetchVehicleRates = async (retries = 3) => {
    try {
      const response = await fetch('http://localhost:3000/api/hire/rates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setVehicleRates(data);
        console.log('vehicleRates', data);
      } else {
        console.error('Error fetching vehicle details:', response.status);
        if (retries > 0) {
          setTimeout(() => fetchVehicles(retries - 1), 2000); // Retry after 2 seconds
        }
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      if (retries > 0) {
        setTimeout(() => fetchVehicles(retries - 1), 2000); // Retry after 2 seconds
      }
    }
  };

  //Calculate Estimated Fare
  const calculateEstimatedFare = async () => {
    try {
        if (!vehicleType || !estimatedDistance) {
            console.log("Vehicle type or estimatedDistance not selected");
            return { estimatedFare: 0, advancedPay: 0 };
        }
        
        console.log("Calculating estimated fare...");
        
        // Find the rate for the selected vehicle type
        console.log("Selected Vehicle : " + vehicleType)
        const selectedVehicleRate = vehicleRates.find(rate => rate.vehicleCatagory.toLowerCase() === vehicleType.toLowerCase());
        console.log(selectedVehicleRate)

        if (!selectedVehicleRate) {
            console.log("Rate not found for the selected vehicle type");
            return { estimatedFare: 0, advancedPay: 0 };
        }

        const { baseDistence, baseRate, additionalRate,acBaseRate, acAdditionalRate } = selectedVehicleRate;
        let estimatedFare = airCondition ? acBaseRate : baseRate
        let advancedPay = 0;

        let estimatedDistence = estimatedDistance;

        if (tripType) {
            estimatedDistence *= 2;
        }

        const baseDistance = baseDistence;
        const additionalDistance = Math.max(estimatedDistence - baseDistance, 0);

        estimatedFare += additionalDistance * (airCondition ? acAdditionalRate : additionalRate);
        advancedPay = estimatedFare * 0.1;

        estimatedFare = parseFloat(estimatedFare.toFixed(2));
        advancedPay = Math.round(advancedPay);

        console.log("Catogory : " + selectedVehicleRate.vehicleCatagory)
        console.log("Estimated Fare : " + estimatedFare)
        console.log("Advanced Payment: " + advancedPay)
        console.log("Base estimatedDistance : " +  baseDistance)

        return { estimatedFare, advancedPay, additionalRate, estimatedDistence };
    } catch (error) {
        console.error('Error calculating estimated fare:', error);
        return { estimatedFare: 0, advancedPay: 0 };
    }
  };

  useEffect(() => {
    if (step === 5) {
      const calculateFare = async () => {
        const { estimatedFare, advancedPay } = await calculateEstimatedFare();
        setEstimatedTotal(estimatedFare);
        setAdvancedPayment(advancedPay);
      };
      calculateFare();
    }
  }, [step, vehicleType, estimatedDistance, tripType, airCondition]);

  //Handle Form Steps
  const handleNextStep = (e) => {
    e.preventDefault()

    filterVehicles()
    assignDriver()

    let errors = {};
    if(step == 1) {
      errors = validateFormFirstPage(formData)
      
      if(Object.keys(errors).length === 0 && filteredVehicles.length != 0) {
        

        setStep(step + 1);
      }

      
    }

    if(step == 2) {
      errors = validateFormSecondPage(formData)
      calculateDistence()
      if(Object.keys(errors).length === 0) {
        setStep(step + 1);
      }
    }

    if(step == 3) {
      errors = validateFormtthirddPage(formData)
      if(Object.keys(errors).length === 0) {
        setStep(step + 1);
      }
    }

    if(step == 4) {
      setStep(step + 1);
  }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  //Handle Submit

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = { data: formData };
  
    console.log(requestData);
    try {
      const response = await fetch('http://localhost:3000/api/hire/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        // Handle successful response
        console.log('Hire request submitted successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Hire added successfully!',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate('/');
        });
      } else {
        // Handle error
        console.error('Error submitting hire request');
      }
    } catch (error) {
      console.error('Error submitting hire request:', error);
    }
  };

  //Handle Cancel
  const cancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to cancel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    })
    .then((result) => {
        if(result.isConfirmed) {
            navigate('/');
        } 
    })
  }


  return (
    <div className='w-full '>
      <div>
        <form className="w-full h-full bg-white px-3 py-20 xl:px-10">
          {/* Form */}
          {step === 1 && (
              <div className="mt-10 w-full border-2 border-black pt-5 px-4 xl:px-12 xl:py-10">
  
                {/* Date Section */}
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'> 
  
                  <div className="mb-5">
                    <label htmlFor="startDate" className="block font-medium text-black text-base mb-2">
                      Start Date
                    </label>
                    <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="endDate" className="block font-medium text-black text-base mb-2">
                      End Date
                    </label>
                    <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                </div>
  
                {/* Vehicle Section */}

                  <div className="mb-5">
                    <label htmlFor="vehicleType" className="block font-medium text-black text-base mb-2">
                      Vehicle Type
                    </label>
                    <select id="vehicleType" name="vehicleType" 
                      value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} 
                      className='border-2 rounded border-black px-14'
                      required
                      >
                          <option value="">Select......</option>
                          <option value="car">Car</option>
                          <option value="van">Van</option>
                          <option value="bus">Bus</option>
                          
                      </select>
                  </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mt-5'> 

                  <div className="mb-5">
                    <label htmlFor="airCondition" className="block font-medium text-black text-base mb-2">
                      Air Condition
                    </label>
                    <input type="checkbox" id="airCondition" name="airCondition" checked={airCondition} onChange={(e) => setAirCondition(e.target.checked)} className='' required />
                  </div>

                  {/* Passenger Count */}
                  <div className='mb-5'>
                    <label htmlFor="passengerCount" className="block font-medium text-black text-base mb-2">
                      No of Passengers
                    </label>
                    <input type="number" id="passengerCount" name="passengerCount" value={passengerCount} onChange={(e) => setPassengerCount(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
  
                </div>
  
                
              </div>
            )}
  
            {/*Section 2 */}
            {step === 2 && (
              
              <div className="mt-5 px-2">
  
                {/* Trip details */}
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
  
                  <div className="mb-5">
                    <label htmlFor="startPointNo" className="block font-medium text-black text-base mb-2">
                      Start Point No
                    </label>
                    <input type="text" id="startPointNo" name="startPointNo" value={startPointNo} onChange={(e) => setStartPointNo(e.target.value)} placeholder='House Number' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="startPointStreet" className="block font-medium text-black text-base mb-2">
                      Start Point Street
                    </label>
                    <input type="text" id="startPointStreet" name="startPointStreet" value={startPointStreet} onChange={(e) => setStartPointSteet(e.target.value)} placeholder='Street' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="startPointCity" className="block font-medium text-black text-base mb-2">
                      Start Point City
                    </label>
                    <input type="text" id="startPointCity" name="startPointCity" value={startPointCity} onChange={(e) => setStartPointCity(e.target.value)} placeholder='City' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8'>
                  <div className="mb-5">
                    <label htmlFor="endPoint" className="block font-medium text-black text-base mb-2">
                      End Point
                    </label>
                    <input type="text" id="endPoint" name="endPoint" value={endPoint} onChange={(e) => setEndPoint(e.target.value)} placeholder='Destination' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="startTime" className="block font-medium text-black text-base mb-2">
                      Start Time
                    </label>
                    <input type="time" id="startTime" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="tripType" className="block font-medium text-black text-base mb-2">
                      Round Trip
                    </label>
                    <input type="checkbox" id="tripType" name="tripType" checked={tripType} onChange={(e) => setTripType(e.target.checked)} className='' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="estimatedDistance" className="block font-medium text-black text-base mb-2">
                      Estimated Distance
                    </label>
                    <input type="number" id="estimatedDistance" name="estimatedDistance" value={estimatedDistance} onChange={(e) => setEstimatedDistance(e.target.value)} placeholder='Estimate Distance' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
                </div>
  
              </div>
            )}
  
            {step === 3 && (
                <div className='mt-7'> 
                    <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
  
                        <div className="mb-5">
                            <label htmlFor="cusName" className="block font-medium text-black text-base mb-2">
                                Name
                            </label>
                            <input type="text" id="cusName" name="cusName" value={cusName} onChange={(e) => setCusName(e.target.value)} placeholder='Customer Name' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                        <div className="mb-5">
                            <label htmlFor="cusEmail" className="block font-medium text-black text-base mb-2">
                                Email
                            </label>
                            <input type="email" id="cusEmail" name="cusEmail" value={cusEmail} onChange={(e) => setCusEmail(e.target.value)} placeholder='Customer Email' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                        <div className="mb-5">
                            <label htmlFor="cusMobile" className="block font-medium text-black text-base mb-2">
                                Mobile
                            </label>
                            <input type="tel" id="cusMobile" name="cusMobile" value={cusMobile} onChange={(e) => setCusMobile(e.target.value)} placeholder='Customer Mobile No' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                        <div className="mb-5">
                            <label htmlFor="cusNic" className="block font-medium text-black text-base mb-2">
                                Nic
                            </label>
                            <input type="text" id="cusNic" name="cusNic" value={cusNic} onChange={(e) => setCusNic(e.target.value)} placeholder='Customer NIC' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                    </div>
                </div>
            )}
  
            {/* Confirmation */}
          {step === 4 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Confirmation</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; {startDate}</p>
                  <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp; {endDate}</p>
                  <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp; {vehicleType}</p>
                  <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; {airCondition ? 'With Air Condition' : 'Without Air Condition'}</p>
                  <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; {passengerCount}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp; {vehicleNo}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Vehicle Model : &nbsp;&nbsp; {vehicle}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp; {driverName}</p>

                </div>

                <div className='mr-[20px]'>

                  <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp;{startPointNo} {startPointStreet} {startPointCity}</p>
                  <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; {endPoint}</p>
                  <p className=' text-lg font-semibold leading-8'>Start Time : &nbsp;&nbsp; {startTime}</p>
                  <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp; {tripType ? 'Yes' : 'No'}</p>
                  <p className=' text-lg font-semibold leading-8'>Estimated Distance : &nbsp;&nbsp; {estimatedDistance} Km</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Name : &nbsp;&nbsp; {cusName}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Email : &nbsp;&nbsp; {cusEmail}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Mobile : &nbsp;&nbsp; {cusMobile}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer NIC : &nbsp;&nbsp; {cusNic}</p>

                </div>
                
                </div>
            </div>
          )}

          {/* Receipt */}
          {step === 5 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Receipt</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Estimated distance : &nbsp;&nbsp;{estimatedDistance} Km</p>          
                  <p className=' text-lg font-semibold leading-8'>Estimated Total : &nbsp;&nbsp;Rs. {estimatedTotal}</p>
                </div>

                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Vehicle Fare(perKm) : &nbsp;&nbsp;Rs. {}</p>
                  <p className=' text-lg font-semibold leading-8'>Advanced Payment : &nbsp;&nbsp;Rs. {advancedPayment}</p>

                </div>
                
                </div>
            </div>
          )}
  
            <div className="flex mt-8 px-4 justify-between">
              {step === 1 && (
                <button type='button' className="py-2 px-6 bg-red-600 text-white rounded-md mr-4" onClick={cancel}>
                  Cancel
                </button>
              )}
              {step !== 1 && (
                <button type='button' className="py-2 px-6 bg-slate-400 text-white rounded-md mr-4" onClick={handlePrevStep}>
                  Previous
                </button>
              )}
              {step !== 5 ? (
                <button type='button' className="py-2 px-6 text-white bg-blue-600 rounded-md hover:bg-gray-800 focus:outline-none" onClick={handleNextStep}>
                  Next
                </button>
              ) : (
                <button type='submit' className="py-2 px-6 text-white bg-green-600 rounded-md hover:bg-green-600 focus:outline-none" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>

        </form>
      </div>

      <ToastContainer />
    </div>
  )
}

export default HireRequest