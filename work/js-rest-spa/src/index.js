"use strict";
(function() {
  
  let stateInventory = 0;

  const MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    noUsernameError: 'The username is empty',
    invalidUserError: 'The Username dog is invalid',
    default: 'Something went wrong.  Please try again',
  };

  checkForSession();

  function addAbilityToIncreaseInventory() {
    const buttonEl = document.querySelector('#increment');
    buttonEl.addEventListener('click', (e) => {
      stateInventory++;
      updateInventory()
      .then( renderOnFetchInventory )
      .catch( error => renderStatus(error) );
    });
  }

  function addAbilityToDecreaseInventory() {
    const buttonEl = document.querySelector('#decrement');
    buttonEl.addEventListener('click', (e) => {
      stateInventory--;
      updateInventory()
      .then( renderOnFetchInventory )
      .catch( error => renderStatus(error) );
    });
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector('.login-button button');
    const usernameEl = document.querySelector('.login-username');
    buttonEl.addEventListener('click', (e) => {
      const username = usernameEl.value;
      fetchLogin(username)
      .then( renderOnLogin )
      .catch( error => renderStatus(error) );
    });
  }

  function addAbilityToLogout() {
    const buttonEl = document.querySelector('.logout');
    buttonEl.addEventListener('click', (e) => {
      stateInventory = 0;
      fetchLogout()
      .then( () => render(false) )
      .catch( error => renderStatus(error) );
    });
  }

  function renderOnLogin(inventoryObj) {
    stateInventory = inventoryObj.inventory;
    render(true);
  }

  function renderOnFetchInventory(inventoryObj) {
    stateInventory = inventoryObj.inventory;
    render(true);
  }

  function checkForSession() {
    fetchSession()
    .then ( fetchInventory )
    .then ( renderOnFetchInventory )
    .catch( () => render(false) );
  }

  function fetchInventory() {
    return fetch('/api/inventory')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function updateInventory() {
    return fetch('/api/inventory', {
      method: 'PUT',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ 'inventory': stateInventory }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      if (response.status == 400) {
        return Promise.reject({ error: 'noUsernameError'})
      }
      if (response.status == 403) {
        return Promise.reject({ error: 'invalidUserError'})
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function render( isLoggedIn ) {
    const loginEl = document.querySelector('.login');
    const inventoryEl = document.querySelector('.inventory');
    const logoutEl = document.querySelector('.logout');
    renderLogin(loginEl, isLoggedIn);
    renderInventory(inventoryEl, isLoggedIn);
    renderLogout(logoutEl, isLoggedIn);
    if(isLoggedIn) {
      addAbilityToIncreaseInventory();
      addAbilityToDecreaseInventory();
      addAbilityToLogout();
    } else {
      addAbilityToLogin();
    }
    renderStatus('');
  }

  function renderInventory(inventoryEl, isLoggedIn) {
    if (!isLoggedIn) {
      inventoryEl.innerHTML = ``;
      return;
    }
    const canDrecrese = stateInventory > 0;
    const decrementButtonClass = canDrecrese ? "inventory-button enabled" : "inventory-button disabled";
    const disabled = canDrecrese ? "" : "disabled";
    inventoryEl.innerHTML=`
      <div class="diplay-block">
        <button id="increment" class="inventory-button enabled" type="button">+</button>
        <span class="inventory-count">${stateInventory}</span>
        <button id="decrement" class="${decrementButtonClass}" type="button" ${disabled}>-</button>
      </div>
      `;
  }

  function renderLogin(loginEl, isLoggedIn) {
    if (isLoggedIn) {
      loginEl.innerHTML = ``;
      return;
    }
    loginEl.innerHTML = `
        <div class="diplay-block">
          <form action="#">
            <label>
              <span>Username:</span>
              <input class="login-username">
            </label>
            <div class="login-button">
              <button type="button" >Login</button> 
            </div>
          </form>
        </div>
      `;
  }

  function renderLogout(logoutEl, isLoggedIn) {
    if (!isLoggedIn) {
      logoutEl.innerHTML = ``;
      return;
    }
    logoutEl.innerHTML=`
        <div  class="logout-block">
          <button class="logout-button">Logout</button>
        </div>
      `;
  }

  function renderStatus(message) {
    const statusEl = document.querySelector('.status');
    if( !message ) {
      statusEl.innerText = '';
      return;
    }
    const key = message?.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }

})();
