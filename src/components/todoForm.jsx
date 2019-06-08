import { Checkbox } from "pretty-checkbox-react";
import moment from "moment";
import ContentEditable from "react-contenteditable";
import Joi from "joi-browser";
import React from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import Form from "./common/form";
import { getUser } from "../services/userService";
import todoService from "./../services/todoService";

class TodosForm extends Form {
	state = {
		todos: [],
		errors: [],
		pageSize: 5,
		currentPage: 1,
		data: { title: "" }
	};

	schema = {
		title: Joi.string()
			.min(2)
			.max(512)
			.required()
			.label("Title"),
		year: Joi.number(),
		month: Joi.number(),
		weekInYear: Joi.number()
	};

	async componentWillReceiveProps(newProps) {
		this.setState({ weekNumber: newProps.weekNumber });
		try {
			const { data: todos } = await todoService.getTodos(
				newProps.user_id,
				newProps.weekNumber
			);
			todos.reverse();
			this.setState({ todos });
		} catch (ex) {
			console.log(ex.message);
		}
	}

	shouldComponentUpdate(newProps, newState) {
		return true;
	}

	async componentWillMount() {
		const weekNumber = this.props.weekNumber;
		this.setState({ weekNumber });
	}

	async componentDidMount() {
		let user_id;
		if (this.props.user_id === undefined) return;
		else user_id = this.props.user_id;

		try {
			let user = await getUser(user_id);
			user = user.data;
			this.setState({ user });
		} catch (ex) {
			console.log(ex.message);
		}

		try {
			const { data: todos } = await todoService.getTodos(
				user_id,
				this.state.weekNumber
			);
			todos.reverse();
			this.setState({ todos });
		} catch (ex) {
			console.log(ex.message);
		}
	}

	// handle page change
	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	// handle add a new todo
	doSubmit = async () => {
		try {
			const obj = { title: this.state.data.title };
			const user_id = this.state.user._id;
			const weekNumber = this.state.weekNumber;

			obj.year = moment().format("YYYY");
			obj.month = moment().format("M");
			obj.weekInYear = weekNumber;
			obj.isDone = false;

			const { data: todo } = await todoService.postTodo(obj, user_id);
			const todos = [todo, ...this.state.todos];
			this.setState({ todos });
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}

		const data = this.state.data;
		data.title = "";
		this.setState({
			data
		});
	};

	// handle update
	handleUpdate = async todo => {
		// Optimistic Update
		const originalTodos = this.state.todos;

		const todos = [...this.state.todos];
		const index = todos.indexOf(todo);
		todos[index] = { ...todo };

		// trim the possible spaces added to the title in the ContentEditable
		todos[index].title = this.trimSpaces(todos[index].title);

		this.setState({ todos });

		try {
			await todoService.updateTodo(todo._id, todo);
		} catch (ex) {
			alert("Something went wrong while deleting the post.");
			this.setState({ todos: originalTodos });
		}
	};

	// handle delete
	handleDelete = async todo => {
		// Optimistic Delete
		const originalTodos = this.state.todos;

		const todos = this.state.todos.filter(t => t._id !== todo._id);
		this.setState({ todos });

		try {
			await todoService.deleteTodo(todo._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				alert("This todo has already been deleted.");
			}
			this.setState({ todos: originalTodos });
		}
	};

	// get the class of the span based on the number of todos
	getSpannClasses = () => {
		let classes = "badge badge-";
		classes += this.state.todos.length === 0 ? "danger" : "primary";
		return classes;
	};

	// conditionally render the number of elements in the todo list
	renderNumberOfTodoElemensts = () => {
		const { todos } = this.state;
		if (todos.length === 0)
			return <h5>There are no elements in the objective list.</h5>;
		if (todos.length === 1) {
			return (
				<h5>
					There is <span className={this.getSpannClasses()}>1</span> element in
					the objective list.
				</h5>
			);
		} else {
			return (
				<h5>
					There are{" "}
					<span className={this.getSpannClasses()}>{todos.length}</span>{" "}
					elements in the objective list.
				</h5>
			);
		}
	};

	handleContentEditable = e => {
		const errors = { ...this.state.errors };
		const todos = this.state.todos;
		const index = todos.findIndex(
			todo => todo._id === e.currentTarget.dataset.column
		);
		todos[index].title = e.target.value;
		const obj = { title: e.target.value };
		const { error } = Joi.validate(obj, this.schema);
		const errorMessage = error ? error.details[0].message : null;

		if (errorMessage) {
			errors["title"] = errorMessage;
			errors["id"] = todos[index]._id;
		} else delete errors["title"];

		this.setState({ todos, errors });
	};

	// disable new lines in the ContentEditable
	disableNewlines = event => {
		const keyCode = event.keyCode || event.which;

		if (keyCode === 13) {
			event.returnValue = false;
			if (event.preventDefault) event.preventDefault();
		}
	};

	// trim the spaces in the ContentEditable
	trimSpaces = string => {
		return string
			.replace(/&nbsp;/g, "")
			.replace(/&amp;/g, "&")
			.replace(/&gt;/g, ">")
			.replace(/&lt;/g, "<");
	};

	handleCheckBox = async todo => {
		todo.isDone = !todo.isDone;
		const originalTodos = this.state.todos;
		const todos = [...this.state.todos];
		const index = todos.indexOf(todo);
		todos[index] = { ...todo };
		this.setState({ todos });

		// call the server and
		try {
			await todoService.updateStatus(todo._id, todo.isDone);
			//  console.log("newTodo ", newTodo);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				alert("This goal has already been deleted.");
			}
			this.setState({ todos: originalTodos });
		}
	};

	render() {
		const { length: count } = this.state.todos;
		const { pageSize, currentPage, todos: allTodos } = this.state;

		const todos = paginate(allTodos, currentPage, pageSize);

		return (
			<React.Fragment>
				{this.renderNumberOfTodoElemensts()}
				{this.state.todos.length !== 0 && (
					<React.Fragment>
						<table className="table">
							<thead>
								<tr>
									<th>#</th>
									<th style={{ textAlign: "center" }}>Title</th>
									<th />
									<th />
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{todos.map(todo => (
									<tr key={todo._id}>
										<td>{this.state.todos.indexOf(todo) + 1}</td>
										<td>
											<ContentEditable
												html={todo.title}
												data-column={todo._id}
												className="content-editable"
												onChange={this.handleContentEditable}
												onKeyPress={this.disableNewlines}
											/>
											{this.state.errors.title &&
												this.state.errors.id === todo._id && (
													<div className="alert alert-danger">
														{this.state.errors.title}
													</div>
												)}
										</td>
										<td style={{ textAlign: "center" }}>
											<button
												onClick={() => this.handleUpdate(todo)}
												className="btn btn-sm btn-secondary"
												disabled={
													this.state.errors.title &&
													this.state.errors.id === todo._id
												}
											>
												Edit
											</button>
										</td>
										<td style={{ textAlign: "center" }}>
											<button
												onClick={() => this.handleDelete(todo)}
												className="btn btn-sm btn-danger"
											>
												Delete
											</button>
										</td>
										<td style={{ paddingLeft: "2.5%" }}>
											<Checkbox
												shape="round"
												color="success"
												icon={<i className="mdi mdi-check" />}
												animation="jelly"
												onChange={() => this.handleCheckBox(todo)}
												checked={todo.isDone}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<Pagination
							itemsCount={count}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</React.Fragment>
				)}
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Insert New Objective", false)}
					{this.renderButton("Submit")}
					<div style={{ height: "70px" }} />
				</form>
			</React.Fragment>
		);
	}
}

export default TodosForm;
