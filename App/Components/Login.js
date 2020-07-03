import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import {
    TouchableOpacity,
    StatusBar,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './Styles/RegisterStyles';
import AsyncStorage from '@react-native-community/async-storage'
import { HOST, requestPOST } from '../Services/Servies';
import * as Animatable from 'react-native-animatable';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [icEye, setIcEye] = useState('eye-slash');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        return () => {
        }
    });
    const changePwdType = () => {
        if (showPassword) {
            setIcEye('eye');
            setShowPassword(false)
        } else {
            setIcEye('eye-slash');
            setShowPassword(true)
        }
    };
    const handlePassword = (password) => {
        setPassword(password)
    };
    const handleLogin = async () => {
        var newData = {
            username: userName,
            password: password
        }
        var postData = await requestPOST(`${HOST}/users/login`, newData).then(res => { return res })
        setLoading(true)
        if (postData.status === true) {
            await AsyncStorage.setItem('isLogin', `${postData.data.user.id}`)
        }
        else ToastAndroid.show(`${postData.message}`, ToastAndroid.LONG);
        props.navigation.navigate('AuthLoading');

    }
    const loginWithFB = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            (result) => {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                }
            },
            (error) => {
                console.log("Login fail with error: " + error);
            }
        );
    };
    const renderBtnLogin = () => {
        if (!loading) return (
            <TouchableOpacity
                onPress={() => handleLogin()}
                style={{
                    height: 60,
                    backgroundColor: "#5D4037",
                    marginTop: 40,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: "center"
                }}
            >
                <Text style={{ color: '#FAFAFA', fontSize: 20, fontWeight: 'bold' }}>Đăng nhập</Text>
            </TouchableOpacity>
        )
        else {
            return (
                <Animatable.View animation='fadeIn'
                    style={{
                        height: 60,
                        backgroundColor: "#5D4037",
                        marginTop: 40,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <ActivityIndicator size='large' color='#fff' />
                </Animatable.View>
            )
        }
    }
    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor='#673AB7' />
            <TouchableOpacity onPress={() => props.navigation.navigate('LoginMainBodyScreen')}>
                <Icon name="arrow-left" size={24} style={styles.icon} />
            </TouchableOpacity>
            <View style={{ marginTop: 30 }}>
                <Text style={styles.text}>ĐĂNG NHẬP NHANH BẰNG</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}>
                    <TouchableOpacity style={{ borderColor: '#795548', borderWidth: 2, padding: 10, flex: 0.5, marginRight: 15 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={require('../Images/google.png')} style={{ width: 30, height: 30 }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}>Google</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderColor: '#795548', borderWidth: 2, padding: 10, flex: 0.5, marginLeft: 15 }}
                        onPress={() => loginWithFB()}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={require('../Images/facebook.png')} style={{ width: 30, height: 30 }} />
                            <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 18 }}>Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 25 }}>
                    <Text style={styles.text}>HOẶC ĐĂNG NHẬP BẰNG TÊN NGƯỜI DÙNG CỦA BẠN</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, textDecorationLine: 'none' }}
                        onChangeText={userName => setUserName(userName)}
                        value={userName}
                        placeholder="email@example.com"
                    />
                    <Text style={{ marginTop: 5, color: "#795548" }}>TÊN NGƯỜI DÙNG</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, borderColor: 'gray', borderBottomWidth: 1, textDecorationLine: 'none' }}
                            onChangeText={handlePassword}
                            value={password}
                            placeholder="Nhập mật khẩu của bạn"
                            textContentType="password"
                            secureTextEntry={showPassword}
                        />
                        <TouchableOpacity
                            style={{ marginLeft: -30 }}
                            onPress={changePwdType}
                        >
                            <Icon name={icEye} size={22} style={{ color: "#795548" }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginTop: 5, color: "#795548" }}>MẬT KHẨU</Text>
                </View>
            </View>

            {renderBtnLogin()}

            <View style={{ marginTop: 20, marginBottom: 50, alignItems: 'center' }}>
                <Text style={{ color: '#795548', fontSize: 16 }}>Quên <Text style={{ color: '#2196F3', fontSize: 16 }}>tên người dùng </Text> hoặc <Text style={{ color: '#2196F3', fontSize: 16 }}>mật khẩu?</Text></Text>
            </View>
            <View style={{ marginTop: 20, marginBottom: 30, alignItems: 'center' }}>
                <Text style={{ color: '#795548', fontSize: 12 }}>Bằng việc đăng nhập, tôi chấp thuận <Text style={{ color: '#2196F3', fontSize: 12 }}>Điều khoản dịch vụ</Text> và</Text>
                <Text style={{ color: '#795548', fontSize: 12 }}><Text style={{ color: '#2196F3', fontSize: 12 }}>Chính sách quyền riêng tư</Text> của Quizlet</Text>
            </View>
        </ScrollView>
    )
};
export default withNavigation(Login);