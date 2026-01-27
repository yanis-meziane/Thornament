import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register/Register'
import Login from './Login/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
