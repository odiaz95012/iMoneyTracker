import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  })