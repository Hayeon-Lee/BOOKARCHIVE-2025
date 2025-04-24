import { useState, useEffect } from 'react';
import { Spin, Row, Col, Typography, Button, Empty } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from 'react-router-dom';

import AddBookModal from '../../components/book/AddBookModal';
import { addBookByUser } from '../../services/book/addBookService';
import { getBooksByUser } from '../../services/book/getMemberBookService';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { useNavigate } from 'react-router-dom';
import { BookData, ReadBookData } from '../../types/book';
import BookCard from '../../components/book/BookCard';
import MonthSelector from '../../components/common/MonthSelector';
import { getNicknameById } from '../../services/auth/authService';

const { Title } = Typography;

const MyShelfPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<ReadBookData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
  const [viewAllYear, setViewAllYear] = useState<boolean>(false);

  const { userId } = useParams<{ userId: string }>();
  const [nickname, setNickname] = useState('');

  const loginUser = useUserStore((state) => state.loginUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserNickname = async () => {
      const nickname = await getNicknameById(userId ?? null);
      if (nickname) setNickname(nickname);
    };

    fetchUserNickname();
  }, [userId]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!userId) return;
      const data = await getBooksByUser(userId);
      setBooks(data);
      setLoading(false);
    };
    fetchBooks();
  }, [userId]);

  const handleAddBook = async (book: BookData) => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }

    if (loginUser && userId) {
      await addBookByUser(loginUser.userId, book);
      setOpen(false);
      const updatedBooks = await getBooksByUser(userId);
      setBooks(updatedBooks);
    }
  };

  const booksThisYear = books.filter(
    (book) => dayjs(book.date).year() === dayjs().year(),
  );

  const booksThisMonth = booksThisYear
    .filter((book) => dayjs(book.date).isSame(selectedMonth, 'month'))
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

  const booksToDisplay = viewAllYear
    ? [...booksThisYear].sort(
        (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
      )
    : booksThisMonth;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>🎁{nickname}의 책장</Title>

      <Title level={4}>
        📘 {dayjs().year()}년 올해 읽은 책: {booksThisYear.length}권
      </Title>

      {viewAllYear ? null : (
        <Title level={5}>
          📅 {selectedMonth.format('M')}월에 읽은 책: {booksThisMonth.length}권
        </Title>
      )}

      <AddBookModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddBook}
      />

      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        {!viewAllYear && (
          <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
        )}
        {loginUser?.userId === userId && (
          <Button type="primary" onClick={() => setOpen(true)}>
            책 추가하기
          </Button>
        )}
        <Button onClick={() => setViewAllYear((prev) => !prev)}>
          {viewAllYear ? '월별로 보기' : '올해 읽은 책 전체 보기'}
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : booksToDisplay.length === 0 ? (
        <Empty
          description={
            viewAllYear
              ? '올해 읽은 책이 없습니다.'
              : '해당 월에는 읽은 책이 없습니다.'
          }
          style={{ marginTop: 40 }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {booksToDisplay.map((book) => (
            <Col span={8} key={book.id}>
              <BookCard
                {...book}
                userId={userId!}
                onUpdate={(updatedBook) => {
                  if (updatedBook.deleted) {
                    setBooks((prev) =>
                      prev.filter((b) => b.id != updatedBook.id),
                    );
                  } else {
                    setBooks((prev) =>
                      prev.map((b) =>
                        b.id === updatedBook.id ? updatedBook : b,
                      ),
                    );
                  }
                }}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyShelfPage;
