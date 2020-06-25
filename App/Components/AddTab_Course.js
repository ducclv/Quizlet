import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import styles from './Styles/AddTab_CourseStyles';

const AddTab_Course = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [data, setData] = useState([
        {
            question: "",
            answer: "",
        },
        {
            question: "",
            answer: "",
        }
    ]);
    const [course, setCourse] = useState('');
    useEffect(() => {
        getTheme();
    }, [data])
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const handleQuestion = (value, index) => {
        var newData = data;
        newData[index].question = value;
        setData(newData);
    }
    const handleAnswer = (value, index) => {
        var newData = data;
        newData[index].answer = value;
        setData(newData);
    }
    const handleAdd = () => {
        var newData = data;
        newData.push({
            question: "",
            answer: "",
        })
        setData(newData);
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, padding: 20, elevation: 4, backgroundColor: '#fff', marginBottom: 20 }}>
                <TextInput
                    onChangeText={(value) => handleQuestion(value, index)}
                    style={{ borderBottomColor: '#9E9E9E', borderBottomWidth: 2 }}
                />
                <Text style={styles.text}>Thuật ngữ</Text>

                <TextInput
                    onChangeText={(value) => handleAnswer(value, index)}
                    style={{ borderBottomColor: '#9E9E9E', borderBottomWidth: 2 }}
                />
                <Text style={styles.text}>Định nghĩa</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                backgroundColor: darkMode === false ? "#1976D2" : "#263238"
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <Text style={styles.title}>Tạo học phần</Text>
                <TouchableOpacity>
                    <Icon name='md-checkmark' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }}>
                <TextInput
                    onChangeText={text => setCourse(text)}
                    value={course}
                    placeholder="Chủ đề, chương, đơn vị"
                    style={{ borderBottomColor: '#FFC107', borderBottomWidth: 2 }}
                />
                <Text style={styles.text}>Tiêu đề</Text>
            </View>
            <View style={{ flex:9/10, margin: 20, marginTop: 30 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={{ flex:1/10, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 }}>
                <TouchableOpacity onPress={() => handleAdd()}>
                    <Icon name="md-add-circle" type="ionicon" size={60} color="#00BCD4" />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default withNavigation(AddTab_Course);