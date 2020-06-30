import React from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-community/async-storage';

// redux imports
import { connect } from 'react-redux';
import { unsetUser } from '../actions/user';

import { Icon, Drawer as DrawerCustomItem } from '../components/';
import { Images, materialTheme } from "../constants/";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const profile = {
  avatar: Images.Profile,

};



function CustomDrawerContent({
  drawerPosition,
  navigation,
  user,
  unsetUser,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = [
    "Movies",
    "Series",
    "Browse",
    "Favority List",
    "Settings",
  ];

  const handleSignOut = async () => {
    try {
      unsetUser()
      await AsyncStorage.removeItem('@user');
      navigation.navigate('Onboarding')
      return true;
    }
    catch (error) {
      console.warn("There is an error on Onpres menu Logout", new Date(), error.message)
      return false
    }
  }

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Movies")}
        >
          <Block style={styles.profile}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            {user &&
              <Text h5 color={"white"}>
                {`${user.firstName} ${user.lastName}`}
              </Text>
            }
          </Block>
        </TouchableWithoutFeedback>
        <TouchableNativeFeedback onPress={handleSignOut}>
          <Block >
            <Text size={15} h5 color={"white"}>
              => Sign Out
          </Text>
          </Block>
        </TouchableNativeFeedback>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
    </Block >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#514c4c',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  }
});

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  unsetUser: () => dispatch(unsetUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)


