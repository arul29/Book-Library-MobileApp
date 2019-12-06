import React, {Component} from 'react';
import {Image, ToastAndroid} from 'react-native';
import {Container, Text, Button, View} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWis: [],
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
      dataBorrow: [],
      isDisBorrow: false,
    };
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    const id_user = this.state.profile.response.id;
    // console.log('id us', id_user);
    // https://nameless-plateau-17084.herokuapp.com/book/wishlist?id=${id_user}
    // console.log('ini mat para,', this.props.navigation.getParam('id').id);
    axios
      .get(
        `https://nameless-plateau-17084.herokuapp.com/book/wishlist?id=${id_user}`,
      )
      .then(response => {
        this.setState({
          dataWis: response.data.response,
        });
        // console.log('response', response.data.response);
      })
      .catch(error => console.log(error));

    // console.log('status nya', this.props.navigation.getParam('id').status);
    if (this.props.navigation.getParam('id').status === 'Empty')
      this.setState({
        isDisBorrow: true,
      });
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

  // componentDidUpdate() {
  //   this.componentDidMount();
  // }

  async wishlist() {
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    const id = this.props.navigation.getParam('id').id;
    const id_u = this.state.profile.response.id;
    const newWish = {
      id_book: id,
      id_user: id_u,
    };
    // console.log('newWish', newWish);
    axios
      .post(
        'https://nameless-plateau-17084.herokuapp.com/book/addwishlist',
        newWish,
      )
      .then(response => {
        this.showToast('Wishlist Succes');
        // console.log('succes===>', response);
        // refresh
        // this.componentDidMount();
        // to home
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        this.showToast('Wishlist Failed');
        console.log(error);
      });
  }

  async borrow() {
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    const id = this.props.navigation.getParam('id').id;
    const id_u = this.state.profile.response.id;
    const newBookz = {
      status: 'Empty',
      id_user: id_u,
    };
    const newBorrow = {
      id_user: id_u,
      id_book: id,
    };
    axios
      .put(
        `https://nameless-plateau-17084.herokuapp.com/book/borrow?id=${id}`,
        newBookz,
      )
      .then(response => {
        // this.showToast('Borrow Succes');
        axios
          .post(
            'https://nameless-plateau-17084.herokuapp.com/book/addborrow',
            newBorrow,
          )
          .then(response => {
            this.showToast('Borrow Succes');
            this.props.navigation.navigate('Home');
          })
          .catch(error => {
            this.showToast('Borrow Failed');
            console.log(error);
          });
      })
      .catch(error => {
        this.showToast('Borrow Failed');
        console.log(error);
      });

    this.setState({
      isDisBorrow: true,
    });
  }

  async return() {
    // this.showToast('abcd');
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    // const id = this.props.navigation.getParam('id').id;
    const id_user = this.state.profile.response.id;
    const id_book = this.props.navigation.getParam('id').id;

    await axios
      .get(
        `https://nameless-plateau-17084.herokuapp.com/book/borrow?id_user=${id_user}&id_book=${id_book}`,
      )
      .then(response => {
        this.setState({
          dataBorrow: response.data.response,
        });
        // console.log('response', response.data.response);
      })
      .catch(error => console.log(error));

    // await this.props.dispatch(
    //   getBorrow(decode(localStorage.id_token).response.id, id_book),
    // );
    // this.setState({
    //   data2: this.props.data.bookData,
    //   // mengambul data wishlist
    //   // onGenre: this.handleGenre.bind(this)
    // });

    let id_borrow;
    this.state.dataBorrow.map((item, index) => {
      id_borrow = item.id;
    });
    const id = id_book;
    const newBookz = {
      status: 'Available',
      id_user: 0,
    };

    axios
      .put(
        `https://nameless-plateau-17084.herokuapp.com/book/borrow?id=${id}`,
        newBookz,
      )
      .then(response => {
        // this.showToast('Borrow Succes');
        axios
          .put(
            `https://nameless-plateau-17084.herokuapp.com/book/updateborrow?id=${id_borrow}`,
          )
          .then(response => {
            this.showToast('Return Succes');
            this.props.navigation.navigate('Home');
          })
          .catch(error => {
            this.showToast('Return Failed');
            console.log(error);
          });
      })
      .catch(error => {
        this.showToast('Return Failed');
        console.log(error);
      });

    // this.props.dispatch(borrowBook(newBookz, id)).then(() => {
    //   this.props.dispatch(updateBorrow(id_borrow)).then(() => {
    //     Swal.fire(
    //       'Return Succes',
    //       'Thank you for borrowing :)',
    //       'success',
    //     ).then(() => {
    //       window.location.href = '/';
    //     });
    //   });
    // });
  }

  render() {
    // this.componentDidMount();
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
    // console.log('id', this.props.navigation.getParam('id'));
    // console.log('data wis', this.state.dataWis);
    const id_usss = this.state.profile.response.id;
    // console.log('iduser', id_usss);

    const data = this.props.navigation.getParam('id');
    let disWish;
    this.state.dataWis.map((item, index) => {
      if (
        this.props.navigation.getParam('id').id ===
        this.state.dataWis[index].id_book
      ) {
        disWish = true;
        // console.log('diswis', disWish);

        // alert(disWish);
      } else {
        // disWish = false;
      }
    });

    // let isDisabled = false;
    // if (data.status.toLowerCase() === 'empty') isDisabled = true;

    // let stats = '';
    // if (data.status === 'Available') stats = '';
    // else stats = 'disabled';
    return (
      <Container>
        <ScrollView>
          <View>
            <View>
              <Image
                source={{uri: data.url_img}}
                style={{
                  height: 300,
                  width: 360,
                  alignSelf: 'center',
                }}
              />
            </View>

            <View style={{paddingHorizontal: 20, paddingTop: 40}}>
              <Text style={{textAlign: 'justify'}}>{data.des}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 150,
              }}>
              <View style={{left: 20, top: 50}}>
                {/* <Text> */}
                <View
                  style={{
                    backgroundColor: 'rgba(52, 52, 52, 0.5)',
                    paddingLeft: 5,
                    borderRadius: 5,
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{width: 250, fontWeight: 'bold', color: 'white'}}>
                    {data.title}
                  </Text>
                  <Text style={{color: 'white'}}>{data.author}</Text>
                </View>
              </View>
              <View>
                <Image
                  source={{uri: data.url_img}}
                  style={{
                    height: 180,
                    width: 110,
                    flex: 1,
                    bottom: 0,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'white',
                    right: 20,
                  }}
                />
              </View>
            </View>
            <View style={{alignItems: 'center', marginVertical: 20}}>
              {(this.props.navigation.getParam('id').status === 'Available' &&
                id_usss !== this.props.navigation.getParam('id').id_user) ||
              id_usss !== this.props.navigation.getParam('id').id_user ? (
                <Button
                  onPress={() => this.borrow()}
                  disabled={this.state.isDisBorrow}
                  style={{
                    backgroundColor: this.state.isDisBorrow ? 'grey' : 'orange',
                    width: 100,
                    height: 30,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Text style={{textAlign: 'center'}}>Borrow</Text>
                </Button>
              ) : null}

              {this.props.navigation.getParam('id').status === 'Empty' &&
              id_usss === this.props.navigation.getParam('id').id_user ? (
                <Button
                  onPress={() => this.return()}
                  // disabled={data.status === 'Available' ? false : true}
                  style={{
                    backgroundColor: 'red',
                    width: 100,
                    height: 30,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Text style={{textAlign: 'center'}}>Return</Text>
                </Button>
              ) : null}
              <Button
                onPress={() => this.wishlist()}
                disabled={disWish}
                style={{
                  backgroundColor: disWish ? 'grey' : 'blue',
                  width: 100,
                  height: 30,
                  borderRadius: 20,
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                <Text style={{textAlign: 'center'}}>Wishlist</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
