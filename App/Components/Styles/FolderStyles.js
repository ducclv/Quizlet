import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: '#616161',
        textAlign: 'center',
        fontSize: 24,
        height: 120
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 20,
    },
    txt: {
        fontSize: 18,
        color: '#fff',
        fontWeight: "bold",
        marginLeft: 20
    },
    row2: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
    },
})