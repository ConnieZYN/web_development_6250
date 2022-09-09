import { useState, useContext } from 'react';
import { fetchLogin, fetchLogout } from './services.js';
import TodoContext from './Context.js';

export default function Login() {
  const { state, actions } = useContext(TodoContext);
  const [ username, setUsername ] = useState('');
  
  function handleLogin() {
    actions.loading();
    fetchLogin(username)
    .then( result => {
      actions.login(username);
      actions.updateTodos(result);
      actions.setErrorMessage('');
    })
    .catch( err => {
      actions.logout();
      actions.setErrorMessage(err);
    })
    .finally(() => {
      actions.doneLoading();
    })
  }

  function handleLogout() {
    actions.loading();
    fetchLogout()
    .then( result => {
      actions.logout();
      actions.setErrorMessage('');
    })
    .catch (err => {
      actions.setErrorMessage(err);
    })
    .finally(() => {
      actions.doneLoading();
    })
  }
  
  function handleInputChange(event) {
    setUsername(event.target.value);
  }

  if (state.isLoggedIn === true) {
    return (
      <div>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <label>
          <span>Username:</span>
          <input 
            type="text" 
            className="login__username"
            name="username" 
            value={username}  
            onChange={(event) => handleInputChange(event)} 
            />
        </label>
        <button type="button" onClick={handleLogin}>Login</button>
      </div>
    );
  }
}