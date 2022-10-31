import React from 'react';
import styled from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';


const InputArea = styled.View`
    width:100%;
    height:60px;
    backgroundColor: #83d6e3
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    alignItems: center
    margin-bottom: 15px;

`
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #268896;
    margin-left: 10px;
`


export default ({name,placeholder,value,onChangeText,password}) => {
    return (
        <InputArea>
            <EvilIcons name={name} size={24} color="#268596" />
            <Input
                placeholder={placeholder}
                placeholderTextColor="#268596"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                
            
            />
        </InputArea>

    )
}