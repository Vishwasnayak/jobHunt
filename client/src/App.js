import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from '../src/pages/landing/landing';
import Register from '../src/pages/register/register';
import {AllJob,Profile,AddJob,SharedLayout,Stats} from './pages/dashboard'
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
        <ProtectedRoute>
        <SharedLayout/>
        </ProtectedRoute>
        }>
         <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJob/>}/>
          <Route path='add-job' element={<AddJob/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
        <Route exact path="/landing" element={<Landing/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path='*' element={<Landing />} /> */}
      </Routes>
      </BrowserRouter>
    
     </>
  );
}

export default App;
