import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900'
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  btn:{
    backgroundColor:"#00BCD4",
    padding:20,
    margin:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    flex: 0.5
  },
  txt:{
    color:"#fff",
    fontWeight:'bold',
    fontSize:16,
  },
  answer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
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