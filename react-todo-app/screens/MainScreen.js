import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import TodoComponent from "../components/TodoComponent";
import DayComponent from "../components/DayComponent";
import { Color, FontSize, FontFamily } from "../components/GlobalStyles";

const MainScreen = () => {
  const route = useRoute();
  const { uid, name } = route.params;

  // 날짜 상태 추가
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const handleDateChange = (year, month, day) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(day);
  };

  return (
    <View style={styles.mainscreen}>
      <View style={[styles.mainscreenChild, styles.mainscreenPosition]} />

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome </Text>
        <Text style={styles.userName}>{name}</Text>
      </View>

      <DayComponent onDateChange={handleDateChange} />
      <Text style={[styles.taskList, styles.taskListFlexBox]}>Task list</Text>
      <TodoComponent
        uid={uid}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainscreenPosition: {
    width: "100%",
    left: 0,
    position: "absolute",
  },
  taskListFlexBox: {
    textAlign: "left",
  },
  mainscreenChild: {
    top: 0,
    backgroundColor: Color.colorMediumturquoise,
    height: "30%",
    width: "100%",
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "absolute",
    top: "25%",
    left: "10%",
  },
  welcomeText: {
    fontSize: FontSize.size_lg,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorWhite,
  },
  userName: {
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorWhite,
  },
  taskList: {
    position: "absolute",
    top: "50%",
    left: "5%",
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorBlack,
  },
  mainscreen: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
  },
});

export default MainScreen;
