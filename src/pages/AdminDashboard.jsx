import React, { useState } from "react";
import UserTab from "../components/Admin/UserTab/"
import GardenTab from "../components/Admin/GardenTab/"

const AdminDashboard = () => {
	const [dashboardStatus, setDashboardStatus] = useState("users");

	const switchDashboard = (x) => {
		setDashboardStatus(x);
	};

	const display = () => {
		if (dashboardStatus === "users") {
			return <UserTab />;
		} else if (dashboardStatus === "gardens") {
			return <GardenTab />;
		};

		return (
			<div className="container d-flex flex-column justify-content-center">
				<h1 className="text-center mt-4">Tableau de commande</h1>
				<div className="btn-group mt-2 mb-4" role="group">
					<button
						onClick={() => switchDashboard("users")}
						className="btn btn-secondary"
					>
						Utilisateurs
					</button>	
					<button
						onClick={() => switchDashboard("lessons")}
						className="btn btn-secondary"
					>
						Jardins
					</button>
					</div>
				{display()}
			</div>

		);
};

export default AdminDashboard;


// ./src/pages/AdminDashboard.jsx
// SyntaxError: /home/benjamin/Documents/Developpement/THP/Next/Final/REACT_LaMainVerte/src/pages/AdminDashboard.jsx: 'import' and 'export' may only appear at the top level (42:0)

//   40 | };
//   41 | 
// > 42 | export default AdminDashboard;
//      | ^
//   43 | 