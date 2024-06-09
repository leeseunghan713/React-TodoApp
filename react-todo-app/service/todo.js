import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// ToDo 추가
export const addTodo = async (userId, time, content, year, month, day, isCompleted = false) => {
  return await addDoc(collection(db, 'todos'), {
    userId,
    time,
    content,
    year,
    month,
    day,
    isCompleted
  });
};

// ToDo 목록 가져오기
export const getTodos = async (userId) => {
  const q = query(collection(db, 'todos'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const todos = [];
  querySnapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });
  return todos;
};

// ToDo 업데이트
export const updateTodo = async (id, updatedData) => {
  const todoRef = doc(db, 'todos', d);
  await updateDoc(todoRef, updatedData);
};

// ToDo 삭제
export const deleteTodo = async (Id) => {
  const todoRef = doc(db, 'todos', Id);
  await deleteDoc(todoRef);
};
