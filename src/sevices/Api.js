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

const create = (datas, endpoint, authenticated = false, jwt_token = null) => {
  return request("POST", endpoint, datas, authenticated, jwt_token);
};
const update = (datas, endpoint, authenticated = true, jwt_token = null) => {
  return request("PUT", endpoint, datas, authenticated, jwt_token);
};
const deletion = (endpoint, authenticated = true, jwt_token = null) => {
  return request("DELETE", endpoint, null, authenticated, jwt_token);
};
const find = (endpoint, authenticated = true, jwt_token = null) => {
  return request("GET", endpoint, null, authenticated, jwt_token);
};

export { request, create, update, deletion, find };
