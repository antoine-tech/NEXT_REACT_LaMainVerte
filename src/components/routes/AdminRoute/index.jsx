import { Route, Redirect } from "react-router-dom";
import checkAuth from "../checkAuth";
const AdminRoute = ({ current_user, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			checkAuth(current_user) && current_user.is_admin ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/news_feed" }} />
			)
		}
	/>
);

export default AdminRoute;
