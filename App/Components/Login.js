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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './Styles/RegisterStyles';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [icEye, setIcEye] = useState('eye-slash');
    const [showPassword, setShowPassword] = useState(true);
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
                    {/* <View>
                        <LoginButton
                            onLoginFinished={
                                (error, result) => {
                                    console.log(error)
                                    console.log(result)
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        console.log('success');
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                console.log(data.accessToken.toString())
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished={() => console.log("logout.")} />
                    </View> */}
                </View>
                <View style={{ marginTop: 25 }}>
                    <Text style={styles.text}>HOẶC ĐĂNG NHẬP BẰNG TÊN NGƯỜI DÙNG CỦA BẠN</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, textDecorationLine: 'none' }}
                        onChangeText={userName => setUserName(userName)}
                        value={userName}
                        placeholder="Nhập tên người dùng của bạn"
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

            <TouchableOpacity
                onPress={() => props.navigation.navigate('App')}
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