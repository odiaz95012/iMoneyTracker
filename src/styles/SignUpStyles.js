import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5c635e',
    },
    textStyle: {
      color: 'blue',
    },
    logoStyle: {
      width: 125,
      height: 125,
      borderRadius: 125 / 2,
      bottom: 50,
    },
    logoContainer: {
      top: 15,
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      color: '#fff',
      fontSize: 16,
    },
    inputView: {
      backgroundColor: '#31c48d',
      borderRadius: 30,
      width: '70%',
      height: 45,
      marginBottom: 30,
      alignItems: 'center',
      paddingRight: '5%',
      bottom: 15,
    },
    createAccountContainer: {
      width: '50%',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      backgroundColor: '#31c48d',
    },
    createAccountBtn: {
      color: '#fff',
      fontSize: 18,
    },
    goToSignInContainer: {
      bottom: 15,
    },
    goToSignInBtn: {
      color: '#fff',
    },
  });