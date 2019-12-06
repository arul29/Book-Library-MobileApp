import React, {Component} from 'react';
import {
  Image,
  ToastAndroid,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
import axios from 'axios';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      visible: false,
      toastMsg: '',
    };
  }

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

  onRegister = () => {
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('https://nameless-plateau-17084.herokuapp.com/user/register', userData)
      .then(response => {
        this.showToast(response.data.msg);
        // console.log('succes===>', response.data.msg);
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        this.showToast(error.response.data.msg);
        console.log(error);
      });
  };

  render() {
    // Toast Condition
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
              <Image
                borderRadius={5}
                source={{
                  uri:
                    'https://image.freepik.com/free-vector/register-button_53876-43916.jpg',
                }}
                style={{
                  height: 200,
                  width: 300,
                  flex: 1,
                }}
              />
            </View>
            <View>
              <Form style={{paddingHorizontal: 20}}>
                <View>
                  <TextInput
                    placeholder="Name"
                    onChangeText={TextInputValue =>
                      this.setState({name: TextInputValue})
                    }
                    underlineColorAndroid="grey"
                  />
                </View>
                <View>
                  <TextInput
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
            <TouchableOpacity onPress={() => this.onRegister()}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 20,
                  paddingHorizontal: 30,
                }}>
                <H3 style={{textAlignVertical: 'center'}}>Sign Up</H3>
                <Right>
                  <Button
                    rounded
                    style={{backgroundColor: 'black'}}
                    onPress={() => this.onRegister()}>
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
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Sign In
                  </Text>
                </View>
              </Left>
              <Right>
                <View>
                  {/* <Text style={{textDecorationLine: 'underline'}}>
                    Forgot password?
                  </Text> */}
                </View>
              </Right>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
