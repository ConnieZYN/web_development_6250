import React from 'react';

const TodoContext = React.createContext({
  default: 'overridden by provider value',
});

export default TodoContext;