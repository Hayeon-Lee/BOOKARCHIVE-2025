import { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import MemberSummaryCard from '../components/book/MemberSummaryCard';
import MonthSelector from '../components/common/MonthSelector';
import { getBooksPerUserByMonth } from '../services/book/getMemberBookService';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../services/auth/useUsrStoreService';
import { UserSummary } from '../types/auth';

const { Title } = Typography;

const HomePage = () => {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      try {
        const summaries = await getBooksPerUserByMonth(selectedMonth);
        setUserSummaries(summaries);
      } catch (error) {
        console.log('멤버 요약 로딩 실패: ', error);
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
    if (loginUser != null)
    navigate(`/bookarchive/${loginUser.userId}`);
  }

  return (
    <div>
      <Title level={2}></Title>
      <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {userSummaries.map((user) => (
            <Col span={6} key={user.userId}>
              <MemberSummaryCard name={user.nickname} count={user.count} />
            </Col>
          ))}
        </Row>
      )}

      <Button type="default" onClick={handleGoToMyShelf}>내 책장 보기</Button>
    </div>
  );
};

export default HomePage;
