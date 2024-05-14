import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import car1 from '../../images/car-1.jpg';
import car2 from '../../images/car-2.jpg';
import car3 from '../../images/car-3.jpg';
import car4 from '../../images/car-4.jpg';
import car5 from '../../images/car-5.jpg';
import car6 from '../../images/car-6.jpg';
import car7 from '../../images/car-7.jpg';
import car8 from '../../images/car-8.jpg';

import van1 from '../../images/van-1.jpg';
import van2 from '../../images/van-2.jpg';
import van3 from '../../images/van-3.jpg';
import van4 from '../../images/van-4.jpg';
import van5 from '../../images/van-5.jpg';
import van6 from '../../images/van-6.jpg';

import bus1 from '../../images/bus-1.jpg';
import bus2 from '../../images/bus-2.jpg';
import bus3 from '../../images/bus-3.jpg';
import bus4 from '../../images/bus-4.jpg';

import lorry1 from '../../images/lorry-1.jpg';
import lorry2 from '../../images/lorry-2.jpg';
import lorry3 from '../../images/lorry-3.jpg';
import lorry4 from '../../images/lorry-4.jpg';
import lorry5 from '../../images/lorry-5.jpg';
import lorry6 from '../../images/lorry-6.jpg';

import truck1 from '../../images/truck-1.jpg';
import truck2 from '../../images/truck-2.jpg';

const VehicleCard = ({ image, title, description }) => (
  <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-4 mx-4">
    <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);


const VehicleCategory = ({ category, vehicles }) => {
  const totalWidth = vehicles.length * 320; 

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="flex overflow-x-auto space-x-4 p-4" style={{ maxWidth: totalWidth }}>
        {vehicles.map((vehicle, index) => (
          <div key={index} className="mr-4">
            <VehicleCard {...vehicle} />
          </div>
        ))}
      </div>
    </div>
  );
};

const VehicleList = () => {

  const categories = [
    {
      category: 'Cars',
      vehicles: [
        { image: car1 , title: 'Mini Car', description: '2 Seater' },
        { image: car2, title: 'Sadan', description: '4 Seater' },
        { image: car3, title: 'CUV', description: '6 Seater' },
        { image: car4, title: 'SUV', description: '6 Seater' },
        { image: car5, title: 'Hashback', description: '4 Seater' },
        { image: car6, title: 'Convertible', description: '2 Seater' },
        { image: car7, title: 'Coupe', description: '2 Seater' },
        { image: car8, title: 'Super Car', description: '2 Seater' },
      
        
      ]
    },
    {
      category: 'Vans',
      vehicles: [
        { image: van2, title: 'Mini Van', description: '6 Seater' },
        { image: van1, title: 'Mini Cargo Van', description: '2 Seater' },
        { image: van4, title: 'Bus Van', description: '12 Seater' },
        { image: van5, title: 'Cargo Van', description: '2 Seater' },
        { image: van3, title: 'Mini Picnic Van', description: '4 Seater' },
        { image: van6, title: 'Big Picnic Van', description: '6 Seater' },
      ]
    },

    {
      category: 'Buses',
      vehicles: [
        { image: bus4, title: 'Mini Bus', description: '12 Seater' },
        { image: bus1, title: '2 Door Bus', description: '52 Seater' },
        { image: bus2, title: 'City Bus', description: '35 Seater' },
        { image: bus3, title: '2 store Bus', description: '45 Seater' },
      ]
    },

    {
      category: 'Lorries',
      vehicles: [
        { image: lorry3, title: 'Minivan', description: '300Kg' },
        { image: lorry2, title: 'Cargo Van', description: '500Kg' },
        { image: lorry1, title: 'Cargo Van', description: '1000Kg - Uncovered' },
        { image: lorry4, title: 'Cargo Van', description: '2000Kg - Covered' },
        { image: lorry5, title: 'Cargo Van', description: '3000Kg - Covered' },
        { image: lorry6, title: 'Cargo Van', description: '4000Kg - Covered' },
      ]
    },

    {
      category: 'Trucks',
      vehicles: [
        { image: truck1, title: 'Truck', description: '7000Kg' },
        { image: truck2, title: 'Big Truck', description: '9500Kg' },
      ]
    } 

  ];

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/requesthire');
  };


 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col shadow-2xl" id='vehicleList'>
      <div className="flex-1">
        
        <div className="container mx-auto p-4 mt-4">
          <h2 className="text-3xl font-bold mb-8">Popular Vehicle Rentals</h2>
          <div className="container mx-auto p-8">
            {categories.map((category, index) => (
              <VehicleCategory key={index} {...category} />
            ))}
          </div>
        </div>
        </div>

      <div className="container mx-auto p-4 mt-4  mb-4">
        <div>
          <div className=' bg-red-600 rounded-lg shadow-lg p-4'>
            <h1 className="text-3xl font-bold mb-8 text-white">Make your hire with us</h1>
            <div className="text-sm text-white font-bold">You can heir your choice vehicle finish your journey with our beliverbale drivers.</div>
            <button className='mt-6 px-4 py-2 bg-white rounded-lg shadow-lg text-black font-bold hover:bg-slate-200'
            onClick={handleButtonClick}
            >
              Discover
            </button>
          </div>
          <div>
            <img></img>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-4  mb-4">
        <div>
          <div className=' bg-red-600 rounded-lg shadow-lg p-4 mb-6'>
            <h1 className="text-3xl font-bold mb-8 text-white" >Take your rental vehicle with us</h1>
            <div className="text-sm text-white font-bold" >You can rental your choice vehicle finish your bisness with our officila contancts.</div>
            <button className='mt-6 px-4 py-2 bg-white rounded-lg shadow-lg text-black font-bold hover:bg-slate-200'>Discover</button>
          </div>
          <div>
            <img></img>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default VehicleList;
