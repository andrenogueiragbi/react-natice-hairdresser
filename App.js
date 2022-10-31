import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/stacks/MainStack'
import UserContexProvider from './src/contexts/UserContex';

export default function App() {
  return (
    <UserContexProvider>
      <NavigationContainer>
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
