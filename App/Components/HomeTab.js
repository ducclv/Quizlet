import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import styles from './Styles/HomeTabStyles';
import { Avatar } from 'react-native-elements';

const HomeTab = (props) => {
    useEffect(() => {
        return () => { }
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>props.navigation.navigate('CourseScreen')}>
                <View style={{
                    backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                    padding: 20,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    elevation: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View>
                            <Text style={{
                                color: props.darkMode == false ? "#212121" : "#F5F5F5",
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}>{item.subject}</Text>
                            <Text style={{ fontSize: 12, color: '#795548', marginTop: 3 }}>{item.number} thuật ngữ</Text>
                        </View>
                        <View>
                            <Text>image</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Avatar
                            rounded
                            size="small"
                            source={require('../Images/avatar.jpg')}
                        />
                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{item.userName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.darkMode === false ? "#1976D2" : "#263238",
                padding: 20,
                elevation: 4,
            }}>
                <Text style={styles.title}>Trang chủ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Học phần</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('HomeTab_CourseScreen')}>
                    <Text style={{ color: '#00838F' }}>Xem tất cả  &gt;</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
};
const data = [
    {
        id: '1',
        subject: "SPEAKING: TRAVELLING",
        number: "7",
        userName: 'quizlette01'
    },
    {
        id: '2',
        subject: "Toán học",
        number: "5",
        userName: 'leducuet',
    },
    {
        id: '3',
        subject: "Tiếng anh",
        number: "17",
        userName: "buihoangnam"
    }
]
export default HomeTab;