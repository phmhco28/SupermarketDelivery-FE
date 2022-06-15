import {useContext} from 'react';
import AuthContext from './Context';

export const useAuth = () => {
  const [state, dispatch] = useContext(AuthContext);
  return [state, dispatch];
};
