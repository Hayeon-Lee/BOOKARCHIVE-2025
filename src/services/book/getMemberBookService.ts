import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import dayjs, { Dayjs } from 'dayjs';
import { Summary } from '../../types/book';

export const getBooksPerUserByMonth = async (
  month: Dayjs,
): Promise<Summary[]> => {
  const userSnapshots = await getDocs(collection(db, 'users'));

  const results: Summary[] = [];

  for (const userDoc of userSnapshots.docs) {
    const userId = userDoc.id;
    const userData = userDoc.data();
    const booksSnapshot = await getDocs(
      collection(db, `users/${userId}/books`),
    );

    const filteredBooks = booksSnapshot.docs.filter((doc) => {
      const data = doc.data();
      const readDate = dayjs(data.date?.toDate?.());
      return readDate.isValid() && readDate.isSame(month, 'month');
    });

    results.push({
      userId,
      name: userData.name || '이름 없음',
      count: filteredBooks.length,
    });
  }

  return results;
};
