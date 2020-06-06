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
const Register = (props) => {
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [icEye, setIcEye] = useState('eye-slash');
    const [showPassword, setShowPassword] = useState(true);
    useEffect(() => {
        // console.log(props.navigation);
    }, [])
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
                    <TouchableOpacity style={{ borderColor: '#795548', borderWidth: 2, padding: 10, flex: 0.5, marginLeft: 15 }}>
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
                    <Text style={styles.text}>HOẶC ĐĂNG KÝ MỘT TÊN NGƯỜI DÙNG</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, textDecorationLine: 'none' }}
                        onChangeText={dob => setDob(dob)}
                        value={dob}
                        placeholder="11/03/1999"
                    />
                    <Text style={{ marginTop: 5, color: "#795548" }}>NGÀY SINH</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, textDecorationLine: 'none' }}
                        onChangeText={email => setEmail(email)}
                        value={email}
                        placeholder="email@example.com"
                        keyboardType="email-address"
                    />
                    <Text style={{ marginTop: 5, color: "#795548" }}>ĐỊA CHỈ EMAIL</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, textDecorationLine: 'none' }}
                        onChangeText={userName => setUserName(userName)}
                        value={userName}
                        placeholder="Tạo tên người dùng"
                    />
                    <Text style={{ marginTop: 5, color: "#795548" }}>TÊN NGƯỜI DÙNG</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, borderColor: 'gray', borderBottomWidth: 1, textDecorationLine: 'none' }}
                            onChangeText={handlePassword}
                            value={password}
                            placeholder="*****"
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
            <View style={{
                height: 60,
                backgroundColor: "#90A4AE",
                marginTop: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: "center"
            }}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('LoginMainBodyScreen')}
                >
                    <Text style={{ color: '#FAFAFA', fontSize: 20, fontWeight: 'bold' }}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, marginBottom: 30, alignItems: 'center' }}>
                <Text style={{ color: '#795548', fontSize: 16 }}>Bằng việc đăng ký, tôi chấp thuận <Text style={{ color: '#2196F3', fontSize: 18 }}>Điều khoản dịch vụ</Text> và</Text>
                <Text style={{ color: '#795548', fontSize: 16 }}><Text style={{ color: '#2196F3', fontSize: 18 }}>Chính sách quyền riêng tư</Text> của Quizlet</Text>
            </View>
        </ScrollView>
    )
};
export default withNavigation(Register);