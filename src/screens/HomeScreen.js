import React from "react";;
import {Text, StyleSheet, View, Image} from 'react-native';
import { ScreenStackHeaderRightView } from "react-native-screens";

const HomeScreen = () =>{
    return (
        <View style = {styles.mainView}>
            <View style = {styles.logoContainer}>
                <Image source={require("../assets/logo.png")} style = {styles.logoStyle}/>
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
    logoContainer: {
      bottom: '45%',
      right: '40%'
    },
    logoStyle: {
      width:50,
      height:50,
      borderRadius: 50/2
    }
  })
export default HomeScreen;