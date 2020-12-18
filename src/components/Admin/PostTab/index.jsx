import React, { useState, useEffect } from "react";
import { getAdminData, deleteContent } from "../../../requests/admin";
import TrashIcon from "../../../assets/icons/trash.svg";
import useJwtToken from "../../../hooks/useJwtToken";

const PostTab = () => {
	const [posts, setPosts] = useState([]);
	const { getJwtToken } = useJwtToken();

	const handlePosts = async () => {
		const data = await getAdminData(getJwtToken);
		setPosts(data.posts);
	};

	useEffect(() => {
		handlePosts();
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
							Title
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Description
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Date
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Likes
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"></th>
					</tr>
				</thead>
				<tbody>
					{posts?.map((post) => (
						<tr>
							<th scope="row">{post.id}</th>
							<td>{post.garden_id}</td>
							<td>{post.title}</td>
							<td>{post.content}</td>
							<td>{post.updated_at}</td>
							<td>{post.likes}</td>
							<td>
								<a href="#">
									<img
										src={TrashIcon}
										alt="Delete a post"
										width="25"
										height="25"
										onClick={async () => {
											await deleteContent("posts", post.id, getJwtToken);
											handlePosts();
										}}
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

export default PostTab;
