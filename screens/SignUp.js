import React from "react";;
import {Text, Button , StyleSheet, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';


const SignUp = ({navigation}) =>{
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function navigateHomePage(){
    navigation.navigate('homePage');
  }
  function checkEmailAndPasswordMatch(emailIn, emailCon, pass, passwordCon){
    if(emailIn == emailCon && pass == passwordCon){
      return true;
    }else{
      return false;
    }
  }
  function createAccount(){
    if(checkEmailAndPasswordMatch(email, emailConfirm, password, passwordConfirm)){
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    }else{
      console.log('Emails or passwords did not match.');
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
                  placeholder="Enter email"
                  placeholderTextColor="#fff"
                  onChangeText={(email) => setEmail(email)}
                />
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Confirm email"
                  placeholderTextColor="#fff"
                  onChangeText={(emailConfirm) => setEmailConfirm(emailConfirm)}
                /> 
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Set password"
                  placeholderTextColor="#fff"
                  onChangeText={(password) => setPassword(password)}
                /> 
          </View>
          <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Confirm password"
                  placeholderTextColor="#fff"
                  onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
                /> 
          </View>
          <View style={styles.createAccountContainer}>
                <TouchableOpacity onPress={{createAccount, navigateHomePage}}>
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
      width:150,
      height:150,
      borderRadius:150/2,
      bottom:50
    },
    logoContainer:{

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
    }
  })
export default SignUp;