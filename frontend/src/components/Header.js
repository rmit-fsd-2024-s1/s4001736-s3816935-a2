import React from 'react';
import headerImage from "../images/organic_food.jpeg";   // Find an image for header

export default function Header() {
  return (
    // Make text go on top of image
    <div className="headerContainer"> 
      <div className='headerText'>
        SOIL
      </div>
      <img src={headerImage} className="headerImage" alt="soil"></img>
    </div>
  )
}
