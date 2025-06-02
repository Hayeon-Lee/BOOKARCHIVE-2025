import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

const requestPasswordReset = async (nickname: string, newPassword: string) => {
  const userQuery = query(
    collection(db, 'user'),
    where('nickname', '==', nickname),
  );
  const userQuerySnapshot = await getDocs(userQuery);
  if (userQuerySnapshot.empty) {
    throw new Error('존재하지 않는 사용자입니다.');
  }

  const alreadyRequestQuery = query(
    collection(db, 'reset_requests'),
    where('nickname', '==', nickname),
  );
  const alreadyRequestQuerySnapshot = await getDocs(alreadyRequestQuery);
  if (!alreadyRequestQuerySnapshot.empty) {
    throw new Error('이미 비밀번호 재신청을 진행하셨습니다.');
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const docRef = await addDoc(collection(db, 'reset_requests'), {
      nickname,
      newPassword: hashedPassword,
      status: 'pending',
      requestedAt: serverTimestamp(),
    });
    return { success: true, requestId: docRef.id };
  } catch {
    throw new Error('관리자에게 문의해주세요.');
  }
};

export default requestPasswordReset;
