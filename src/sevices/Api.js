import API_BASE_URL from "./config";

class Api {
  constructor(base_url = API_BASE_URL, endpoint) {
    this.base_url = base_url;
    this.endpoint = endpoint;
  }
  // request method for all requests
  async request(
    method,
    body = null,
    authenticated = false,
    jwt_token = null,
    headers = { "Content-Type": "application/json" },
    authHeaders = { Authorization: `${jwt_token}` }
  ) {
    // adding headers to fetch
    headers =
      authenticated && jwt_token ? { ...headers, ...authHeaders } : headers;

    // constructing array of options to pass it to fetch
    let options = {
      method: method,
      headers: headers,
    };

    // dealing with options body if needed (POST, PUT)

    options = body
      ? { ...options, ...{ body: JSON.stringify(body) } }
      : options;

    // executing call to api
    let api_response = await fetch(this.endpoint, options)
      .then((response) => response)
      .then((error) => error);

    // return api response
    return api_response;
  }

  // WRAPPER POST CREATE METHOD
  create(datas, endpoint, authenticated = false, jwt_token = null) {
    this.endpoint = this.base_url + endpoint;
    return this.request("POST", datas, authenticated, jwt_token);
  }
  // WRAPPER PUT UPDATE METHOD
  update(datas, endpoint, authenticated = true, jwt_token = null) {
    this.endpoint = this.base_url + endpoint;
    return this.request("PUT", datas, authenticated, jwt_token);
  }
  // WRAPPER DELETE METHOD
  delete(endpoint, authenticated = true, jwt_token = null) {
    this.endpoint = this.base_url + endpoint;
    return this.request("DELETE", null, authenticated, jwt_token);
  }
  // WRAPPER FIND METHOD
  find(endpoint, authenticated = true, jwt_token = null) {
    this.endpoint = this.base_url + endpoint;
    return this.request("GET", null, authenticated, jwt_token);
  }
}

export default Api;
