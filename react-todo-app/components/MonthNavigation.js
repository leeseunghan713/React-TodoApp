// MonthNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Color, FontSize, Border } from "./GlobalStyles";

const MonthNavigation = ({ onPrevMonth, onNextMonth, currentYear, currentMonth }) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity onPress={onPrevMonth} style={styles.navButton}>
        <Text style={styles.navButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.currentDateContainer}>
        <Text style={styles.currentDateText}>
          {currentYear + "년 " + currentMonth + "월"}
        </Text>
      </View>
      <TouchableOpacity onPress={onNextMonth} style={styles.navButton}>
        <Text style={styles.navButtonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    left: 23,
    top: 0,
    position: "absolute",
  },
  navButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
  },
  navButtonText: {
    fontSize: FontSize.size_lg,
    fontWeight: 'bold',
    color: Color.colorBlack,
  },
  currentDateContainer: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  currentDateText: {
    fontSize: FontSize.size_xl,
    fontWeight: "600",
    color: Color.colorBlack,
  },
});

export default MonthNavigation;
