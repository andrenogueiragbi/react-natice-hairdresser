import React, { useState,useContext } from 'react';
import SignInput from '../../components/SignInput';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContex'
import Api from '../../Api'
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SigmMessageButtonTextBold


} from './styles'
import Logo from "../../assets/barber.svg";



export default () => {
    const navigation = useNavigation()
    const { dispatch: userDispatch } = useContext(UserContext)
    const [nameField, setNameField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handerSignClick = async () => {
        if (emailField && passwordField && nameField) {
            let json = await Api.signUp(nameField,emailField, passwordField)
 
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




            } else {
                alert('E-mail e/ou senha errados!')

            }

        } else {
            alert('Preencha os Campos')

        }

    }

    const handerMessageButtonClick = () => {
        navigation.navigate("SignIn")
    }


    return (
        <Container>
            <Logo width="100%" height="160" />
            <InputArea>
                <SignInput
                    name='user'
                    placeholder="Digite seu Nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)}
                />


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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>


            </InputArea>

            <SignMessageButton onPress={handerMessageButtonClick}>
                <SignMessageButtonText>Já possui um conta?</SignMessageButtonText>
                <SigmMessageButtonTextBold>Faça Login</SigmMessageButtonTextBold>
            </SignMessageButton>


        </Container>
    )



}
