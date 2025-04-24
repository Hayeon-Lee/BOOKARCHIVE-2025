import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import dayjs, { Dayjs } from 'dayjs';
import { Summary } from '../../types/book';
import { ReadBookData } from '../../types/book';

export const getBooksPerUserByMonth = async (
  month: Dayjs,
): Promise<Summary[]> => {
  const userSnapshots = await getDocs(collection(db, 'user'));
  const results: Summary[] = [];

  for (const userDoc of userSnapshots.docs) {
    const userId = userDoc.id;
    const userData = userDoc.data();

    const booksSnapshot = await getDocs(collection(db, `user/${userId}/books`));

    const filteredBooks = booksSnapshot.docs.filter((doc) => {
      const data = doc.data();
      const completeDate = dayjs(data.completeDate?.toDate());

      return (
        data.isCompleted === true &&
        completeDate.isValid() &&
        completeDate.isSame(month, 'month')
      );
    });

    results.push({
      userId,
      nickname: userData.nickname || '이름 없음',
      count: filteredBooks.length,
    });
  }

  return results;
};

export const getBooksByUser = async (
  userId: string,
): Promise<ReadBookData[]> => {
  if (!userId) return [];
  const snapshot = await getDocs(collection(db, `user/${userId}/books`));

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      author: data.author,
      targetDate: data.targetDate?.toDate?.(),
      completeDate: data.completeDate?.toDate?.(),
      targetAmount: data.targetAmount,
      isCompleted: data.isCompleted ?? false,
    };
  });
};
