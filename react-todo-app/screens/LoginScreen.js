import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../components/GlobalStyles";
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import based on your actual file structure
import ErrorMessage from '../components/ErrorMessage'; // Adjust the path based on your actual file structure
import InputField from '../components/InputField'; // Adjust the path based on your actual file structure

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const userQuery = query(collection(db, 'users'), where('userId', '==', userId), where('password', '==', password));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        navigation.navigate("MainScreen", { Id: userData.Id, userId: userData.userId, name: userData.name, password: userData.password });
      } else {
        setErrorMessage("로그인 정보를 확인해 주세요");
      }
    } catch (error) {
      setErrorMessage("로그인 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <View style={styles.loginscreen}>
      <Text style={styles.welcomeBack}>Welcome back</Text>
      <InputField 
        label="아이디: " 
        placeholder="아이디를 입력하세요" 
        value={userId} 
        onChangeText={setUserId} 
      />
      <InputField 
        label="비밀번호: " 
        placeholder="비밀번호를 입력하세요" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <ErrorMessage message={errorMessage} />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={[styles.dontHaveAnContainer, styles.textCenter]}>
        <Text style={styles.dontHaveAn}>{`Don’t have an account? `}</Text>
        <Text style={styles.signUp} onPress={() => navigation.navigate("SignUpScreen")}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
  },
  welcomeBack: {
    marginTop: 200,
    fontSize: FontSize.size_lg,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    textAlign: "center",
    color: Color.colorBlack,
  },
  dontHaveAn: {
    color: Color.colorBlack,
  },
  signUp: {
    color: Color.colorMediumturquoise,
  },
  dontHaveAnContainer: {
    marginTop: 20,
    fontSize: FontSize.size_base,
    lineHeight: 25,
  },
  loginscreen: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: Color.colorMediumturquoise,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
