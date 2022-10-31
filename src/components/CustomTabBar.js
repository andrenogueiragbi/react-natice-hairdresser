import React, { useContext } from "react";
import styled from "styled-components/native";
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { UserContext } from "../contexts/UserContex";

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';



const TabArea = styled.View`
    height:60px;
    backgroundColor: #4eadbe;
    flex-direction: row
`
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justifyContent:center;
    alignItems:center

`


const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justifyContent:center;
    alignItems:center;
    backgroundColor: #fff;
    border-radius: 35px;
    border: 3px solid #4eadbe;
    margin-top: -20px


`

const AvatarIcon = styled.Image`
    width:24px;
    height: 24px;
    border-radius: 12px
`


export default ({ state, navigation }) => {

    const { state: user } = useContext(UserContext)

    const goTo = (screenName) => {
        navigation.navigate(screenName)
    }




    return (

        <TabArea>

            <TabItem style={{ opacity: state.index === 0 ? 1 : 0.5 }} onPress={() => goTo('Home')}>
                <MaterialCommunityIcons name="home" size={24} color="#fff" />
            </TabItem>

            <TabItem style={{ opacity: state.index === 1 ? 1 : 0.5 }} onPress={() => goTo('Search')} >
                <MaterialCommunityIcons name="card-search" size={24} color="#fff" />
            </TabItem>

            <TabItemCenter onPress={() => goTo('Appointments')} >
                <MaterialCommunityIcons name="calendar" size={24} color="#4eadbe" />
            </TabItemCenter>

            <TabItem style={{ opacity: state.index === 3 ? 1 : 0.5 }} onPress={() => goTo('Favorites')}>
                <MaterialCommunityIcons name="heart" size={32} color="#fff" />
            </TabItem>

            {user.avatar ?

                <TabItem style={{ opacity: state.index === 4 ? 1 : 0.5 }} onPress={() => goTo('Profile')}>
                    <AvatarIcon source={{uri:user.avatar}}/>
                </TabItem>


                :
                <TabItem style={{ opacity: state.index === 4 ? 1 : 0.5 }} onPress={() => goTo('Profile')}>
                    <MaterialCommunityIcons name="account" size={24} color="#fff" />
                </TabItem>



            }








        </TabArea>

    )
}