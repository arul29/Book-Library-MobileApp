import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import {Container, View} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
export default class Register extends Component {
  async componentDidMount() {
    try {
      if (await AsyncStorage.getItem('id_token')) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('AuthScreen');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
        <View>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
            }}
            source={{
              uri:
                'https://i.pinimg.com/originals/de/94/ca/de94ca8803f947e2b74897c34181c2d8.jpg',
            }}
          />
        </View>
      </Container>
    );
  }
}