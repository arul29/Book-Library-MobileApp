import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHistory: [],
    };
  }

  async refresh() {
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    const id_user = this.state.profile.response.id;
    axios
      .get(
        `https://nameless-plateau-17084.herokuapp.com/book/detailborrow?id=${id_user}`,
      )
      .then(response => {
        this.setState({
          dataHistory: response.data.response,
        });
        // console.log(response.data.response);
      })
      .catch(error => console.log(error));
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('id_token');
    this.setState({
      profile: jwt_decode(data),
    });
    const id_user = this.state.profile.response.id;
    axios
      .get(
        `https://nameless-plateau-17084.herokuapp.com/book/detailborrow?id=${id_user}`,
      )
      .then(response => {
        this.setState({
          dataHistory: response.data.response,
        });
        // console.log(response.data.response);
      })
      .catch(error => console.log(error));
  }

  dateFormat = date_data => {
    // console.log(date_data);
    let arrDate = String(date_data)
      .slice(0, 10)
      .split('-')
      .reverse();
    switch (Number(arrDate[1])) {
      case 1:
        arrDate[1] = ' January ';
        break;
      case 2:
        arrDate[1] = ' February ';
        break;
      case 3:
        arrDate[1] = ' March ';
        break;
      case 4:
        arrDate[1] = ' April ';
        break;
      case 5:
        arrDate[1] = ' Mei ';
        break;
      case 6:
        arrDate[1] = ' June ';
        break;
      case 7:
        arrDate[1] = ' Jule ';
        break;
      case 8:
        arrDate[1] = ' August ';
        break;
      case 9:
        arrDate[1] = ' September ';
        break;
      case 10:
        arrDate[1] = ' October ';
        break;
      case 11:
        arrDate[1] = ' November ';
        break;
      case 12:
        arrDate[1] = ' December ';
        break;
    }
    // console.log(arrDate);

    return arrDate;
  };

  render() {
    // console.log(this.state.dataHistory);

    // let a = -1;
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
            <Title style={{color: 'black'}}>History</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.refresh()}>
              <Button
                transparent
                onPress={() => this.refresh()}
                style={{height: 30}}>
                <Icon style={{color: 'black'}} name="refresh" />
              </Button>
            </TouchableOpacity>
            <View>{/* <Text>Andi Mashdarul Khair</Text> */}</View>
          </Right>
        </Header>
        <ScrollView>
          <View>
            <View style={{alignItems: 'center'}}>
              <Text>Your History</Text>
            </View>
            {this.state.dataHistory.length > 0 ? (
              <View>
                {this.state.dataHistory.map((data, index) => {
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
                        <View>
                          <Text style={{marginTop: '10%'}}>{data.title}</Text>
                          <Text>{this.dateFormat(data.borrow_at)}</Text>
                          <Text>
                            {!data.return_at ? 'Ongoing' : 'Returned at '}
                            {!data.return_at
                              ? ''
                              : this.dateFormat(data.return_at)}
                          </Text>
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

{
  /* <Image
// resizeMethod="resize"
source={{
  uri:
    'https://images.vexels.com/media/users/17482/106930/preview2/fcba42ccb55e21d86c6cc25078f0431e-cute-and-sad-icon-vector.png',
}}
style={{
  marginTop: 20,
  height: 100,
  width: 130,
  alignSelf: 'center',
}}
/> */
}
