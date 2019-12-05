import React, {Component} from 'react';
import {Image, TouchableOpacity, ScrollView, View} from 'react-native';
import {Card, Text} from 'native-base';

export default class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '',
    };
  }

  render() {
    // console.log(this.props.dataPopular);
    return (
      <View
        style={{
          paddingHorizontal: 10,
          alignContent: 'center',
        }}>
        <Text style={{paddingTop: 10, fontWeight: 'bold'}}>Popular Books</Text>
        <ScrollView
          style={{
            paddingTop: 10,
          }}
          horizontal={true}
          snapToStart={false}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={174} //your element width
          snapToAlignment={'center'}>
          {this.props.dataPopular.map((data, index) => {
            return (
              <View key={index} paddingHorizontal={10}>
                <Card transparent width={150} height={220} style={{}}>
                  {/* <TouchableOpacity onPress={this.props.changeRouteDetail}> */}
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
                    {/* </TouchableHighlight> */}
                  </TouchableOpacity>
                </Card>
                <Text style={{color: 'grey', fontSize: 12}}>{data.author}</Text>
                <Text
                  onPress={this.props.changeRouteDetail}
                  numberOfLines={1}
                  style={{width: 155, fontWeight: 'bold'}}>
                  {data.title}
                </Text>
              </View>
            );
          })}
          {/* <View></View> */}
        </ScrollView>
      </View>
    );
  }
}
