import React, { useEffect, useState, Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
} from "react-native";
import { Icon } from 'react-native-elements';
import styles from './Styles/Course_RememberStyles';
import * as Progress from 'react-native-progress';
import FlipCard from 'react-native-flip-card';
import CardStack, { Card } from 'react-native-card-stack-swiper';
const width = Dimensions.get('window').width;

export default class RememberCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            darkMode: false,
            progress: 0,
            progressbar: 0,
            count: 0,
            know: 0,
            unknow: 0,
            data: []
        }
    }
    componentDidMount() {
        this.getTheme();
        this.setState({ data: this.props.navigation.getParam('data') });
    }
    getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) this.setState({ darkMode: false })
        else if (theme === 'true') this.setState({ darkMode: true })
        else if (theme === 'false') this.setState({ darkMode: false })
    };

    handleKnow = () => {
        var newdata = this.state.know;
        var newProgress = this.state.progress;
        var newCount = this.state.count;
        newdata++;
        newProgress++;
        newCount++;
        this.setState({ know: newdata, progress: newProgress, count: newCount, progressbar: newProgress / this.state.data.length })
    }
    handleUnKnow = () => {
        var newdata = this.state.unknow;
        var newProgress = this.state.progress;
        var newCount = this.state.count;
        newdata++;
        newProgress++;
        newCount++;
        this.setState({ unknow: newdata, progress: newProgress, count: newCount, progressbar: newProgress / this.state.data.length })
    }
    handleRefresh = async () => {
        var newCount = this.state.count;
        while (newCount != 0) {
            await this.swiper.goBackFromTop();
            newCount--;
        }
        this.setState({ count: 0, progressbar: 0, progress: 0, know: 0, unknow: 0 })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: this.state.darkMode === false ? "#1976D2" : "#263238",
                    padding: 20,
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name='md-close' size={24} color='#F5F5F5' type="ionicon" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>{this.state.count}/{this.state.data.length}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name='question-circle-o' size={24} color='#F5F5F5' type="font-awesome" />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 40 }}>
                    <Progress.Bar progress={this.state.progressbar} width={width - 80} />
                </View>

                <CardStack
                    style={{ flex: 9 / 10, alignItems: 'center', justifyContent: 'center' }}
                    ref={swiper => { this.swiper = swiper }}
                    disableBottomSwipe={true}
                    disableTopSwipe={true}
                    onSwipedLeft={() => this.handleUnKnow()}
                    onSwipedRight={() => this.handleKnow()}
                >
                    {this.state.data.map(item => {
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
                                    backgroundColor: this.state.darkMode === false ? "#F5F5F5" : "#263238",
                                }]}>
                                    <Text style={styles.text}>{item.question}</Text>
                                </View>

                                <View style={[styles.containerItem, {
                                    backgroundColor: this.state.darkMode === false ? "#F5F5F5" : "#263238",
                                }]}>
                                    <Text style={styles.text}>{item.answer}</Text>
                                </View>
                            </FlipCard>
                        )
                    })}
                </CardStack >


                <View style={[styles.row]}>
                    <View style={[styles.view1, { backgroundColor: '#FF9800' }]}>
                        <Text>{this.state.unknow}</Text>
                    </View>
                    <View style={[styles.view2, { backgroundColor: '#4CAF50' }]}>
                        <Text>{this.state.know}</Text>
                    </View>
                </View>

                <View style={[styles.row, { margin: 20 }]}>
                    <TouchableOpacity style={styles.btn} onPress={() => this.swiper.swipeLeft()}>
                        <Icon name="corner-up-left" type="feather" size={27} color="#9E9E9E" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.handleRefresh()}
                        style={styles.btn}>
                        <Text style={styles.txt}>Làm lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => this.swiper.swipeRight()}>
                        <Icon name="corner-up-right" type="feather" size={27} color="#9E9E9E" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const dataTest = [
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
