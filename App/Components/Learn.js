import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    AsyncStorage,
    Dimensions
} from "react-native";
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles/LearnStyles';
const width = Dimensions.get('window').width
const Learn = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [data, setData] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState('');
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        getTheme();
        fetchData();
    }, [data, dataSource, index])

    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const fetchData = async () => {
        setDataSource(dataTest)
        setData(dataTest[index])
    }
    const handleChange = (value) => {
        setInput(value)
    }
    const handleSubmit = () => {
        var newIndex = index;
        if (newIndex != dataTest.length - 1) {
            newIndex++;
            setIndex(newIndex);
            setInput('');
            setProgress(newIndex/dataTest.length)
        }
        else props.navigation.goBack();
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
                    <Text style={styles.title}>0</Text>
                </View>
                <View>
                    <Icon name='arrow-right' size={24} color='#F5F5F5' type="entypo" />
                </View>
                <View>
                    <Text style={styles.title}>1</Text>
                    <Icon name='check' size={22} color='#F5F5F5' type="MaterialCommunityIcons" containerStyle={{ marginLeft: -5 }} />
                </View>
                <View onPress={() => props.navigation.goBack()}>
                    <Icon name='arrow-right' size={22} color='#F5F5F5' type="entypo" />
                </View>
                <View>
                    <Text style={styles.title}>2</Text>
                    <MaterialCommunityIcons name='check-all' size={24} color='#F5F5F5' type="" style={{ marginLeft: -5 }} />
                </View>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='sliders' size={23} color='#F5F5F5' type="font-awesome" />
                </TouchableOpacity>
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
const dataTest = [
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
export default Learn;