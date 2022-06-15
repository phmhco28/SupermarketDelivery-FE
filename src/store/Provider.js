import React from 'react';
import AuthContext from './Context';
import {useReducer} from 'react';
import AuthReducer, {initState} from './Reducer';

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(AuthReducer, initState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
