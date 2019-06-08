import http from "./httpService";

const apiEndpoint = "/users";

/*
 * register a new user
 */
export function register(user) {
  return http.post(apiEndpoint + "/register", {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password
  });
}

/*
 * get a user
 */
export function getUser(user_id) {
  return http.get(apiEndpoint + "/" + user_id)
}

/*
* update a user
*/
export function updateUser(user_id, obj) {
  return http.put(apiEndpoint + "/update/" + user_id, obj);
}

export default {
  register,
  getUser,
  updateUser
};
