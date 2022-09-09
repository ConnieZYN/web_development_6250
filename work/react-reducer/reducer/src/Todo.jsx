import { useState, useContext } from 'react';
import { fetchAddTodo, fetchDeleteTodo, fetchUpdateTodo } from './services.js';
import TodoContext from './Context.js';

export default function Todo() {
  const { state, actions } = useContext(TodoContext);
  const [ newTodo, setNewTodo ] = useState('');
  const todos = state.todos;

  function handleAddTodo() {
    actions.loading();
    fetchAddTodo(newTodo)
    .then(result => {
      todos[result.id] = result;
      actions.updateTodos(todos);
      setNewTodo('');
      actions.setErrorMessage('');
    })
    .catch(err => {
      actions.setErrorMessage(err);
    })
    .finally(() => {
      actions.doneLoading();
    })
  }

  function handleDeleteTodo(id) {
    actions.loading();
    fetchDeleteTodo(id)
    .then(result => {
      delete todos[id];
      actions.updateTodos(todos);
      actions.setErrorMessage('');
    })
    .catch(err => {
      actions.setErrorMessage(err);
    })
    .finally(() => {
      actions.doneLoading();
    })
  }
  
  function handleUpdateTodo(id) {
    const todo = todos[id];
    actions.loading();
    fetchUpdateTodo(id, { done: !todo.done })
    .then(result => {
      actions.toggleTodo(id);
      actions.setErrorMessage('');
    })
    .catch(err => {
      actions.setErrorMessage(err);
    })
    .finally(() => {
      actions.doneLoading();
    })
  }

  function handleInputChange(event) {
    setNewTodo(event.target.value);
  }

  function renderTodoItem(todo) {
    const isDoneClass = todo.done ? "todo__text--complete" : "";
    return (
    <li className="todo" key={todo.id}>
        <label>
          <input
            className="todo__toggle"
            type="checkbox"
            checked = {todo.done === true}
            onChange = {() => handleUpdateTodo(todo.id)}
          />
          <span
            className= {"todo__toggle todo__text " + isDoneClass}
          >
            {todo.task}
          </span>
        </label>
        <button
          className="todo__delete"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          &#10060;
        </button>
      </li>);
  }

  if (state.isLoggedIn !== true) {
    return (null);
  } else {
    return (
      <div>
        <ul className="todos">
          {
            Object.values(todos).map(
              todo => renderTodoItem(todo)
            )
          }
        </ul>
        <input className="to-add" value={newTodo} onChange={(event) => handleInputChange(event)} />
        <button type="button" className="add" onClick={() => handleAddTodo()}>Add</button>
      </div>
    );

  }
}