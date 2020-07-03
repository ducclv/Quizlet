import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    AsyncStorage,
    Dimensions
} from "react-native";
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-elements';
import styles from './Styles/LearnStyles';
const width = Dimensions.get('window').width
const Course_Learn = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [data, setData] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState('');
    const [progress, setProgress] = useState(0);
    const [know, setKnow] = useState(0);
    const [unknow, setUnknow] = useState(0);
    const [size, setSize] = useState(0);
    useEffect(() => {
        getTheme();
        fetchData();
    }, [data, dataSource, index, size, props])

    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const fetchData = () => {
        var newData = props.navigation.getParam('data');
        setSize(newData.length - index);
        setDataSource(newData);
        setData(newData[index]);
    }
    const handleChange = (value) => {
        setInput(value)
    }
    const handleSubmit = () => {
        var newIndex = index;
        var newSize = size;
        var newKnow = know;
        var newUnknow = unknow;
        var newData = props.navigation.getParam('data');
        if (newIndex != newData.length - 1) {
            if (newData[newIndex].answer === input) {
                newKnow++;
                setKnow(newKnow);
            } else {
                newUnknow++;
                setUnknow(newUnknow);
            }
            newIndex++;
            setIndex(newIndex);
            newSize--;
            setSize(newSize);
            setProgress(newIndex / newData.length);
            setInput('');
        }
        else {
            if (newData[newIndex].answer === input) {
                newKnow++;
                setKnow(newKnow);
            } else {
                newUnknow++;
                setUnknow(newUnknow);
            }
            props.navigation.navigate('Course_Test_ResultScreen', { percent: know * 100 / (newData.length) });
            setKnow(0);
            setUnknow(0);
            setIndex(0);
            setSize(0);
            setProgress(0);
            setInput('');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: darkMode === false ? "#1976D2" : "#263238",
                padding: 20,
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='md-close' size={24} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>{size}</Text>
                </View>
                <View>
                    <Icon name='arrow-right' size={24} color='#F5F5F5' type="entypo" />
                </View>
                <View>
                    <Text style={styles.title}>{unknow}</Text>
                    <Icon name='close' size={22} color='#F5F5F5' type="material-community" containerStyle={{ marginLeft: -5 }} />
                </View>
                <View onPress={() => props.navigation.goBack()}>
                    <Icon name='arrow-right' size={22} color='#F5F5F5' type="entypo" />
                </View>
                <View>
                    <Text style={styles.title}>{know}</Text>
                    <Icon name='check-all' size={24} color='#F5F5F5' type="material-community" containerStyle={{ marginLeft: -5 }} />
                </View>
            </View>
            <Progress.Bar progress={progress} width={width} borderRadius={0} />
            <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <Text style={styles.text}>{data.question}</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                    onChangeText={handleChange}
                    value={input}
                    onEndEditing={() => handleSubmit()}
                    returnKeyType="go"
                    autoCapitalize="none"
                    keyboardType="default"
                />
            </View>
        </SafeAreaView>
    )
}

export default Course_Learn;