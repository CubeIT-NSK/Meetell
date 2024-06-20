import './App.css';
import { Fragment } from "react";
import Main from '../appMain/Main';
import Question from '../appQuestion/Question';
import Header from "../appHeader/Header";
import Footer from '../appFooter/Footer';
import { FooterProvider } from '../appFooter/FooterContext';
import Trip from '../appTrip/Trip';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HelloScreen from '../appHelloScreen/HelloScreen.js';
import Carousel from '../appCarousel/Carousel.js';
import PreLoader from '../appPreLoader/PreLoader.js';
import Profile from '../appProfile/Profile.js'
import Page404 from '../appPage404/Page404'
import question from '../../img/question.svg'
import rules from '../../img/rules.svg'
import manual from '../../img/manual.svg'
import smartphone from '../../img/smartphone.svg'

const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

function App() {

  const user = 'user';
  useEffect(() => {
    const imageUrls = [
      question,
      rules,
      manual,
      smartphone,
    ];

    preloadImages(imageUrls);
  }, []);

  const [hello, setHello] = useState(true);
  const [loading, setLoading] = useState(true);
  if (hello) {
    setTimeout(() => {
      setHello(false);
      if (loading) {
        setTimeout(() => {
          setLoading(false);
        }, 3000)
      }
    }, 2000);
  }
  const location = useLocation();
  return (
    <Fragment>
      <FooterProvider>
        <Header />
        <Routes>
          <Route path='/' element={
            hello ? <HelloScreen /> :
              loading ? <PreLoader /> : <Carousel />
          } />
          <Route path="/home" element={<Main />} />
          <Route path='/question' element={<Question />} />
          <Route path='/trips' element={<Trip />} />
          <Route path='/profile' element={<Profile />} />
          <Route path={`/profile/${user}`} element={<Profile />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
        {!location.pathname.startsWith('/profile') && <Footer />}
      </FooterProvider>
    </Fragment>
  );
}

export default App;
