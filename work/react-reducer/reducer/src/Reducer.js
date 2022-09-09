export default function reducer(state, action) {
  switch(action.type) {
    case 'logout':        
      return { ...state, isLoggedIn: false, username: '', todos: {} };     
    case 'login':        
      return { ...state, isLoggedIn: true, username: action.username };     
    case 'toggleTodo':       
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.id]: {
            ...state.todos[action.id],
            done: !state.todos[action.id].done,
          }         
        },       
      };
    case 'updateTodos':
      return { ...state, todos: action.todos };
    case 'setErrorMessage':
      return {
        ...state, errorMessage: action.errorMessage,
      };   
    case 'loading':
      return { ...state, isLoading: true };
    case 'doneLoading':
      return { ...state, isLoading: false };
    default:        
      return state;
  }
}