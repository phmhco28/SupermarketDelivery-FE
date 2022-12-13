import AsyncStorage from '@react-native-async-storage/async-storage';

const initState = {
  isAuthenticated: false,
  user: null,
  token: null,
  listPointOfOrders: null,
  map: null,
  point: null,
  delivering: null,
  completed: null,
  reRender: false,
};

const removeItem = async(key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Remove ' + key + ' success');
    return true;
  }
  catch (exception) {
    console.log('Remove fail');
    return false;
  }
}

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
      removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'listPointOfOrder':
      const getList = async () => {
        if (action.payload) {
          await AsyncStorage.setItem('listPointOfOrder', JSON.stringify(action.payload));
          console.log('Save listPointOfOrder success');
        }
        return;
      };
      getList();
      return {
        ...state,
        listPointOfOrders: action.payload,
      }
    case 'getList':
      return {
        ...state,
        listPointOfOrders: action.payload,
      }    
    case 'Map':
      const map = async () => {
        if (action.payload) {
          await AsyncStorage.setItem('map', JSON.stringify(action.payload));
          console.log('Save map success');
        }
        return;
      };
      map();
      return {
        ...state,
        map: action.payload,
      };
    case 'getMap': 
      return {
        ...state,
        map: action.payload,
      }  
    case 'Point':
      const listPoint = async () => {
        if (action.payload) {

          await AsyncStorage.setItem('point', JSON.stringify(action.payload));
          console.log('Save list point success');
        }
        return;
      };
      listPoint();
      return {
        ...state,
        point: action.payload,
      };
    case 'RemovePoint':
      removeItem('point');
      return {
        ...state,
        point: null,
      };
    case 'getUser':

      return {
        ...state,
        user: action.payload,
      }
    case 'getListPoint':
      return {
        ...state,
        point: action.payload,
      }
    case 'delivering':
      const orderDelivering = async () => {
        if (action.payload) {
          await AsyncStorage.setItem('delivering', JSON.stringify(action.payload));
          console.log('Save order delivering success');
        }
        return;
      };
      orderDelivering();
      return {
        ...state,
        delivering: action.payload,
      }
    case 'removeDelivering':
      removeItem('delivering');
      return {
        ...state,
        delivering: null,
      }    
    case 'getDelivering':
      return {
        ...state,
        delivering: action.payload,
      }
    case 'completed':
      const orderCompleted = async () => {
        if (action.payload) {
          await AsyncStorage.setItem('completed', JSON.stringify(action.payload));
          console.log('Save order completed success');
        }
        return;
      };
      orderCompleted();
      return {
        ...state,
        completed: action.payload,
      }
    case 'getCompleted':
      return {
        ...state,
        completed: action.payload,
      }      
    case 'reRender':
      return {
        ...state,
        reRender: action.payload,
      }
      case 'removeListPointOfOrder':
        removeItem('listPointOfOrder');
        return {
          ...state,
          delivering: null,
        }  
    default:
      return state;
  }
}

export {initState};
export default AuthReducer;
