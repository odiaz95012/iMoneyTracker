import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Rect, Text as TextSVG } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../index';
import { query, collection, where, getDocs } from 'firebase/firestore';

import CookieManager from '@react-native-cookies/cookies';
import { styles } from '../styles/HomePageStyles';


const HomeScreen = ({ navigation }) => {  
  const [dailyChart, setDailyChart] = useState({
    labels: [],
    datasets:[
      {
        data: [],
        strokeWidth: 2,
      }
    ]
  });
  const [weeklyChart, setWeeklyChart] = useState({
    labels: [],
    datasets:[
      {
        data: [],
        strokeWidth: 2,
      }
    ]
  });
  const [monthlyChart, setMonthlyChart] = useState({
    labels: [],
    datasets:[
      {
        data: [],
        strokeWidth: 2,
      }
    ]
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  // const dailyExpensesAmounts = [];
  // const dailyExpenses = [];
  // const dailyExpensesLabels = new Set();
  // const weeklyExpenses = [];
  // const weeklyExpensesAmounts = [];
  // const weeklyExpensesLabels = new Set();
  // const monthlyExpenses = [];
  // const monthlyExpensesAmounts = [];
  // const monthlyExpenseLabels = new Set();



  // const dailyChart = {
  //   labels: ['6 AM', '12 PM', '6 AM', '12 AM'],
  //   datasets: [
  //     {
  //       data: [1,2,3,4,5],
  //       strokeWidth: 2,
  //     },
  //   ],
  // };

  // const weeklyChart = {
  //   labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  //   datasets: [
  //     {
  //       data: [15, 25, 32, 68],
  //       strokeWidth: 2,
  //     },
  //   ],
  // };
  // const monthlyChart = {
  //   labels: [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec',
  //   ],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43, 69, 85, 69, 32, 98, 35],
  //       strokeWidth: 2,
  //     },
  //   ],
  // };
  const chartConfig = {
    backgroundGradientFrom: '#373737',
    backgroundGradientTo: '#564C4D',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });



  const [selectedChart, setSelectedChart] = useState(dailyChart);
  const [dailyBtnColor, setDailyBtnColor] = useState('#257AFD');
  const [weeklyBtnColor, setWeeklyBtnColor] = useState('#31c48d');
  const [monthlyBtnColor, setMonthlyBtnColor] = useState('#31c48d');

  const handleChartChange = (chart) => {
    if (!chart){
      chart = dailyChart;
    }
    setSelectedChart(chart);
    adjustBtnColors(chart);
  };

  function adjustBtnColors(chart) {
    if (chart === dailyChart) {
      setDailyBtnColor('#257AFD');
      setWeeklyBtnColor('#31c48d');
      setMonthlyBtnColor('#31c48d');
    } else if (chart === weeklyChart) {
      setDailyBtnColor('#31c48d');
      setWeeklyBtnColor('#257AFD');
      setMonthlyBtnColor('#31c48d');
    } else if (chart === monthlyChart) {
      setDailyBtnColor('#31c48d');
      setWeeklyBtnColor('#31c48d');
      setMonthlyBtnColor('#257AFD');
    }
  }
  function navigateExpensePage() {
    navigation.navigate("addExpensePage");
  }



  // returns the current date in the formate Month, Date, Year (e.g., "July 11, 2023")
  function getCurrentDate() {
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  //return a list containing the current week's range (e.g., ['July, 10, 2023', 'July, 11, 2023', 'July, 12, 2023', 'July, 13 2023', 'July, 14, 2023', 'July, 15, 2023', 'July, 16, 2023'])
  function getCurrentWeekDays() {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);

    // Set the start of the week to Monday
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    // Set the end of the week to Sunday
    endOfWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay()));

    const options = { month: 'long', day: 'numeric', year: 'numeric' };

    const currentWeekDays = [];
    const currentDateIterator = new Date(startOfWeek);

    while (currentDateIterator <= endOfWeek) {
      const formattedDate = currentDateIterator.toLocaleDateString('en-US', options);
      currentWeekDays.push(formattedDate);
      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }

    return currentWeekDays;
  }

  async function getUserEmail() {
    return new Promise((resolve, reject) => {
      CookieManager.get('http://financetracker-3da48.com')
        .then(cookies => {
          if (cookies.userEmail && cookies.userEmail.value) {
            resolve(cookies.userEmail.value); // Resolve the promise with the user email value
          } else {
            console.log('Cookie not found');
            reject('Cookie not found'); // Reject the promise if the cookie is not found
          }
        })
        .catch(error => {
          console.log('Error retrieving cookie:', error);
          reject(error); // Reject the promise if there's an error retrieving the cookie
        });
    });
  }

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
  


  // async function getDailyExpenses(currChart, userExpensesCollecRef, expenseObjs, amounts, labels) {
  //   const currentDay = getCurrentDate();
  
  //   const dailyQuery = query(userExpensesCollecRef, where("expenseDate", "==", currentDay));
  //   const dailyQuerySnapshot = await getDocs(dailyQuery);
  //   dailyQuerySnapshot.forEach((expense) => {
  //     expenseObjs.push(expense.data());
  //     amounts.push(parseFloat(expense.data().expenseAmount.replace('$', '')));
  //     labels.add(convertTo12Hour(expense.data().expenseTime));
  //   });
  //   console.log(expenseObjs);
  //   console.log(amounts);
  //   console.log(labels);

  //   return expenseObjs, amounts, labels;
  // }
  async function getDailyExpenses(userExpensesCollecRef) {
    const currentDay = getCurrentDate();
    const dailyQuery = query(userExpensesCollecRef, where("expenseDate", "==", currentDay));
    const dailyQuerySnapshot = await getDocs(dailyQuery);
  
    const dailyExpensesData = {
      objs: [],
      amounts: [],
      labels: new Set(),
    };
  
    dailyQuerySnapshot.forEach((expense) => {
      dailyExpensesData.objs.push(expense.data());
      dailyExpensesData.amounts.push(expense.data().expenseAmount);
      dailyExpensesData.labels.add(convertTo12Hour(expense.data().expenseTime));
    });
  
    return dailyExpensesData;
  }
  
  // Similarly, update the other functions (getWeeklyExpenses and getMonthlyExpenses)
  
  
  // async function getWeeklyExpenses(currChart, userExpensesCollecRef, expenseObjs, amounts, labels) {
  //   const currentWeekRange = getCurrentWeekDays();
  //   const weeklyQuery = query(userExpensesCollecRef, where("expenseDate", "in", currentWeekRange));
  //   const weeklyExpensesSnapshot = await getDocs(weeklyQuery);
  //   weeklyExpensesSnapshot.forEach((weeklyExpense) => {
  //     expenseObjs.push(weeklyExpense.data());
  //     amounts.push(weeklyExpense.data().expenseAmount);
  //     labels.add(weeklyExpense.data().expenseDate);
  //   });
  //   console.log(expenseObjs);
  //   console.log(amounts);
  //   console.log(labels);
  //   return expenseObjs, amounts, labels;
  // }
  async function getWeeklyExpenses(userExpensesCollecRef) {
    const currentWeekRange = getCurrentWeekDays();
    const weeklyQuery = query(userExpensesCollecRef, where("expenseDate", "in", currentWeekRange));
    const weeklyExpensesSnapshot = await getDocs(weeklyQuery);

    const weeklyExpenseData = {
      objs: [],
      amounts: [],
      labels: new Set(),
    };
    weeklyExpensesSnapshot.forEach((expense) => {
      weeklyExpenseData.objs.push(expense.data());
      weeklyExpenseData.amounts.push(expense.data().expenseAmount);
      weeklyExpenseData.labels.add(expense.data().expenseDate);
    });
    return weeklyExpenseData;
  }
  
  // async function getMonthlyExpenses(currChart, userExpensesCollecRef, expenseObjs, amounts, labels) {
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

  //   const monthlyQuery = query(userExpensesCollecRef, where("expenseDate", ">=", `${currentMonth} 1, ${currentDate.getFullYear()}`), where("expenseDate", "<=", `${currentMonth} 31, ${currentDate.getFullYear()}`));
  //   const monthlyExpensesSnapshot = await getDocs(monthlyQuery);
  //   monthlyExpensesSnapshot.forEach((monthlyExpense) => {
  //     expenseObjs.push(monthlyExpense.data());
  //     amounts.push(monthlyExpense.data().expenseAmount);
  //     // TODO: Change this to store the weeks instead of exact dates
  //     labels.add(monthlyExpense.data().expenseDate);
  //   });
  //   console.log(expenseObjs);
  //   console.log(amounts);
  //   console.log(labels);
  //   return expenseObjs, amounts, labels;
  // }
  async function getMonthlyExpenses(userExpensesCollecRef) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    const monthlyQuery = query(userExpensesCollecRef, where("expenseDate", ">=", `${currentMonth} 1, ${currentDate.getFullYear()}`), where("expenseDate", "<=", `${currentMonth} 31, ${currentDate.getFullYear()}`));
    const monthlyExpensesSnapshot = await getDocs(monthlyQuery);

    const monthlyExpensesData = {
      objs: [],
      amounts: [],
      labels: new Set(),
    }
    monthlyExpensesSnapshot.forEach((expense) => {
      monthlyExpensesData.objs.push(expense.data());
      monthlyExpensesData.amounts.push(expense.data().expenseAmount);
      // TODO: Change this to store the weeks instead of exact dates
      monthlyExpensesData.labels.add(expense.data().expenseDate);
    });

    return monthlyExpensesData;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = await getUserEmail();
        const userExpensesCollecRef = collection(database, `users/${userEmail}/expenses`);
  
        // Fetch data for each chart
        const dailyExpensesData = await getDailyExpenses(userExpensesCollecRef);
        const weeklyExpensesData = await getWeeklyExpenses(userExpensesCollecRef);
        const monthlyExpensesData = await getMonthlyExpenses(userExpensesCollecRef);
  
        // Update the chart objects with the fetched data
        setDailyChart({
          labels: Array.from(dailyExpensesData.labels),
          datasets: [
            {
              data: dailyExpensesData.amounts,
              strokeWidth: 2,
            },
          ],
        });
        setWeeklyChart({
          labels: Array.from(weeklyExpensesData.labels),
          datasets: [
            {
              data: weeklyExpensesData.amounts,
              strokeWidth: 2,
            },
          ],
        });

        setMonthlyChart({
          labels: Array.from(monthlyExpensesData.labels),
          datasets: [
            {
              data: monthlyExpensesData.amounts,
              strokeWidth: 2,
            },
          ],
        });

        setDataLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData().catch(console.error);
  }, []);
  console.log(selectedChart.datasets);
  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {
  //       const userEmail = await getUserEmail();
  //       const userExpensesCollecRef = collection(database, `users/${userEmail}/expenses`);
  //       await getDailyExpenses(dailyChart, userExpensesCollecRef, dailyExpenses, dailyExpensesAmounts, dailyExpensesLabels);
  //       await getWeeklyExpenses(weeklyChart, userExpensesCollecRef, weeklyExpenses, weeklyExpensesAmounts, weeklyExpensesLabels);
  //       await getMonthlyExpenses(monthlyChart, userExpensesCollecRef, monthlyExpenses, monthlyExpensesAmounts, monthlyExpenseLabels);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData().catch(console.error)

  // }, []);



  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <View style={styles.titleContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoStyle}
          />
        </View>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Welcome to iMoneyTracker</Text>
        </View>
        <View style={styles.profileBttn}>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faUser} style={{ color: '#fff' }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chartContainer}>
        {dataLoaded ? (
          <LineChart
          data={selectedChart}
          width={Dimensions.get('window').width - 10}
          height={220}
          yAxisLabel={'$'}
          withInnerLines={0}
          withOuterLines={0}
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 25,
          }}
          decorator={() => {
            return tooltipPos.visible ? (
              <View>
                <Svg>
                  <Rect
                    x={tooltipPos.x - 15}
                    y={tooltipPos.y + 10}
                    width="40"
                    height="30"
                    fill="#373737"
                  />
                  <TextSVG
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 30}
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle">
                    {'$' + tooltipPos.value}
                  </TextSVG>
                </Svg>
              </View>
            ) : null;
          }}
          onDataPointClick={data => {
            let isSamePoint =
              tooltipPos.x === data.x && tooltipPos.y === data.y;

            isSamePoint
              ? setTooltipPos(previousState => {
                return {
                  ...previousState,
                  value: data.value,
                  visible: !previousState.visible,
                };
              })
              : setTooltipPos({
                x: data.x,
                value: data.value,
                y: data.y,
                visible: true,
              });
          }}
        />
        ) : (
          //Show loading indicator while data is being fethched
          <ActivityIndicator size="large" color="#fff"/>
        )}
        <View style={styles.viewSelectorContainer}>
          <View style={styles.viewSelectorBtnContainer}>
            <TouchableOpacity onPress={() => handleChartChange(dailyChart)}>
              <Text
                style={{
                  color: dailyBtnColor,
                  fontFamily: 'ArialRoundedMTBold',
                }}>
                Daily
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSelectorBtnContainer}>
            <TouchableOpacity onPress={() => handleChartChange(weeklyChart)}>
              <Text
                style={{
                  color: weeklyBtnColor,
                  fontFamily: 'ArialRoundedMTBold',
                }}>
                Weekly
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSelectorBtnContainer}>
            <TouchableOpacity onPress={() => handleChartChange(monthlyChart)}>
              <Text
                style={{
                  color: monthlyBtnColor,
                  fontFamily: 'ArialRoundedMTBold',
                }}>
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}></View>
      <View style={styles.addExpenseBtnContainer}>
        <TouchableOpacity style={styles.addExpenseBtn} onPress={() => navigateExpensePage()}>
          <Text style={styles.addExpenseBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
