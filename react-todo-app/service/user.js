import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const addUser = async (uid, name = '', email) => {
  try {
    return await addDoc(collection(db, 'authUsers'), {
      uid: uid,
      name: name,
      email: email,
      createAt: new Date(),
    });
  } catch (error) {
    throw new Error("Failed to add user");
  }
};
