// DayComponent.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MonthNavigation from "./MonthNavigation";
import DaySelector from "./DaySelector";

const DayComponent = ({ onDateChange }) => {
  const date = new Date();
  const [years, setYears] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(date.getDate()); // 선택된 날짜 상태 추가

  useEffect(() => {
    updateDays(years, month);
  }, [years, month]);

  useEffect(() => {
    onDateChange(years, month, selectedDay); // 선택된 날짜가 변경될 때마다 상위 컴포넌트로 전달
  }, [years, month, selectedDay]);

  const updateDays = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  const handleDayPress = (day) => {
    setSelectedDay(day); // 날짜 선택 시 상태 업데이트
  };

  const handlePrevMonth = () => {
    let newMonth = month - 1;
    let newYear = years;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    setMonth(newMonth);
    setYears(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = month + 1;
    let newYear = years;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    setMonth(newMonth);
    setYears(newYear);
  };

  return (
    <View style={styles.vectorParent}>
      <MonthNavigation
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        currentYear={years}
        currentMonth={month}
      />
      <DaySelector days={days} selectedDay={selectedDay} onDayPress={handleDayPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  vectorParent: {
    height: "14.7%",
    width: "100%",
    top: "31.26%",
    bottom: "55.04%",
    position: "absolute",
  },
});

export default DayComponent;
