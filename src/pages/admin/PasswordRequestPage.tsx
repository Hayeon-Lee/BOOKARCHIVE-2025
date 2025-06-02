import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { notification, Table, Tag, Typography, Popconfirm, Button } from 'antd';

import {
  acceptPasswordReset,
  checkPasswordResetList,
  deletePasswordReset,
} from '../../services/admin/resetPasswordService';
import type { PasswordResetRequest } from '../../types/password';

const { Title } = Typography;

const PasswordRequestPage = () => {
  const [requests, setRequests] = useState<PasswordResetRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await checkPasswordResetList();
      setRequests(data);
    } catch (err) {
      notification.error({
        message: '목록 불러오기 실패',
        description:
          err instanceof Object
            ? err.toString()
            : '파이어베이스를를 확인해주세요.',
        duration: 2,
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (record: PasswordResetRequest) => {
    try {
      await acceptPasswordReset(record);
      notification.success({
        message: '비밀번호 변경 완료',
        description: `${record.nickname} 님의 비밀번호가 변경되었습니다.`,
        duration: 2,
      });
      await fetchRequests();
    } catch (error) {
      notification.error({
        message: '비밀번호 변경 실패',
        description: '로그를 확인하세요.',
        duration: 2,
      });
    }
  };

  const handleDelete = async (record: PasswordResetRequest) => {
    try {
      await deletePasswordReset(record);
      notification.success({
        message: '요청 삭제 완료',
        description: '요청이 삭제되었습니다.',
        duration: 2,
      });
      await fetchRequests();
    } catch (error) {
      notification.error({
        message: '요청 삭제 실패',
        description: '로그를 확인하세요.',
        duration: 2,
      });
    }
  };

  const columns = [
    {
      title: '닉네임',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '요청 시각',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
      render: (requestedAt: Timestamp | undefined) =>
        requestedAt?.toDate ? requestedAt.toDate().toLocaleString() : 'N/A',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'pending' ? 'orange' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '작업',
      dataIndex: 'actions',
      render: (_: any, record: any) => (
        <>
          <Popconfirm
            title="정말 수락하시겠습니까?"
            onConfirm={() => handleAccept(record)}
          >
            <Button type="default" size="small" style={{ marginRight: 8 }}>
              수락
            </Button>
          </Popconfirm>
          <Popconfirm
            title="정말 삭제하시겠습니까?"
            onConfirm={() => handleDelete(record)}
          >
            <Button type="default" size="small" danger>
              삭제
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={4}>비밀번호 변경 요청 목록</Title>
      <Table
        dataSource={requests}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PasswordRequestPage;
