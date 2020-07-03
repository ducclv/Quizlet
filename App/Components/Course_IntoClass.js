import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './Styles/Course_IntoClassStyles';
import { HOST, requestGET, requestPOST } from '../Services/Servies';
import { Avatar } from 'react-native-elements';

const Course_IntoClass = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        getTheme();
        fetchData();
    }, []);
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const fetchData = async () => {
        var user_id = await AsyncStorage.getItem('isLogin');
        var newData = await requestGET(`${HOST}/classrooms/viewMyClass/${user_id}`);
        setData(newData.data.list_lesson);
    }
    const submit = async (id) => {
        var user_id = await AsyncStorage.getItem('isLogin');
        var name = props.navigation.getParam('name');
        var words = props.navigation.getParam('words');
        var newData = {
            user_id: id,
            name: name,
            words: words,
            classroom_id: id,
        }
        var post = await requestPOST(`${HOST}/lessons/add`, newData).then(res => { return res })
        ToastAndroid.show("Thêm vào lớp học thành công", ToastAndroid.SHORT)
        props.navigation.goBack();
        // console.log(newData);
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=> submit(item.id)}>
                <View style={{
                    backgroundColor: darkMode == false ? "#F5F5F5" : "#263238",
                    padding: 20,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    elevation: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View>
                            <Text style={{
                                color: darkMode == false ? "#212121" : "#F5F5F5",
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}>{item.name.toUpperCase()}</Text>
                            <Text style={{ fontSize: 12, color: '#795548', marginTop: 3 }}>{item.numb_lessoon} thuật ngữ</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Avatar
                            rounded
                            size="small"
                            source={require('../Images/avatar.jpg')}
                        />
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', color: darkMode == false ? "#00838F" : "#EEEEEE" }}>{item.creator}</Text>
                    </View>
                </View>
            </TouchableOpacity >

        )
    }
return (
    <View style={{ flex: 1 }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: "#1976D2"
        }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon name='md-arrow-back' size={25} color='#F5F5F5' type="ionicon" />
            </TouchableOpacity>
            <Text style={styles.title}>Thêm vào lớp học</Text>
            <TouchableOpacity >
                <Icon name='more-vertical' size={25} color='transparent' type="feather" />
            </TouchableOpacity>
        </View>

        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
)
}

export default Course_IntoClass;