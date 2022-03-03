import { Todo } from "./todo.class"

export class TodoList {

    constructor() {
        // this.todos = []
        this.cargarLS()

    }
    nuevoTodo(todo) {
        this.todos.push(todo)
        this.guardarLS()

    }
    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)
        this.guardarLS()
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado
                this.guardarLS()
                break
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado)
        this.guardarLS()
    }
    guardarLS() {
        // localStorage.setItem('mi-key','ABC1234')
        localStorage.setItem('todo', JSON.stringify(this.todos))

    }
    cargarLS() {
        //     if (localStorage.getItem('todo')) {
        //         this.todos = JSON.parse(localStorage.getItem('todo'))
        //     } else {
        //         this.todos = []

        //     }

        // }
        this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
        this.todos = this.todos.map(obj => Todo.fromJson(obj))

    }

}