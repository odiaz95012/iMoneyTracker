import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Svg, Rect, Text as TextSVG} from 'react-native-svg';
import {useState} from 'react';

const HomeScreen = () => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const line = {
    labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 69],
        strokeWidth: 2, // optional,
      },
    ],
  };
  const weeklyChartConfig = {
    backgroundGradientFrom: '#373737',
    backgroundGradientTo: '#564C4D',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logoStyle}
        />
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={line}
          width={Dimensions.get('window').width - 10} // from react-native
          height={220}
          yAxisLabel={'$'}
          withInnerLines={0}
          withOuterLines={0}
          chartConfig={weeklyChartConfig}
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
            <TouchableOpacity>
              <Text style={styles.viewSelectorBtnStyles}>Weekly</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSelectorBtnContainer}>
            <TouchableOpacity>
              <Text style={styles.viewSelectorBtnStyles}>Monthly</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSelectorBtnContainer}>
            <TouchableOpacity>
              <Text style={styles.viewSelectorBtnStyles}>Yearly</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5c635e',
  },
  logoContainer: {
    bottom: '45%',
    right: '40%',
  },
  logoStyle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  chartContainer: {
    bottom: '30%',
  },
  viewSelectorContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 75,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:25,
    backgroundColor: '#373737',
    left:'15%',
    marginTop: 5
  },
  viewSelectorBtnStyles: {
    color: '#31c48d',
  },
  viewSelectorBtnContainer: {
    marginRight: 10,
  },
});
export default HomeScreen;
