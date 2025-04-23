import { Typography } from 'antd';

const { Title } = Typography;

const Footer = () => {
  return (
    <div
      style={{
        background: '#577aaf',
      }}
    >
      <Title level={5} style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ color: '#262626' }}>관리자 연락처</div>
          <div style={{ color: '#262626' }}>papepopepe@naver.com</div>
          <div style={{ color: '#262626' }}>010-6607-5071</div>
        </div>
      </Title>
    </div>
  );
};

export default Footer;
