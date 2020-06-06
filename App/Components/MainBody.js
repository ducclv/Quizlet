import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    StatusBar,
    Text
} from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import styles from './Styles/MainBodyStyles';
import AsyncStorage from '@react-native-community/async-storage';
import TabBar from './TabBar';
console.disableYellowBox = true;
const MainBody = (props) => {
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
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent={true} />
            <ScrollableTabView
                style={styles.container}
                tabBarPosition='bottom'
                initialPage={0}
                renderTabBar={() => <TabBar darkMode={darkMode} />}
            >
                <View tabLabel="Từ vựng" style={styles.tabView}>
                    {/* <LearnTab {...props} darkMode={darkMode} /> */}
                    <Text>Từ vựng</Text>
                </View>
                <View tabLabel="Kiểm tra" style={styles.tabView}>
                    {/* <TestTab {...props} darkMode={darkMode} /> */}
                    <Text>Kiểm tra</Text>
                </View>
                <View tabLabel="Xem lại" style={styles.tabView}>
                    {/* <ReviewTab {...props} darkMode={darkMode} /> */}
                    <Text>Xem lại</Text>
                </View>
                <View tabLabel="Cài đặt" style={styles.tabView}>
                    {/* <SettingTab darkMode={darkMode} setDarkMode={setDarkMode} /> */}
                    <Text>Cài đặt</Text>
                </View>
            </ScrollableTabView>
        </SafeAreaView>
    );
}

export default MainBody