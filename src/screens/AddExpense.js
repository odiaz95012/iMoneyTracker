import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import { database } from '../../index';
import { setDoc, doc, collection } from 'firebase/firestore';
import CookieManager from '@react-native-cookies/cookies';
import { styles } from '../styles/AddExpenseStyles';

const AddExpense = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  function navigateHome() {
    navigation.navigate('homePage')
  }


  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUserEmail(); // Call the function to retrieve the cookie
  }, []);

  function getUserEmail() {
    CookieManager.get('http://financetracker-3da48.com')
      .then(cookies => {
        if (cookies.userEmail && cookies.userEmail.value) {
          setUserEmail(cookies.userEmail.value); // Update the state with the retrieved value
        } else {
          console.log('Cookie not found');
        }
      })
      .catch(error => {
        console.log('Error retrieving cookie:', error);
      });
  }

  //TODO: Add something that shows the user that the expense was successfully made or if it failed
  function postExpense() {
    try {
      const userExpenseCollectionRef = collection(database, `users/${userEmail}/expenses`);

      const expenseDocRef = doc(userExpenseCollectionRef);
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      setDoc(expenseDocRef, {
        expenseTitle: title,
        expenseDate: formattedDate,
        expenseTime: date.toLocaleTimeString('en-us', { hour12: false }),
        expenseAmount: parseFloat(amount.replace('$','')),
        expenseDescription: description,
      });

      navigateHome();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => navigateHome()}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleTextContainer}>
          <TouchableOpacity onPress={() => navigateHome()}>
            <Text style={styles.titleText}>iMoneyTracker</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.profileBttn}>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faUser} style={{ color: '#fff' }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIndivContainer}>
          <Text style={styles.inputDescription}> Title of expense:</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputValues}
              placeholder="Title"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={text => setTitle(text)}
            />
          </View>
        </View>
        <View style={styles.inputIndivContainer}>
          <Text style={styles.inputDescription}> Date of expense:</Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.inputView}>
            <Text style={styles.inputValues}>Choose Date</Text>
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputIndivContainer}>
          <Text style={styles.inputDescription}> Expense Amount:</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputValues}
              keyboardType="numeric"
              placeholder="$ Amount"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={text => setAmount(text)}
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}> Expense Description:</Text>
          <View style={styles.descriptionView}>
            <TextInput
              style={styles.descriptionInput}
              editable
              multiline
              numberOfLines={4}
              placeholder="Description (optional)"
              placeholderTextColor="#fff"
              maxLength={200}
              onChangeText={text => setDescription(text)}
              value={description}
            />
          </View>
          <TouchableOpacity style={styles.addExpenseBttn} onPress={postExpense}>
            <Text style={styles.expenseBttnText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddExpense;
