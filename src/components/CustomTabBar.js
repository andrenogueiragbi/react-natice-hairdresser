import React from "react";
import styled from "styled-components/native";
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

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
export default ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName)
    }




    return (

        <TabArea>

            <TabItem onPress={()=> goTo('Home')}>
                <MaterialCommunityIcons name="home" size={24} color="black" />
            </TabItem>

            <TabItem  onPress={()=> goTo('Search')} >
                <MaterialCommunityIcons name="card-search" size={24} color="black" />
            </TabItem>

            <TabItem onPress={()=> goTo('Appointments')} >
                <MaterialCommunityIcons name="calendar" size={24} color="black" />
            </TabItem>

            <TabItem onPress={()=> goTo('Favorites')}>
                <MaterialCommunityIcons name="heart" size={24} color="black" />
            </TabItem>

            <TabItem onPress={()=> goTo('Profile')}>
                <MaterialCommunityIcons name="account" size={24} color="black" />
            </TabItem>








        </TabArea>

    )
}