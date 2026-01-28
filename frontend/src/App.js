import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register/Register'
import Login from './Login/Login'
import Main from './Main/Main'
import Tournament from './Tournament/Tournament'
import Phase from './Phase/Tournament'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Main />}/>
          <Route path='/tournament' element={<Tournament />}/>
          <Route path='/phase' element={<Phase />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
