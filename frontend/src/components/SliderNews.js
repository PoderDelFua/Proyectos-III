import { useState } from 'react';



const slides = [
  '/slides/slide1.jpg',
  '/slides/slide2.jpg',
  '/slides/slide3.jpg',
];
const slideTexts = [
  "NOTICIA IMPORTANTE 1",
  "NOTICIA IMPORTANTE 2",
  "NOTICIA IMPORTANTE 3",
];

const SliderNews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider">
      <div className="slide">
        <img src={slides[currentSlide]} alt={`Slide ${currentSlide}`} className="image" />
        <div className="text-overlay">
          <p>{slideTexts[currentSlide]}</p>
        </div>
        <div className="overlay">
          <button className="overlayButton" onClick={prevSlide}>{'<'}</button>
          <button className="overlayButton" onClick={nextSlide}>{'>'}</button>
        </div>
      </div>
      <style jsx>{`
        .slider {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .slide {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .overlayButton {
          background: transparent;
          color: white;
          border: none;
          font-size: 24px;
          cursor: pointer;
          z-index: 3;
          margin: 0 10px;
        }

        .text-overlay {
          position: absolute;
          font-size: 20px;
          font-weight: bold;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          color: white;
        }

        .text-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: -1;
          border-radius: 20px;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default SliderNews;
