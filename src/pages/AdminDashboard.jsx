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
			<div className="flex justify-center items-baseline flex-wrap">
				<button
					onClick={() => switchDashboard("users")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l h-12"
				>
					Users
				</button>
				<button
					onClick={() => switchDashboard("gardens")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Gardens
				</button>
				<button
					onClick={() => switchDashboard("gardens")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Garden comments
				</button>
				<button
					onClick={() => switchDashboard("gardens")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Events
				</button>
				<button
					onClick={() => switchDashboard("gardens")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Posts
				</button>
				<button
					onClick={() => switchDashboard("gardens")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Post comments
				</button>
				<button
					onClick={() => switchDashboard("gardens")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12 rounded-r"
				>
					Testimonies
				</button>
			</div>
			{display()}
		</div>
	);
};

export default AdminDashboard;
