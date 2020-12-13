import { Route, Redirect } from "react-router-dom";
import checkAuth from "../checkAuth";
const AuthRoute = ({ current_user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth(current_user) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default AuthRoute;
