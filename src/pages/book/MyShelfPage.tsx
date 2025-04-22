import { useState, useEffect } from 'react';
import { Spin, Row, Col, Typography, Button, Empty } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AddBookModal from '../../components/book/AddBookModal';
import { addBookByUser } from '../../services/book/addBookService';
import { getBooksByUser } from '../../services/book/getMemberBookService';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { useNavigate } from 'react-router-dom';
import { BookData, ReadBookData } from '../../types/book';
import BookCard from "../../components/book/BookCard"
import MonthSelector from '../../components/common/MonthSelector';

const { Title } = Typography;

const MyShelfPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<ReadBookData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());

  const userId = useUserStore((state) => state.loginUser?.userId);
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

    if (loginUser && userId) {
      await addBookByUser(loginUser.userId, book);
      setOpen(false);
      const updatedBooks = await getBooksByUser(userId);
      setBooks(updatedBooks);
    }
  }

  const booksThisYear = books.filter(book =>
    dayjs(book.date).year() === dayjs().year()
  );

  const booksThisMonth = books
    .filter(book => dayjs(book.date).isSame(selectedMonth, 'month'))
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>🎁 {loginUser.nickname}의 책장</Title>

      <Title level={4}>
        📘 {dayjs().year()}년 올해 읽은 책: {booksThisYear.length}권
      </Title>

      <Title level={5}>
        📅 {selectedMonth.format('M')}월에 읽은 책: {booksThisMonth.length}권
      </Title>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
        {loginUser && loginUser.userId === userId && (
          <Button type="primary" onClick={() => setOpen(true)}>책 추가하기</Button>
        )}
      </div>

      <AddBookModal open={open} onClose={() => setOpen(false)} onSubmit={handleAddBook} />

      {loading ? (
        <Spin size="large" />
      ) : booksThisMonth.length === 0 ? (
        <Empty description="해당 월에는 읽은 책이 없습니다." style={{ marginTop: 40 }} />
      ) : (
        <Row gutter={[16, 16]}>
          {booksThisMonth.map((book) => (
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
    </div>
  );
};

export default MyShelfPage;
