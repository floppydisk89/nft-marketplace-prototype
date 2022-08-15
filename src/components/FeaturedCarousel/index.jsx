import React, { useState, useEffect } from 'react';

import './index.scss';
import data from '../../data/content.json';

//---------------------------------------------------------
// This is a dummy simple carousel just for visual purposes
//---------------------------------------------------------

export default function FeaturedCarousel() {
  const [content, setContent] = useState({});
  const [bannerCarouselDirection, setBanerCarouselDirection] =
    useState('forward');
  const [bannerSlidePosition, setBannerSlidePosition] = useState(0);

  const SLIDER_DURATION = 4000;

  useEffect(() => {
    setContent(data.marketplace.banner_carousel);

    const intervalId = setInterval(() => {
      slideCarousel();
    }, SLIDER_DURATION);

    return () => clearInterval(intervalId);
  }, [content, bannerSlidePosition]);

  function slideCarousel() {
    if (bannerSlidePosition === 0) {
      setBanerCarouselDirection('forward');
      setBannerSlidePosition(bannerSlidePosition + 1);
    }

    if (bannerSlidePosition === content.length - 1) {
      setBanerCarouselDirection('backwards');
      setBannerSlidePosition(bannerSlidePosition - 1);
    }

    if (bannerCarouselDirection === 'forward') {
      if (bannerSlidePosition < content.length - 1) {
        setBannerSlidePosition(bannerSlidePosition + 1);
      }
    }

    if (bannerCarouselDirection === 'backwards') {
      if (bannerSlidePosition > 0) {
        setBannerSlidePosition(bannerSlidePosition - 1);
      }
    }
  }

  return (
    <div className='featured-carousel-container'>
      {content.length && (
        <div
          className='banner-slide'
          style={{
            backgroundImage: `url('${content[bannerSlidePosition].image}')`,
          }}
        >
          <div className='banner-details'>
            <h2 className='title'>{content[bannerSlidePosition].title}</h2>
            <h3 className='subtitle'>
              {content[bannerSlidePosition].subtitle}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
