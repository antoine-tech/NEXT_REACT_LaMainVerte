import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

/* ===== INTL ========
import { IntlProvider } from 'react-intl';
import textFr from './translation/fr';
import textEn from './translation/en';

const text = {
  fr: textFr,
  en: textEn,
}
*/

const App = () => {
  /* === INTL ===
  const [language, setLanguage] = useState('fr');
  */


  const checkAuth = () => {
    return false
  }
  
  //Private routes who do not need authentification
  const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
          <Component {...props} />
        )
    )} />
  )

  //Private routes who do need authentification
  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    // <IntlProvider locale={language} messages={text[language]}>
    <div className="App">
      <Router>
        <Navbar />  
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>        
            <UnAuthRoute path="/login" component={Login} />
            <UnAuthRoute path="/register" component={Signup} />
            <AuthRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
    // </ IntlProvider>
  );
}

export default App;
