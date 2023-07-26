import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ExpenseList = ({ expenses }) => {
  if (!expenses || !Array.isArray(expenses)) {
    return <Text>No Expenses To Display</Text>;
  }
  const styles = StyleSheet.create({
    container: {
      borderColor: '#31c48d',
      borderRadius: 15,
      marginBottom: 15,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
    text: {
      color: '#31c48d',
      fontFamily: 'ArialRoundedMTBold',
      fontSize: 16,
      paddingVertical: 10
    }
  })
  //this function formats a 24 hour time (e.g., 13:35) to 12 hour time (e.g., 1:35 PM)
  function convertTo12Hour(time) {
    // Extract the hour and minute components from the time string
    const [hour, minute] = time.split(':');

    // Convert the hour to a number
    const hourNum = parseInt(hour, 10);

    // Determine if it's AM or PM based on the hour
    const period = hourNum >= 12 ? 'PM' : 'AM';

    // Convert the hour to 12-hour format
    const hour12 = hourNum % 12 || 12;

    // Return the formatted time
    return `${hour12}:${minute} ${period}`;
  }
  return (
    <View>
      {expenses.map((expense, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.text}>Title: {expense.expenseTitle}</Text>
          <Text style={styles.text}>Amount: ${expense.expenseAmount}</Text>
          <Text style={styles.text}>Date: {expense.expenseDate}</Text>
          <Text style={styles.text}>Time of Expense: {convertTo12Hour(expense.expenseTime)}</Text>
          <Text style={styles.text}>Description: {expense.expenseDescription}</Text>
        </View>
      ))}
    </View>
  );
};

export default ExpenseList;
