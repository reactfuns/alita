import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import ShopProvider from './context/shop.provider';

import MainPage from './pages/mainpage';
import ExceptionPage from './pages/exception';

import config from './lib/config';

import logo from './logo.svg';
import './App.less';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <p>{config.VERSION}</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <a
        className="App-link"
        href={config.LOCAL_URL.MAIN_PAGE}
      >
        Main Page
      </a>
    </header>
  </div>
)

const AppRoute = () => {
  return (
    <ShopProvider>
      <Route path={config.LOCAL_URL.ROOT} exact           component={App}           />
      <Route path={config.LOCAL_URL.HOME_URL} exact       component={() => <Redirect to={{pathname: config.LOCAL_URL.HOME}} /> } />
      <Route path={config.LOCAL_URL.MAIN_PAGE}            component={MainPage}      />
      <Route path={`${config.LOCAL_URL.EXCEPTION}/:type`} component={ExceptionPage} />
    </ShopProvider>
  );
}

export default () => {
  useEffect(() => {
    console.log('App start!');
  }, []);

  return (
    <Router>
        <Route component={AppRoute}/>
    </Router>
  );
}
