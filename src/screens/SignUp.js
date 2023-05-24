import React from 'react';
import {Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import {database, auth } from '../../index';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from 'firebase/firestore';


const SignUp = ({navigation}) =>{

  

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function navigateHomePage(){
    navigation.navigate('homePage');
  }
  function navigateSignInPage(){
    navigation.navigate('signIn');
  }
  function checkEmailAndPasswordMatch(emailIn, emailCon, pass, passwordCon){
    if(emailIn == emailCon && pass == passwordCon){
      return true;
    }else{
      return false;
    }
  }
  function storeUserInDB(userEmail){
    try{
      setDoc(doc(database, 'users', userEmail), {
              first_name: firstName,
              last_name: lastName,
              pass_word: password
      })
    }catch(e){
      Alert.alert("There is already an existing account with this email.");
      console.log('Error: ', e);
    }
  }
 async function createAccount(){
    if(checkEmailAndPasswordMatch(email, emailConfirm, password, passwordConfirm)){
      try{
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            storeUserInDB(email);
          })
          .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, ': ', errorMessage);
          })
      } catch(e){
        console.log("Error adding user: ", e);
      }
    }else{
      Alert.alert('Email or passwords did not match. Please try again.');
    }
}
    return (
        <View style = {styles.mainView}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logoStyle} ></Image>
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter First Name"
                  placeholderTextColor="#fff"
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Last Name"
                  placeholderTextColor="#fff"
                  onChangeText={(lastName) => setLastName(lastName)}
                />
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter email"
                  autoCapitalize='none'
                  placeholderTextColor="#fff"
                  onChangeText={(email) => setEmail(email)}
                />
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Confirm email"
                  placeholderTextColor="#fff"
                  autoCapitalize='none'
                  onChangeText={(emailConfirm) => setEmailConfirm(emailConfirm)}
                /> 
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Set password"
                  secureTextEntry={true}
                  placeholderTextColor="#fff"
                  onChangeText={(password) => setPassword(password)}
                /> 
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  placeholderTextColor="#fff"
                  onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
                /> 
          </View>
          <View style={styles.goToSignInContainer}>
                <TouchableOpacity onPress={navigateSignInPage}>
                  <Text style={styles.goToSignInBtn}>Already have an account? Login Here</Text>
                </TouchableOpacity>
          </View>
          <View style={styles.createAccountContainer}>
                <TouchableOpacity onPress={() => {createAccount(), navigateHomePage()}}>
                  <Text style={styles.createAccountBtn}>Create Account</Text>
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
    textStyle:{
      color:'blue',
    },
    logoStyle:{
      width:125,
      height:125,
      borderRadius:125/2,
      bottom:50,
    },
    logoContainer:{
      top:15
    },
    TextInput:{
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      color:'#fff',
      fontSize:16
    },
    inputView:{
      backgroundColor: "#31c48d",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 30,
      alignItems: "center",
      paddingRight: "5%",
      bottom:15
    },
    createAccountContainer:{
      width:"50%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      backgroundColor:"#31c48d"
    },
    createAccountBtn:{
      color:"#fff",
      fontSize:18
    },
    goToSignInContainer:{
        bottom:15
    },
    goToSignInBtn:{
        color: "#fff"
    }
  })
export default SignUp;