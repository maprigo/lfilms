import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

// redux imports
import { connect } from 'react-redux';
import { saveUser } from '../actions/user';
import { bindActionCreators } from 'redux';

const { height, width } = Dimensions.get('screen');

import Images from '../constants/Images';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    };
  }

  logueo = async (user, password) => {
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
      const { navigation, actions } = this.props;
      const usuario = await this.logueo(this.state.user, this.state.pass)
      actions.saveUser(usuario)
      navigation.navigate('App', {
        usuario
      })
    } catch (error) {
      console.warn("There is an error on logueo", new Date(), error.message)
      return []
    }
  }

  render() {
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
          </Block>
        </Block>
      </Block>
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

const ActionCreators = Object.assign(
  {},
  saveUser,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding)
