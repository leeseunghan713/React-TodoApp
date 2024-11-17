import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig';
import { useNavigation } from "@react-navigation/native";

const TestLoginSuccessScreen = ({ route }) => {
    const navigation = useNavigation();
    const { name } = route.params;

    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase 로그아웃
            navigation.replace('TestLoginScreen'); // 로그인 화면으로 이동
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>환영합니다, {name}님!</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default TestLoginSuccessScreen;
