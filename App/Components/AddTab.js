import React, { useEffect, useState } from 'react';
import styles from './Styles/AddTabStyles';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const AddTab = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: props.darkMode == false ? "#EEEEEE" : "#212121" }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.darkMode === false ? "#1976D2" : "#263238",
                padding: 20,
                elevation: 4,
            }}>
                <Text style={styles.title}>Tạo mới</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 4 / 10 }} >
                    <ImageBackground
                        source={require('../Images/add.jpg')}
                        style={{ flex: 1 }}
                    >
                    </ImageBackground>
                </View>
                <View style={{ flex: 6 / 10 }}>
                    <View style={{ position: 'absolute', top: -70, left: 0, right: 0, bottom: 0, margin: 20 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center' }}>
                            <Animatable.View delay={200} animation='bounceInLeft'
                                style={{
                                    backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1 / 2,
                                    margin: 5
                                }}>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('AddTab_CourseScreen')} 
                                    style={{ padding: 20 }}>
                                    <Icon name="wpforms" color={props.darkMode == false ? "#616161" : "#EEEEEE"} size={34} style={styles.icon} />
                                    <Text style={{
                                        color: props.darkMode == false ? "#616161" : "#EEEEEE",
                                        textAlign: 'center',
                                        paddingTop: 5,
                                        width: 85,
                                        height: 40,
                                        fontSize: 14,
                                    }}>Tạo học phần</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                            <Animatable.View delay={200} animation='bounceInRight'
                                style={{
                                    backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1 / 2,
                                    margin: 5
                                }}>
                                <TouchableOpacity
                                    // onPress={() => props.navigation.navigate('RecentAnswerList')} 
                                    style={{ padding: 20 }}>
                                    <Icon name="folder" color={props.darkMode == false ? "#616161" : "#EEEEEE"} size={35} style={styles.icon} />
                                    <Text style={{
                                        color: props.darkMode == false ? "#616161" : "#EEEEEE",
                                        textAlign: 'center',
                                        paddingTop: 5,
                                        width: 85,
                                        height: 40,
                                        fontSize: 14,
                                    }}>Tạo thư mục</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center' }}>
                            <Animatable.View delay={200} animation='bounceInLeft'
                                style={{
                                    backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1 / 2,
                                    margin: 5
                                }}>
                                <TouchableOpacity 
                                // onPress={() => props.navigation.navigate('WrongAnswerList')} 
                                style={{ padding: 20 }}>
                                    <Icon name="group" color={props.darkMode == false ? "#616161" : "#EEEEEE"} size={32} style={styles.icon} />
                                    <Text style={{
                                        color: props.darkMode == false ? "#616161" : "#EEEEEE",
                                        textAlign: 'center',
                                        paddingTop: 5,
                                        width: 80,
                                        height: 40,
                                        fontSize: 14,
                                    }}>Tạo lớp</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default AddTab;