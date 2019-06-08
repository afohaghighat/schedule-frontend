import http from "./httpService";

const apiEndpoint = "/todos";

/*
 * GET all the todos of the current user
 */
export function getTodos(user_id, weekNumber) {
  return http.get(apiEndpoint + "/" + user_id + "/" + weekNumber);
}

/*
 * GET all the todos of the current user
 */
export function getAllTodos(user_id) {
  return http.get(apiEndpoint + "/" + user_id);
}

/*
 * POST a new todo
 */
export function postTodo(todoObj, user_id) {
  return http.post(apiEndpoint + "/new/" + user_id, todoObj);
}

/*
 * UPDATE a todo
 */
export function updateTodo(todo_id, todoObj) {
  return http.put(apiEndpoint + "/update-title/" + todo_id, todoObj);
}

/*
 * UPDATE the status of a todo
 */
export function updateStatus(todo_id, isDone) {
  return http.put(apiEndpoint + "/update-status/" + todo_id, isDone);
}

/*
 * DELETE a todo
 */
export function deleteTodo(todo_id) {
  return  http.delete(apiEndpoint + "/delete/" + todo_id);
}

export default {
  getTodos,
  getAllTodos,
  postTodo,
  updateTodo,
  deleteTodo,
  updateStatus
};
