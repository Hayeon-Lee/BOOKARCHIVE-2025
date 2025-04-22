import { Card, Typography } from 'antd';
import { BookData } from '../../types/book';

const { Title, Text } = Typography;

const BookCard: React.FC<BookData> = ({ title, author, date, memo }) => {
  return (
    <Card hoverable>
      <Title level={5}>{title}</Title>
      <Text>{author}</Text>
      <br />
      <Text type="secondary">{date.toLocaleDateString()}</Text>
      {memo && <p>{memo}</p>}
    </Card>
  );
};

export default BookCard;
