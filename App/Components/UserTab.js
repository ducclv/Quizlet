import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from './Styles/UserTabStyles';
import AsyncStorage from '@react-native-community/async-storage'
import { HOST, requestGET } from '../Services/Servies'
const UserTab = (props) => {
    const [switchValue, setSwitchValue] = useState(false)
    const [data, setData] = useState({})
    useEffect(() => {
        fetchData();
        return () => { }
    }, []);
    const toggleSwitch = async (value) => {
        setSwitchValue(value)
        props.setDarkMode(value)
        await AsyncStorage.setItem('theme', `${value}`)
    }
    const fetchData = async () => {
        const id = await AsyncStorage.getItem('isLogin');
        const newData = await requestGET(`${HOST}/users/getUserById/${id}`);
        setData(newData.data.user)
    }
    const handleLogout = async () => {
        await AsyncStorage.setItem('isLogin', '0');
        props.navigation.navigate('Auth');
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: props.darkMode == false ? "#EEEEEE" : "#212121" }}>
            <View style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                alignItems: 'center',
            }}>
                <Avatar
                    rounded
                    size="xlarge"
                    source={require('../Images/avatar.jpg')}
                    containerStyle={{ margin: 30 }}
                />
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>{data.screen_name}</Text>
                <TouchableOpacity style={{ marginTop: 5, marginBottom: 30 }}>
                    <Text style={{ color: '#607D8B', fontSize: 16 }}>Xem hồ sơ</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                padding: 20,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Loại tài khoản</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14 }}>Miễn phí</Text>
                </View>
                <View style={{ backgroundColor: '#607D8B', alignSelf: 'center', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 14, }}>Nâng cấp dùng thử</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                marginTop: 10,
            }}>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Email</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14, }}>{data.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Tên người dùng</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14, }}>{data.screen_name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Thông báo</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 20,
            }}>
                <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Hình nền ban đêm</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={switchValue} />
            </View>
            <TouchableOpacity style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                marginTop: 10,
                padding: 20,
            }}>
                <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Trung tâm hỗ trợ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                marginTop: 10,
                padding: 20,
            }}>
                <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Đánh giá chúng tôi</Text>
            </TouchableOpacity>
            <View style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                marginTop: 10,
            }}>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Giới thiệu</Text>
                </TouchableOpacity>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Phiên bản</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14, }}>1.0</Text>
                </View>
            </View>

            <TouchableOpacity style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                marginTop: 10,
                marginBottom: 10,
                padding: 20,
            }}
                onPress={() => handleLogout()}
            >
                <Text style={{ fontSize: 18, fontWeight: '900', color: props.darkMode == false ? "#263238" : "#EEEEEE" }}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default UserTab;