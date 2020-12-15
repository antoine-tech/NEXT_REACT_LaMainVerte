import React, { useState, useEffect } from "react";
import { find, deletion } from "../../../sevices/Api";
import TrashIcon from "../../../assets/icons/trash.svg";

const GardenTab = () => {
	const [gardens, setGardens] = useState([]);

	const handleGardens = async () => {
		const response = await find("/gardens");
		setGardens(response);
	};

	return (
		<div className="align-middle inline-block min-w-full overflow-hidden bg-white px-8 pt-3 rounded-bl-lg rounded-br-lg">
			<table className="min-w-full">
				<thead>
					<tr>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
							#
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Nom
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Propriétaire
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Nbr de likes
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Localisation
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Climat
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Surface
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"></th>
					</tr>
				</thead>
				<tbody>
					{gardens.map((garden) => (
						<tr>
							<th scope="row">{garden.id}</th>
							<td>{garden.first_name}</td>
							<td>{garden.last_name}</td>
							<td>{garden.email}</td>
							<td>
								<a href="#">
									<img
										src={TrashIcon}
										alt="Delete a garden"
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

export default GardenTab;
