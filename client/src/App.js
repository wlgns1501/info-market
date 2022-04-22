import logo from '../src/images/logo.png';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './component/Header';
import HeaderNonMember from './component/HeaderNonMember';
import Footer from './component/Footer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        {/* <Switch >
          <Route exact path="/"> */}
        <Header />
        <Footer />
        {/* </Route> */}
        {/* <HeaderNonMember /> */}
        {/* </Switch> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
