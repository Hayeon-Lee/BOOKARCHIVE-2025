import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ReadBookData } from '../../types/book';

export const modifyBookService = async (
  userId: string,
  book: ReadBookData,
): Promise<void> => {
  const bookRef = doc(db, `user/${userId}/books`, book.id);

  console.log(book);

  await updateDoc(bookRef, {
    title: book.title,
    author: book.author,
    date: book.date,
    rating: book.rating,
  });
};
