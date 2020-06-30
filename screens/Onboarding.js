import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

// redux imports
import { connect } from 'react-redux';
import { saveUser } from '../actions/user';
import { bindActionCreators } from 'redux';

import AsyncStorage from '@react-native-community/async-storage';

const { height, width } = Dimensions.get('screen');

import Images from '../constants/Images';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'adri@adi.com',
      pass: '1234'
    };
  }

  componentDidMount = async () => {
    try {
      const { navigation, saveUser } = this.props;
      const userStorage = await AsyncStorage.getItem('@user')
      if (userStorage) {
        saveUser(JSON.parse(userStorage))
        navigation.navigate('App', {
          user: JSON.parse(userStorage)
        })
      }
    } catch (error) {
      console.warn("There is an error reading storage", new Date(), error.message)
      return []
    }
  }
  logueo = async (user, password) => {
    if (!user) {
      throw new Error("User is needed")
    }


    const response = await fetch(`https://movie-ranker-backend.herokuapp.com/user/${user}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Basic YWRtaW46QURNSU4='
      })
    })

    if (response.status === 200) {
      const responseJson = await response.json()
      return responseJson
    }
  }

  handleOnPress = async () => {
    try {
      const { navigation, saveUser } = this.props;
      const { user, pass } = this.state;
      const userData = await this.logueo(user, pass)
      saveUser(userData)
      await AsyncStorage.setItem('@user', JSON.stringify(userData))
      navigation.navigate('App', {
        user: userData
      })
    } catch (error) {
      console.warn("There is an error on HandleOnPress", new Date(), error.message)
      return []
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{ uri: Images.Onboarding }}
            style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={60}>Rockeando</Text>
              </Block>
              <Block row>
                <Text color="white" size={60}>Pelis</Text>
              </Block>
              <Text size={26} color='rgb(220, 0, 78)' >
                Tu app de Pelis Favorita
              </Text>
            </Block>
            <Block center>
              <Input
                right
                color="black"
                style={styles.search}
                placeholder="User"
                onChange={e => {
                  this.setState({ user: e.nativeEvent.text })
                }}
              />
              <Input
                right
                color="black"
                style={styles.Text}
                placeholder="Password"
                secureTextEntry={true}
                onChange={e => this.setState({ pass: e.nativeEvent.text })}
              />
              <Button
                shadowless
                style={styles.button}
                color='rgb(220, 0, 78)'
                onPress={this.handleOnPress}
              >
                Log In
              </Button>
            </Block>
            <Block style={{ marginVertical: 40 }}>
              <Button
                shadowless
                style={styles.button}
                color={theme.COLORS.TWITTER}
                onPress={() => navigation.navigate('Register')}
              >
                Register
              </Button>
            </Block>
          </Block>
        </Block>
      </Block >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding)
