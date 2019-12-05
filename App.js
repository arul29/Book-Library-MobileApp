import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './Src/Components/Home';
import Detail from './Src/Components/Detail';
import Login from './Src/Components/Login';
import History from './Src/Components/History';
import Profile from './Src/Components/Profile';
import Register from './Src/Components/Register';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'native-base';
import SplashScreen from './Src/Components/Splash';

const UserNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: () => ({
      header: null,
    }),
  },
});
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
        headerStyle: {
          transparent: true,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#000',
        },
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        title: 'History',
        headerStyle: {
          transparent: true,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#000',
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile',
        headerStyle: {
          transparent: true,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#000',
        },
      },
    },
  },

  // Detail: {
  //   screen: Detail,
  //   navigationOptions: {
  //     title: 'Detail',
  //     headerStyle: {
  //       backgroundColor: '#cecece',
  //     },
  //   },
  // },
  // Form: {
  //   screen: Form,
  // },
);
const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        tabBarLabel: 'Explore',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="paper-plane-o"
            style={{color: tintColor, fontSize: 23}}
          />
        ),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="clock-o"
            style={{color: tintColor, fontSize: 23}}
          />
        ),
        title: 'History',
        headerStyle: {
          transparent: true,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#000',
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="user-o"
            style={{color: tintColor, fontSize: 23}}
          />
        ),
        title: 'Profile',
        headerStyle: {
          transparent: true,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#000',
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const switchScreen = createSwitchNavigator({
  Splash: SplashScreen,
  AuthScreen: UserNavigator,
  App: BottomNavigator,
});

export default createAppContainer(switchScreen);
