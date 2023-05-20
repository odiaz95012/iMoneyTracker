/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


function App(){

    // const [loading, setLoading] = useState<boolean>(true);
    // const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  
    // useEffect(() => {
    //   auth().onAuthStateChanged(userState => {
    //     setUser(userState);
  
    //     if (loading) {
    //       setLoading(false);
    //     }
    //   });
    // }, []);

  const Stack = createNativeStackNavigator();
  //if(!user){
      return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name="signIn" 
            component={SignIn}
            options={{ 
              title:"Sign In",
              headerStyle: {
                backgroundColor:'#5c635e',
                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="signUp" 
            component={SignUp}
            options={{ 
              title:"Sign Up",
              headerStyle: {
                backgroundColor:'#5c635e',
                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen 
            name="forgotPassword" 
            component={ForgotPassword}
            options={{ 
              title:"Forgot Password",
              headerStyle: {
                backgroundColor:'#5c635e',
                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="homePage" 
            component={HomeScreen}
            options={{ 
              title:"Home Page",
              headerStyle: {
                backgroundColor:'#5c635e',
                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
//}
}

const styles = StyleSheet.create({ 
  screenStackStyle:{
    backgroundColor:"#5c635e"
  }
})


export default App;
