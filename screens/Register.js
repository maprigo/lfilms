import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

import AsyncStorage from '@react-native-community/async-storage';

const { height, width } = Dimensions.get('screen');

import Images from '../constants/Images';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'peter13@adi.com',
            pass: '1234',
            name: 'German',
            lname: 'Garmendia',
            gender: 'ACCION'
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
    send = async () => {
        const { user, pass, name, lname, gender } = this.state;
        console.log(this.state)
        console.log({
            "email": user,
            "firstName": name,
            "id": user,
            "lastName": lname,
            "password": pass
        })
        const response = await fetch(`https://movie-ranker-backend.herokuapp.com/user`, {
            method: 'post',
            headers: {
                'Authorization': 'Basic YWRtaW46QURNSU4=',
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                "email": user,
                "favoriteGenre": gender,
                "firstName": name,
                "id": user,
                "lastName": lname,
                "password": pass
            })
        })

        console.log("Response Save user:", response.status)

        if (response.status === 200) {
            const storeUser = await response.json()
            console.log(storeUser)
            return storeUser
        }
    }

    handleOnPress = async () => {
        try {
            const { navigation } = this.props;
            await this.send()
            navigation.navigate('Onboarding')
        } catch (error) {
            console.warn("There is an error on HandleOnPress", new Date(), error.message)
            return []
        }
    }

    render() {
        return (
            <Block flex style={styles.container}>
                <ImageBackground
                    source={{ uri: Images.Onboarding }}
                    style={{ height: height, width: width, zIndex: 1 }}
                >
                    <StatusBar barStyle="light-content" />
                    <Block flex space="between" style={styles.padded}>

                        <Block flex space="around" style={{ zIndex: 2 }}>
                            <Block center>
                                <Text color="white" size={60}>Register</Text>
                            </Block>
                            <Block flex center>
                                <Input
                                    right
                                    color="black"
                                    style={styles.Text}
                                    placeholder="E-mail"
                                    onChange={e => {
                                        this.setState({ user: e.nativeEvent.text })
                                    }}
                                />
                                <Input
                                    right
                                    color="black"
                                    style={styles.Text}
                                    placeholder="Name"
                                    onChange={e => this.setState({ name: e.nativeEvent.text })}
                                />
                                <Input
                                    right
                                    color="black"
                                    style={styles.Text}
                                    placeholder="Last Name"
                                    onChange={e => this.setState({ lname: e.nativeEvent.text })}
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
                                    color='#514c4c'
                                    onPress={this.handleOnPress}
                                >
                                    Register
                            </Button>
                            </Block>
                        </Block>
                    </Block>
                </ImageBackground>
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

export default Register
