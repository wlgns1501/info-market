import logo from '../src/images/logo.png';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from './pages/Login';
import Tos from './pages/Tos'
import Signup from './pages/Signup'

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes >
          <Route path='/login' element={<Login />} />
        </Routes>
        <Routes >
          <Route path='/tos' element={<Tos />} />
        </Routes>
        <Routes >
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
