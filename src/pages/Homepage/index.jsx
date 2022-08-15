import React from 'react';

import Navigation from '../../components/Navigation';
import FeaturedCarousel from '../../components/FeaturedCarousel';
import NftGrid from '../../components/NftGrid';

import './index.scss';

export default function Homepage() {
  return (
    <div className='homepage-container'>
      <Navigation />
      <FeaturedCarousel />
      <NftGrid />
    </div>
  );
}
