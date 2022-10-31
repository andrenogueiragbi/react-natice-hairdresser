import React  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../screens/SingIn';
import SingUp from '../screens/SingUp';
import Preload from '../screens/Preload';
import MainTab from '../stacks/MainTab'


const Stack = createNativeStackNavigator()

export default () =>(
    <Stack.Navigator
        screenOptions={{headerShown:false}}
        initialRouteName='Preload'
     >
        <Stack.Screen name='Preload' component={Preload}/>
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='SingUp' component={SingUp}/>
        <Stack.Screen name='MainTab' component={MainTab}/>
    </Stack.Navigator>

)
