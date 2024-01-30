import React from 'react';
import './App.css';
import{Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Details from './components/Details' 
import Data from './components/Data' 
export default function App() {
  return (
    <>
      <Routes>
      <Route path ='/'element ={<Home/>}/>
       <Route path ='/Details'element ={<Details/>}/>
      <Route path ='/Data'element ={<Data/>}/>   
      </Routes>
    </>
  );
}
