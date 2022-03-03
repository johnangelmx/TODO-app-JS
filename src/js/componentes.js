import { todoList } from ".."
import { Todo } from "../classes"

const ulTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnBorrar = document.querySelector('.clear-completed')
const ulFiltros = document.querySelector('.filters')
const anchorfiltros = document.querySelectorAll('.filtro')


export const crearTodoHTLM = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado && 'completed'}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado && 'checked'}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`
    // ulTodoList.innerHTML = htmlTodo

    const div = document.createElement('div')
    div.innerHTML = htmlTodo

    ulTodoList.append(div.firstElementChild)

    return div.firstElementChild

}

// txtInput.addEventListener('keyup', (event) => {
//     console.log(event)
// })

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode == 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo)
        crearTodoHTLM(nuevoTodo)
        txtInput.value = ''
    }
})
ulTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; //input , label , button 
    const todoElemento = event.target.parentElement.parentElement //referencia al li 
    const todoId = todoElemento.getAttribute('data-id') //referencia al ID

    if (nombreElemento.includes('input')) { //click marcar completado
        todoList.marcarCompletado(todoId)
        todoElemento.classList.toggle('completed')

    } else if (nombreElemento.includes('button')) { //click eliminar tarea
        todoList.eliminarTodo(todoId)
        ulTodoList.removeChild(todoElemento)
    }


})
btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados()
    for (let i = ulTodoList.children.length - 1; i >= 0; i--) {
        const elemento = ulTodoList.children[i]
        if (elemento.classList.contains("completed")) {
            ulTodoList.removeChild(elemento)
        }
    }
})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text
    if (!filtro) { return }
    anchorfiltros.forEach(element => { element.classList.remove('selected') })
    event.target.classList.add('selected')

    for (const elemento of ulTodoList.children) {
        elemento.classList.remove('hidden')
        const completado = elemento.classList.contains('completed')
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden')
                }
                break;
        }
    }
})