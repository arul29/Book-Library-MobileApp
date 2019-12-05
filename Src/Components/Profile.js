import React, {Component} from 'react';
import {ToastAndroid, TouchableOpacity, Image} from 'react-native';
import {
  Container,
  Header,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  H3,
  Title,
  Card,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';
// import AuthService from './AuthService';
// const Auth = new AuthService();
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      toastMsg: '',
      name: '',
    };
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('id_token');
    // console.log(decode(data));
    const profile = decode(data);
    this.setState({
      name: profile.response.name,
    });
    // console.log('nama', name);
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

  async onLogout() {
    await AsyncStorage.removeItem('id_token').then(() => {
      this.showToast('You are logged out');
      this.props.navigation.navigate('Login');
    });
  }

  render() {
    let a = 0;
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
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon style={{color: 'black'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black'}}>Profile</Title>
          </Body>
          <Right>
            <View>
              <TouchableOpacity onPress={() => this.onLogout()}>
                <Button
                  style={{
                    width: 100,
                    height: 30,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => this.onLogout()}>
                  <Text style={{}}>Logout</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </Right>
        </Header>
        <ScrollView>
          <View>
            <View
              style={{
                backgroundColor: 'pink',
                alignItems: 'center',
                height: 200,
                borderBottomEndRadius: 100,
                borderBottomStartRadius: 100,
              }}>
              <Thumbnail
                style={{
                  backgroundColor: 'aqua',
                  width: 100,
                  height: 100,
                  marginTop: 20,
                  marginBottom: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri:
                    'https://yt3.ggpht.com/a/AGF-l7-fI-S21mKPmp9-DXx0FhGSBFSwv_BzPoOZYQ=s288-c-k-c0xffffffff-no-rj-mo',
                }}
              />
              <H3>{this.state.name}</H3>
            </View>
            <View>
              <Text style={{alignSelf: 'center'}}>Your Wishlist</Text>
            </View>
          </View>
          <View>
            {a > 0 ? (
              <View>
                <Card>
                  <View
                    style={{
                      paddingLeft: 30,
                      flexDirection: 'row',
                    }}>
                    {/* <Text>1</Text> */}
                    <Card transparent width={85} height={130}>
                      <Image
                        borderRadius={5}
                        source={{
                          uri:
                            'https://kbimages1-a.akamaihd.net/a26bb671-977c-4324-a6af-486847cdbe32/1200/1200/False/a-game-of-thrones-a-song-of-ice-and-fire-book-1.jpg',
                        }}
                        style={{
                          height: 200,
                          width: '100%',
                          flex: 1,
                        }}
                      />
                    </Card>
                    <View>
                      <Text style={{marginTop: '10%'}}>A Game of Thrones</Text>
                      <Text>27 April 2019</Text>
                      <Text>Returned</Text>
                    </View>
                    {/* <View></View> */}
                  </View>
                </Card>
                <Card>
                  <View
                    style={{
                      paddingLeft: 30,
                      flexDirection: 'row',
                    }}>
                    {/* <Text>1</Text> */}
                    <Card transparent width={85} height={130}>
                      <Image
                        borderRadius={5}
                        source={{
                          uri:
                            'https://kbimages1-a.akamaihd.net/a26bb671-977c-4324-a6af-486847cdbe32/1200/1200/False/a-game-of-thrones-a-song-of-ice-and-fire-book-1.jpg',
                        }}
                        style={{
                          height: 200,
                          width: '100%',
                          flex: 1,
                        }}
                      />
                    </Card>
                    <View>
                      <Text style={{marginTop: '10%'}}>A Game of Thrones</Text>
                      <Text>27 April 2019</Text>
                      <Text>Returned</Text>
                    </View>
                    {/* <View></View> */}
                  </View>
                </Card>
              </View>
            ) : (
              <View style={{}}>
                <View>
                  <Text style={{textAlign: 'center'}}>History Empty</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <Thumbnail
                    style={{width: 150, height: 150}}
                    source={{
                      uri:
                        'https://images.vexels.com/media/users/17482/106930/preview2/fcba42ccb55e21d86c6cc25078f0431e-cute-and-sad-icon-vector.png',
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
}
