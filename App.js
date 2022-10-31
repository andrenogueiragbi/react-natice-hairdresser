import 'react-native-gesture-handler'
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/stacks/MainStack'
import UserContexProvider from './src/contexts/UserContex';

export default function App() {
  return (
    <UserContexProvider>

      <NavigationContainer>
      <StatusBar backgroundColor='#4eadbe' barStyle='light-content'/>
        <MainStack />
       
      </NavigationContainer>
    </UserContexProvider>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
