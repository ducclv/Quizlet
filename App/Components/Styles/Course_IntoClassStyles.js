import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#616161',
    fontSize: 24,
    fontWeight: 'bold',

  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  view1: {
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10
  },
  view2: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  containerItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    elevation: 5,
    padding: 40,
    borderRadius: 10,
    width:Dimensions.get('window').width/1.5,
    height:Dimensions.get('window').height/2,
    alignItems:'center',
    justifyContent:'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    elevation: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  txt: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  }
})