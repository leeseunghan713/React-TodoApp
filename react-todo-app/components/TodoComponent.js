import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Color, FontFamily, FontSize, Border } from "./GlobalStyles";
import TaskItem from './TaskItem';
import { addTodo, getTodos, updateTodo, deleteTodo } from '../service/todo';
import AddTaskModal from './AddTaskModal';
import ExportTasksModal from './ExportTasksModal';
import { convertTo24Hour } from './utils';

const TodoComponent = ({ uid, selectedYear, selectedMonth, selectedDay }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  console.log(tasks)

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(uid);
      setTasks(todos);
    };

    fetchTodos();
  }, [userId]);

  const handleTaskPress = async (id) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, isCompleted: !task.isCompleted };
          updateTodo(id, updatedTask);
          return updatedTask;
        }
        return task;
      });
  
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask || !newTime) {
      return;
    }

    try {
      const newTodo = await addTodo(userId, newTime, newTask, selectedYear, selectedMonth, selectedDay);
      setTasks([...tasks, { id: newTodo.id, content: newTask, time: newTime, isCompleted: false, year: selectedYear, month: selectedMonth, day: selectedDay }]);
      setNewTask('');
      setNewTime('');
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setNewTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    hideTimePicker();
  };

  const filteredTasks = tasks
    .filter(task => task.year === selectedYear && task.month === selectedMonth && task.day === selectedDay)
    .sort((a, b) => {
      const timeA = convertTo24Hour(a.time);
      const timeB = convertTo24Hour(b.time);
      return timeA.localeCompare(timeB);
    });

  const getTaskHeading = () => {
    const today = new Date();
    const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay); // months are 0-indexed in JavaScript Date

    if (
      today.getFullYear() === selectedYear &&
      today.getMonth() === selectedMonth - 1 &&
      today.getDate() === selectedDay
    ) {
      return "Daily Task";
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (
      tomorrow.getFullYear() === selectedYear &&
      tomorrow.getMonth() === selectedMonth - 1 &&
      tomorrow.getDate() === selectedDay
    ) {
      return "Tomorrow Task";
    }

    return "Task";
  };

  return (
    <View style={[styles.vectorParent, styles.groupChildLayout]}>
      <View style={[styles.taskHeading, styles.plusIconLayout]}>
        <Text style={[styles.dailyTask, styles.amTypo]}>{getTaskHeading()}</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={{ id: task.id, content: task.content, time: task.time, isCompleted: task.isCompleted }}
            selectedTask={selectedTask}
            onPress={() => handleTaskPress(task.id)}
            onDelete={handleDeleteTask}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setExportModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>내보내기</Text>
        </TouchableOpacity>
      </View>
      <AddTaskModal
        modalVisible={modalVisible}
        newTask={newTask}
        setNewTask={setNewTask}
        newTime={newTime}
        setNewTime={setNewTime}
        handleAddTask={handleAddTask}
        showTimePicker={showTimePicker}
        hideTimePicker={hideTimePicker}
        isTimePickerVisible={isTimePickerVisible}
        handleConfirm={handleConfirm}
        closeModal={() => setModalVisible(false)}
      />
      <ExportTasksModal
        exportModalVisible={exportModalVisible}
        filteredTasks={filteredTasks}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        closeModal={() => setExportModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 309,
    width: 382,
    position: "absolute",
  },
  addButton: {
    backgroundColor: Color.colorGray_100,
    padding: 10,
    borderRadius: Border.br_xs,
    alignItems: 'center',
    margin: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: FontSize.size_md,
  },
  amTypo: {
    textAlign: "left",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_xs,
    left: 0,
    top: 0,
  },
  dailyTask: {
    top: 0,
    left: 0,
  },
  plusIcon: {
    left: 308,
    width: 25,
    overflow: "hidden",
    top: 0,
  },
  taskHeading: {
    top: 20,
    width: 333,
    left: 25,
  },
  groupInner: {
    top: 22,
    left: 299,
    width: 14,
    height: 21,
    position: "absolute",
  },
  vectorParent: {
    top: 450,
    left: 10,
  },
  scrollView: {
    marginTop: 40,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default TodoComponent;
