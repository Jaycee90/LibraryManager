import React, { useState, useEffect } from 'react';
import Muhavura from '../assets/Muhavura.jpg';
import kigali1 from '../assets/kigali1.jpg';
import kigali2 from '../assets/kigali2.jpg';
import kigali3 from '../assets/kigali3.jpg';
import kigali4 from '../assets/kigali4.jpg';

const Home = () => {
  const imageSources = [Muhavura, kigali1, kigali2, kigali3, kigali4]; // Array of imported images

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [imageSources.length]);

  const linearGradient = {
    background: 'linear-gradient(42deg, rgb(0, 153, 204) 30%, rgb(290, 104, 153) 30%, rgb(125, 125, 190) 90%)',
    textAlign: 'center',
    marginTop: '5px',
  };

  return (
    <div style={linearGradient}>
      <h2 style={{ fontWeight: 'bold', fontSize: '34px' }}>From hill village life to the dynamic world of tech.</h2>
      
      <p style={{ maxWidth: '700px', margin: '0 auto', color: 'black' }}>
        Born in the picturesque hills of Rwanda, a journey began that would lead to remarkable heights in the world of computer science. 
        Explore the scenic beauty that shaped the early years and discover the path that led to success.
      </p>

      <div>
        <img
          src={imageSources[currentImageIndex]}
          alt= "Mountain Muhabura"
          width="100%"
          height="500"
        />
        
      </div>
      <h2>Time is ticking! Unlock 21st-century success at our library</h2>
      <p style={{ borderRadius: "30px", backgroundColor: "rgba(100,180,192,1)", height: "60px", width: '350px', marginBottom: '10px', display: 'inline-block', textAlign: 'center', lineHeight: '50px', color: 'black' }}>
        <strong>Current Time: {currentTime.toLocaleTimeString()}</strong>
      </p>

    </div>
  );
};

export default Home;



