import React, {Component} from 'react';
import {Image, ToastAndroid, ScrollView, View} from 'react-native';
import {Card, Text} from 'native-base';
export default class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      genre: '',
    };
  }

  handleButtonPress = genre => {
    this.setState(
      {
        visible: true,
        genre: genre,
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

  render() {
    if (this.state.visible) {
      ToastAndroid.showWithGravityAndOffset(
        this.state.genre,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return null;
    }

    return (
      <View
        style={{
          paddingHorizontal: 10,
          alignContent: 'center',
        }}>
        {/* <Text onPress={this.props.changeRouteLogin}>Login</Text>
        <Text onPress={this.props.changeRouteHistory}>History</Text>
        <Text onPress={this.props.changeRouteProfile}>Profile</Text> */}
        <ScrollView
          style={{
            paddingTop: 10,
          }}
          horizontal={true}
          snapToStart={false}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={285} //your element width
          snapToAlignment={'center'}>
          <Card transparent width={280} height={150} paddingHorizontal={10}>
            <Image
              borderRadius={20}
              source={{
                uri:
                  'https://i.pinimg.com/originals/eb/73/ac/eb73aca4fc4d3d939aed11f2cdd2b631.jpg',
              }}
              style={{
                height: 200,
                width: '100%',
                flex: 1,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 100,
                left: 15,
                backgroundColor: 'rgba(52, 52, 52, 0.7)',
                borderRadius: 5,
              }}>
              <Text
                // onPress={() => {
                //   this.handleButtonPress('FANTASY');
                // }}
                onPress={() => this.props.changeRoute('Fantasy')}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                &nbsp;FANTASY&nbsp;
              </Text>
            </View>
          </Card>
          <Card transparent width={280} height={150} paddingHorizontal={10}>
            <Image
              borderRadius={20}
              source={{
                uri:
                  'https://cdn.vox-cdn.com/thumbor/7TzXXGeyMRbOjKE7UDiNXOHlQK0=/0x0:1280x738/1200x800/filters:focal(538x267:742x471)/cdn.vox-cdn.com/uploads/chorus_image/image/65232906/one_piece.0.png',
              }}
              style={{
                height: 200,
                width: '100%',
                flex: 1,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 100,
                left: 15,
                backgroundColor: 'rgba(52, 52, 52, 0.7)',
                borderRadius: 5,
              }}>
              <Text
                onPress={() => this.props.changeRoute('Action')}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                &nbsp;ACTION&nbsp;
              </Text>
            </View>
          </Card>
          <Card transparent width={280} height={150} paddingHorizontal={10}>
            <Image
              borderRadius={20}
              source={{
                uri:
                  'https://ssvr.bukukita.com/babacms/displaybuku/107070_f.jpg',
              }}
              style={{
                height: 200,
                width: '100%',
                flex: 1,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 100,
                left: 15,
                backgroundColor: 'rgba(52, 52, 52, 0.7)',
                borderRadius: 5,
              }}>
              <Text
                onPress={() => this.props.changeRoute('Romance')}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                &nbsp;ROMANCE&nbsp;
              </Text>
            </View>
          </Card>
          <Card transparent width={280} height={150} paddingHorizontal={10}>
            <Image
              borderRadius={20}
              source={{
                uri:
                  'https://images-na.ssl-images-amazon.com/images/I/71htNhcBDWL.jpg',
              }}
              style={{
                height: 200,
                width: '100%',
                flex: 1,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 100,
                left: 15,
                backgroundColor: 'rgba(52, 52, 52, 0.7)',
                borderRadius: 5,
              }}>
              <Text
                onPress={() => this.props.changeRoute('Horror')}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                &nbsp;HORROR&nbsp;
              </Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
