import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Modal, Button } from 'react-native';
import { Color, FontFamily, FontSize } from "./GlobalStyles";

const TaskItem = ({ task, selectedTask, onPress, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setModalVisible(false);
  };

  return (
    <TouchableOpacity
      style={[styles.task, selectedTask === task.id && styles.selectedTask]}
      onPress={() => onPress(task.id)}
      onLongPress={handleLongPress}
    >
      <View
        style={[
          styles.taskChild,
          styles.taskLayout1,
          task.isCompleted ? styles.taskCompleted : styles.taskNotCompleted,
        ]}
      />
      <Text style={[styles.taskTime, styles.amTypo]}>{task.time}</Text>
      <Text style={[styles.taskTitle, styles.amTypo]}>
        {`${task.content}  `}
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>삭제하시겠습니까?</Text>
            <View style={styles.buttonContainer}>
              <Button title="Yes" onPress={handleDelete} />
              <Button title="No" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Color.colorWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedTask: {
    backgroundColor: Color.colorLightBlue,
  },
  taskTitle: {
    left: "50%",
    flex: 1,
  },
  taskTime: {
    marginLeft: 10,
  },
  taskLayout1: {
    height: 17,
    width: 17,
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
  },
  taskCompleted: {
    backgroundColor: Color.colorBlack,
  },
  taskNotCompleted: {
    backgroundColor: 'transparent',
  },
  amTypo: {
    textAlign: "left",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
  },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default TaskItem;
