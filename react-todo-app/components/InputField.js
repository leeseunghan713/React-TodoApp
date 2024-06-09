import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Color } from "../components/GlobalStyles"; // Adjust the import based on your actual file structure

const InputField = ({ label, placeholder, value, onChangeText, secureTextEntry }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput 
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: Color.colorBlack,
  },
});

export default InputField;
