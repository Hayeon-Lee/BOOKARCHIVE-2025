import React from 'react';
import { Card, Typography } from 'antd';
import { MemberSummaryCardProps } from '../../types/book';

const { Title, Text } = Typography;

const MemberSummaryCard: React.FC<MemberSummaryCardProps> = ({
  name,
  count,
}) => {
  return (
    <Card hoverable style={{ textAlign: 'center' }}>
      <Title level={4}>{name}</Title>
      <Text type="secondary">{count} 권 읽음</Text>
    </Card>
  );
};

export default MemberSummaryCard;
