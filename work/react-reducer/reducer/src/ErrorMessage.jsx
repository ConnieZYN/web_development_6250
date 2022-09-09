import { useContext } from 'react';
import getErrorMessageForDisplay from './errorMessageUtil.js';
import TodoContext from './Context.js';

export default function ErrorMessage() {
  const { state, _ } = useContext(TodoContext);
  if (state.errorMessage == undefined || state.errorMessage == '') {
    return (null);
  } else {
    const message = getErrorMessageForDisplay(state.errorMessage);
    return (
      <div className="errorMessage">
        {message}
      </div>
    );
  }
  
}