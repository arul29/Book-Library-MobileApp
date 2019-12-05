import React, {Component} from 'react';
import {Image} from 'react-native';
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
export default class History extends Component {
  render() {
    let a = -1;
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
            <View>{/* <Text>Andi Mashdarul Khair</Text> */}</View>
          </Right>
        </Header>
        <ScrollView>
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
