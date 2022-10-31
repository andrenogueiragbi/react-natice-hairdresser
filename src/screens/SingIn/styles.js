
import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    backgroundColor: #63c2d1;
    flex:1;
    justifyContent: center;
    alignItems: center;
    

`;

export const InputArea = styled.View`
    padding: 40px;
    width: 100%;


`
export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    backgroundColor: #268596;
    border-radius: 30px;
    justifyContent: center;
    alignItems: center;


`
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #fff;


`

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justifyContent: center;
    marginTop:5px
    marginBottom:5px

`
export const SignMessageButtonText = styled.Text`
    font-size:16px;
    color: #268596;


`
export const SigmMessageButtonTextBold = styled.Text`
    font-size:16px;
    color: #268596;
    font-weight: bold;
    margin-left: 5px
`

export const LoadingIcon = styled.ActivityIndicator`
    marginBottom: -35px
 
`;

/* 
InputArea,
CustomButton,
CustomButtonText,
SignMessageButtonText,
SigmMessageButtonTextBold */

