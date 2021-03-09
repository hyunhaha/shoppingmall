
import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from './components/views/ landing_page/landing_page';
import LoginPage from './components/views/login_page/login_page';
import NavBar from './components/views/nav_bar/nav_bar';
import RegisterPage from './components/views/register_page/register_page';
import UploadProductPage from './components/views/upload_product_page/upload_product_page';

import Auth from './hoc/auth';
function App() {
  return (
    <div className="App">
      <Suspense fallback={(<div>loading</div>)}>
        <NavBar />

        <Switch>

          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route exact path='/product/upload' component={Auth(UploadProductPage, true)} />

        </Switch>

      </Suspense>

    </div >
  );
}

export default App;
