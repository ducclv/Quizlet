import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './Styles/Course_Test_ResultStyles';

const Course_Test_Result = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        getTheme();
        setPercent(props.navigation.getParam('percent'))
    }, [percent, props])
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 20,
                backgroundColor: darkMode === false ? "#1976D2" : "#263238",
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Kết quả kiểm tra</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='transparent' type="ionicon" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 50 }}>
                <Text style={styles.txt}>Chúc mừng bạn đã học hết nội dung</Text>
                <Text style={{
                    color: "#03A9F4",
                    fontWeight: 'bold',
                    fontSize: 36,
                    textAlign: 'center',
                    marginTop: 20
                }}>{Math.ceil(percent)}%</Text>
                <TouchableOpacity style={{
                    backgroundColor: '#607D8B', padding: 15, marginTop: 20
                }}
                    onPress={() => props.navigation.goBack()}
                >
                    <Text style={styles.title}>Học lại</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Course_Test_Result;