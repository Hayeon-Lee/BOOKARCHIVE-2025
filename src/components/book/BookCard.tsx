import { useState } from 'react';
import {
  Card,
  Typography,
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  message,
} from 'antd';
import { BookCardProps, ReadBookData } from '../../types/book';
import dayjs, { Dayjs } from 'dayjs';
import { modifyBookService } from '../../services/book/modifyBookService';
import { useUserStore } from '../../services/auth/useUsrStoreService';
import { deleteBookService } from '../../services/book/deleteBookService';

const { Title, Text } = Typography;

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  targetDate,
  targetAmount,
  completedDate,
  onUpdate,
  userId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [form] = Form.useForm();

  const loginUser = useUserStore((state) => state.loginUser);
  const isOwner = loginUser?.userId === userId;

  const handleEdit = () => {
    form.setFieldsValue({
      title,
      author,
      targetDate: dayjs(targetDate),
      targetAmount,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      const updatedBook: ReadBookData = {
        ...values,
        id,
        date: values.date.toDate(),
      };

      if (loginUser?.userId)
        await modifyBookService(loginUser.userId, updatedBook);

      message.success('수정이 완료되었습니다!');
      setIsEditing(false);
      setIsModalOpen(false);

      onUpdate?.(updatedBook);
    } catch (error) {
      console.log(error);
      message.error('수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!loginUser?.userId) return;

    try {
      await deleteBookService(loginUser.userId, id);
      message.success('삭제되었습니다.');
      setIsModalOpen(false);
      onUpdate?.({ id, deleted: true });
    } catch {
      message.error('삭제에 실패했습니다.');
    }
  };

  const handleDisabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day');
  };

  return (
    <>
      <Card hoverable onClick={() => setIsModalOpen(true)}>
        <Title level={5}>{title}</Title>
        <Text>{author}</Text>
        <br />
        <Text type="secondary">{completedDate.toLocaleDateString()}</Text>
        {rating && <p>{rating}</p>}
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
        footer={
          isOwner ? (
            isEditing ? (
              <>
                <Button onClick={() => setIsEditing(false)}>취소</Button>
                <Button type="primary" onClick={handleSave}>
                  저장
                </Button>
              </>
            ) : (
              <>
                <Button danger onClick={handleDelete}>
                  삭제
                </Button>
                <Button type="primary" onClick={handleEdit}>
                  수정
                </Button>
              </>
            )
          ) : null
        }
        title={isEditing ? '책 정보 수정' : '책 정보'}
      >
        {isEditing ? (
          <Form form={form} layout="vertical">
            <Form.Item label="제목" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="저자" name="author">
              <Input />
            </Form.Item>
            <Form.Item label="날짜" name="date">
              <DatePicker
                style={{ width: '100%' }}
                disabledDate={handleDisabledDate}
              />
            </Form.Item>
            <Form.Item label="평가" name="rating">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        ) : (
          <>
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
              <strong>메모:</strong> {rating || '-'}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default BookCard;
