import React from 'react';
import { StyleSheet, Text, View, Button, Modal, Alert, Clipboard } from 'react-native';
import { Color, FontSize } from "./GlobalStyles";

const ExportTasksModal = ({ exportModalVisible, filteredTasks, selectedYear, selectedMonth, selectedDay, closeModal }) => {

  const handleCopyToClipboard = () => {
    const text = filteredTasks.map(task => `${task.time} ${task.content}`).join('\n');
    Clipboard.setString(`${selectedYear}년 ${selectedMonth}월 ${selectedDay}일\n\n${text}`);
    Alert.alert('복사 완료', '텍스트가 클립보드에 복사되었습니다.');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={exportModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{`${selectedYear}년 ${selectedMonth}월 ${selectedDay}일`}</Text>
          {filteredTasks.map((task) => (
            <Text key={task.id} style={styles.exportText}>{`${task.time} ${task.content}`}</Text>
          ))}
          <View style={styles.modalButtonContainer}>
            <Button title="Copy" onPress={handleCopyToClipboard} />
            <Button title="Close" onPress={closeModal} />
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  exportText: {
    fontSize: FontSize.size_md,
    marginBottom: 5,
  },
});

export default ExportTasksModal;
