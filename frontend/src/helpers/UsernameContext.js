import React from 'react';

export const UsernameContext = React.createContext({
  username: null,
  setUsername: () => {},
});