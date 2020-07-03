import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    ToastAndroid,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { HOST, requestGET } from '../Services/Servies';

const SearchTab_Class = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [props]);
    const fetchData = async () => {
        const newData = await requestGET(`${HOST}/classrooms/listClass?keyword=${props.keyword}`);
        setData(newData.data);
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('ClassScreen', { id: item.id })}>
                <View style={{
                    backgroundColor: props.darkMode == false ? "#F5F5F5" : "#263238",
                    padding: 20,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    elevation: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View>
                            <Text style={{
                                color: props.darkMode == false ? "#212121" : "#F5F5F5",
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}>{item.name.toUpperCase()}</Text>
                            <Text style={{ fontSize: 12, color: '#795548', marginTop: 3 }}>{item.description} thuật ngữ</Text>
                        </View>
                        {/* <View>
                            <Text>image</Text>
                        </View> */}
                    </View>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Avatar
                            rounded
                            size="small"
                            source={require('../Images/avatar.jpg')}
                        />
                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{item.creator}</Text>
                    </View> */}
                </View>
            </TouchableOpacity>
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
export default SearchTab_Class;