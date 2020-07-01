import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    RefreshControl,
    ScrollView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './Styles/HomeTabStyles';
import { Avatar } from 'react-native-elements';
import { HOST, requestGET } from '../Services/Servies';
const HomeTab = (props) => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true)
    useEffect(() => {
        fetchData();
        return () => { }
    }, [data, refreshing]);
    const fetchData = async () => {
        const id = await AsyncStorage.getItem('isLogin');
        const newData = await requestGET(`${HOST}/lessons/viewMyLesson/${id}`);
        setData(newData.data.list_lesson);
        setRefreshing(false);
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('CourseScreen', { id: item.id })}>
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
                            }}>{item.name}</Text>
                            <Text style={{ fontSize: 12, color: '#795548', marginTop: 3 }}>{item.numb_question} thuật ngữ</Text>
                        </View>
                        {/* <View>
                            <Text>image</Text>
                        </View> */}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Avatar
                            rounded
                            size="small"
                            source={require('../Images/avatar.jpg')}
                        />
                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{item.creator}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const onRefresh = () => {
        fetchData();
    }
    return (
        <View style={styles.container}
        >
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
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Học phần</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('HomeTab_CourseScreen')}>
                        <Text style={{ color: '#00838F' }}>Xem tất cả  &gt;</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>


        </View>
    )
};

export default withNavigation(HomeTab);