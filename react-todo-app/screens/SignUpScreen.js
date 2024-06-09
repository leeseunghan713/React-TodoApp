import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../components/GlobalStyles";
import { addUser } from '../service/user'; // 실제 파일 구조에 맞게 조정

const SignUpScreen = () => {
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !userId || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await addUser(userId, password, name);
      Alert.alert("Success", "Account created successfully");
      navigation.navigate("LoginScreen");
    } catch (error) {
      Alert.alert("Error", "Failed to create account");
      console.error(error);
    }
  };

  return (
    <View style={styles.signupscreen}>
      <Text style={styles.welcomeToOnboard}>{`Welcome to Onboard! `}</Text>
      <Text style={styles.letsHelpTo}>
        Let’s help to meet up your tasks.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름: </Text>
        <TextInput 
          style={styles.textInput}
          placeholder="이름을 입력하세요" 
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디: </Text>
        <TextInput 
          style={styles.textInput}
          placeholder="아이디를 입력하세요" 
          value={userId}
          onChangeText={setUserId}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호: </Text>
        <TextInput 
          style={styles.textInput}
          placeholder="비밀번호를 입력하세요" 
          secureTextEntry={true} 
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 확인: </Text>
        <TextInput 
          style={styles.textInput}
          placeholder="비밀번호를 한번 더 입력하세요" 
          secureTextEntry={true} 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.alreadyHaveAnContainer}>
        <Text style={styles.alreadyHaveAn}>{`Already have an account? `}</Text>
        <Text style={styles.signIn} onPress={() => navigation.navigate("LoginScreen")}>Sign In</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  signupscreen: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeToOnboard: {
    fontSize: FontSize.size_lg,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    textAlign: "center",
    color: Color.colorBlack,
    marginBottom: 10,
  },
  letsHelpTo: {
    fontSize: FontSize.size_smi,
    lineHeight: 20,
    color: Color.colorGray_200,
    width: '80%',
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: Color.colorBlack,
  },
  textInput: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
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
  alreadyHaveAnContainer: {
    marginTop: 20,
    fontSize: FontSize.size_base,
    lineHeight: 25,
    textAlign: "center",
  },
  alreadyHaveAn: {
    color: Color.colorBlack,
  },
  signIn: {
    color: Color.colorMediumturquoise,
  },
});

export default SignUpScreen;
