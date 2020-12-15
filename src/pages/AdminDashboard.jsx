import React, { useState } from "react";
import UserTab from "../components/Admin/UserTab/";
import GardenTab from "../components/Admin/GardenTab/";
import GardenCommentTab from "../components/Admin/GardenCommentTab/";
import EventTab from "../components/Admin/EventTab/";
import PostTab from "../components/Admin/PostTab/";
import PostCommentTab from "../components/Admin/PostCommentTab/";
import TestimonyTab from "../components/Admin/TestimonyTab/";

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
		} else if (dashboardStatus === "gardensComments") {
			return <GardenCommentTab />;
		} else if (dashboardStatus === "events") {
			return <EventTab />;
		} else if (dashboardStatus === "posts") {
			return <PostTab />;
		} else if (dashboardStatus === "postComments") {
			return <PostCommentTab />;
		} else if (dashboardStatus === "testimonies") {
			return <TestimonyTab />;
		}
	};
	return (
		<div className="">
			<h1 className="flex justify-center">Dashboard administrateur</h1>
			<div className="flex justify-center items-baseline flex-wrap mt-8">
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
					onClick={() => switchDashboard("gardensComments")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Garden comments
				</button>
				<button
					onClick={() => switchDashboard("events")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Events
				</button>
				<button
					onClick={() => switchDashboard("posts")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Posts
				</button>
				<button
					onClick={() => switchDashboard("postComments")}
					className="bg-blue-300 hover:bg-blue-400 border-b-4 border-blue-400 text-gray-800 font-bold py-2 px-4 h-12"
				>
					Post comments
				</button>
				<button
					onClick={() => switchDashboard("testimonies")}
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
