import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Api from '../../Api'
import Swiper from 'react-native-swiper'
import {
    Container,
    Scroller,
    BackButton,
    LoadingIcon,
    PageBody,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,


    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,



    ServiceArea,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseBtnText,
    ServiceChooseButton,
    ServiceTitle,

    TestimonialArea,

} from './styles'

import FavoriteIcon from '../../assets/favorite.svg'
import BackIcon from '../../assets/back.svg'
import Stars from '../../components/Stars'


export default () => {

    const navigation = useNavigation()
    const route = useRoute()


    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars,

    })

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true)
            let json = await Api.getBarber(userInfo.id)
            if (json.error == '') {
                setUserInfo(json.data)


            } else {

                Alert.alert("Falha na Requisição:",
                    `Não foi possível buscar dados do barbeiro: ${json.error}`,
                    [
                        {
                            text: "Fechar"
                        },
                    ],

                )

            }
            setLoading(false)

        }

        getBarberInfo()
    }, [])

    const handlebackButton = () =>{
        navigation.goBack();

    }

    return (
        <Container>
            <Scroller>
                {
                    userInfo.photos && userInfo.photos.length > 0 ?
                        <Swiper
                            style={{ height: 240 }}
                            dot={<SwipeDot />}
                            activeDot={<SwipeDotActive />}
                            paginationStyle={{ }}
                            autoplay={true}
                        >
                            {userInfo.photos.map((item, key) => (
                                <SwipeItem key={key} >
                                    <SwipeImage source={{ uri: item.url }} resizeMode="cover" />
                                </SwipeItem>



                            ))}


                        </Swiper>
                        :
                        <FakeSwiper>
                            {console.log("Não tem")}
                        </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}}/>
                        <UserInfo> 
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}></Stars>
                        </UserInfo>
                        <UserFavButton>
                            <FavoriteIcon width="24" height="24" fill="#ff0000" />
                        </UserFavButton>

                    </UserInfoArea>

                    {loading &&
                    <LoadingIcon size="large" color="#000000"/>

                    }

                    {userInfo.services &&
                    <ServiceArea>
                        <ServiceTitle>Lista de Serviços</ServiceTitle>
                        {userInfo.services.map((item,key)=>(
                            <ServiceItem key={key}>
                                <ServiceInfo>
                                    <ServiceName>{item.name}</ServiceName>
                                    <ServicePrice>{item.name}</ServicePrice>
                                </ServiceInfo>
                                <ServiceChooseButton>
                                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                </ServiceChooseButton>

                            </ServiceItem>

                        ))

                        }

                    </ServiceArea>
                    }

                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>


            </Scroller>

            <BackButton onPress= {handlebackButton}>
                <BackIcon width="44" height="44" fill="#ffffff"/>

            </BackButton>

        </Container>
    )
}