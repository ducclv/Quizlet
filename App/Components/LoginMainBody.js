import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/LoginMainBodyStyles'
const LoginMainBody = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor='#673AB7' />
            <ImageBackground
                source={require('../Images/background.png')}
                style={styles.image}
            >
                <Swiper >
                    <View style={styles.slide1}>
                        <Text style={styles.title}>Quizlet</Text>
                        <Text style={styles.text}>Hơn 90% học sinh sử dụng</Text>
                        <Text style={styles.text}>Quizlet cho biết họ đã cải thiện</Text>
                        <Text style={styles.text}>được cải thiện.</Text>
                    </View>
                    <View style={styles.slide2}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 80,
                            paddingLeft: 50,
                            paddingRight: 50,
                            paddingBottom: 25,
                        }}>
                            <Icon name="list-alt" size={40} color='#673AB7' />
                            <Icon name="edit" size={42} color='#673AB7' />
                            <Icon name="credit-card" size={38} color='#673AB7' />
                            <Icon name="file-text-o" size={38} color='#673AB7' />
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={styles.text}>Học theo bốn phương pháp - chọn</Text>
                            <Text style={styles.text}>phương pháp phù hợp với bạn!</Text>
                        </View>
                    </View>
                    <View style={styles.slide3}>
                        <View style={{
                            alignItems: 'center',
                            paddingTop: 80,
                            paddingBottom: 25,
                        }}>
                            <Icon name="search" size={40} color='#673AB7' />
                        </View>
                        <Text style={styles.text}>Tìm kiếm trong hơn 300 triệu học phần</Text>
                        <Text style={styles.text}>mà người dùng Quizlet đã tạo.</Text>
                    </View>
                    <View style={styles.slide3}>
                        <View style={{
                            alignItems: 'center',
                            paddingTop: 80,
                            paddingBottom: 25,
                        }}>
                            <Icon name="plus-square" size={40} color='#673AB7' />
                        </View>
                        <Text style={styles.text}>Hoặc tự tạo học phần của riêng bạn có</Text>
                        <Text style={styles.text}>chủ đề bất kỳ, cho lớp học bất kỳ.</Text>
                    </View>
                </Swiper>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('RegisterScreen')}
                    style={styles.register}
                >
                    <Text style={{ color: '#FAFAFA', fontSize: 20, fontWeight: 'bold' }}>Đăng ký miễn phí</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => props.navigation.navigate('LoginScreen')}
                    style={styles.login}
                >
                    <Text style={{ color: '#FAFAFA', fontSize: 20, fontWeight: 'bold' }}>Hoặc đăng nhập</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    )
}
export default withNavigation(LoginMainBody);