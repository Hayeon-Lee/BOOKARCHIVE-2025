import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ReadBookData } from '../../types/book';

export const modifyBookService = async (
  userId: string,
  book: ReadBookData,
): Promise<void> => {
  const bookRef = doc(db, `user/${userId}/books`, book.id);

  await updateDoc(bookRef, {
    title: book.title,
    author: book.author,
    targetDate: book.targetDate,
    targetAmount: book.targetAmount,
    completedDate: book.completeDate ?? null,
    isCompleted: book.isCompleted ?? false,
  });
};
