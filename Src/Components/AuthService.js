// import decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'https://nameless-plateau-17084.herokuapp.com'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(email, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => {
        // console.log(res.token);
        this.setToken(res.token); // Setting the token in localStorage
        return Promise.resolve(res);
      })
      .catch(error => Promise.reject(error));
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  //   await SecureStore.setItemAsync('secure_token','sahdkfjaskdflas$%^&');
  // const token = await SecureStore.getItemAsync('secure_token');
  // console.log(token); // output: sahdkfjaskdflas$%^&

  async setToken(idToken) {
    try {
      await AsyncStorage.setItem('id_token', JSON.stringify(idToken));
    } catch (error) {
      console.log('Something went wrong set token', error);
    }
    // Saves user token to localStorage
    // localStorage.setItem('id_token', idToken);

    // SVGPathSegCurvetoCubicSmoothRel.setItemAs;
  }

  async getToken() {
    try {
      let userToken = await AsyncStorage.getItem('id_token');
      let dataUser = JSON.parse(userToken);
      //   console.log('ini token', dataUser);
    } catch (error) {
      console.log('Something went wrong get token', error);
    }

    // Retrieves the user token from localStorage
    // return await AsyncStorage.getItem('id_token');
  }

  async logout() {
    // Clear user token and profile data from localStorage
    await AsyncStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  // Axios.get('asdasdad', {
  //   headers: {
  //     'auta': 'aasd'
  //   }
  // })

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
