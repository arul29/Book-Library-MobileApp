import React, {Component} from 'react';
import {
  Container,
  Text,
  Button,
  Icon,
  Left,
  Right,
  View,
  Form,
  H3,
} from 'native-base';
import {TextInput} from 'react-native';
import {ScrollView, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import AuthService from './AuthService';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      email: '',
      password: '',
      visible: false,
      toastMsg: '',
    };
  }
  // async componentDidMount() {
  //   try {
  //     if (await AsyncStorage.getItem('id_token')) {
  //       this.props.navigation.navigate('Home');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  showToast = msg => {
    this.setState(
      {
        visible: true,
        toastMsg: msg,
      },
      () => {
        this.hideToast();
      },
    );
  };

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  onLogin = () => {
    // console.log('isi email', this.state.email);
    if (this.state.email === '') {
      this.showToast('email empty');
    } else if (this.state.password === '') {
      this.showToast('password empty');
    } else {
      const email = this.state.email;
      const password = this.state.password;
      // console.log(email + password);
      // };
      // if (email === null || password === null) {
      this.Auth.login(email, password)
        // .then(res => {
        //   this.showToast(res.data.msg);
        //   console.log('succes===>', response.data.msg);
        //   this.props.navigation.navigate('Login');
        // })
        // .catch(err => {
        //   this.showToast('Login failed');
        //   console.log('error.response', err);
        // });
        //   {
        .then(() => {
          this.showToast('Success Login');
          this.props.navigation.navigate('Home');
          // console.log(JSON.parse(JSON.stringify(res)));
          // console.log('Succes Login');
        })
        .catch(error => {
          this.showToast('Failed Login');
          // console.log(JSON.stringify(error.response));
        });
      // } else {
      // this.showToast('Email or password empty');
      // }
    }
    // if(this.state)
    // this.showToast('OKOK');
    // const userData = {
    // const  name: this.state.name,
  };

  render() {
    if (this.state.visible) {
      ToastAndroid.showWithGravityAndOffset(
        this.state.toastMsg,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return null;
    }
    return (
      <Container>
        <ScrollView>
          <View>
            <View style={{paddingHorizontal: 30, marginTop: 10}}>
              {/* <Text>LOGIN</Text> */}
              {/* <H1 numberOfLines={2} style={{width: 200}}>
                Here To Get Welcomed !
              </H1> */}
              {/* https://i.pinimg.com/originals/b9/7d/c2/b97dc288d71e7938c1ce8b7faacdc9ac.gif */}
              <Image
                borderRadius={5}
                source={{
                  uri: 'https://bit.ly/383O1da',
                }}
                style={{
                  height: 200,
                  width: '100%',
                  flex: 1,
                }}
              />
            </View>
            <View>
              <Form style={{paddingHorizontal: 20}}>
                <View>
                  <TextInput
                    minLength={1}
                    placeholder="Email"
                    onChangeText={TextInputValue =>
                      this.setState({email: TextInputValue})
                    }
                    underlineColorAndroid="grey"
                  />
                </View>
                <View>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={TextInputValue =>
                      this.setState({password: TextInputValue})
                    }
                    underlineColorAndroid="grey"
                  />
                </View>
              </Form>
            </View>
            <TouchableOpacity onPress={() => this.onLogin()}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 20,
                  paddingHorizontal: 30,
                }}>
                <H3 style={{textAlignVertical: 'center'}}>Sign In</H3>
                <Right>
                  <Button
                    rounded
                    style={{backgroundColor: 'black'}}
                    onPress={() => this.onLogin()}>
                    <Icon
                      style={{color: 'white'}}
                      name="arrow-right"
                      type="FontAwesome"
                    />
                  </Button>
                </Right>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 30,
                paddingVertical: 20,
              }}>
              <Left>
                <View>
                  <Text
                    style={{textDecorationLine: 'underline'}}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    Sign Up
                  </Text>
                </View>
              </Left>
              <Right>
                <View>
                  <Text style={{textDecorationLine: 'underline'}}>
                    Forgot password?
                  </Text>
                </View>
              </Right>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
