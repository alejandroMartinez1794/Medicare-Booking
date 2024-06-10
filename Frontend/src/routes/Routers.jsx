import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Singup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorsDetails';

import {Routes, Route} from 'react-router-dom'


const Routers = () => {
    return <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/home" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:id" element={<DoctorDetails/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Signup/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Services" element={<Services/>}/>
    </Routes>  
};

export default Routers;