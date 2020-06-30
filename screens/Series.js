import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, FlatList, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, Header } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { useNavigation } from '@react-navigation/native';

// redux imports
import { connect } from 'react-redux';
import { block } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

function Item({ item }) {
    const navigation = useNavigation();
    const { id, original_language, overview, popularity, poster_path, title, vote_average } = item
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('SerieDetail', {
                    movie: item
                })
            }}
            style={[
                styles.item,
                { backgroundColor: '#f9c2ff' },
            ]}
        >
            <Image
                source={{ uri: poster_path }}
                key={`viewed-${title}`}
                resizeMode="cover"
                style={styles.thumb}
            />
        </TouchableOpacity>
    );
}
class Series extends React.Component {
    state = {
        films: null,
    }

    componentDidMount = async () => {
        try {
            const response = await fetch('https://movie-ranker-backend.herokuapp.com/tv/search', {
                method: 'get', headers: new Headers({
                    'Authorization': 'Basic YWRtaW46QURNSU4='
                })
            })

            if (response.status === 200) {
                const responseJson = await response.json()
                // console.log(responseJson)
                this.setState({ films: responseJson.results });
            }

        } catch (error) {
            console.warn("There is an error on Series Did Mount", new Date(), error.message)
            return []
        }
    }


    render() {
        const { user } = this.props
        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={{ uri: Images.Onboarding }}
                        style={styles.profileContainer}
                        imageStyle={styles.profileImage}>
                        <Block flex style={styles.profileDetails}>
                            <Block style={styles.profileTexts}>
                                <Text color="white" size={28} style={{ paddingBottom: 8 }}>Rockeando Series</Text>
                                <Block row space="between">
                                    <Block row>
                                        <Text color="white" size={16} muted style={styles.seller}> Recomend by {user.firstName}</Text>
                                    </Block>
                                    <Block middle style={styles.LABEL}>
                                        <Text size={16} color="white">{user.favoriteGenre}</Text>
                                    </Block>
                                </Block>
                            </Block>
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                        </Block>
                    </ImageBackground>
                </Block>
                <Block flex style={styles.options}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                            <Block row space="between" style={{ flexWrap: 'wrap' }} >
                                {this.state.films &&
                                    this.state.films.map((item, imgIndex) => (
                                        <Item
                                            item={item}
                                            index={imgIndex}
                                            style={styles.thumb}
                                            key={`${imgIndex}-${item.id}`}
                                        />
                                    ))
                                }
                            </Block>
                        </Block>
                    </ScrollView>
                </Block>
            </Block>
        );
    }
}



const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
        marginBottom: -HeaderHeight * 2,
    },
    profileImage: {
        width: width * 1.1,
        height: 'auto',
    },
    profileContainer: {
        width: width,
        height: height / 2,
    },
    profileDetails: {
        paddingTop: theme.SIZES.BASE * 4,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    profileTexts: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
        zIndex: 2
    },
    pro: {
        backgroundColor: materialTheme.COLORS.LABEL,
        paddingHorizontal: 6,
        marginRight: theme.SIZES.BASE / 2,
        borderRadius: 4,
        height: 19,
        width: 38,
    },
    seller: {
        marginRight: theme.SIZES.BASE / 2,
    },
    options: {
        position: 'relative',
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: -theme.SIZES.BASE * 7,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: 'center',
        width: thumbMeasure,
        height: thumbMeasure
    },
    gradient: {
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: '30%',
        position: 'absolute',
    },
});

// const mapStateToProps = state => {
//   console.log(state)
//   return {
//     user: state.user,
//   }
// }

const mapStateToProps = state => ({
    user: state.user,
})


export default connect(mapStateToProps)(Series)