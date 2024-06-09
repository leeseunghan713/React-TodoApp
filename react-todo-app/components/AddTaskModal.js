import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Color, FontFamily, FontSize } from "./GlobalStyles";

const AddTaskModal = ({ modalVisible, newTask, setNewTask, newTime, setNewTime, handleAddTask, showTimePicker, hideTimePicker, isTimePickerVisible, handleConfirm, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Task</Text>
          <Text style={styles.label}>Task:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter task name"
            value={newTask}
            onChangeText={setNewTask}
          />
          <Text style={styles.label}>Time:</Text>
          <TouchableOpacity onPress={showTimePicker} style={styles.timePickerButton}>
            <Text style={styles.timePickerButtonText}>
              {newTime ? newTime : 'Select Time'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
            isDarkModeEnabled={true}
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Add" onPress={handleAddTask} disabled={!newTask || !newTime} />
            <Button title="Cancel" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: FontSize.size_md,
    fontWeight: 'bold',
  },
  modalInput: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  timePickerButton: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerButtonText: {
    fontSize: FontSize.size_md,
    color: 'black', // 기본 텍스트 색상을 검정으로 설정합니다.
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default AddTaskModal;
