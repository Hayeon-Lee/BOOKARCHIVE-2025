import { useState } from 'react';
import { Card, Typography, Modal, Button, Form, Input, DatePicker } from 'antd';
import { BookData } from '../../types/book';
import dayjs, { Dayjs } from 'dayjs';

const { Title, Text } = Typography;

const BookCard: React.FC<BookData> = ({ title, author, date, memo }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleEdit = () => {
    form.setFieldsValue({
      title,
      author,
      date: dayjs(date),
      memo,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const values = form.getFieldsValue();
    setIsEditing(false);
    setIsModalOpen(false);
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
        <Text type="secondary">{date.toLocaleDateString()}</Text>
        {memo && <p>{memo}</p>}
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
        footer={
          isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)}>취소</Button>
              <Button type="primary" onClick={handleSave}>
                저장
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={handleEdit}>
              수정
            </Button>
          )
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
            <Form.Item label="메모" name="memo">
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
              <strong>메모:</strong> {memo || '-'}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default BookCard;
