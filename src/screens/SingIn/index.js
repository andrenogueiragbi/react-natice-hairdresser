import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContex'

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SigmMessageButtonTextBold,
    LoadingIcon,


} from './styles'
import SignInput from '../../components/SignInput';
import Logo from "../../assets/barber.svg";
import Api from '../../Api'


export default () => {
    const navigation = useNavigation()
    const { dispatch: userDispatch } = useContext(UserContext)
    const [emailField, setEmailField] = useState('abc@abc')
    const [passwordField, setPasswordField] = useState('abc')
    const [loading, setLoading] = useState(false)

    const handerSignClick = async () => {
        if (emailField && passwordField) {
            setLoading(true)
            let json = await Api.signIn(emailField, passwordField)


            if (json.token) {
                await AsyncStorage.setItem('token', json.token)

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes:[{name:'MainTab'}]
                });


            setLoading(false)
            } else {
                alert('E-mail e/ou senha errados!')

            }

        } else {
            alert('Preencha os Campos')

        }

    }

    const handerMessageButtonClick = () => {
        navigation.navigate("SingUp")

    }


    return (
        <Container>
            <Logo width="100%" height="160" />
            {
                loading && <LoadingIcon size="large" color="#fff" />

            }
            
            <InputArea>
                <SignInput
                    name='envelope'
                    placeholder="Digite seu Email"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput
                    name='lock'
                    placeholder="Digite sua Senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handerSignClick} >
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>


            </InputArea>



            <SignMessageButton onPress={handerMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui um conta?</SignMessageButtonText>
                <SigmMessageButtonTextBold>Cadastre-se</SigmMessageButtonTextBold>
            </SignMessageButton>

            


        </Container>
    )



}
