import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import styles from './Styles/SearchTabStyles';
import { HOST, requestGET } from '../Services/Servies';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Avatar } from 'react-native-elements';
import Empty from './Empty';

const Class = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        var id = props.navigation.getParam('id');
        var user_id = await AsyncStorage.getItem('isLogin');
        var newData = await requestGET(`${HOST}/classrooms/view/${id}?user_id=${user_id}`);
        setData(newData.data)
    }
    const renderCreator = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: "#F5F5F5",
                padding: 20,
                marginVertical: 10,
                marginHorizontal: 20,
                elevation: 3,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: "row",
            }}>
                <Avatar
                    rounded
                    size="small"
                    source={require('../Images/avatar.jpg')}
                />
                <Text style={{ marginLeft: 30, fontWeight: 'bold', fontSize: 18 }}>{item.screen_name}</Text>
            </View>

        )
    }
    const renderLesson = ({ item, index }) => {
        return (
            <View>
                
            </View>
        )
    }
    const renderCourse = () => {
        if (JSON.stringify(data.lessons) !== JSON.stringify([])) return (
            <FlatList
                data={data.lessons}
                renderItem={renderLesson}
                keyExtractor={(item, index) => index.toString()}
            />
        )
        else return <Empty theme={false} />
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                backgroundColor: "#1976D2"
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <Text style={styles.title}>Lớp</Text>
                <TouchableOpacity onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                    <Icon name='more-vertical' size={25} color='#F5F5F5' type="feather" />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{ color: "#00BCD4", fontSize: 16 }}>{data.numb_lesson} học phần</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
            </View>
            <ScrollableTabView
                style={styles.container}
                tabBarPosition='top'
                initialPage={0}
                renderTabBar={() => <DefaultTabBar {...props} />}
            >
                <View tabLabel="HỌC PHẦN" style={styles.tabView}>
                    {renderCourse()}
                </View>
                <View tabLabel="THÀNH VIÊN" style={styles.tabView}>
                    <FlatList
                        data={data.users}
                        renderItem={renderCreator}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollableTabView>
        </View>
    )
}
export default Class;