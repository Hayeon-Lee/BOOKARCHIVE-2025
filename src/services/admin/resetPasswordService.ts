import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { PasswordResetRequest } from '../../types/password';

export const checkPasswordResetList = async (): Promise<
  PasswordResetRequest[]
> => {
  try {
    const querySnapShot = await getDocs(collection(db, 'reset_requests'));
    const data = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PasswordResetRequest, 'id'>),
    }));

    return data;
  } catch {
    throw new Error('목록 불러오기에 실패했습니다.');
  }
};

export const acceptPasswordReset = async (request: PasswordResetRequest) => {
  try {
    const userQuery = query(
      collection(db, 'user'),
      where('nickname', '==', request.nickname),
    );

    const querySnapShot = await getDocs(userQuery);

    if (querySnapShot.empty) {
      throw new Error('존재하지 않는 사용자입니다.');
    }

    const userDoc = querySnapShot.docs[0];

    const userRef = userDoc.ref;
    await updateDoc(userRef, {
      password: request.newPassword,
    });

    const resetRequestRef = doc(db, 'reset_requests', request.id);
    await updateDoc(resetRequestRef, {
      status: 'accepted',
    });
  } catch (error) {
    console.log(error);
    throw new Error('비밀번호 수락 처리 실패.');
  }
};

export const deletePasswordReset = async (request: PasswordResetRequest) => {
  try {
    const resetRequestRef = doc(db, 'reset_requests', request.id);
    await deleteDoc(resetRequestRef);
  } catch (err) {
    console.log(err);
    throw new Error('비밀번호 삭제 처리 실패.');
  }
};
