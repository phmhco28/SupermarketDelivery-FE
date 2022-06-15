import AsyncStorage from '@react-native-async-storage/async-storage';

const initState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function AuthReducer(state, action) {
  switch (action.type) {
    case 'Login':
      const setValue = async () => {
        if (action.payload) {
          await AsyncStorage.setItem('user', JSON.stringify(action.payload));
          console.log('save');
        }
        return;
      };
      setValue();
      // localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        isAuthenticated: true,
        user: action.payload,
        // token: action.payload.token,
      };
    case 'Logout':
      const clearData = async () => {
        await AsyncStorage.clear();
      };
      clearData();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export {initState};
export default AuthReducer;
