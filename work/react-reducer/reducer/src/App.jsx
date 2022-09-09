import { useEffect, useState } from 'react';
import { fetchSession, fetchTodos } from './services.js';
import Login from './Login.jsx';
import Todo from './Todo.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import './todo.css';
import { useReducer } from 'react';
import reducer from './Reducer.js';
import TodoContext from './Context.js';

function App() {

  const initialState = {
    isLoading: false,
    isLoggedIn: false,
    todos: {},
  }

  const [ state, dispatcher ] = useReducer(reducer, initialState);

  const login = (username) => dispatcher({type: 'login', username});
  const logout = () => dispatcher({type: 'logout'});
  const toggleTodo = (id) => dispatcher({type: 'toggleTodo', id});
  const updateTodos = (todos) => dispatcher({type: 'updateTodos', todos});
  const setErrorMessage = (errorMessage) => dispatcher({type: 'setErrorMessage', errorMessage});
  const loading = () => dispatcher({type: 'loading'});
  const doneLoading = () => dispatcher({type: 'doneLoading'});

  const actions = {
    login, 
    logout, 
    toggleTodo, 
    updateTodos, 
    setErrorMessage, 
    loading, 
    doneLoading
  }

  useEffect(() => {
    loading();
    fetchSession()
    .then( result => {
      setErrorMessage('');
      login(result.username);
      fetchTodosFromServer();
    })
    .catch( err => {
      logout();
    })
    .finally (() => {
      doneLoading();
    })
  }, [state.isLoggedIn]);

  useEffect(() => {
    if (state.isLoggedIn) {
      fetchTodosFromServer();
    }
  }, [JSON.stringify(state.todos)])

  function fetchTodosFromServer() {
    loading();
    fetchTodos()
    .then( result => {
      updateTodos(result);
      setErrorMessage('');
    })
    .catch( err => {
      setErrorMessage(err);
    })
    .finally (() => {
      doneLoading();
    })
  }

  return (
    <TodoContext.Provider value = { {state, actions}}>
      <div className='app'>
        <div>
          {state.isLoading ? 'loading...' : ''}
        </div>
        <ErrorMessage />
        <Login />
        <Todo />
      </div>
    </TodoContext.Provider>
  );
}

export default App;