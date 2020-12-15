import React, { useState } from "react";
import UserTab from "../components/Admin/UserTab/";
import GardenTab from "../components/Admin/GardenTab/";

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
		}
	};
	return (
		<div className="">
			<h1 className="">Tableau de commande</h1>
			<div className="">
				<button onClick={() => switchDashboard("users")} className="">
					Utilisateurs
				</button>
				<button onClick={() => switchDashboard("gardens")} className="">
					Jardins
				</button>
			</div>
			{display()}
		</div>
	);
};

export default AdminDashboard;
