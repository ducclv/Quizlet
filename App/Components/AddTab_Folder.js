import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import styles from './Styles/AddTab_ClassStyles';
import { HOST, requestPOST } from '../Services/Servies';
const AddTab_Folder = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [moreInfor, setMoreInfor] = useState('');
    useEffect(() => {
        getTheme();
    }, []);
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const handleSubmit = async () => {
        const id = await AsyncStorage.getItem('isLogin');
        var submit = {
            user_id: id,
            name: folderName,
            description: moreInfor,
        }
        const post = await requestPOST(`${HOST}/folders/add`, submit).then(res => { return res })
        ToastAndroid.show("Tạo môn học thành công", ToastAndroid.SHORT)
        props.navigation.goBack();
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
                <Text style={styles.title}>Tạo thư mục</Text>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <Icon name='md-checkmark' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }}>
                <TextInput
                    onChangeText={text => setFolderName(text)}
                    value={folderName}
                    placeholder="Tên thư mục"
                    style={{ borderBottomColor: '#FFC107', borderBottomWidth: 2 }}
                />
                <Text style={styles.text}>Tên thư mục</Text>
            </View>
            <View style={{ margin: 20, marginTop: -10 }}>
                <TextInput
                    onChangeText={text => setMoreInfor(text)}
                    value={moreInfor}
                    placeholder="Mô tả(tùy chọn)"
                    style={{ borderBottomColor: '#FFC107', borderBottomWidth: 2 }}
                />
                <Text style={styles.text}>Mô tả</Text>
            </View>

        </View>
    )
};

export default withNavigation(AddTab_Folder);