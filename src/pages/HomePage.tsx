import { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

import MemberSummaryCard from '../components/book/MemberSummaryCard';
import MonthSelector from '../components/common/MonthSelector';
import { getBooksPerUserByMonth } from '../services/book/getMemberBookService';
import { useUserStore } from '../services/auth/useUsrStoreService';
import { Summary } from '../types/book';

const { Title } = Typography;

const HomePage = () => {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
  const [userSummaries, setUserSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      try {
        const summaries = await getBooksPerUserByMonth(selectedMonth);
        setUserSummaries(summaries);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchSummaries();
  }, [selectedMonth]);

  const handleGoToMyShelf = () => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (loginUser != null) navigate(`/bookarchive/${loginUser.userId}`);
  };

  return (
    <div>
      <Title level={3}>📅 월별 멤버별 독서 기록</Title>
      <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
      <Button type="primary" onClick={handleGoToMyShelf}>
        내 책장 보기
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {[...userSummaries]
            .sort((a, b) => a.nickname.localeCompare(b.nickname))
            .map((summary) => (
              <Col span={6} key={summary.userId}>
                <MemberSummaryCard
                  nickname={summary.nickname}
                  count={summary.count}
                  userId={summary.userId}
                  onClick={() => {
                    navigate(`/bookarchive/${summary.userId}`);
                  }}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
