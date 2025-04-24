import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { BookData } from '../../types/book';

function cleanObject(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  );
}

export const addBookByUser = async (userId: string, book: BookData) => {
  const docRef = await addDoc(
    collection(db, `user/${userId}/books`),
    cleanObject({
      ...book,
      createdAt: serverTimestamp(),
      isCompleted: false,
      completedDate: undefined,
    }),
  );

  return docRef.id;
};
