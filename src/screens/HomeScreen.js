import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Svg, Rect, Text as TextSVG} from 'react-native-svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({navigation}) => {
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const dailyChart = {
    labels: ['6 AM', '12 PM', '6 PM', '12 AM'],
    datasets: [
      {
        data: [15, 25, 32, 68],
        strokeWidth: 2,
      },
    ],
  };
  const weeklyChart = {
    labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 69],
        strokeWidth: 2,
      },
    ],
  };
  const monthlyChart = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 69, 85, 69, 32, 98, 35],
        strokeWidth: 2,
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#373737',
    backgroundGradientTo: '#564C4D',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const [selectedChart, setSelectedChart] = useState(dailyChart);
  const [dailyBtnColor, setDailyBtnColor] = useState('#257AFD');
  const [weeklyBtnColor, setWeeklyBtnColor] = useState('#31c48d');
  const [monthlyBtnColor, setMonthlyBtnColor] = useState('#31c48d');

  const handleChartChange = chart => {
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
  function navigateExpensePage(){
    navigation.navigate("addExpensePage");
  }

  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5c635e',
      overflow: 'hidden'
    },
    logoContainer: {
      position: 'relative',
      paddingRight: 35,
    },
    logoStyle: {
      width: 45,
      height: 45,
      borderRadius: 45 / 2,
    },
    chartContainer: {
      top: '5%',
    },
    viewSelectorContainer: {
      flexDirection: 'row',
      width: Dimensions.get('window').width - 75,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      backgroundColor: '#373737',
      left: '15%',
      marginTop: 5,
      position: 'relative',
    },
    viewSelectorBtnContainer: {
      marginRight: 10,
    },
    detailsContainer: {
      width: Dimensions.get('window').width - 20,
      height: 500,
      borderRadius: 15,
      backgroundColor: '#fff',
      position: 'relative',
      top: '10%',
    },
    addExpenseBtnContainer: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      right: 15,
      zIndex: 15,
      bottom: 5,
      position: 'absolute',
    },
    addExpenseBtn: {
      color: '#fff',
    },
    addExpenseBtnText: {
      color: '#31c48d',
      fontSize: 55,
      fontFamily: 'ArialRoundedMTBold',
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: '10%',
      backgroundColor: '#5c635e',
      opacity: 0.75,
      width: Dimensions.get('window').width + 20,
      height: 60,
      borderStyle: 'solid',
      borderWidth: 1,
      borderTopColor: '#5c635e',
      borderBottomColor: 'rgba(49, 196, 141, 0.55)'
    },
    titleTextContainer: {
      position: 'relative',
      paddingRight: 15,
    },
    titleText: {
      color: '#31c48d',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'ArialRoundedMTBold',
      right: 5,
    },
    profileBttn: {
      width: 45,
      height: 45,
      backgroundColor: '#31c48d',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 45 / 2,
      position: 'relative',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#fff'
    },
  });

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
            <FontAwesomeIcon icon={faUser} style={{color: '#fff'}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chartContainer}>
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
        <TouchableOpacity style={styles.addExpenseBtn} onPress = {() => navigateExpensePage()}>
          <Text style={styles.addExpenseBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
