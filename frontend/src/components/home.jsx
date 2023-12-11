import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from './component/Button';
import ImageGallery from './ImageGallery';

const Home = () => {
  return (
    <>
    <Navbar/>
    <Button buttonName='Add Image'/>
    <ImageGallery/>
   </>
  );
};

export default Home;