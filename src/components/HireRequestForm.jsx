import { useState, useRef } from 'react';

import emailjs from '@emailjs/browser';

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
            alert('Your request has been submitted successfully!')
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
            console.error('Email sending failed:', error);
            alert('There was an error submitting your request. Please try again later.');
          });
    
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Request Vehicles</h1>
      <form ref ={formEmail} onSubmit={handleSubmit} className="space-y-4">
        {/* Date pickers for startDate and endDate */}
        <div className="space-x-4">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border p-2"
          />
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        {/* Dropdown for vehicleType */}
        <div>
          <label>Vehicle Type:</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="border p-2"
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="van">Van</option>
          </select>
        </div>

        {/* Number input for numOfPassengers */}
        <div>
          <label>Number of Passengers:</label>
          <input
            type="number"
            name="numOfPassengers"
            value={formData.numOfPassengers}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        {/* Checkbox for withAirCondition */}
        <div>
          <input
            type="checkbox"
            name="withAirCondition"
            checked={formData.withAirCondition}
            onChange={handleChange}
            className="mr-2"
          />
          <label>With Air Condition:</label>
        </div>

        {/* Address inputs */}
        <div className="space-y-2">
          <label>Start Point:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="startPointNo"
              placeholder="No."
              value={formData.startPointNo}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <input
              type="text"
              name="startPointStreet"
              placeholder="Street"
              value={formData.startPointStreet}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <input
              type="text"
              name="startPointCity"
              placeholder="City"
              value={formData.startPointCity}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
          </div>
        </div>

        {/* Destination input */}
        <div>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        {/* Time input for startTime */}
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        {/* Checkbox for isRoundTrip */}
        <div>
          <input
            type="checkbox"
            name="isRoundTrip"
            checked={formData.isRoundTrip}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Is it Round Trip:</label>
        </div>

        {/* Customer details */}
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div>
          <label>Customer Email:</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div>
          <label>Customer Mobile:</label>
          <input
            type="tel"
            name="customerMobile"
            value={formData.customerMobile}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div>
          <label>Customer NIC:</label>
          <input
            type="text"
            name="customerNIC"
            value={formData.customerNIC}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        {/* Submit button */}
        <div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default HireRequestForm;
