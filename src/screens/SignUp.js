import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {database, auth} from '../../index';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import { styles } from '../styles/SignUpStyles';

const SignUp = ({navigation}) => {
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function navigateHomePage() {
    navigation.navigate('homePage');
  }
  function navigateSignInPage() {
    navigation.navigate('signIn');
  }
  function checkEmailAndPasswordMatch(emailIn, emailCon, pass, passwordCon) {
    if (emailIn == emailCon && pass == passwordCon) {
      return true;
    } else {
      return false;
    }
  }

  async function createAccount() {
    if (
      checkEmailAndPasswordMatch(email, emailConfirm, password, passwordConfirm)
    ) {
      try {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            const uid = userCredential.user.uid;
            storeUserInDB(email, uid);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, ': ', errorMessage);
          });
      } catch (e) {
        console.log('Error adding user: ', e);
      }
    } else {
      Alert.alert('Email or passwords did not match. Please try again.');
    }
  }
  function storeUserInDB(userEmail, uid) {
    try {
      setDoc(doc(database, 'users', userEmail), {
        first_name: firstName,
        last_name: lastName,
        pass_word: password,
        uid: uid,
      });
    } catch (e) {
      Alert.alert('There is already an existing account with this email.');
      console.log('Error: ', e);
    }
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logoStyle}></Image>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter First Name"
          placeholderTextColor="#fff"
          onChangeText={firstName => setFirstName(firstName)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Last Name"
          placeholderTextColor="#fff"
          onChangeText={lastName => setLastName(lastName)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter email"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm email"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          onChangeText={emailConfirm => setEmailConfirm(emailConfirm)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Set password"
          secureTextEntry={true}
          placeholderTextColor="#fff"
          onChangeText={password => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm password"
          secureTextEntry={true}
          placeholderTextColor="#fff"
          onChangeText={passwordConfirm => setPasswordConfirm(passwordConfirm)}
        />
      </View>
      <View style={styles.goToSignInContainer}>
        <TouchableOpacity onPress={navigateSignInPage}>
          <Text style={styles.goToSignInBtn}>
            Already have an account? Login Here
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createAccountContainer}>
        <TouchableOpacity
          onPress={() => {
            createAccount(), navigateHomePage();
          }}>
          <Text style={styles.createAccountBtn}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
