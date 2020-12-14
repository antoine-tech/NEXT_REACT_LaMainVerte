import { Route, Redirect } from "react-router-dom";
import checkAuth from '../checkAuth';

const UnAuthRoute = ({ current_user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth(current_user) ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default UnAuthRoute;
