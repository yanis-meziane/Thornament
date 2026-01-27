import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register/Register'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
