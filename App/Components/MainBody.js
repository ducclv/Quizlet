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
import HomeTab from './HomeTab';
import SearchTab from './SearchTab';
import AddTab from './AddTab';
import UserTab from './UserTab';
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
            <StatusBar barStyle="dark-content" backgroundColor={darkMode == false ?'#0D47A1':"#212121"} />
            <ScrollableTabView
                style={styles.container}
                tabBarPosition='bottom'
                initialPage={0}
                renderTabBar={() => <TabBar darkMode={darkMode} />}
            >
                <View tabLabel="Trang chủ" style={styles.tabView}>
                    <HomeTab {...props} darkMode={darkMode} />
                </View>
                <View tabLabel="Tìm kiếm" style={styles.tabView}>
                    <SearchTab {...props} darkMode={darkMode} />
                </View>
                <View tabLabel="Thêm mới" style={styles.tabView}>
                    <AddTab {...props} darkMode={darkMode} />
                </View>
                <View tabLabel="Cài đặt" style={styles.tabView}>
                    <UserTab {...props} darkMode={darkMode} setDarkMode={setDarkMode}/>
                </View>
            </ScrollableTabView>
        </SafeAreaView>
    );
}

export default MainBody