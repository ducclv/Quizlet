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

const UserTab = (props) => {
    const [switchValue, setSwitchValue] = useState(false)
    useEffect(() => {
        return () => { }
    }, []);
    const toggleSwitch = async (value) => {
        setSwitchValue(value)
        props.setDarkMode(value)
        await AsyncStorage.setItem('theme', `${value}`)
    }
    const handleLogout = async () => {
        await AsyncStorage.setItem('isLogin', '0');
        props.navigation.navigate('Auth');
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: props.darkMode == false ? "#EEEEEE" : "#212121" }}>
            <View style={{
                backgroundColor: '#FAFAFA',
                alignItems: 'center',
            }}>
                <Avatar
                    rounded
                    size="xlarge"
                    source={require('../Images/avatar.jpg')}
                    containerStyle={{ margin: 30 }}
                />
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Lê Đức</Text>
                <TouchableOpacity style={{ marginTop: 5, marginBottom: 30 }}>
                    <Text style={{ color: '#607D8B', fontSize: 18 }}>Xem hồ sơ</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{
                backgroundColor: '#FAFAFA',
                padding: 20,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Loại tài khoản</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14 }}>Miễn phí</Text>
                </View>
                <View style={{ backgroundColor: '#607D8B', alignSelf: 'center', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 14, }}>Nâng cấp dùng thử</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                backgroundColor: '#FAFAFA',
                marginTop: 10,
            }}>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Email</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14, }}>leducuet@gmail.com</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Tên người dùng</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14, }}>Lê Đức</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Thông báo</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                backgroundColor: '#FAFAFA',
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 20,
            }}>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Hình nền ban đêm</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={switchValue} />
            </View>
            <TouchableOpacity style={{
                backgroundColor: '#FAFAFA',
                marginTop: 10,
                padding: 20,
            }}>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Trung tâm hỗ trợ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: '#FAFAFA',
                marginTop: 10,
                padding: 20,
            }}>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Đánh giá chúng tôi</Text>
            </TouchableOpacity>
            <View style={{
                backgroundColor: '#FAFAFA',
                marginTop: 10,
            }}>
                <TouchableOpacity style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Giới thiệu</Text>
                </TouchableOpacity>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Phiên bản</Text>
                    <Text style={{ color: '#607D8B', fontSize: 14, }}>1.0</Text>
                </View>
            </View>

            <TouchableOpacity style={{
                backgroundColor: '#FAFAFA',
                marginTop: 10,
                marginBottom: 10,
                padding: 20,
            }}
                onPress={() => handleLogout()}
            >
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default UserTab;