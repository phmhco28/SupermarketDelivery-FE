import AsyncStorage from '@react-native-async-storage/async-storage';

const initState = {
  isAuthenticated: false,
  user: null,
  token: null,
  map: {
    address: null,
    gps: null,
  },
};

function AuthReducer(state, action) {
  switch (action.type) {
    case 'Login':
      const setValue = async () => {
        if (action.payload) {
          await AsyncStorage.setItem('user', JSON.stringify(action.payload));
          console.log('Save success');
        }
        return;
      };
      // function getUser() {
      //   fetch(
      //     `http://192.168.1.3:8080/api/v0/user?id=${encodeURIComponent(
      //       action.payload.accountId,
      //     )}`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     },
      //   )
      //     .then(res => {
      //       if (res.ok) {
      //         return res.json();
      //       }
      //       throw res;
      //     })
      //     .then(res => ({...state, user: res, isAuthenticated: true}));
      // }
      // const getUser = async () => {
      //   try {
      //     const response = await fetch(
      //       `http://192.168.1.3:8080/api/v0/user?id=${encodeURIComponent(action.payload.accountId)}`,
      //       {
      //         method: 'GET',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //       },
      //     );
      //     const data = await response.json();
      //     return data;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };
      setValue();
      // localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
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
    case 'Map':
      return {
        ...state,
        map: {address: action.payload.address, gps: action.payload.gps},
      };
    default:
      return state;
  }
}

export {initState};
export default AuthReducer;
