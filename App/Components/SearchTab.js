import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import styles from './Styles/SearchTabStyles';
import { SearchBar } from 'react-native-elements';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import SearchTab_Subject from './SearchTab_Subject';
import SearchTab_Class from './SearchTab_Class';
import SearchTab_User from './SearchTab_User';
import SearchTab_TabBar from './SearchTab_TabBar';
const SearchTab = (props) => {
    const [data, setData] = useState('')
    useEffect(() => {
        return () => { }
    }, []);
    const updateSearch = value => {
        setData(value);
    };
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                lightTheme
                placeholder="Tìm kiếm"
                onChangeText={updateSearch}
                onClearText={() => setData('')}
                value={data}
                containerStyle={{ backgroundColor: "#1976D2", margin: -1 }}
                inputContainerStyle={{ backgroundColor: "#fff" }}
            />
            <ScrollableTabView
                style={styles.container}
                tabBarPosition='top'
                initialPage={0}
                renderTabBar={() => <SearchTab_TabBar {...props} />}
            >
                <View tabLabel="HỌC PHẦN" style={styles.tabView}>
                    <SearchTab_Subject {...props} data={data} />
                </View>
                <View tabLabel="LỚP HỌC" style={styles.tabView}>
                    <SearchTab_Class {...props} data={data} />
                </View>
                <View tabLabel="NGƯỜI DÙNG" style={styles.tabView}>
                    <SearchTab_User {...props} data={data} />
                </View>
            </ScrollableTabView>
        </SafeAreaView>
    )
};
export default SearchTab;