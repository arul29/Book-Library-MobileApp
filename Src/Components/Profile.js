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
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
// import {NavigationEvents} from 'react-navigation';

// import AuthService from './AuthService';
// const Auth = new AuthService();
let profile, name;
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      toastMsg: '',
      profile: {
        exp: '',
        iat: '',
        response: {
          email: '',
          id: '',
          name: '',
          password: '',
          role: '',
        },
      },
      dataWishlist: [],
    };
  }

  async refresh() {
    // this.showToast('Abcd');
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    const id_user = this.state.profile.response.id;
    axios
      .get(
        `https://nameless-plateau-17084.herokuapp.com/book/wishlist?id=${id_user}`,
      )
      .then(response => {
        this.setState({
          dataWishlist: response.data.response,
        });
      })
      .catch(error => console.log(error));
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    // console.log('aaaa');
    // profile = decode(data);
    // this.setState({
    // });
    // console.log(data);

    // name = profile.response.name;
    // console.log('data', name);
    // const;
    const id_user = this.state.profile.response.id;
    // console.log('userdidmo', id_user);
    axios
      .get(
        `https://nameless-plateau-17084.herokuapp.com/book/wishlist?id=${id_user}`,
      )
      .then(response => {
        this.setState({
          dataWishlist: response.data.response,
        });
        // console.log(response.data.response);
      })
      .catch(error => console.log(error));
  }

  // https://nameless-plateau-17084.herokuapp.com/book/wishlist?id=${id_user}

  async getToken() {}

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

  remove = id => {
    // console.log(id);
    axios
      .delete(
        `https://nameless-plateau-17084.herokuapp.com/book/removewishlist?id=${id}`,
      )
      .then(res => {
        {
          // array.splice(index, 1);
          this.setState({
            dataWishlist: this.state.dataWishlist.filter(item => item.id != id),
          });
        }
      })
      .then(() => this.showToast('Remove Succes'))
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // console.log('datawi', this.state.dataWishlist);
    // const name = profile[response];
    // console.log('nama', this.state.profile.response);
    const name = this.state.profile.response.name;
    const id = this.state.profile.response.id;
    // console.log('nama log', id);
    // let a = 1;
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
            <View style={{flexDirection: 'row'}}>
              {/* <NavigationEvents
                onDidFocus={() => this.showToast('Refreshed')}
              /> */}
              <TouchableOpacity onPress={() => this.refresh()}>
                <Button
                  transparent
                  onPress={() => this.refresh()}
                  style={{height: 30}}>
                  <Icon style={{color: 'black'}} name="refresh" />
                </Button>
              </TouchableOpacity>
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
                backgroundColor: '#699ff5',
                alignItems: 'center',
                height: 200,
                borderBottomEndRadius: 100,
                borderBottomStartRadius: 100,
                // borderColor: 'black',
                // borderWidth: 1,
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
              <H3>{name}</H3>
            </View>
            <View>
              <Text style={{alignSelf: 'center'}}>Your Wishlist</Text>
            </View>
          </View>
          <View>
            {this.state.dataWishlist.length > 0 ? (
              <View>
                {this.state.dataWishlist.map((data, index) => {
                  return (
                    <Card key={index}>
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
                              uri: data.url_img,
                            }}
                            style={{
                              height: 200,
                              width: '100%',
                              flex: 1,
                            }}
                          />
                        </Card>
                        <View style={{marginLeft: 20}}>
                          <Text style={{marginTop: 30}}>{data.title}</Text>
                          {/* <Button style={{ width: 100, height: 30, alignContent: 'center',
                              alignItems: 'center', justifyContent: 'center', }}> <Text>Remove</Text> </Button> */}
                          <Button
                            onPress={() => this.remove(data.id)}
                            iconLeft
                            light
                            style={{
                              marginTop: 5,
                              width: 50,
                              backgroundColor: 'white',
                              borderColor: 'black',
                              borderWidth: 1,
                            }}>
                            <Icon name="trash" />
                          </Button>
                        </View>
                        {/* <View></View> */}
                      </View>
                    </Card>
                  );
                })}
              </View>
            ) : (
              <View style={{}}>
                <View style={{alignItems: 'center', marginTop: 50}}>
                  <Thumbnail
                    style={{width: 150, height: 150}}
                    source={{
                      uri:
                        'https://images.vexels.com/media/users/17482/106930/preview2/fcba42ccb55e21d86c6cc25078f0431e-cute-and-sad-icon-vector.png',
                    }}
                  />
                </View>
                <View>
                  <Text style={{textAlign: 'center'}}>Wishlist Empty</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
}
