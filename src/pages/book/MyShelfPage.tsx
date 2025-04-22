import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Row, Col, Typography, Button} from 'antd';

import AddBookModal from '../../components/book/AddBookModal';
import { addBookByUser } from '../../services/book/addBookService';
import { getBooksByUser } from '../../services/book/getMemberBookService';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { useNavigate } from 'react-router-dom';
import { BookData, ReadBookData } from '../../types/book';
import BookCard from "../../components/book/BookCard"

const { Title } = Typography;

const MyShelfPage = () => {
  const {userId} = useParams();

  const [open, setOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<ReadBookData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loginUser = useUserStore((state) => state.loginUser);
  
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchBooks = async () => {
      if (!userId) return;
      const data = await getBooksByUser(userId);
      setBooks(data);
      setLoading(false);
    }
    fetchBooks();
  }, [userId]);

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

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {books.map((book) => (
            <Col span={8} key={book.id}>
              <BookCard
                title={book.title}
                author={book.author}
                date={book.date}
                memo={book.memo}
              />
            </Col>
          ))}
        </Row>
      )}

      <Button type="primary" onClick={() => setOpen(true)} disabled={!loginUser}>
        책 추가하기
      </Button>
      <AddBookModal open={open} onClose={() => setOpen(false)} onSubmit={handleAddBook} />
    </div>
    </>
  );
};

export default MyShelfPage;
