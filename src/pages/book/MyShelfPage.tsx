import { useState, useEffect } from 'react';
import { Spin, Row, Col, Typography, Button, Empty, Divider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';

import AddBookModal from '../../components/book/AddBookModal';
import { addBookByUser } from '../../services/book/addBookService';
import { getBooksByUser } from '../../services/book/getMemberBookService';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { BookData, DeletedBook, ReadBookData } from '../../types/book';
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
      return;
    }

    if (loginUser && userId) {
      await addBookByUser(loginUser.userId, book);
      setOpen(false);
      const updatedBooks = await getBooksByUser(userId);
      setBooks(updatedBooks);
    }
  };

  const handleUpdate = (updatedBook: ReadBookData) => {
    setBooks((prev) =>
      updatedBook.deleted
        ? prev.filter((b) => b.id !== updatedBook.id)
        : prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)),
    );
  };

  const completedBooks = books.filter(
    (book) => book.isCompleted && book.completeDate,
  );

  const incompleteBooks = books.filter((book) => !book.isCompleted);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>🎁{nickname}의 책장</Title>

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
        <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
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
      ) : (
        <>
          <Title level={4}>📌 미달성 목표</Title>
          {incompleteBooks.length === 0 ? (
            <Empty description="미달성한 책이 없습니다." />
          ) : (
            <Row gutter={[16, 16]}>
              {incompleteBooks.map((book) => (
                <Col span={8} key={book.id}>
                  <BookCard
                    {...book}
                    userId={userId!}
                    onUpdate={(updatedBook: ReadBookData | DeletedBook) => {
                      if ('deleted' in updatedBook && updatedBook.deleted) {
                        setBooks((prev) =>
                          prev.filter((b) => b.id !== updatedBook.id),
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

          <Divider />

          <Title level={4}>🎉 달성한 목표</Title>
          {completedBooks.length === 0 ? (
            <Empty description="달성한 책이 없습니다." />
          ) : (
            <Row gutter={[16, 16]}>
              {completedBooks.map((book) => (
                <Col span={8} key={book.id}>
                  <BookCard
                    {...book}
                    userId={userId!}
                    onUpdate={(updatedBook: ReadBookData | DeletedBook) => {
                      if ('deleted' in updatedBook && updatedBook.deleted) {
                        setBooks((prev) =>
                          prev.filter((b) => b.id !== updatedBook.id),
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
        </>
      )}
    </div>
  );
};

export default MyShelfPage;
