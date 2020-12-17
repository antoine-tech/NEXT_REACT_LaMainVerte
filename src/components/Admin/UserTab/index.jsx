import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usersDatas } from "../../../requests/user";
import TrashIcon from "../../../assets/icons/trash.svg";

const UserTab = () => {
	const [users, setUsers] = useState([]);
	const [show, setShow] = useState(false);

	const handleUsers = async () => {
		const response = await fetch(
			"https://api-master-lamainverte.herokuapp.com/api/users",
		);
		const json = await response.json();

		setUsers(json);
	};

	// const deleteUser = async (user_id) => {
	// 	await deletion(`/users/${user_id}`, true, Cookies.get("jwt_token"));
	// 	handleUsers();
	// };

	useEffect(() => {
		handleUsers();
	}, [show]);

	useEffect(() => {
		console.log("coucou");
		console.log(users);
	}, [users]);

	return (
		<div className="align-middle inline-block min-w-full overflow-hidden bg-white px-8 pt-3 rounded-bl-lg rounded-br-lg">
			<table className="min-w-full">
				<thead>
					<tr>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
							#
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							First name
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Last name
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Email
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"></th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<tr>
							<th scope="row">{user.id}</th>
							<td>{user.first_name}</td>
							<td>{user.last_name}</td>
							<td>{user.email}</td>
							<td>
								<a href="#">
									<img
										src={TrashIcon}
										alt="Delete a user"
										width="25"
										height="25"
										// onClick={() => deleteUser(user.id)}
									/>
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTab;
