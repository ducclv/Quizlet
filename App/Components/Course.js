import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import styles from './Styles/CourseStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FlipCard from 'react-native-flip-card'

const Course = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const sliderWidth = Dimensions.get("screen").width;
    const itemWidth = Dimensions.get("screen").width;
    const [activeSlide, setActiveSlide] = useState(0);
    useEffect(() => {
        getTheme();
    }, [])
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };

    const pagination = () => {
        return (
            <Pagination
                dotsLength={data.length}
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
            <View >
                <FlipCard style={{
                    backgroundColor: "#fff",
                    height: 200,
                    marginLeft: 30,
                    marginRight: 30,
                    marginBottom: 1,
                    padding: 40,
                    elevation: 6,
                }}>
                    <View style={styles.face}>
                        <Text style={styles.text}>{item.content}</Text>
                    </View>
                    <View style={styles.back}>
                        <Text style={styles.text}>{item.answer}</Text>
                    </View>
                </FlipCard>
                <View style={{ alignItems: 'flex-end', marginRight: 30, marginTop: -40, padding: 10 }}>
                    <TouchableOpacity onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                        <Icon name="maximize" type="feather" size={24} color="#1976D2" />
                    </TouchableOpacity>
                </View>
            </ View>
        );
    }

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
                            {item.content}
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
    }
    return (
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
                }}>Toan</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                        <Icon name='md-share' size={25} color='#F5F5F5' type="ionicon" containerStyle={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => ToastAndroid.show("Tính năng đang triển khai", ToastAndroid.SHORT)}>
                        <Icon name='more-vert' size={28} color='#F5F5F5' type="MaterialIcons" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../Images/background2.png')}
                    style={styles.image}
                >
                    <ScrollView style={{ flex: 1 }}>
                        <Carousel
                            data={data}
                            renderItem={renderItem}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            onSnapToItem={(index) => setActiveSlide(index)}
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
                                    }}>TOAN</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#795548', marginTop: 3 }}>8 thuật ngữ</Text>
                                        <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>leducuet</Text>
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
                                    <TouchableOpacity
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
                                    <TouchableOpacity
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
                                    <TouchableOpacity
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
                                    <TouchableOpacity
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
                                    <TouchableOpacity
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
                                data={data}
                                renderItem={renderItemCard}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        </View>
    )
};

const data = [
    {
        content: "Số liền trước của sô 148 là",
        answer: "147"
    },
    {
        content: "Muốn tìm một phần mấy của một số, ta lấy số đó chia cho mấy phần",
        answer: "148"
    }
]
export default Course;