import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StatusBar,
    AsyncStorage,
} from 'react-native';
import styles from './Styles/AuthLoadingStyles';
export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.loadData();
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
    loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLogin');
        if (isLoggedIn) this.props.navigation.navigate('App')
        else this.props.navigation.navigate('Auth');
    };
}
