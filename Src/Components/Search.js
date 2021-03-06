import React, {Component} from 'react';
import {Image, ToastAndroid} from 'react-native';
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
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSearch: [],
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

  onSearch() {
    if (this.state.valueSearch === '') {
      this.showToast('please fill the text');
    } else {
      const title_book = this.state.valueSearch;
      axios
        .get(
          `https://nameless-plateau-17084.herokuapp.com/book/searchbook?title=${title_book}`,
        )
        .then(response => {
          this.setState({
            dataSearch: response.data.response,
          });
        })
        .catch(error => console.log(error));
    }
  }

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

          {/* <Right> */}
          <Body style={{flexDirection: 'row', right: 20}}>
            <Item
              // rounded
              style={{
                paddingHorizontal: 20,
                height: 40,
                width: 200,
                backgroundColor: '#e5dfdf',
              }}>
              <TextInput
                placeholder="Search..."
                onChangeText={TextInputValue =>
                  this.setState({valueSearch: TextInputValue})
                }
              />
              {/* placeholderTextColor="white" */}
            </Item>
            <Button
              // rounded
              onPress={() => this.onSearch()}
              transparent
              style={{height: 40, right: 50}}>
              <Icon style={{color: 'black'}} name="search" />
            </Button>
          </Body>
          {/* <Button transparent><Icon name="heart" /></Button><Button transparent><Icon name="more" /></Button> */}
          {/* </Right> */}
        </Header>
        <ScrollView>
          <View>
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <Text>Search Result</Text>
            </View>
            {this.state.dataSearch.length > 0 ? (
              <View>
                {this.state.dataSearch.map((data, index) => {
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
