import image1 from '../../images/img1.jpg';
import image2 from '../../images/img2.jpg';
import image3 from '../../images/img3.jpg';

import { useState, useEffect } from 'react';

const Header = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        { src: image1 },
        { src: image2 },
        { src: image3 },
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

  return (
    <div id='home'>
        

        <div className="relative ">
          <img 
            src={currentImage.src}
            alt="Slideshow"
            className="w-full h-full object-cover "
          />
        </div>
    </div>
  )
}

export default Header