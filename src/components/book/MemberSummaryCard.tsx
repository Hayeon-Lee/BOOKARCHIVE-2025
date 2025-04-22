import { Card, Typography } from 'antd';

import { MemberSummaryCardProps } from '../../types/book';

const { Title, Text } = Typography;

const MemberSummaryCard = ({
  nickname,
  count,
  onClick,
}: MemberSummaryCardProps) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card hoverable>
        <Title level={5}>{nickname}</Title>
        <Text>이번 달 읽은 책: {count}권</Text>
      </Card>
    </div>
  );
};

export default MemberSummaryCard;
