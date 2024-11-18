import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

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

export const getUser = async (uid) => {
  try {
    const usersRef = collection(db, 'authUsers');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q)

    if(!querySnapshot.empty){
      return querySnapshot.docs[0].data();
    } else {
      throw new Error('사용자 정보가 없습니다.')
    }

  } catch (error) {
    console.error('사용자 정보 가져오지 못했습니다.', error)
    throw error;
  }
}