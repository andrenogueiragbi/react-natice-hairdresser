import React, { useState, useContext,useEffect } from 'react';
import { Container, LoadingIcon } from './styles'
import Logo from "../../assets/barber.svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContex'
import Api from '../../Api'


export default () => {
    const navigation = useNavigation()
    const { dispatch: userDispatch } = useContext(UserContext)

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
            console.log(token)


            if (token) {// validar o token
                let res = await Api.checkToken(token)

                console.log(res)

                if (res.token) {

                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        }
                    });

                    navigation.reset({
                        routes: [{ name: 'MainTab' }]
                    });



                } else {
                    navigation.navigate('SignIn')

                }


            } else {

                navigation.navigate('SignIn')

            }

        }
        checkToken()

    }, [])

    return (
        <Container>
            <Logo width="100%" height="160" />
            <LoadingIcon size='large' color='#ffffff' />

        </Container>

    )
}







