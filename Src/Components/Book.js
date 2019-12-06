import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Card, Text, Badge} from 'native-base';
import {TouchableOpacity} from 'react-native';

export default class Book extends Component {
  //   return null;
  constructor(props) {
    super(props);
    this.state = {
      genre: '',
    };
  }
  render() {
    // function colorstat(status) {
    //   if (status === 'available') return 'green';
    //   else return 'red';
    // }
    return (
      <View
        style={{
          paddingHorizontal: 10,
          alignContent: 'center',
        }}>
        <Text style={{paddingTop: 20, fontWeight: 'bold'}}>All Books</Text>
        {this.props.dataBook.map((data, index) => {
          return (
            <View
              key={index}
              paddingHorizontal={5}
              style={{
                flexDirection: 'row',
              }}>
              <View style={{paddingRight: 10, paddingTop: 10}}>
                <Card transparent width={170} height={260} style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.changeRouteDetail({...data});
                    }}
                    style={{
                      height: 200,
                      width: '100%',
                      flex: 1,
                    }}>
                    <Image
                      borderRadius={20}
                      source={{
                        uri: data.url_img,
                      }}
                      style={{
                        height: 200,
                        width: '100%',
                        flex: 1,
                      }}
                    />
                  </TouchableOpacity>
                </Card>
                <View></View>
              </View>
              <View
                style={{
                  top: 50,
                }}>
                <Text style={{color: 'grey', fontSize: 12}}>{data.author}</Text>
                <Text
                  numberOfLines={1}
                  style={{width: 155, fontWeight: 'bold'}}>
                  {data.title}
                </Text>
                <Text>★★★★☆</Text>
                <Badge info>
                  <Text>{data.genre}</Text>
                </Badge>
                <Badge
                  style={{
                    marginTop: 5,
                    backgroundColor:
                      data.status === 'Available' ? 'green' : 'red',
                  }}>
                  <Text>{data.status}</Text>
                </Badge>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
