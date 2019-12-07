import React, {Component} from 'react';
import {Image, ToastAndroid, TouchableOpacity} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Card,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  Title,
  Item,
  Badge,
} from 'native-base';
import axios from 'axios';
export default class GenreFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataGenre: [],
      valueSearch: '',
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

  componentDidMount() {
    const genre = this.props.navigation.getParam('genre');
    axios
      .get(
        `https://nameless-plateau-17084.herokuapp.com/book/filtergenre?genre=${genre}`,
      )
      .then(response => {
        // console.log(response);
        this.setState({
          dataGenre: response.data.response,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    // const genre = this.props.navigation.getParam('genre');
    console.log(this.state.dataGenre);

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
            <Title style={{color: 'black'}}>
              {this.props.navigation.getParam('genre')}
            </Title>
          </Body>
          <Right></Right>
        </Header>
        <ScrollView>
          <View>
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <Text>Filter Genre</Text>
            </View>
            {this.state.dataGenre.length > 0 ? (
              <View>
                {this.state.dataGenre.map((data, index) => {
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
                        <View
                          style={{
                            top: 15,
                          }}>
                          <Text style={{color: 'grey', fontSize: 12}}>
                            {data.author}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{width: 180, fontWeight: 'bold'}}>
                            {data.title}
                          </Text>
                          <Text>★★★★☆</Text>
                          <Badge
                            style={{height: 20, justifyContent: 'center'}}
                            info>
                            <Text>{data.genre}</Text>
                          </Badge>
                          <Badge
                            style={{
                              justifyContent: 'center',
                              height: 20,
                              marginTop: 5,
                              backgroundColor:
                                data.status === 'Available' ? 'green' : 'red',
                            }}>
                            <Text>{data.status}</Text>
                          </Badge>
                        </View>
                        {/* <View></View> */}
                      </View>
                    </Card>
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  marginTop: '40%',
                }}>
                <View>
                  <Text style={{textAlign: 'center'}}>Search Empty</Text>
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
