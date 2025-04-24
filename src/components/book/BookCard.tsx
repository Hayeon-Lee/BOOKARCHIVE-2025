import { useState } from 'react';
import { Card, Typography, Modal, Button } from 'antd';
import { BookData } from '../../types/book';

const { Title, Text } = Typography;

const BookCard: React.FC<BookData> = ({ title, author, date, memo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card hoverable onClick={() => setIsModalOpen(true)}>
        <Title level={5}>{title}</Title>
        <Text>{author}</Text>
        <br />
        <Text type="secondary">{date.toLocaleDateString()}</Text>
        {memo && <p>{memo}</p>}
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="edit" type="primary">
            수정
          </Button>,
        ]}
        title="책 정보"
      >
        <p>
          <strong>제목:</strong> {title}
        </p>
        <p>
          <strong>저자:</strong> {author}
        </p>
        <p>
          <strong>날짜:</strong> {date.toLocaleDateString()}
        </p>
        <p>
          <strong>메모: </strong>
          {memo ? memo : '메모한 내용이 없습니다.'}
        </p>
      </Modal>
    </>
  );
};

export default BookCard;
