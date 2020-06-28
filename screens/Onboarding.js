import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme ,Input } from 'galio-framework';
import { useDispatch,useSelector } from 'react-redux'
import { loguear } from '../actions/actions'

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';


export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      pass:''      
    };
  }

  setUsuario = txt => this.setState({user:txt})
  setPassword = txt => this.setState({pass:txt})

  logueo = async (user,passwd) => {
    return await fetch(`https://movie-ranker-backend.herokuapp.com/user/${user}/${passwd}`, {
                method: 'get', headers: new Headers({
                    'Authorization': 'Basic YWRtaW46QURNSU4='
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.result);
                // this.setState({  });
                // console.log(this.state.users);
                return {
                    users: responseJson
                }
            })
            .catch((error) => {
                console.error(error);
            });
  }

  render() {
    const { navigation } = this.props;    
    // const dispatch = useDispatch();

    // const logueado = useSelector(state => state.logueado)

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{  uri: Images.Onboarding }}
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
                onChange={e => this.setUsuario(e.target.value)}
              />
              <Input
                right
                color="black"
                style={styles.Text}
                placeholder="Password"
                secureTextEntry={true}
                onChange={e => this.setPassword(e.target.value)}
              />
              <Button
                shadowless
                style={styles.button}
                color='rgb(220, 0, 78)'
                onPress={() => {
                  const usuario = this.logueo(this.state.user,this.state.pass)

                  console.dir(usuario);
                  navigation.navigate('App',{
                    usuario
                  })
                }}
                /* onPress = {() => {
                  dispatch(loguear(this.state.user,this.state.pass))
                }} */
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
