import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebaseConfig'; // firebaseConfig 파일 import
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigation } from "@react-navigation/native";

const TestLoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signIn = async () => {
        try {
            // Firebase Auth로 로그인
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Firestore에서 사용자 정보 가져오기
            const usersRef = collection(db, 'authUsers');
            const q = query(usersRef, where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                console.log('로그인 성공:', userData);
                navigation.navigate('TestLoginSuccessScreen', { name: userData.name }); // HomeScreen으로 이동
            } else {
                throw new Error('사용자 정보가 없습니다.');
            }

        } catch (error) {
            setErrorMessage('로그인 중 오류가 발생했습니다');
            console.error('로그인 오류:', error)

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>로그인</Text>
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
                onPress={signIn}>
                <Text style={styles.buttonText}>Sign In</Text>
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

export default TestLoginScreen;