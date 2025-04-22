import { useState } from 'react';
import { Button, Typography } from 'antd';
import AddBookModal from '../../components/book/AddBookModal';
import { addBookByUser } from '../../services/book/addBookService';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { useNavigate } from 'react-router-dom';
import { BookData } from '../../types/book';

const { Title } = Typography;

const MyShelfPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const loginUser = useUserStore((state) => state.loginUser);
  
  const navigate = useNavigate();

  const handleAddBook = async (book: BookData) => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate("/");
    }

    if (loginUser != null) 
      await addBookByUser(loginUser.userId, book);
  }

  return (
    <><div style={{ padding: 24 }}>
      <Title level={2}>내 책장</Title>
      <Button type="primary" onClick={() => setOpen(true)} disabled={!loginUser}>
        책 추가하기
      </Button>
      <AddBookModal open={open} onClose={() => setOpen(false)} onSubmit={handleAddBook} />
    </div>
    </>
  );
};

export default MyShelfPage;
