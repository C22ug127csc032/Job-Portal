import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Pages/User/Signup';
import Login from './Pages/User/Login';
import Home from './Dashboard/Home';
import CreateUserProfile from './Pages/UserProfile/CreateUserProfile';
import UpdateUserProfile from './Pages/UserProfile/UpdateUserProfile';
import ViewProfile from './Pages/UserProfile/ViewProfile';
import EmployerSignup from './Pages/Employer/EmployerSignup';
import EmployerLogin from './Pages/Employer/EmployerLogin';
import EmployerUpdate from './Pages/Employer/EmployerUpdate';
import EmployerProfile from './Pages/Employer/EmployerProfile';
import ForgotPassword from './Pages/User/ForgotPassword';
import ResetPassword from './Pages/User/ResetPassword';
import EmployerForgotPassword from './Pages/Employer/EmployerForgotPassword';
import EmployerResetPassword from './Pages/Employer/EmployerResetPassword';
import CreateJob from './Pages/Jobs/CreateJob';
import UpdateJob from './Pages/Jobs/UpdateJob';
import MyJob from './Pages/Jobs/MyJob';
import MyApplication from './Pages/Applications/MyApplication';
import GetAllApplication from './Pages/Applications/GetAllApplication';
import GetEmployerApplication from './Pages/Applications/GetEmployerApplication'
import EmployerDashboard from './Dashboard/EmployerDashboard';
import PendingJobs from './Pages/Admin/PendingJobs';
import AdminAllJobs from './Pages/Admin/AdminAllJobs';
import AdminDashboard from './Dashboard/AdminDashboard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/create-profile" element={<CreateUserProfile/>}/>
        <Route path="/update-profile" element={<UpdateUserProfile/>}/>
        <Route path="/view-profile" element={<ViewProfile/>}/>
        <Route path="/employer-signup" element={<EmployerSignup/>}/>
        <Route path="/employer-login" element={<EmployerLogin/>}/>
        <Route path="/employer-update" element={<EmployerUpdate/>}/>
        <Route path="/employer-profile" element={<EmployerProfile/>}/>
        <Route path="/employer-forgot-password" element={<EmployerForgotPassword/>}/>
        <Route path="/employer-reset-password/:token" element={<EmployerResetPassword/>}/>
        <Route path="/create-job" element={<CreateJob/>}/>
        <Route path="/my-job" element={<MyJob/>}/>
        <Route path="/update-job/:id" element={<UpdateJob/>}/>
        <Route path="/my-application" element={<MyApplication/>}/>
        <Route path="/all-application" element={<GetAllApplication/>}/>
        <Route path="/employer-application" element={<GetEmployerApplication/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin-pending-job" element={<PendingJobs />} />
        <Route path="/admin-all-job" element={<AdminAllJobs />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard/>}/>  
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App