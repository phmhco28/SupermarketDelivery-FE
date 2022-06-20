import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/store/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStack, AppStack} from './src/navigations';
import 'react-native-gesture-handler';


const App = () => {
  const [user, setUser] = React.useState(null);
  const getValue = async () => {
    const value = await AsyncStorage.getItem('user');
    setUser(JSON.parse(value));
  };
  React.useEffect(() => {
    getValue();
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
