import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ImageBackground,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import styles from './Styles/CourseStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FlipCard from 'react-native-flip-card';
import Modal from 'react-native-modal';
import { HOST, requestGET, requestPOST } from '../Services/Servies';
const Course = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const sliderWidth = Dimensions.get("screen").width;
    const itemWidth = Dimensions.get("screen").width;
    const [activeSlide, setActiveSlide] = useState(0);
    const [data, setData] = useState({});
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    useEffect(() => {
        fetchData();
        getTheme();
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const fetchData = async () => {
        var user_id = await AsyncStorage.getItem('isLogin');
        var id = props.navigation.getParam('id');
        const newData = await requestGET(`${HOST}/lessons/view/${id}/?user_id=${user_id}`);
        setData(newData.data)
        setWords(newData.data.words)
    }
    const pagination = () => {
        return (
            <Pagination
                dotsLength={words.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: '#fff', marginBottom: -20 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor: '#1976D2'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                <FlipCard style={{
                    backgroundColor: "#fff",
                    flex: 1,
                    marginLeft: 30,
                    marginRight: 30,
                    marginBottom: 2,
                    padding: 40,
                    elevation: 6,
                }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>{item.question}</Text>
                    </View>
                    <View >
                        <Text style={styles.text}>{item.answer}</Text>
                    </View>
                </FlipCard>
            </ View>
        );
    };

    const renderItemCard = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: "#fff",
                padding: 20,
                elevation: 3,
                marginVertical: 5,
                marginHorizontal: 5,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 9 / 10 }}>
                        <Text style={{
                            color: darkMode == false ? "#212121" : "#F5F5F5",
                            fontWeight: '900',
                            fontSize: 16,
                        }}>
                            {item.question}
                        </Text>

                        <Text style={{
                            color: darkMode == false ? "#009688" : "#F5F5F5",
                            fontWeight: '900',
                            fontSize: 16,
                            marginTop: 20
                        }}>{item.answer}</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon name="volume-up" type="font-awesome" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    const renderModal = () => {
        if (visibleModal == true && data.is_attended == true) {
            return (
                <View style={{
                    backgroundColor: darkMode === false ? "#0D47A1" : "#212121",
                    justifyContent: 'center',
                    margin: 20,
                }}>
                    <TouchableOpacity style={styles.row} onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                        <Icon name='md-share' size={30} color="#fff" type="ionicon" />
                        <Text style={styles.txt}>Chia sẻ học phần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Icon name="edit" type="antdesign" size={30} color="#fff" />
                        <Text style={styles.txt}>Sửa học phần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => removeCourse()}>
                        <Icon name="delete" type="antdesign" size={30} color="#fff" />
                        <Text style={styles.txt}>Xóa học phần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}
                        onPress={() => setVisibleModal(false)}
                    >
                        <Text style={styles.txt}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if (visibleModal == true && data.is_attended == false) {
            return (
                <View style={{
                    backgroundColor: darkMode === false ? "#0D47A1" : "#212121",
                    justifyContent: 'center',
                    margin: 20,
                }}>
                    <TouchableOpacity style={styles.row} onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                        <Icon name='md-share' size={30} color="#fff" type="ionicon" />
                        <Text style={styles.txt}>Chia sẻ học phần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => joinCourse()}>
                        <Icon name="edit" type="antdesign" size={30} color="#fff" />
                        <Text style={styles.txt}>Tham gia học phần</Text>
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
    const joinCourse = async () => {
        var user_id = await AsyncStorage.getItem('isLogin');
        var id = props.navigation.getParam('id');
        var newData = {
            lesson_id: id,
            user_id: user_id
        }
        const dataPost = await requestPOST(`${HOST}/lessons/attendLesson`, newData).then(res => { return res })
        setVisibleModal(false);
        ToastAndroid.show("Đã tham gia khóa học", ToastAndroid.SHORT)
    }
    const goToLearnScreen = async () => {
        if (data.is_attended == false) {
            joinCourse();
        }
        props.navigation.navigate('Course_LearnScreen', { data: data.words })
    }
    const goToRememberCard = async () => {
        if (data.is_attended == false) {
            joinCourse();
        }
        props.navigation.navigate('Course_RememberCardScreen', { data: data.words })
    }
    const goToWriteScreen = async () => {
        if (data.is_attended == false) {
            joinCourse();
        }
        props.navigation.navigate('Course_WriteScreen', { data: data.words })
    }
    const goToTestScreen = async () => {
        if (data.is_attended == false) {
            joinCourse();
        }
        props.navigation.navigate('Course_TestScreen', { data: data.words })
    }
    const removeCourse = async () => {
        if (data.is_attended == true) {
            var user_id = await AsyncStorage.getItem('isLogin');
            var id = props.navigation.getParam('id');
            var newData = {
                lesson_id: id,
                user_id: user_id
            }
            const dataPost = await requestPOST(`${HOST}/lessons/quitLesson`, newData).then(res => { return res });
            setVisibleModal(false);
            ToastAndroid.show("Đã xóa khóa học", ToastAndroid.SHORT)
            props.navigation.navigate('MainBodyScreen');
        }
    }

    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
            <Text>Đang tải</Text>
        </View>
    )
    else return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: darkMode === false ? "#1976D2" : "#263238",
                padding: 20,
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>{data.name}</Text>

                <TouchableOpacity onPress={() => setVisibleModal(true)}>
                    <Icon name='more-vert' size={28} color='#F5F5F5' type="MaterialIcons" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../Images/background2.png')}
                    style={styles.image}
                >
                    <ScrollView style={{ flex: 1 }}>
                        <Carousel
                            data={data.words}
                            renderItem={renderItem}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            onSnapToItem={(index) => setActiveSlide(index)}
                            layout={'default'}
                            layoutCardOffset={`9`}
                        />
                        {pagination()}
                        <View style={{ padding: 20, backgroundColor: '#fff' }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View>
                                    <Text style={{
                                        color: darkMode == false ? "#212121" : "#F5F5F5",
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                    }}>{data.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#795548', marginTop: 3 }}>{data.numb_question} thuật ngữ</Text>
                                        <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{data.creator}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                                    <Icon name="download-cloud" type="feather" color="#1976D2" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', top: 20 }}>
                                <View
                                    style={{
                                        backgroundColor: darkMode == false ? "#fff" : "#263238",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1 / 2,
                                        margin: 5,
                                        elevation: 4
                                    }}>
                                    <TouchableOpacity onPress={() => goToLearnScreen()}
                                        style={{ padding: 20 }}>
                                        <Icon name="leanpub" type="font-awesome" color={darkMode == false ? "#1976D2" : "#EEEEEE"} size={34} />
                                        <Text style={{
                                            color: darkMode == false ? "#009688" : "#EEEEEE",
                                            textAlign: 'center',
                                            paddingTop: 5,
                                            width: 85,
                                            height: 30,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>HỌC</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: darkMode == false ? "#fff" : "#263238",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1 / 2,
                                        margin: 5,
                                        elevation: 4,
                                    }}>
                                    <TouchableOpacity onPress={() => goToRememberCard()}
                                        style={{ padding: 20 }}>
                                        <Icon name="list-alt" type="font-awesome" color={darkMode == false ? "#1976D2" : "#EEEEEE"} size={35} style={styles.icon} />
                                        <Text style={{
                                            color: darkMode == false ? "#009688" : "#EEEEEE",
                                            textAlign: 'center',
                                            paddingTop: 5,
                                            width: 90,
                                            height: 30,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>THẺ GHI NHỚ</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', top: 20 }}>
                                <View
                                    style={{
                                        backgroundColor: darkMode == false ? "#fff" : "#263238",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1 / 3,
                                        margin: 5,
                                        elevation: 4
                                    }}>
                                    <TouchableOpacity onPress={() => goToWriteScreen()}
                                        style={{ padding: 10 }}>
                                        <Icon name="edit" type="font-awesome" color={darkMode == false ? "#1976D2" : "#EEEEEE"} size={34} />
                                        <Text style={{
                                            color: darkMode == false ? "#009688" : "#EEEEEE",
                                            textAlign: 'center',
                                            paddingTop: 5,
                                            width: 85,
                                            height: 30,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>VIẾT</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: darkMode == false ? "#fff" : "#263238",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1 / 3,
                                        margin: 5,
                                        elevation: 4,
                                    }}>
                                    <TouchableOpacity onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}
                                        style={{ padding: 10 }}>
                                        <Icon name="credit-card" type="font-awesome" color={darkMode == false ? "#1976D2" : "#EEEEEE"} size={35} style={styles.icon} />
                                        <Text style={{
                                            color: darkMode == false ? "#009688" : "#EEEEEE",
                                            textAlign: 'center',
                                            paddingTop: 5,
                                            width: 85,
                                            height: 30,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>THẺ GHÉP</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: darkMode == false ? "#fff" : "#263238",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1 / 3,
                                        margin: 5,
                                        elevation: 4,
                                    }}>
                                    <TouchableOpacity onPress={() => goToTestScreen()}
                                        style={{ padding: 10 }}>
                                        <Icon name="file-text-o" type="font-awesome" color={darkMode == false ? "#1976D2" : "#EEEEEE"} size={35} style={styles.icon} />
                                        <Text style={{
                                            color: darkMode == false ? "#009688" : "#EEEEEE",
                                            textAlign: 'center',
                                            paddingTop: 5,
                                            width: 85,
                                            height: 30,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thẻ</Text>
                                <TouchableOpacity onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                                    <Text style={{ color: '#009688' }}>Thứ tự gốc</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={data.words}
                                renderItem={renderItemCard}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <Modal
                            onBackdropPress={() => setVisibleModal(false)}
                            backdropTransitionOutTiming={0}
                            isVisible={visibleModal}
                            hideModalContentWhileAnimating={true}>
                            {renderModal()}
                        </Modal>
                    </ScrollView>
                </ImageBackground>
            </View>
        </View>
    )
};


export default Course;