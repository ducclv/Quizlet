import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './Styles/Course_Test_ResultStyles';
import * as Progress from 'react-native-progress';

const Course_Test_Result = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        getTheme();
    }, [])
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


            {/* <Progress.Bar progress={0.3} width={200} /> */}
            <View style={{flex:1/2}}>
                <Progress.Pie progress={0.4} size={50} showsText={true}/>
                <Progress.Circle size={30} indeterminate={true} />

            </View>
            {/* <Progress.Circle progress={0.4} size={30} indeterminate={true} showsText={true} formatText="hello" /> */}
            {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
        </View>
    )
}

export default Course_Test_Result;