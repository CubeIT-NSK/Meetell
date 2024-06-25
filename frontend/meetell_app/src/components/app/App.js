import './App.css';
import { Fragment } from "react";
import Main from '../appMain/Main';
import Question from '../appQuestion/Question';
import Header from "../appHeader/Header";
import Footer from '../appFooter/Footer';
import { FooterProvider } from '../appFooter/FooterContext';
import Trip from '../appTrip/Trip';
import AddTripWalk from '../appAddTripWalk/AddTripWalk';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HelloScreen from '../appHelloScreen/HelloScreen.js';
import Carousel from '../appCarousel/Carousel.js';
import PreLoader from '../appPreLoader/PreLoader.js';
import Profile from '../appProfile/Profile.js';
import ProfileOther from '../appProfile/ProfileOther.js';
import Page404 from '../appPage404/Page404';
import question from '../../img/question.svg';
import rules from '../../img/rules.svg';
import manual from '../../img/manual.svg';
import smartphone from '../../img/smartphone.svg';
import Finished from '../appFinished/Finished.js';

const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

function App() {
  useEffect(() => {
    const imageUrls = [
      question,
      rules,
      manual,
      smartphone,
    ];

    preloadImages(imageUrls);
  }, []);

  useEffect(() => {
    let user_id = localStorage.getItem('user_id');
    let user_name = localStorage.getItem('username');
    fetch('api/user?id=' + user_id + "&username=" + user_name)
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem('user_info', JSON.stringify(json));
      });
  }, [])

  const [hello, setHello] = useState(true);
  const [loading, setLoading] = useState(true);
  const [rateRoute, setRate] = useState(null);
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
         <Route path="/home" element={<Main setRate={setRate} />} />
         <Route path="/rate_route" element={<Finished rateRoute={rateRoute} />} />
          <Route path='/question' element={<Question />} />
          <Route path='/trips' element={<Trip />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:userId' element={<ProfileOther />} />
          <Route path='/*' element={<Page404 />} />
          <Route path='/addTrip' element={<AddTripWalk />} />
        </Routes>
        {!location.pathname.startsWith('/profile') && <Footer />}
      </FooterProvider>
    </Fragment>
  );
}

export default App;
