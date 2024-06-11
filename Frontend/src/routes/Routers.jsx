import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Singup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorsDetails';
import Myaccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';


import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';


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
        <Route 
            path="/users/profile/me" 
            element={
                <ProtectedRoute allowedRoles={['patient']}>
                    <Myaccount/>
                </ProtectedRoute>                    
            }
        />
        <Route 
            path="/doctors/profile/me" 
            element={
                <ProtectedRoute allowedRoles={['doctor']}>                    
                    <Dashboard/>
                </ProtectedRoute>    
            }
        />
    </Routes>  
};

export default Routers;