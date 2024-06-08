import './App.css';
import { Fragment } from "react";
import Main from '../appMain/Main';
import Question from '../appQuestion/Question';
import Header from "../appHeader/Header";
import Footer from '../appFooter/Footer';
import Trip from '../appTrip/Trip';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React, { useState } from 'react';
import HelloScreen from '../appHelloScreen/HelloScreen.js';
import Carousel from '../appCarousel/Carousel.js';
import PreLoader from '../appPreLoader/PreLoader.js';

function App() {
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
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={
            hello ? <HelloScreen id="helloscreen"/> :
            loading ? <PreLoader/> : <Carousel/>
          }/>
          <Route path="/home" element={<Main />} />
          <Route path='/question' element={<Question />} />
          <Route path='/trips' element={<Trip />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
