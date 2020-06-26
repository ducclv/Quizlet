'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          question: 'question 1',
          answer: 'answrer 1'
        },
        {
          question: 'question 2',
          answer: 'answrer 2'
        },
        {
          question: 'question 1',
          answer: 'answrer 1'
        },
        {
          question: 'question 2',
          answer: 'answrer 2'
        }
      ],
    }

  }
  check = () => {
    this.swiper.goBackFromBottom();
  }
  sum = (index) => {
    console.log(index)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CardStack
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}
          ref={swiper => { this.swiper = swiper }}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          onSwipedLeft={(index) => this.sum(index)}
          onSwipedRight={(index)=>console.log(index)}
        >
          {this.state.data.map(index => {
            return (
              <Card style={{ flex: 1, backgroundColor: 'red', padding: 20 }}>
                <Text>{index.question}</Text>
              </Card>
            )
          })}
        </CardStack >

        <TouchableOpacity
          style={{ alignItems: 'center', marginBottom: 50, backgroundColor: 'gray', padding: 10 }}
          onPress={() => this.check()}>
          <Text>Left</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

const Styles = StyleSheet.create({
  card: {
    height: 500,
    width: 350,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  cardTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 200,
    width: 350,
    backgroundColor: '#D3D3D3'
  },
  cardImage: {
    position: 'absolute',
    left: 85,
    top: 110,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: '#FFF',
    borderWidth: 4,
    backgroundColor: '#1E90FF'
  },
  cardImageBorder: {
    position: 'absolute',
    left: 83.5,
    top: 108.5,
    width: 183,
    height: 183,
    borderRadius: 91.5,
    backgroundColor: '#A9A9A9'
  },
  cardText: {
    position: 'absolute',
    left: 0,
    top: 300,
    width: 350,
    alignItems: 'center',
    padding: 20
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 25,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingBottom: 10
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 18,
    color: 'grey',
    backgroundColor: 'transparent'
  },
  cardTextTerciary: {
    textAlign: 'left',
    fontSize: 18,
    color: '#696969',
    backgroundColor: 'transparent',
    paddingTop: 10
  }
});