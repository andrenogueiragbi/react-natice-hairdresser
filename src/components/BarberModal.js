import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native'
import ExpandIcon from '../assets/expand.svg'
import NavPrevIcon from '../assets/nav_prev.svg'
import NavNextIcon from '../assets/nav_next.svg'
import Api from '../Api';

const Modal = styled.Modal`


`;

const ModalArea = styled.View`
    flex:1;
    backgroundColor: rgdba(0.0.0,0.5);
    justifyContent:flex-end;



`;

const ModalBody = styled.View`
backgroundColor:#83dce3;
border-top-left-radius:20px;
border-top-right-radius:20px;
min-height:300px;
padding: 10px 20px 40px 20px;

`;


const CloseButton = styled.TouchableOpacity`
    width:40px;
    height:40px;
`;

const ModalItem = styled.View`
    backgroundColor: #ffffff;
    border-radius:10px;
    margin-bottom:10px;
    padding:10px;
`;

const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    
`;

const UserAvatar = styled.Image`
    width:56px;
    height:56px;
    border-radius:20px;
    margin-right:15px;
    
`;

const UserName = styled.Text`
    color:#000000
    font-size:18px;
    font-weight:bold;
    
`;


const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;

`;
const ServiceName = styled.Text`
    font-size:18px;
    font-weight:bold;
`;
const ServicePrice = styled.Text`
    font-size:18px;
    font-weight:bold;
`;

const FinishButton = styled.TouchableOpacity`
    backgroundColor: #268596;
    height:60px;
    justify-content: center;
    align-items: center;
    border-radius:10px;



`


const FinishButtonText = styled.Text`
    color: #ffffff;
    font-size:17px;
    font-weight:bold;

`

const DateInfo = styled.View`
    flex-direction: row;
`;
const DatePrevArea = styled.TouchableOpacity`
    flex:1;
    justify-content: flex-end;
    align-items: flex-end;
`;

const DateTitleArea = styled.View`
    width:160px;
    justify-content:center;
    align-items:center;
`;
const DateTitle = styled.Text`
    font-size: 17px
    font-weight: bold;
    color: #000000

`;
const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    alignItems: flex-start;
`;


const DateList = styled.ScrollView`
`;
const DateItem = styled.TouchableOpacity`
    width:45px;
    justifyContent:center;
    alignItems:center;
    border-radius:10px;
    padding-top:5px;
    padding-bottom:5px;

`;
const DateItemWeekDay = styled.Text`
    font-size:16px;
    font-weight:bold;
`;
const DateItemNumber = styled.Text`
    font-size:16px;
    font-weight:bold;
`;

const TimeList = styled.ScrollView`


`;

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height:40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;


`;

const TimeItemText = styled.Text`
    font-size:16px;
 
`;





const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
]

const days = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sab"
]



export default ({ show, setShow, user, service }) => {
    const navigation = useNavigation()

    const [selectedYear, setSelectedYear] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedHour, setSelectedHour] = useState(null)
    const [listDays, setlistDays] = useState([])
    const [listHours, setlistHours] = useState([])


    useEffect(() => {
        if (user.available) {
            let dayInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
            let newListDays = []

            for (let i = 1; i < dayInMonth; i++) {

                let d = new Date(selectedYear, selectedMonth, i)
                let year = d.getFullYear()
                let month = d.getMonth() + 1
                let day = d.getDate()
                month = month < 10 ? '0' + month : month
                day = day < 10 ? '0' + day : day

                let selDate = year + '-' + month + '-' + day

                let availability = user.available.filter(e => e.date === selDate)


                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekday: days[d.getDay()],
                    number: i
                })


            }
            setlistDays(newListDays)
            setSelectedDay(0)
            setlistHours([])
            setSelectedHour(0)

        }



    }, [user, selectedMonth, selectedYear])

    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear())
        setSelectedMonth(today.getMonth())
        setSelectedDay(today.getDay())


    }, [])

    useEffect(() => {
        if (user.available && selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()
            month = month < 10 ? '0' + month : month
            day = day < 10 ? '0' + day : day
            let selDate = year + '-' + month + '-' + day

            let availability = user.available.filter(e => e.date === selDate)

            if (availability.length > 0) {
                setlistHours(availability[0].hours)
            }
        }

        setSelectedHour(null)

    }, [user, selectedDay])

    const handerLeftDateClick = () => {
        console.log('voltar')
        let mounDate = new Date(selectedYear, selectedMonth, 1)
        mounDate.setMonth(mounDate.getMonth() - 1)
        setSelectedYear(mounDate.getFullYear())
        setSelectedMonth(mounDate.getMonth())
        setSelectedDay(0)

    }

    const handerRightDateClick = () => {
        console.log('frente')
        let mounDate = new Date(selectedYear, selectedMonth, 1)
        mounDate.setMonth(mounDate.getMonth() + 1)
        setSelectedYear(mounDate.getFullYear())
        setSelectedMonth(mounDate.getMonth())
        setSelectedDay(0)

    }


    const handerFinishClick = async () => {
        if (
            user.id &&
            service != null &&
            selectedYear > 0 &&
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null

        ) {
            setShow(false)
            navigation.navigate('Appointments')



            /*         let res = await Api.setAppointment(
                        user.id,
                        service,
                        selectedYear,
                        selectedMonth,
                        selectedDay,
                        selectedHour
        
                    )
                    if (res.erro == "") {
                        setShow(false)
                        navigation.navigate('Appointments')
        
        
                    } else {
                        alert(res.error)
                    }
         */


        } else {

        }


    }



    return (
        <Modal
            transparent={true}
            visible={show}
            animation='slide'

        >

            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={() => setShow(false)}>
                        <ExpandIcon />
                    </CloseButton>


                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{ uri: user.avatar }} />
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>


                    {service != null &&
                        <ModalItem>

                            <ServiceInfo>

                                <ServiceName>{user.services[service].name}</ServiceName>
                                <ServicePrice>R$ {user.services[service].price.toFixed(2)}</ServicePrice>

                            </ServiceInfo>

                        </ModalItem>

                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handerLeftDateClick}>
                                <NavPrevIcon width="35" height="35" fill="#000000" />

                            </DatePrevArea>

                            <DateTitleArea >
                                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>

                            </DateTitleArea>


                            <DateNextArea onPress={handerRightDateClick}>
                                <NavNextIcon width="35" height="35" fill="#000000" />
                            </DateNextArea>
                        </DateInfo>



                        <DateList horizontal={true} showsVerticalScrollIndicator={false}>
                            {listDays.map((item, key) => (
                                <DateItem
                                    key={key}
                                    onPress={() => item.status ? setSelectedDay(item.number) : null}
                                    style={{
                                        opacity: item.status ? 1 : 0.5,
                                        backgroundColor: item.number === selectedDay ? '#4eadbe' : '#ffffff'

                                    }}

                                >
                                    <DateItemWeekDay
                                        style={{
                                            color: item.number === selectedDay ? '#ffffff' : '#000000'
                                        }}

                                    >{item.weekday}</DateItemWeekDay>
                                    <DateItemNumber
                                        style={{
                                            color: item.number === selectedDay ? '#ffffff' : '#000000'
                                        }}

                                    >{item.number}</DateItemNumber>
                                </DateItem>



                            ))}
                        </DateList>
                    </ModalItem>

                    {selectedDay > 0 && listHours.length > 0 &&
                        <ModalItem>
                            <TimeList horizontal={true} showsVerticalScrollIndicator={false}>
                                {listHours.map((item, key) => (
                                    <TimeItem
                                        key={key}
                                        onPress={() => setSelectedHour(item)}
                                        style={{
                                            backgroundColor: item === selectedHour ? '#4eadbe' : '#ffffff'
                                        }}

                                    >
                                        <TimeItemText
                                            style={{
                                                color: item === selectedHour ? '#ffffff' : '#000000',
                                                fontWeight: item === selectedHour ? 'bold' : 'normal'
                                            }}

                                        >{item}</TimeItemText>

                                    </TimeItem>

                                ))}

                            </TimeList>

                        </ModalItem>

                    }

                    <FinishButton
                        onPress={handerFinishClick}

                    >
                        <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                    </FinishButton>


                </ModalBody>
            </ModalArea>



        </Modal>
    )
}