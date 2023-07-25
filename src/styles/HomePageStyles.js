import { StyleSheet, Dimensions, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5c635e'
    },
    mainView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      overflow: 'scroll'
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
      top: 100,
      position: 'absolute',
    },
    viewSelectorContainer: {
      flexDirection: 'row',
      width: Dimensions.get('window').width - 75,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      backgroundColor: '#373737',
      top: 370,
      right: 40,
      position: 'absolute',
    },
    viewSelectorBtnContainer: {
      marginRight: 10,
    },
    detailsContainer: {
      width: Dimensions.get('window').width - 20,
      flex: 1,
      borderRadius: 25,
      backgroundColor: '#fff',
      height: '100%',
      top: 450,
      backgroundColor: '#303030',
      padding: 10
    },
    addExpenseBtnContainer: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      right: 15,
      zIndex: 2,
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
      //marginTop: 10,
      backgroundColor: '#5c635e',
      opacity: 0.75,
      width: Dimensions.get('window').width + 20,
      height: 60,
      borderStyle: 'solid',
      borderWidth: 1,
      borderTopColor: '#5c635e',
      borderBottomColor: 'rgba(49, 196, 141, 0.55)',
      position: 'absolute',
      bottom: 710
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
    noDataContainer: {
      width: Dimensions.get('window').width - 10,
      height: 250,
      position: 'absolute',
      backgroundColor: '#303030',
      alignItems: 'center',
      justifyContent: 'center',
      right: -190,
      fontSize: 35,
      borderRadius: 15, 
      top: -10
    },
    noDataText: {
      fontSize: 24,
      color: '#fff',
      fontFamily: 'ArialRoundedMTBold'
    }
  });