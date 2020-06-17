import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  linearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#1976D2'
  },
  text: {
    color: '#616161',
    textAlign: 'center',
    fontSize: 24,
  },
  title: {
    color: '#616161',
    fontSize: 30,
    fontWeight:'bold'
  },
  view: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1 / 2,
    margin: 5
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
})