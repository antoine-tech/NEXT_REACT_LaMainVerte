import React, { useState, useEffect } from "react";
import { getAdminData, deleteContent } from "../../../requests/admin";
import TrashIcon from "../../../assets/icons/trash.svg";
import useJwtToken from "../../../hooks/useJwtToken";

const PostCommentTab = () => {
	const [postComments, setPostComments] = useState([]);
	const { getJwtToken } = useJwtToken();

	const handlePostComments = async () => {
		const data = await getAdminData(getJwtToken);
		setPostComments(data.post_comments);
	};

	useEffect(() => {
		handlePostComments();
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
							Post_id
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							User_id
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
							Content
						</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"></th>
					</tr>
				</thead>
				<tbody>
					{postComments?.map((postComment) => (
						<tr>
							<th scope="row">{postComment.id}</th>
							<td>{postComment.post_id}</td>
							<td>{postComment.user_id}</td>
							<td>{postComment.content}</td>
							<td>
								<a href="#">
									<img
										src={TrashIcon}
										alt="Delete a post comment"
										width="24"
										height="24"
										onClick={async () => {
											await deleteContent(
												"post_comments",
												postComment.id,
												getJwtToken,
											);
											handlePostComments();
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

export default PostCommentTab;
