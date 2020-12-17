import React, { useState, useEffect } from "react";
import TrashIcon from "../../../assets/icons/trash.svg";

const GardenCommentTab = () => {
	const [gardensComments, setGardenComments] = useState([]);

	const handleGardenComments = async () => {
		let response = await fetch(
			"https://api-master-lamainverte.herokuapp.com/api/garden_comments",
		);
		let json = await response.json();

		setGardenComments(json);
	};

	useEffect(() => {
		handleGardenComments();
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
							User_id
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Content
						</th>
					</tr>
				</thead>
				<tbody>
					{gardensComments.map((gardenComment) => (
						<tr>
							<th scope="row">{gardenComment.id}</th>
							<td>{gardenComment.garden_id}</td>
							<td>{gardenComment.user_id}</td>
							<td>{gardenComment.content}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GardenCommentTab;
