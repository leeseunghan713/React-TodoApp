import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const addUser = async (userId, password, name = '') => {
  try {
    return await addDoc(collection(db, 'users'), {
      userId,
      password,
      name
    });
  } catch (error) {
    throw new Error("Failed to add user");
  }
};
