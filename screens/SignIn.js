import React from "react";;
import {Text, Button , StyleSheet, View, Image, TextInput, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { WEB_CLIENT_ID, IOS_CLIENT_ID} from '../utils/keys';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';

const SignIn = ({navigation}) =>{

  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)

  function navigateSignUp(){
    navigation.navigate('signUp');
  }
  function navigateForgotPassword(){
    navigation.navigate('forgotPassword');
  }
  function navigateHomePage(){
    navigation.navigate('homePage');
  }
  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
      iosClientId: IOS_CLIENT_ID
    })
  }
  useEffect(() => {
    configureGoogleSign()
  }, [])

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUserInfo(userInfo)
      setError(null)
      setIsLoggedIn(true)
      navigateHomePage();
      getCurrentUserInfo();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available')
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString())
        setError(error)
      }
    }
  }
  async function getCurrentUserInfo() {
      try {
        const userInfo = await GoogleSignin.signInSilently()
        setUserInfo(userInfo)
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // when user hasn't signed in yet
          Alert.alert('Please Sign in')
          setIsLoggedIn(false)
        } else {
          Alert.alert('Something else went wrong... ', error.toString())
          setIsLoggedIn(false)
        }
      }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    return (
        <View style = {styles.mainView}>
            <Image source={require("../assets/logo.png")} style = {styles.logoStyle}/>
            <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  onChangeText={(email) => setEmail(email)}
                /> 
            </View> 
            <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                /> 
            </View>
            <View style = {styles.forgotPasswordButton}>
                  <TouchableOpacity onPress={navigateForgotPassword}>
                    <Text style={styles.btnTextStyle}>Forgot Password?</Text>
                  </TouchableOpacity>
            </View>
            <View style={styles.signUpButtonStyles}>
                  <TouchableOpacity onPress={navigateSignUp}>
                    <Text style={styles.btnTextStyle}>Don't have an account?</Text>
                  </TouchableOpacity>
            </View>
            <View style={styles.signInWithGoogle}>
            <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => signIn()}
              />
          </View>
            <View style={styles.loginBtn}>
                  <TouchableOpacity onPress={navigateHomePage}>
                    <Text style={styles.logInBtnText}>Login</Text>
                  </TouchableOpacity>
            </View>
                 

        </View>
        
    )
}
const styles = StyleSheet.create({
    mainView:{
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#5c635e'
    },
    logoStyle:{
      width:200,
      height:200,
      borderRadius:200/2,
      bottom:50,
    },
    TextInput:{
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      color:'#fff'
    },
    inputView: {
      backgroundColor: "#31c48d",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      paddingRight: "5%",
      bottom:15
    },
    loginBtn:{
    width:"50%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    backgroundColor:"#31c48d"
  
    },
    forgotPasswordButton:{
      marginTop:5,
      bottom:20,
      
    },
    signUpButtonStyles:{
      bottom:10,
    },
    btnTextStyle:{
      color: "#31c48d",
      fontSize: 18
    },
    logInBtnText:{
      color:"#fff",
      fontSize:18
    },
    signInWithGoogle:{

    }
  })
export default SignIn;