import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from './Styles/TabBarStyles';
export default class SearchTab_TabBar extends React.Component {
    constructor(props) {
        super(props)
    }

    textStyle = (active, i) => {
        return {
            fontSize: 15,
            color: active === i ? '#FAFAFA' : '#03A9F4'
        }
    }
    textStyleDark = (active, i) => {
        return {
            fontSize: 15,
            color: active === i ? '#FAFAFA' : '#212121'
        }
    }
    render() {
        return (
            <View style={{
                height: 60,
                flexDirection: 'row',
                backgroundColor: this.props.darkMode === true ? '#263238' : '#1976D2',
            }}>
                {this.props.tabs.map((tab, i) => {
                    if (this.props.darkMode === false) {
                        return (
                            <TouchableOpacity key={tab} style={styles.container}
                                onPress={() => this.props.goToPage(i)} >
                                <Text style={this.textStyle(this.props.activeTab, i)}>{tab}</Text>
                            </TouchableOpacity>)
                    }
                    else return (
                        <TouchableOpacity key={tab} style={styles.container}
                            onPress={() => this.props.goToPage(i)} >
                            <Text style={this.textStyleDark(this.props.activeTab, i)}>{tab}</Text>
                        </TouchableOpacity>)
                })}
            </View>
        )
    }
}