import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#E0E0E0"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:"#fff",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        backgroundColor: "#00BCD4",
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5
    },
    txt: {
        color:"#00BCD4",
        fontWeight: 'bold',
        fontSize: 24,
        textAlign:'center',
    },
    answer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        flex: 1 / 2,
        margin: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#00BCD4',
        alignItems: 'center',
        justifyContent: 'center'
    }
})