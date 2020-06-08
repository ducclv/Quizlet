import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    register: {
        height: 60,
        backgroundColor: "#5D4037",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    login:{
        height: 60,
        backgroundColor: "transparent",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    slide1: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    slide2: {
        flex: 1,
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#EEEEEE',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    text: {
        color: '#212121',
        fontSize: 18,
    }
});