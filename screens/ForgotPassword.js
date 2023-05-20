import React from "react";;
import {Text, Button , StyleSheet, View} from 'react-native';
const ForgotPassword = () =>{
    return (
        <View style = {styles.mainView}>
            <Text>Forgot Password Page</Text>
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
  })
export default ForgotPassword;