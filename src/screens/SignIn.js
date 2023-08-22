import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { database, auth } from '../../index';
import { collection, doc, getDoc } from 'firebase/firestore';
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '../utils/keys';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CookieManager from '@react-native-cookies/cookies';
import { styles } from '../styles/SignInStyles';
import bcrypt from 'react-native-bcrypt';

const SignIn = ({ navigation }) => {

  const usersRef = collection(database, 'users');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setID] = useState(null);

  function navigateSignUp() {
    navigation.navigate('signUp');
  }
  function navigateForgotPassword() {
    navigation.navigate('forgotPassword');
  }
  function navigateHomePage() {
    navigation.navigate('homePage');
  }
  function createUserCookie(id) {
    CookieManager.set('http://financetracker-3da48.com', {
      name: 'userEmail',
      id: id,
      value: email,
    }).then((done) => {
      console.log('CookieManager.set =>', done);
    });
  }
  async function getHashData(userDocData, inputPassword) {
    // Set a cryptographically secure PRNG as a fallback
    bcrypt.setRandomFallback((len) => {
      return cryptoRandomString({ length: len });
    });
    const hash = await new Promise(async (resolve, reject) => {
      let salt = await userDocData.data().passwordSalt;
      bcrypt.hash(inputPassword, salt, (err, hashedPassword) => {
        if (err) {
          console.log("Error generating hash: " + err);
          reject(err);
        } else {
          resolve(hashedPassword);
        }
      });
    });
    return hash;
  }

  async function signInUser(inputEmail, inputPassword) {
    const userRef = await doc(database, 'users', inputEmail);
    try {

      const userDoc = await getDoc(userRef);
      //check if user exists in db
      if (!userDoc.exists()) {
        Alert.alert('No user is registered with the inputted email.');
        return;
      }

      const generatedHash = await getHashData(userDoc, inputPassword);
      const dbPasswordHash = await userDoc.data().passwordHash;
      const id = userDoc.data().uuid;
      // //check if generate hash matches password hash in db
      await bcrypt.compare(generatedHash, dbPasswordHash, (err, res) => {
        if (err) {
          console.log("Error comparing passwords" + err);
        }
        else {
          navigateHomePage();
          createUserCookie(id);
        }

      })

    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
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

  return (
    <View style={styles.mainView}>
      <Image source={require("../assets/logo.png")} style={styles.logoStyle} />
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
          autoCapitalize='none'
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.forgotPasswordButton}>
        <TouchableOpacity onPress={navigateForgotPassword}>
          <Text style={styles.btnTextStyle}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpButtonStyles}>
        <TouchableOpacity onPress={navigateSignUp}>
          <Text style={styles.btnTextStyle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInWithGoogle}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => googleSignIn()}
        />
      </View>
      <View style={styles.loginBtn}>
        <TouchableOpacity onPress={() =>
          signInUser(email, password)
        }>
          <Text style={styles.logInBtnText}>Login</Text>
        </TouchableOpacity>
      </View>


    </View>

  )
}

export default SignIn;