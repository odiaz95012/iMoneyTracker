import React from "react";;
import {Text, Button , StyleSheet, View} from 'react-native';

const HomeScreen = () =>{
    return (
        <View style = {styles.mainView}>
            <Text>Home Screen</Text>
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
export default HomeScreen;