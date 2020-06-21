import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Dimensions
} from "react-native";
import { Icon } from 'react-native-elements';
import styles from './Styles/Course_RememberStyles';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-snap-carousel';
import FlipCard from 'react-native-flip-card';

const RememberCard = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [count, setCount] = useState(1);
    const [progress, setProgress] = useState(0)
    const width = Dimensions.get('window').width;
    const sliderWidth = Dimensions.get("screen").width;
    const itemWidth = Dimensions.get("screen").width;
    useEffect(() => {
        getTheme();
    }, [])
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };
    const renderItem = ({ item, index }) => {
        return (
            <FlipCard
                friction={6}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
            >
                <View style={[styles.containerItem, {
                    backgroundColor: darkMode === false ? "#F5F5F5" : "#263238",
                }]}>
                    <Text style={styles.text}>{item.question}</Text>
                </View>

                <View style={[styles.containerItem, {
                    backgroundColor: darkMode === false ? "#F5F5F5" : "#263238",
                }]}>
                    <Text style={styles.text}>{item.answer}</Text>
                </View>
            </FlipCard>
        )
    }
    return (
        <View style={{ flex: 1 }}>
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
                    <Text style={styles.title}>{count}/{data.length}</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='question-circle-o' size={24} color='#F5F5F5' type="font-awesome" />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 40 }}>
                <Progress.Bar progress={progress} width={width - 80} />
            </View>

            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                layout={'tinder'}
                layoutCardOffset={`10`}
            />

            <View style={styles.row}>
                <View style={[styles.view1, { backgroundColor: '#FF9800' }]}>
                    <Text>0</Text>
                </View>
                <View style={[styles.view2, { backgroundColor: '#4CAF50' }]}>
                    <Text>2</Text>
                </View>
            </View>

            <View style={[styles.row, { margin: 20 }]}>
                <TouchableOpacity style={styles.btn}>
                    <Icon name="back" type="antdesign" size={27} color="#9E9E9E"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.txt}>Tùy chọn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Icon name="volume-up" type="font-awesome" size={27} color="#9E9E9E"/>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const data = [
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
export default RememberCard;