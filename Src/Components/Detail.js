import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Text, Button, View} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
export default class Detail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('id', this.props.navigation.getParam('id'));
    const data = this.props.navigation.getParam('id');
    let stats = '';
    if (data.status === 'Available') stats = '';
    else stats = 'disabled';
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
              <Button
                disabled={data.status === 'Available' ? false : true}
                style={{
                  backgroundColor:
                    data.status === 'Available' ? 'orange' : 'grey',
                  width: 100,
                  height: 30,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>Borrow</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
