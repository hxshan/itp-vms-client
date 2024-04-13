import React, { useState, useEffect } from 'react';
import image1 from '../../images/agnieszka-stankiewicz-bkfBxbI7a1g-unsplash.jpg';
import image2 from '../../images/alex-azabache-6gv2F4-Hpds-unsplash.jpg';
import image3 from '../../images/amal-prasad-ztFkvmLKTcY-unsplash.jpg';

const VehicleCard = ({ image, title, description }) => (
  <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-4 mx-4">
    <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const VehicleCategory = ({ category, vehicles }) => (
  <div className="mb-8 w-full">
    <h2 className="text-2xl font-bold mb-4">{category}</h2>
    <div className="flex overflow-x-auto space-x-4">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} {...vehicle} />
      ))}
    </div>
  </div>
);

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { src: image1, text: 'Welcome to Our Vehicle Rental Service', position: { bottom: '10%', right: '10%' }  },
    { src: image2, text: 'Rent a Car, Van, Bus, Lorry, or Truck for your journey!',  position: { bottom: '10%', right: '10%' } },
    { src: image3, text: 'Book your vehicle now for an unforgettable experience!', position: { bottom: '10%', right: '10%' } },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  const categories = [
    {
      category: 'Cars',
      vehicles: [
        { image: 'car1.jpg', title: 'Sedan', description: 'Comfortable and stylish.' },
        { image: 'car2.jpg', title: 'SUV', description: 'Spacious and versatile.' },
        { image: 'car3.jpg', title: 'Convertible', description: 'Enjoy the open road.' },
        { image: 'car3.jpg', title: 'Convertible', description: 'Enjoy the open road.' },
        { image: 'car3.jpg', title: 'Convertible', description: 'Enjoy the open road.' },
      
        
      ]
    },
    {
      category: 'Vans',
      vehicles: [
        { image: 'van1.jpg', title: 'Minivan', description: 'Ideal for family trips.' },
        { image: 'van2.jpg', title: 'Cargo Van', description: 'Perfect for transporting goods.' },
      ]
    },

    {
      category: 'Buses',
      vehicles: [
        { image: 'van1.jpg', title: 'Minivan', description: 'Ideal for family trips.' },
        { image: 'van2.jpg', title: 'Cargo Van', description: 'Perfect for transporting goods.' },
      ]
    },

    {
      category: 'Lorries',
      vehicles: [
        { image: 'van1.jpg', title: 'Minivan', description: 'Ideal for family trips.' },
        { image: 'van2.jpg', title: 'Cargo Van', description: 'Perfect for transporting goods.' },
      ]
    },

    {
      category: 'Trucks',
      vehicles: [
        { image: 'van1.jpg', title: 'Minivan', description: 'Ideal for family trips.' },
        { image: 'van2.jpg', title: 'Cargo Van', description: 'Perfect for transporting goods.' },
      ]
    } 

  ];

 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1">
        <div className="relative ">
          <img 
            src={currentImage.src}
            alt="Slideshow"
            className="w-full h-full object-cover bg-blend-multiply"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="absolute" style={currentImage.position}>
            <div className="text-white text-4xl font-bold">
              {currentImage.text}
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 mt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Popular Vehicle Rentals</h2>
          <div className="container mx-auto p-8">
              <h1 className="text-3xl font-bold mb-8">Explore Our Vehicles</h1>
               {categories.map((category, index) => (
                    <VehicleCategory key={index} {...category} />
                ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-4  mb-4">
        <div>
          <div>
            <h1 className="text-3xl font-bold mb-8">Make your hair with us</h1>
            <div className="text-sm text-gray-600">You can heir your choice vehicle finish your journey with our beliverbale drivers.</div>
            <button>Discover</button>
          </div>
          <div>
            <img></img>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-4  mb-4">
        <div>
          <div>
            <h1 className="text-3xl font-bold mb-8">Take your rental vehicle with us</h1>
            <div className="text-sm text-gray-600">You can rental your choice vehicle finish your bisness with our officila contancts.</div>
            <button>Discover</button>
          </div>
          <div>
            <img></img>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}

export default LandingPage;
