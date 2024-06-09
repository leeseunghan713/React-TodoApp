// DaySelector.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Border } from "./GlobalStyles";

const DaySelector = ({ days, selectedDay, onDayPress }) => {
  return (
    <ScrollView horizontal style={styles.scrollView}>
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayItem,
              selectedDay === day && styles.selectedDayItem // 선택된 날짜에 스타일 적용
            ]}
            onPress={() => onDayPress(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 60,
    paddingHorizontal: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayItem: {
    margin: 5,
    padding: 15,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
    alignItems: 'center',
    width: 45, // 너비를 고정하여 모든 항목이 같은 크기를 가지도록 합니다.
  },
  selectedDayItem: {
    backgroundColor: Color.colorGainsboro, // 선택된 날짜에 적용할 스타일
  },
  dayText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_md,
  },
});

export default DaySelector;
