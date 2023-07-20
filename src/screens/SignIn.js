import React from 'react';
import {Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import { database, auth } from '../../index';
import { collection,} from 'firebase/firestore';
import { WEB_CLIENT_ID, IOS_CLIENT_ID} from '../utils/keys';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CookieManager from '@react-native-cookies/cookies';
import { styles } from '../styles/SignInStyles';

const SignIn = ({navigation}) =>{

  const usersRef = collection(database, 'users');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  function navigateSignUp(){
    navigation.navigate('signUp');
  }
  function navigateForgotPassword(){
    navigation.navigate('forgotPassword');
  }
  function navigateHomePage(){
    navigation.navigate('homePage');
  }
  function createUserCookie(){
    CookieManager.set('http://financetracker-3da48.com', {
      name: 'userEmail',
      value: email,
    }).then((done) => {
      console.log('CookieManager.set =>', done);
    });
  }
  function signInUser(){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)

        setIsLoggedIn(true);
        setError(null);
        createUserCookie();
        navigateHomePage();
      })
      .catch((error) => {
        setError(error)
        Alert.alert('There was an error signing in.')        
        console.log("Error: " + error);
      })
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

  async function googleSignIn() {
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
        console.log('Process Cancelled')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        console.log('Process in progress')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        console.log('Play services are not available')
      } else {
        // some other error
        console.log('Something else went wrong... ', error.toString())
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
          console.log('Please Sign in')
          setIsLoggedIn(false)
        } else {
          console.log('Something else went wrong... ', error.toString())
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
                  autoCapitalize='none'
                  onChangeText={(email) => setEmail(email)}
                /> 
            </View> 
            <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  autoCapitalize = 'none'
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
                onPress={() => googleSignIn()}
              />
          </View>
            <View style={styles.loginBtn}>
                  <TouchableOpacity onPress={() => 
                    signInUser()
                    }>
                    <Text style={styles.logInBtnText}>Login</Text>
                  </TouchableOpacity>
            </View>
                 

        </View>
        
    )
}

export default SignIn;