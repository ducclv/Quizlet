import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    View,
    Text
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { HOST, requestGET } from '../Services/Servies';
const SearchTab_User = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [props]);
    const fetchData = async () => {
        var newData = await requestGET(`${HOST}/users/listUser?keyword=${props.keyword}`);
        setData(newData.data)
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                padding: 20,
                marginVertical: 5,
                marginHorizontal: 10,
                elevation: 5,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Avatar
                        rounded
                        size="small"
                        source={require('../Images/avatar.jpg')}
                    />
                    <View>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold',fontSize:18 }}>{item.screen_name}</Text>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold',color:"#009688" }}>Email: {item.username}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}
export default SearchTab_User;