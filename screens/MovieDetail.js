import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

function Item({ item }) {
    return (
        <TouchableOpacity >
            <Text>{item.message}</Text>
        </TouchableOpacity>
    );
}

class MovieDetail extends React.Component {

    state = {
        comments: null,
    }

    componentDidMount = async () => {
        const response = await fetch(`https://movie-ranker-backend.herokuapp.com/movie/${this.props.route.params.movie.id}/rating`, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Basic YWRtaW46QURNSU4='
            })
        })

        if (response.status === 200) {
            const comments = await response.json()
            this.setState({ comments: comments });
            return comments
        }
    }


    render() {
        const { movie } = this.props.route.params
        console.log(this.state.comments)
        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={{ uri: movie.poster_path }}
                        style={styles.profileContainer}
                        imageStyle={styles.profileImage}>
                        <Block flex style={styles.profileDetails}>
                            <Block style={styles.profileTexts}>
                                <Text color="white" size={28} style={{ paddingBottom: 8 }}>{movie.title}</Text>
                                <Block row space="between">
                                    <Block row>
                                        <Block middle style={styles.pro}>
                                            <Text size={16} color="white">Pro</Text>
                                        </Block>
                                        <Text color="white" size={16} muted style={styles.seller}>Vote Average</Text>
                                        <Text size={16} color={materialTheme.COLORS.WARNING}>
                                            {movie.vote_average}<Icon name="shape-star" family="GalioExtra" size={14} />
                                        </Text>
                                    </Block>
                                    <Block>
                                    </Block>
                                </Block>
                            </Block>
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                        </Block>
                    </ImageBackground>
                </Block>
                <Block flex style={styles.options}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                            <Block middle>
                                <Text bold size={12} style={{ marginBottom: 8 }}>{movie.popularity}</Text>
                                <Text muted size={12}>Views</Text>
                            </Block>
                            {/* <Block middle>
                                <Text bold size={12} style={{ marginBottom: 8 }}></Text>
                                <Text muted size={12}>Bids & Offers</Text>
                            </Block> */}
                            <Block >
                                <Text bold size={12} style={{ marginBottom: 8 }}>{movie.original_language}</Text>
                                <Text muted size={12}>Language</Text>
                            </Block>
                        </Block>
                        <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                            <Text size={28}>About:</Text>
                        </Block>
                        <Block>
                            <Text size={16}>{movie.overview}</Text>
                        </Block>

                        <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                            <Block row space="between" style={{ flexWrap: 'wrap' }} >
                                {this.state.comments &&
                                    this.state.comments.map((item, imgIndex) => (
                                        <Item
                                            item={item.message}
                                            index={imgIndex}
                                            style={styles.thumb}
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

export default MovieDetail

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
