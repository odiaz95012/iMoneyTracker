import React from 'react';
import {useState} from 'react';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="signIn"
            component={SignIn}
            options={{
              title: 'Sign In',
              headerStyle: {
                backgroundColor: '#5c635e',
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
              title: 'Sign Up',
              headerStyle: {
                backgroundColor: '#5c635e',
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
              title: 'Forgot Password',
              headerStyle: {
                backgroundColor: '#5c635e',
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
              title: 'Home',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#5c635e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenStackStyle: {
    backgroundColor: '#5c635e',
  },
});

export default App;
