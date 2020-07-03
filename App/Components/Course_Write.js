import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    AsyncStorage
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
    const [know, setKnow] = useState(0);

    useEffect(() => {
        getTheme();
        fetchData();
        var newData = props.navigation.getParam('data');
        setProgress(index / newData.length);
    }, [progress, data, index])

    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const fetchData = async () => {
        var newData = props.navigation.getParam('data');
        setData(newData[index]);
    };
    const handleKnow = () => {
        var newIndex = index;
        var newKnow = know;
        var newData = props.navigation.getParam('data');
        if (newIndex != newData.length - 1) {
            newIndex++;
            setIndex(newIndex);
            newKnow++;
            setKnow(newKnow);
        }
        else {
            setIndex(0);
            props.navigation.navigate('Course_Test_ResultScreen', { percent: know * 100 / (newData.length - 1) });
            setKnow(0);
        }
    };
    const handleUnknow = () => {
        var newIndex = index;
        var newData = props.navigation.getParam('data');
        if (newIndex != newData.length - 1) {
            newIndex++;
            setIndex(newIndex);
        }
        else {
            props.navigation.navigate('Course_Test_ResultScreen', { percent: know * 100 / (newData.length - 1) });
            setIndex(0);
            setKnow(0);
        }
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
                    <Icon name='md-close' size={24} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <View>
                    <Progress.Bar progress={progress} width={width - 120} color="#fff" />
                </View>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='sliders' size={23} color='#F5F5F5' type="font-awesome" />
                </TouchableOpacity>
            </View>

            <View style={styles.question}>
                <Text style={styles.title}>{data.question}</Text>
            </View>

            <View style={{ flex: 1 / 2, padding: 20 }}>
                <View style={styles.answer}>
                    <Text style={styles.title}>{data.answer}</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleKnow()}
                        style={styles.btn}>
                        <Text style={styles.txt}>Biết</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleUnknow()}
                        style={styles.btn}>
                        <Text style={styles.txt}>Không biết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Course_Write;
