import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import bcrypt from 'bcryptjs';
import { LoginUser } from '../../types/auth';

export const loginUser = async (nickname: string, password: string) => {
  const userQuery = query(
    collection(db, 'user'),
    where('nickname', '==', nickname),
  );

  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot.empty) {
    throw new Error('존재하지 않는 사용자입니다.');
  }

  const userDoc = querySnapshot.docs[0];

  const loginUser: LoginUser = {
    userId: userDoc.id,
    nickname: userDoc.data().nickname,
  };
  const isMatch = await bcrypt.compare(password, userDoc.data().password);

  if (!isMatch) {
    throw new Error('비밀번호가 틀립니다.');
  }
  return loginUser;
};

export const getNicknameById = async (id: string | null) => {
  if (id) {
    const userRef = doc(db, 'user', id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.nickname;
    }
  }
};
