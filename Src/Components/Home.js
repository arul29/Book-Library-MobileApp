import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Genre from './Genre';
import Popular from './Popular';
import Book from './Book';
import axios from 'axios';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Body,
  Right,
  Title,
  Item,
  Input,
} from 'native-base';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPopular: [],
      dataBook: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://192.168.100.100:8000/book/popular')
      .then(response => {
        this.setState({
          dataPopular: response.data.response,
        });
      })
      .catch(error => console.log(error));

    axios
      .get('http://192.168.100.100:8000/book')
      .then(response => {
        this.setState({
          dataBook: response.data.response,
        });
        // console.log(response.data.response);
      })
      .catch(error => console.log(error));
    // https://nameless-plateau-17084.herokuapp.com/book
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: 'white'}}>
          {/* <Left><Button transparent><Icon name="arrow-back" /></Button></Left> */}
          <Body>
            <Title style={{color: 'black'}}>Library Book</Title>
          </Body>
          <Right>
            <Body>
              <Item
                rounded
                style={{
                  height: 40,
                  width: 200,
                  backgroundColor: '#e5dfdf',
                }}>
                <Input placeholder="Search..." />
                {/* placeholderTextColor="white" */}
              </Item>
            </Body>
            <Button transparent style={{marginRight: 10}}>
              <Icon style={{color: 'black'}} name="search" />
            </Button>
            {/* <Button transparent><Icon name="heart" /></Button><Button transparent><Icon name="more" /></Button> */}
          </Right>
        </Header>
        <Content>
          <ScrollView>
            <Genre
            // changeRoute={() => this.props.navigation.navigate('Detail')}
            // changeRouteHistory={() =>
            //   this.props.navigation.navigate('History')
            // }
            // changeRouteLogin={() => this.props.navigation.navigate('Login')}
            // changeRouteProfile={() =>
            //   this.props.navigation.navigate('Profile')
            // }
            />
            <Popular
              dataPopular={this.state.dataPopular}
              changeRouteDetail={id =>
                this.props.navigation.navigate('Detail', {id})
              }
            />
            <Book
              dataBook={this.state.dataBook}
              changeRouteDetail={id =>
                this.props.navigation.navigate('Detail', {id})
              }
            />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.books, // namaProps: state.namaReducer
    // datapost: state.postBook
  };
};

export default Home;
