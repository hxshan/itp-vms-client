import { useState, useRef } from 'react';

import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

function HireRequestForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    vehicleType: '',
    numOfPassengers: '',
    withAirCondition: false,
    startPointNo: '',
    startPointStreet: '',
    startPointCity: '',
    destination: '',
    startTime: '',
    isRoundTrip: false,
    customerName: '',
    customerEmail: '',
    customerMobile: '',
    customerNIC: ''
  });

  const formEmail = useRef()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Inside Submit')
    console.log(formData)

    const serviceId = 'service_wq8zk76'
    const templateId = 'template_dhjy0fh'
    const publicKey = '81OBOM0jLBxqEnF4T'

    const emailData = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        vehicleType: formData.vehicleType,
        numOfPassengers: formData.numOfPassengers,
        withAirCondition: formData.withAirCondition,
        startPointNo: formData.startPointNo,
        startPointStreet: formData.startPointStreet,
        startPointCity: formData.startPointCity,
        destination: formData.destination,
        startTime: formData.startTime,
        isRoundTrip: formData.isRoundTrip,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerMobile: formData.customerMobile,
        customerNIC: formData.customerNIC
    }

    emailjs.send(serviceId, templateId, emailData, publicKey)
        .then((response) => {
            console.log("Email Sent SuccessFully")
            Swal.fire({
              icon: "success",
              title: "Your request has been submitted successfully!",
              showConfirmButton: true
          });
            setFormData({
                startDate: '',
                endDate: '',
                vehicleType: '',
                numOfPassengers: '',
                withAirCondition: false,
                startPointNo: '',
                startPointStreet: '',
                startPointCity: '',
                destination: '',
                startTime: '',
                isRoundTrip: false,
                customerName: '',
                customerEmail: '',
                customerMobile: '',
                customerNIC: ''
              });

              formEmail.current.reset()
        })
        .catch((error) => {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "There was an error submitting your request. Please try again later",
          });
      });
      
            
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Request Vehicles</h1>
      <form ref={formEmail} onSubmit={handleSubmit} className="mt-6 px-8 pt-6 pb-8 mb-4 w-full">
        <h2 className="font-bold text-2xl w-fit mt-5 mb-8 text-center">
          Hire Request Form
        </h2>
        <div className="grid grid-cols-2 gap-x-4">
          {/* Date pickers for startDate and endDate */}
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>

          {/* Dropdown for vehicleType */}
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Vehicle Type
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="van">Van</option>
            </select>
          </div>

          {/* Number input for numOfPassengers */}
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Number of Passengers
            </label>
            <input
              type="number"
              name="numOfPassengers"
              value={formData.numOfPassengers}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>

          {/* Checkbox for withAirCondition */}
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="flex items-center text-gray-700 text-md font-bold mb-2">
              <input
                type="checkbox"
                name="withAirCondition"
                checked={formData.withAirCondition}
                onChange={handleChange}
                className="mr-2 leading-tight focus:outline-none focus:shadow-outline-blue"
              />
              With Air Condition
            </label>
          </div>

          {/* Address inputs */}
          <div className="col-span-2 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Start Point
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="startPointNo"
                placeholder="No."
                value={formData.startPointNo}
                onChange={handleChange}
                className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue flex-1"
              />
              <input
                type="text"
                name="startPointStreet"
                placeholder="Street"
                value={formData.startPointStreet}
                onChange={handleChange}
                className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue flex-1"
              />
              <input
                type="text"
                name="startPointCity"
                placeholder="City"
                value={formData.startPointCity}
                onChange={handleChange}
                className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue flex-1"
              />
            </div>
          </div>

          {/* Destination input */}
          <div className="col-span-2 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>

          {/* Time input for startTime */}
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>

          {/* Checkbox for isRoundTrip */}
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="flex items-center text-gray-700 text-md font-bold mb-2">
              <input
                type="checkbox"
                name="isRoundTrip"
                checked={formData.isRoundTrip}
                onChange={handleChange}
                className="mr-2 leading-tight focus:outline-none focus:shadow-outline-blue"
              />
              Is it Round Trip
            </label>
          </div>

          {/* Customer details */}
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Customer Email
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Customer Mobile
            </label>
            <input
              type="tel"
              name="customerMobile"
              value={formData.customerMobile}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col mb-4 space-y-2">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Customer NIC
            </label>
            <input
              type="text"
              name="customerNIC"
              value={formData.customerNIC}
              onChange={handleChange}
              className="border-4 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            />
          </div>

          {/* Submit button */}
          <div className="col-span-2 w-full flex flex-col mb-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
              Submit Request
            </button>
          </div>
        </div>
      </form>


    </div>
  );
}

export default HireRequestForm;
