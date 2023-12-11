import React from 'react';
// import EmployeeList from './components/EmployeeList';
// import EmployeeRegister from './components/Register/EmployeeRegister';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home';
import ImageUpload from './components/ImageUpload';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import ImageGallery from './components/ImageGallery';



const App = () => {
  return (
 
    <BrowserRouter>
      <Routes>      
        {/* <Route path='/' element={<EmployeeList/>}> </Route> */}
        {/* <Route  path='/Register' element={<EmployeeRegister/>}> </Route> */}
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/signup' element={<Register/>}> </Route>
        <Route path='/home' element={<Home/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/image-upload' element={<ImageUpload/>}> </Route>
        <Route path='/image-gallery' element={<ImageGallery/>}> </Route>
        <Route path='/profile' element={<Profile/>}> </Route>
        <Route path='/profile/reset-password' element={<ResetPassword/>}> </Route>
        

        

      </Routes>
    </BrowserRouter>
  );
};

export default App;

