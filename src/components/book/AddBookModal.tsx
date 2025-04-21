import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (book: any) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit({
      ...values,
      date: values.date.toDate(),
    });
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="📖 책 추가하기"
      onCancel={onClose}
      onOk={handleOk}
      okText="등록"
      cancelText="취소"
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="제목" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="저자" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="날짜" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="평점" name="title" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
