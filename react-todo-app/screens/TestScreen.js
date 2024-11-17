import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebaseConfig'; // firebaseConfig 파일 import
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigation } from "@react-navigation/native";

const TestScreen = () => {
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signUp = async () => {
    try {
      // Firebase Auth로 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에 사용자 데이터 저장
      await addDoc(collection(db, 'authUsers'), {
        uid: user.uid, // 고유 사용자 ID
        name: name,
        email: email,
        createdAt: new Date(), // 생성 시각
      });
      console.log('회원가입 성공:', user);
      navigation.navigate('TestLoginScreen');
    } catch (error) {
      setErrorMessage('회원가입 중 오류가 발생했습니다.');
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <InputField 
        label="이름: " 
        placeholder="이름을 입력하세요" 
        value={name} 
        onChangeText={setName} 
      />
      <InputField 
        label="이메일: " 
        placeholder="이메일을 입력하세요" 
        value={email} 
        onChangeText={setEmail} 
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
        onPress={signUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default TestScreen;
