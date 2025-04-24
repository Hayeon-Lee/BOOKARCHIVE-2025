import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import { AddBookModalProps } from '../../types/book';

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
      targetDate: values.targetDate.toDate(),
      isCompleted: false,
      completeDate: null,
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
        <Form.Item label="저자" name="author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="목표 날짜"
          name="targetDate"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="목표 분량"
          name="targetAmount"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
