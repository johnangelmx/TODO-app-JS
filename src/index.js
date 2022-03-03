import "./styles.css";
import { Todo, TodoList } from "./classes"
import { crearTodoHTLM } from "./js/componentes";


// Creando el arreglo de Todos
export const todoList = new TodoList()
todoList.todos.forEach(element => crearTodoHTLM(element));

console.log(todoList.todos)