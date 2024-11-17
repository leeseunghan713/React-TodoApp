import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../components/GlobalStyles";

const Splashscreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.splashscreen}>
      <Text style={styles.getsThingsWith}>Gets things with ToDos</Text>
      <Text style={styles.loremIpsumDolor}>Todo 할 일들을 기록해보세요</Text>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("LoginScreen")}
        onPress={() => navigation.navigate("TestLoginScreen")}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  splashscreen: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  getsThingsWith: {
    fontSize: FontSize.size_lg,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorBlack,
    textAlign: "center",
    marginBottom: 10,
  },
  loremIpsumDolor: {
    fontSize: FontSize.size_smi,
    lineHeight: 20,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorGray_200,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Color.colorMediumturquoise,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center', // 버튼 내부 텍스트 중앙 정렬
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Splashscreen;
