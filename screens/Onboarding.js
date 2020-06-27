import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme ,Input } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

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
              />
              <Input
                right
                color="black"
                style={styles.Text}
                placeholder="Password"
                secureTextEntry={true}
              />
              <Button
                shadowless
                style={styles.button}
                color='rgb(220, 0, 78)'
                onPress={() => navigation.navigate('App')}>
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
