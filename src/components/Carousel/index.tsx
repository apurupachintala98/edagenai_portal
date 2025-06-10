import React, { useState, ReactNode, Children, useRef } from 'react';
import './Carousel.css'; // We'll create this CSS file

interface CarouselProps {
  width: number;
  children: ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ width, children }) => {  
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  // Ensure children is an array and flatten if necessary
  const validChildren = Children.toArray(children);

  const totalPages = Math.ceil(validChildren.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleItems = validChildren.slice(startIndex, endIndex);

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="carousel-container" style={{maxWidth: width}}>
      <div className="carousel-track" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
        {/*
          We need to wrap visibleItems in a container that represents a 'page'
          This makes the translateX work correctly for showing 3 at a time.
          Each 'page' will have a width of 100% relative to the carousel-viewport
        */}
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div key={pageIndex} className="carousel-page">
            {validChildren.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)}
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentPage === index ? 'active' : ''}`}
            onClick={() => goToPage(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;