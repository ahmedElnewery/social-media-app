import axios from "axios";
export function getProfile(username, token, request) {
  request = axios.CancelToken.source();

  return axios.post(`/profile/${username}`, token, {
    cancelToken: request.token,
  });
}

