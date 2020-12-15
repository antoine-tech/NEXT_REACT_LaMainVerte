import API_BASE_URL from "./config";

const request = async (
  method,
  endpoint,
  body = null,
  authenticated = false,
  jwt_token = null,
  defaultHeaders = { "Content-Type": "application/json" },
  authHeaders = { Authorization: `${jwt_token}` }
) => {
  const headers =
    authenticated && jwt_token
      ? { ...defaultHeaders, ...authHeaders }
      : defaultHeaders;

  let options = {
    method,
    headers,
  };

  options = body ? { ...options, ...{ body: JSON.stringify(body) } } : options;

  return await fetch(API_BASE_URL + endpoint, options)
    .then((response) => response)
    .then((error) => error);
};

const create = (datas, endpoint, authenticated = false, jwt_token = null) =>
  request("POST", endpoint, datas, authenticated, jwt_token);

const update = (datas, endpoint, authenticated = true, jwt_token = null) =>
  request("PUT", endpoint, datas, authenticated, jwt_token);

const deletion = (endpoint, authenticated = true, jwt_token = null) =>
  request("DELETE", endpoint, null, authenticated, jwt_token);

const find = (endpoint, authenticated = true, jwt_token = null) =>
  request("GET", endpoint, null, authenticated, jwt_token);

const uploadToAWS = async (jwt_token, file, directory) => {
  const { post_url, get_url } = await find(
    `/upload?filename=${file.name}&fileType=${file.type}&directory=${directory}`,
    true,
    jwt_token
  ).then((resp) => resp.json());

  const headers = { "Content-Type": file.type, acl: "public-read" };
  const options = {
    method: "PUT",
    headers,
    body: file,
  };

  const uploadImageStatus = await fetch(post_url, options)
    .then((resp) => resp.status)
    .catch((err) => err);

  return uploadImageStatus === 200 ? get_url : uploadImageStatus;
};

export { request, create, update, deletion, find, uploadToAWS };
