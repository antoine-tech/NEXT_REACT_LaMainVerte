import React from 'react';
import { find, update } from "../../sevices/Api";


const uploadToAWS = async(jwt_token, file, directory) => {
  try {
    const { post_url, get_url } = await find(`/upload?filename=${file.name}&fileType=${file.type}&directory=${directory}`,
      true,
      jwt_token
    ).then((resp) => resp.json());
    const headers = {"Content-Type": file.type,'acl': 'public-read'};
    const options = {
      method: "PUT",
      headers,
      body: file
    };
    console.log(options);
    const { get_url: final_url } = await fetch(post_url, options)
      .then((resp) => resp.json())
      .catch((err) => err);
    return final_url;
  }
  catch (error) {
    return error;
  }
}

/*
const updateProject = (form, auth_token, fileToUpload) => async(dispatch) => {
  try {
    if (fileToUpload) {
      const image_url = await uploadToAWS(auth_token, fileToUpload, APIHelpers.projectImagePath())
      form.set("image_url", image_url);
    }

    const params = Object.fromEntries(form);
    await API.put(`/projects/${params.id}`, params, {headers: APIHelpers.authorizationHeaders(auth_token)})
    dispatch(flash(`${form.get("title")} was updated successfully`));
    dispatch(setProjectToEdit(null));
  } catch(error) {
    dispatch(flash(`Oops! We couldn't update that project, please try again`));
  }
};
*/

export { uploadToAWS };
