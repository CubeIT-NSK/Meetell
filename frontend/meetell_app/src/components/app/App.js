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

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/question' element={<Question />} />
          <Route path='/trips' element={<Trip />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
