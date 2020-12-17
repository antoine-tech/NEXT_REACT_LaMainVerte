import React, { useState, useEffect } from "react";
import TrashIcon from "../../../assets/icons/trash.svg";

const EventTab = () => {
	const [events, setEvents] = useState([]);

	const handleEvents = async () => {
		let response = await fetch(
			"https://api-master-lamainverte.herokuapp.com/api/events",
		);
		let json = await response.json();

		setEvents(json);
	};

	useEffect(() => {
		handleEvents();
	}, []);

	return (
		<div className="align-middle inline-block min-w-full overflow-hidden bg-white px-8 pt-3 rounded-bl-lg rounded-br-lg">
			<table className="min-w-full">
				<thead>
					<tr>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
							#
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Garden_id
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Name
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Description
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Date
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"></th>
					</tr>
				</thead>
				<tbody>
					{events.map((event) => (
						<tr>
							<th scope="row">{event.id}</th>
							<td>{event.garden_id}</td>
							<td>{event.name}</td>
							<td>{event.description}</td>
							<td>{event.date}</td>
							<td>
								<a href="#">
									<img
										src={TrashIcon}
										alt="Delete an event"
										width="25"
										height="25"
										// onClick={() => deleteUser(user)}
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

export default EventTab;
