import React, {Component} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
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

  refresh() {
    axios
      .get('https://nameless-plateau-17084.herokuapp.com/book/popular')
      .then(response => {
        this.setState({
          dataPopular: response.data.response,
        });
      })
      .catch(error => console.log(error));

    axios
      .get('https://nameless-plateau-17084.herokuapp.com/book')
      .then(response => {
        this.setState({
          dataBook: response.data.response,
        });
        // console.log(response.data.response);
      })
      .catch(error => console.log(error));
    // https://nameless-plateau-17084.herokuapp.com/book
  }

  componentDidMount() {
    axios
      .get('https://nameless-plateau-17084.herokuapp.com/book/popular')
      .then(response => {
        this.setState({
          dataPopular: response.data.response,
        });
      })
      .catch(error => console.log(error));

    axios
      .get('https://nameless-plateau-17084.herokuapp.com/book')
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
            {/* <Body>
              <Item
                rounded
                style={{
                  height: 40,
                  width: 150,
                  backgroundColor: '#e5dfdf',
                }}>
                <Input placeholder="Search..." /> */}
            {/* placeholderTextColor="white" */}
            {/* </Item>
            </Body> */}
            <Button
              onPress={() => this.props.navigation.navigate('Search')}
              transparent>
              <Icon style={{color: 'black'}} name="search" />
            </Button>
            <TouchableOpacity onPress={() => this.refresh()}>
              <Button transparent onPress={() => this.refresh()}>
                <Icon style={{color: 'black'}} name="refresh" />
              </Button>
            </TouchableOpacity>
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
