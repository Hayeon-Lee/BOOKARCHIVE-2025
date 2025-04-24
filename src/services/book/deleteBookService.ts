import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const deleteBookService = async (userId: string, bookId: string) => {
  const bookRef = doc(db, `user/${userId}/books`, bookId);
  await deleteDoc(bookRef);
};
