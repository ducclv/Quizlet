import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './Styles/HomeTabStyles';
const HomeTab = (props) => {
    useEffect(() => {
        return () => { }
    }, []);

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.darkMode === false ? "#1976D2" : "#263238",
                padding: 20,
                elevation: 4,
            }}>
                <Text style={styles.title}>Trang chủ</Text>

            </View>
        </View>
    )
};
export default HomeTab;