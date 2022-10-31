import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'
import Api from '../../Api'
import BarberItem from '../../components/BarberItem';


import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea

} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default () => {

    const [locationText, setLocationText] = useState('')
    const [coords, setCoords] = useState(null)
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const handleLocationFinder = async () => {
        setCoords(null)


        let { status } = await Location.requestForegroundPermissionsAsync();


        if (status == 'granted') {
            console.log('autorizado')
            setLoading(true)
            setLocationText('')
            setList([])

            let { coords } = await Location.getCurrentPositionAsync({});

            console.log(coords)

            setCoords(coords)
            getBarbers()


        }


    }

    const getBarbers = async () => {
        setLoading(true)
        setList([])

        let lat= null
        let lng = null



        if(coords){
            lat = coords.latitude;
            lng = coords.longitude;

        

        }

        let res = await Api.getBarbers(lat,lng,locationText);



        if (res.error == '') {
            setList(res.data)



            if (res.loc) {
                setLocationText(res.loc)

            }



        } else {
            alert(`Erro: ${res.error}`)
        }

        setLoading(false)

    }

    useEffect(() => {
        getBarbers()
    }, [])

    const onPress = () => {
        setRefreshing(false)
        getBarbers()
    

    }

    const handleLocationSearch = () => {
        setCoords({})
        getBarbers();
    }



    return (
        <Container>

            <Scroller 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPress}/>}
            
            >


                <HeaderArea>
                    <HeaderTitle>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')} >
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                     placeholder="Onde você está?"
                     placeholderTextColor="#FFFFFF"
                     value={locationText}
                     onChangeText={t=>setLocationText(t)}
                     onEndEditing={handleLocationSearch}

                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>

                {loading &&
                    <LoadingIcon size="large" color="#fff" />


                }

                <ListArea>
                    {list.map((item, k) => (
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>



            </Scroller>


        </Container>
    )
}