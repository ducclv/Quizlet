import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './Styles/Course_TestStyles';
import * as Progress from 'react-native-progress';

const Course_Test = (props) => {
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
    const handleTrue = () => {
        var newIndex = index;
        if (newIndex != dataTest.length - 1) {
            newIndex++;
            setIndex(newIndex)
        }
        else props.navigation.navigate('Course_Test_ResultScreen');

    }
    const handleFalse = () => {
        var newIndex = index;
        if (newIndex != dataTest.length - 1) {
            newIndex++;
            setIndex(newIndex)
        }
        else props.navigation.navigate('Course_Test_ResultScreen');

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
                    <Icon name='md-arrow-back' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <View>
                    <Progress.Bar progress={progress} width={width - 100} color="#fff" />
                </View>
            </View>
            <View style={styles.question}>
                <Text style={styles.title}>{data.question}</Text>
            </View>
            <View style={{ flex: 1 / 2, padding: 20 }}>
                <View style={styles.answer}>
                    <Text style={styles.title}>{data.answer}</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleTrue()}
                        style={styles.btn}>
                        <Text style={styles.txt}>Đúng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleFalse()}
                        style={styles.btn}>
                        <Text style={styles.txt}>Sai</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Course_Test;

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