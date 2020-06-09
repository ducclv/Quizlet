import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import styles from './Styles/HomeTab_CoursesStyles';
import AsyncStorage from '@react-native-community/async-storage';
import SearchTab_TabBar from './SearchTab_TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const HomeTab_Courses = (props) => {
    const [darkMode, setDarkMode] = useState(false)
    useEffect(() => {
        getTheme();
    }, [])
    const getTheme = async () => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === null) setDarkMode(false)
        else if (theme === 'true') setDarkMode(true)
        else if (theme === 'false') setDarkMode(false)
    };

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: darkMode === false ? "#1976D2" : "#263238"
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
                <Text style={styles.title}>Học phần</Text>
                <TouchableOpacity>
                    <Icon name='ios-add' size={25} color='#F5F5F5' type="ionicon" />
                </TouchableOpacity>
            </View>
            <ScrollableTabView
                style={styles.container}
                tabBarPosition='top'
                initialPage={0}
                renderTabBar={() => <SearchTab_TabBar {...props} darkMode={darkMode} />}
            >
                <View tabLabel="TẤT CẢ" style={styles.tabView}>
                    <Text>TẤT CẢ</Text>
                </View>
                <View tabLabel="ĐÃ HỌC" style={styles.tabView}>
                    <Text>ĐÃ HỌC</Text>
                </View>
                <View tabLabel="ĐÃ TẠO" style={styles.tabView}>
                    <Text>ĐÃ TẠO</Text>
                </View>

                <View tabLabel="ĐÃ MUA" style={styles.tabView}>
                    <Text>1</Text>
                </View>

            </ScrollableTabView>
        </View>
    )
};

export default withNavigation(HomeTab_Courses);