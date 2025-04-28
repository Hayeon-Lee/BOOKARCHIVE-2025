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
  Tag,
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
  completeDate,
  onUpdate,
  userId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [completionDate, setCompletionDate] = useState<Dayjs | null>(dayjs());

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
        targetDate: values.targetDate.toDate(),
        targetAmount: values.targetAmount,
      };

      if (loginUser?.userId)
        await modifyBookService(loginUser.userId, updatedBook);

      message.success('수정이 완료되었습니다!');
      setIsEditing(false);
      setIsModalOpen(false);

      onUpdate?.(updatedBook);
    } catch {
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

  const handleMarkComplete = async () => {
    if (!loginUser?.userId || !completionDate) return;

    try {
      const updatedBook: ReadBookData = {
        id,
        title,
        author,
        targetDate,
        targetAmount,
        completeDate: completionDate.toDate(),
        isCompleted: true,
      };
      await modifyBookService(loginUser.userId, updatedBook);
      message.success('목표가 달성되었습니다!');
      setIsCompleting(false);
      setIsModalOpen(false);
      onUpdate?.(updatedBook);
    } catch {
      message.error('목표 달성 처리 중 오류가 발생하였습니다.');
    }
  };

  const handleCancelComplete = async () => {
    if (!loginUser?.userId) return;

    try {
      const updatedBook: ReadBookData = {
        id,
        title,
        author,
        targetDate,
        targetAmount,
        completeDate: null,
        isCompleted: false,
      };

      await modifyBookService(loginUser.userId, updatedBook);
      message.success('목표 달성이 취소되었습니다.');
      setIsModalOpen(false);
      onUpdate?.({ ...updatedBook });
    } catch (error) {
      console.error(error);
      message.error('취소 처리 중 오류가 발생했습니다.');
    }
  };

  const handleDisabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day');
  };

  return (
    <>
      <Card hoverable onClick={() => setIsModalOpen(true)}>
        <Title level={5}>
          {title}
          <Text type="secondary">: {targetAmount}</Text>
        </Title>
        <Text>{author}</Text>
        <br />
        {completeDate ? (
          <Tag color="green">
            달성 완료: {dayjs(completeDate).format('YYYY.MM.DD')}
          </Tag>
        ) : (
          <>
            <Text type="secondary">
              목표 날짜: {dayjs(targetDate).format('YYYY.MM.DD')}
            </Text>
          </>
        )}
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
                {!completeDate && (
                  <Button onClick={() => setIsCompleting(true)}>
                    목표 달성 완료
                  </Button>
                )}
                {completeDate && (
                  <Button onClick={handleCancelComplete}>달성 취소</Button>
                )}
                <Button danger onClick={handleDelete}>
                  삭제
                </Button>
                {completeDate ? null : (
                  <Button type="primary" onClick={handleEdit}>
                    수정{' '}
                  </Button>
                )}
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
            <Form.Item label="목표 날짜" name="targetDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="목표 분량" name="targetAmount">
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
              <strong>목표 날짜:</strong>{' '}
              {dayjs(targetDate).format('YYYY.MM.DD')}
            </p>
            <p>
              <strong>목표 분량:</strong> {targetAmount}
            </p>
            <p>
              <strong>완료 날짜:</strong>{' '}
              {completeDate ? dayjs(completeDate).format('YYYY.MM.DD') : '-'}
            </p>
          </>
        )}
      </Modal>
      <Modal
        open={isCompleting}
        title="완료 날짜 선택"
        onCancel={() => setIsCompleting(false)}
        onOk={handleMarkComplete}
        okText="달성 완료"
        cancelText="취소"
      >
        <DatePicker
          value={completionDate}
          onChange={(date) => setCompletionDate(date)}
          style={{ width: '100%' }}
          disabledDate={handleDisabledDate}
        />
      </Modal>
    </>
  );
};

export default BookCard;
