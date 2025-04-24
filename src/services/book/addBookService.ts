import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { BookData } from '../../types/book';

export const addBookByUser = async (userId: string, book: BookData) => {
  const docRef = await addDoc(collection(db, `user/${userId}/books`), {
    ...book,
    createdAt: serverTimestamp(),
    isCompleted: false,
    completedDate: undefined,
  });

  return docRef.id;
};
