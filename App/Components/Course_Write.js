import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from './Styles/Course_WriteStyles';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';

const Course_Write = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [progress, setProgress] = useState(1);
    const width = Dimensions.get('window').width;
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        getTheme();
        fetchData();
        setProgress(index / dataTest.length);
    }, [progress, data, index])
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const fetchData = async () => {
        setData(dataTest[index])
    }
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
                    <Icon name='md-close' size={24} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <View>
                    <Progress.Bar progress={progress} width={width - 120} color="#fff" />
                </View>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='sliders' size={23} color='#F5F5F5' type="font-awesome" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 / 2, padding: 20 }}>
                <Text style={styles.title}>{data.question}</Text>
            </View>

            <View style={{ flex: 1 / 2, padding: 20 }}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}>Biết</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}>Không biết</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.answer}>
                    <Text style={styles.title}>{data.answer}</Text>
                </View>
            </View>
        </View>
    )
}

export default Course_Write;

const dataTest = [
    {
        question: "Số liền trước của sô 148 là",
        answer: "147"
    },
    {
        question: "Muốn tìm một phần mấy của một số, ta lấy số đó chia cho mấy phần",
        answer: "148"
    },
    {
        question: "so lien truoc so 148 la",
        answer: "147"
    },
    {
        question: "question test2",
        answer: "answer test 2"
    },
    {
        question: "question test3",
        answer: "answer test 3"
    }
]