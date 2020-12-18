import React, { useState, useEffect } from "react";
import TrashIcon from "../../../assets/icons/trash.svg";

const GardenTab = () => {
	const [gardens, setGardens] = useState([]);

	const handleGardens = async () => {
		let response = await fetch(
			"https://api-master-lamainverte.herokuapp.com/api/gardens",
		);
		let json = await response.json();

		setGardens(json);
	};

	useEffect(() => {
		handleGardens();
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
							Name
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Owner (user_id)
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Likes
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Location
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Climate
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Area (m²)
						</th>
					</tr>
				</thead>
				<tbody>
					{gardens.map((garden) => (
						<tr>
							<th scope="row">{garden.id}</th>
							<td>{garden.name}</td>
							<td>{garden.user_id}</td>
							<td>{garden.likes}</td>
							<td>{garden.location_id}</td>
							<td>{garden.climate_id}</td>
							<td>{garden.area}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GardenTab;
