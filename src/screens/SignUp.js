import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { database } from '../../index';
import { setDoc, doc } from 'firebase/firestore';
import { styles } from '../styles/SignUpStyles';
import bcrypt from 'react-native-bcrypt';
import { v4 as uuidv4 } from 'uuid';
import cryptoRandomString from 'crypto-random-string/browser';



const SignUp = ({ navigation }) => {


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
        await storeUserInDB(email, firstName, lastName, password);
      } catch (e) {
        console.log('Error adding user: ', e);
      }
    } else {
      Alert.alert('Email or passwords did not match. Please try again.');
    }
  }
  async function generateHash(plainTextPass) {
    const saltRounds = 10;
    // Set a cryptographically secure PRNG as a fallback
    bcrypt.setRandomFallback((len) => {
      return cryptoRandomString({ length: len });
    });

    try {
      const gen_salt = await new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.log("Error generating salt: " + err);
            reject(err);
          } else {
            resolve(salt);
          }
        });
      });

      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(plainTextPass, gen_salt, (err, hashedPassword) => {
          if (err) {
            console.log("Error generating hash: " + err);
            reject(err);
          } else {
            resolve(hashedPassword);
          }
        });
      });

      return [hash, gen_salt];
    } catch (error) {
      console.error("Error generating hash:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  }

  async function storeUserInDB(userEmail, firstName, lastName, password) {
    try {
      //Hash is stored at index 0 and salt is at index 1 of return array from generateHash()
      const hashData = await generateHash(password);
      const id = await uuidv4();
      // Store the user data, including hashed password and salt
      await setDoc(doc(database, 'users', userEmail), {
        first_name: firstName,
        last_name: lastName,
        passwordHash: hashData[0],
        passwordSalt: hashData[1],
        uuid: id,
      });

      Alert.alert('Account created successfully.');
    } catch (e) {
      Alert.alert('An error occurred while creating the account.');
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
          onPress={async () => {
            try {
              await createAccount();
              //navigateHomePage();
            } catch (error) {
              Alert.alert('An error occurred during account creation:', error);
            }
          }}>
          <Text style={styles.createAccountBtn}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
