
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from './components/views/ landing_page/landing_page';
import LoginPage from './components/views/login_page/login_page';
import RegisterPage from './components/views/register_page/register_page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/register'>
            <RegisterPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
