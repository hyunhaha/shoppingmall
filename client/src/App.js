
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from './components/views/ landing_page/landing_page';
import LoginPage from './components/views/login_page/login_page';
import RegisterPage from './components/views/register_page/register_page';
import Auth from './hoc/auth';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
        </Switch>
      </BrowserRouter>
    </div >
  );
}

export default App;
