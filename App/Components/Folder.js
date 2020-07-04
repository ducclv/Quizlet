import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import styles from './Styles/FolderStyles';
import { HOST, requestGET, requestPOST } from '../Services/Servies';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Avatar } from 'react-native-elements';
import Empty from './Empty';
import Modal from 'react-native-modal';

const Folder = (props) => {
    const [data, setData] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        var id = props.navigation.getParam('id');
        var user_id = await AsyncStorage.getItem('isLogin');
        var newData = await requestGET(`${HOST}/folders/view/${id}`);
        console.log(newData.data.folder)
        setData(newData.data.folder)
    }
    const removeFolder = async () => {
        var id = props.navigation.getParam('id');
        var dataPost = await requestPOST(`${HOST}/folders/delete/${id}`)
        setVisibleModal(false);
        ToastAndroid.show("Đã xóa lớp học", ToastAndroid.SHORT)
        props.navigation.navigate('MainBodyScreen');
    }
    const renderItemCourse = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('CourseScreen', { id: item.id })}>
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
                            <Text style={{ fontSize: 12, color: '#795548', marginTop: 3 }}>{item.numb_question} thuật ngữ</Text>
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
            </TouchableOpacity>
        )
    }
    const renderCourse = () => {
        if (JSON.stringify(data.list_lesson) !== JSON.stringify([])) return (
            <FlatList
                data={data.list_lesson}
                renderItem={renderItemCourse}
                keyExtractor={(item, index) => index.toString()}
            />
        )
        else return <Empty theme={false} />
    }
    const renderClass = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: "#F5F5F5",
                padding: 20,
                marginVertical: 10,
                marginHorizontal: 20,
                elevation: 3,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: "row",
            }}>
                <Avatar
                    rounded
                    size="small"
                    source={require('../Images/avatar.jpg')}
                />
                <Text style={{ marginLeft: 30, fontWeight: 'bold', fontSize: 18 }}>{item.creator}</Text>
            </View>

        )
    }
    const renderModal = () => {
        if (visibleModal === true) {
            return (
                <View style={{
                    backgroundColor: darkMode === false ? "#0D47A1" : "#212121",
                    justifyContent: 'center',
                    margin: 20,
                }}>
                    <TouchableOpacity style={styles.row2} onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                        <Icon name='md-share' size={30} color="#fff" type="ionicon" />
                        <Text style={styles.txt}>Chia sẻ học phần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row2} onPress={() => removeFolder()}>
                        <Icon name="delete" type="antdesign" size={28} color="#fff" />
                        <Text style={styles.txt}>Xóa thư mục</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}
                        onPress={() => setVisibleModal(false)}
                    >
                        <Text style={styles.txt}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    return (
        <View style={styles.container}>
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
                <Text style={styles.title}>Thư mục</Text>
                <TouchableOpacity onPress={() => setVisibleModal(true)}>
                    <Icon name='more-vertical' size={25} color='#F5F5F5' type="feather" />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.name}</Text>
            </View>
            <View style={styles.row}>
                <Avatar
                    rounded
                    size="small"
                    source={require('../Images/avatar.jpg')}
                />
                <Text style={{ marginLeft: 30, fontWeight: 'bold', fontSize: 18 }}>{data.creator}</Text>
            </View>
            <ScrollableTabView
                style={styles.container}
                tabBarPosition='top'
                initialPage={0}
                renderTabBar={() => <DefaultTabBar {...props} />}
            >
                <View tabLabel="HỌC PHẦN" style={styles.tabView}>
                    {renderCourse()}
                </View>
                <View tabLabel="LỚP HỌC" style={styles.tabView}>
                    <FlatList
                        data={data.list_classroom}
                        renderItem={renderClass}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollableTabView>
            <Modal
                onBackdropPress={() => setVisibleModal(false)}
                backdropTransitionOutTiming={0}
                isVisible={visibleModal}
                hideModalContentWhileAnimating={true}>
                {renderModal()}
            </Modal>
        </View>
    )
}
export default Folder;