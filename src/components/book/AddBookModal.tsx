import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
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
      date: values.date.toDate(),
    });
    form.resetFields();
  };

  const handleDisabledDate = (current:Dayjs) => {
    return current && current > dayjs().endOf('day');
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
        <Form.Item label="날짜" name="date" rules={[{ required: true }]}>
          <DatePicker style={{width:'100%'}} disabledDate={handleDisabledDate} />
        </Form.Item>
        <Form.Item label="평점" name="rating" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
